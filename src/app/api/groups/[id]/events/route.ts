import { addSSEClient, getGroup } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);
  const memberId = url.searchParams.get("memberId");

  if (!memberId) {
    return new Response("memberId required", { status: 400 });
  }

  const group = getGroup(id);
  if (!group) {
    return new Response("Group not found", { status: 404 });
  }

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      const connectMsg = `event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`;
      controller.enqueue(new TextEncoder().encode(connectMsg));

      const cleanup = addSSEClient(id, controller);

      // Handle client disconnect
      request.signal.addEventListener("abort", () => {
        if (cleanup) cleanup();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
