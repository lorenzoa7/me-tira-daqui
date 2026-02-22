import { nanoid } from "nanoid";
import { randomUUID } from "crypto";

interface Member {
  name: string;
}

interface Group {
  id: string;
  hostMemberId: string;
  members: Map<string, Member>;
  votes: Set<string>;
  createdAt: number;
  closed: boolean;
  notified: boolean;
  sseClients: Set<ReadableStreamDefaultController>;
}

// Pin the store to globalThis so it survives HMR in dev mode
const globalStore = globalThis as unknown as {
  __metiradaqui_groups?: Map<string, Group>;
  __metiradaqui_cleanup?: ReturnType<typeof setInterval>;
};

if (!globalStore.__metiradaqui_groups) {
  globalStore.__metiradaqui_groups = new Map<string, Group>();
}

if (!globalStore.__metiradaqui_cleanup) {
  globalStore.__metiradaqui_cleanup = setInterval(() => {
    const now = Date.now();
    const TWELVE_HOURS = 12 * 60 * 60 * 1000;
    for (const [id, group] of groups) {
      if (now - group.createdAt > TWELVE_HOURS || (group.members.size === 0 && now - group.createdAt > 60000)) {
        for (const controller of group.sseClients) {
          try { controller.close(); } catch {}
        }
        groups.delete(id);
      }
    }
  }, 5 * 60 * 1000);
}

const groups = globalStore.__metiradaqui_groups;

export function createGroup(hostName: string): { groupId: string; memberId: string } {
  const groupId = nanoid(6);
  const memberId = randomUUID();

  const group: Group = {
    id: groupId,
    hostMemberId: memberId,
    members: new Map([[memberId, { name: hostName }]]),
    votes: new Set(),
    createdAt: Date.now(),
    closed: false,
    notified: false,
    sseClients: new Set(),
  };

  groups.set(groupId, group);
  return { groupId, memberId };
}

export function getGroup(groupId: string) {
  return groups.get(groupId) ?? null;
}

export function joinGroup(groupId: string, name: string): { memberId: string } | null {
  const group = groups.get(groupId);
  if (!group || group.closed) return null;

  const memberId = randomUUID();
  group.members.set(memberId, { name });

  broadcast(groupId, "member-joined", {
    memberCount: group.members.size,
    members: getMemberNames(group),
  });

  return { memberId };
}

export function castVote(groupId: string, memberId: string): { success: boolean; thresholdReached: boolean } {
  const group = groups.get(groupId);
  if (!group || group.closed) return { success: false, thresholdReached: false };
  if (!group.members.has(memberId)) return { success: false, thresholdReached: false };
  if (group.votes.has(memberId)) return { success: true, thresholdReached: false };

  group.votes.add(memberId);

  const threshold = Math.floor(group.members.size / 2) + 1;
  const thresholdReached = group.votes.size >= threshold && !group.notified;

  broadcast(groupId, "vote-cast", { voteCount: group.votes.size });

  if (thresholdReached) {
    group.notified = true;
    broadcast(groupId, "time-to-leave", {});
  }

  return { success: true, thresholdReached };
}

export function closeGroup(groupId: string, memberId: string): boolean {
  const group = groups.get(groupId);
  if (!group) return false;
  if (group.hostMemberId !== memberId) return false;

  group.closed = true;
  broadcast(groupId, "group-closed", {});

  for (const controller of group.sseClients) {
    try { controller.close(); } catch {}
  }
  group.sseClients.clear();

  return true;
}

export function getGroupInfo(groupId: string, memberId: string) {
  const group = groups.get(groupId);
  if (!group) return null;

  return {
    memberCount: group.members.size,
    members: getMemberNames(group),
    hasVoted: group.votes.has(memberId),
    isFinished: group.notified,
    isClosed: group.closed,
    isHost: group.hostMemberId === memberId,
  };
}

export function addSSEClient(groupId: string, controller: ReadableStreamDefaultController): (() => void) | null {
  const group = groups.get(groupId);
  if (!group) return null;

  group.sseClients.add(controller);
  return () => {
    group.sseClients.delete(controller);
  };
}

function broadcast(groupId: string, event: string, data: unknown) {
  const group = groups.get(groupId);
  if (!group) return;

  const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  const deadClients: ReadableStreamDefaultController[] = [];

  for (const controller of group.sseClients) {
    try {
      controller.enqueue(new TextEncoder().encode(message));
    } catch {
      deadClients.push(controller);
    }
  }

  for (const dead of deadClients) {
    group.sseClients.delete(dead);
  }
}

function getMemberNames(group: Group): string[] {
  return Array.from(group.members.values()).map((m) => m.name);
}
