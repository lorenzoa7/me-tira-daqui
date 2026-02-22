# Me Tira Daqui! 🍻

Anonymously vote to leave a hangout. When the majority votes, everyone gets notified!

**Me Tira Daqui!** (Portuguese for "Get me out of here!") solves a classic problem: nobody wants to be the buzzkill who says "hey guys, I think it's time to go". With this app, everyone votes secretly, and when more than half the group wants to leave, everyone is notified at once. No judgment, no exposure.

## How it works

1. You open the app, type your name and create a **Group**
2. A short shareable link is generated — send it to your friends
3. Each friend joins through the link and types their name
4. Everyone sees a big **"ME TIRA DAQUI!"** button — tap it to vote to leave
5. Votes are anonymous — no one knows who voted or how many votes have been cast
6. When **50% + 1** of the group votes, everyone gets notified: **"Time to go!"** 🎉
7. The group is closed when the host ends the session or after 12h of inactivity

## Tech stack

- **Next.js 16** — App Router with API Routes
- **React 19**
- **Tailwind CSS 4** + **shadcn/ui** — Modern UI with an orange theme (beer vibes 🍺)
- **Motion (Framer Motion)** — Smooth component animations
- **SSE (Server-Sent Events)** — Real-time updates without WebSockets
- **Web Notifications API** — Browser push notification when it's time to leave
- **PWA** — Installable as a mobile app (manifest + icons)
- **nanoid** — Short IDs for groups

## Running locally

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Implementation details

**Storage**: Group data is kept in-memory on the server (Map/Set). There is no database — groups are ephemeral by nature and automatically expire after 12 hours.

**Real-time**: Communication between server and clients uses Server-Sent Events (SSE). When someone joins, votes, or the threshold is reached, all connected clients receive the event instantly.

**Anonymity**: The app shows who's in the group, but never reveals who voted or how many votes have been cast. The only public information is when the majority has voted.

**Notifications**: When joining a group, the app requests notification permission. When the threshold is reached, a push notification is fired even if the user is on another tab.

## License

[MIT](LICENSE)
