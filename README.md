# Me Tira Daqui! 🍻

Vote anonimamente pra ir embora do role. Quando a maioria votar, todo mundo fica sabendo!

**Me Tira Daqui!** resolve aquele problema classico: ninguem quer ser a pessoa chata que diz "galera, acho que ta na hora de irmos". Com esse app, cada um vota em segredo, e quando mais da metade do grupo quiser ir embora, todo mundo e notificado ao mesmo tempo. Sem julgamento, sem exposicao.

## Como funciona

1. Voce acessa o app, digita seu nome e cria um **Grupo**
2. Um link curto e compartilhavel e gerado — manda pros amigos
3. Cada amigo entra pelo link e digita seu nome
4. Na tela de cada um, aparece o botao **"ME TIRA DAQUI!"** — ao clicar, voce vota que quer ir embora
5. O voto e anonimo — ninguem sabe quem votou nem quantos votos ja foram computados
6. Quando **50% + 1** do grupo votar, todo mundo recebe a notificacao: **"Hora de vazar!"** 🎉
7. O grupo e encerrado quando o host fechar a sessao ou apos 12h de inatividade

## Tech stack

- **Next.js 16** — App Router com API Routes
- **React 19**
- **Tailwind CSS 4** + **shadcn/ui** — UI moderna com tema laranja (remetendo a cerveja 🍺)
- **Motion (Framer Motion)** — Animacoes fluidas nos componentes
- **SSE (Server-Sent Events)** — Atualizacoes em tempo real sem WebSocket
- **Web Notifications API** — Notificacao push no navegador quando chega a hora de ir embora
- **PWA** — Instalavel como app no celular (manifest + icones)
- **nanoid** — IDs curtos para os grupos

## Rodando localmente

```bash
# Instalar dependencias
npm install

# Rodar em modo dev
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de producao

```bash
npm run build
npm start
```

## Detalhes de implementacao

**Armazenamento**: os dados dos grupos ficam em memoria no servidor (Map/Set). Nao ha banco de dados — os grupos sao efemeros por natureza e expiram automaticamente apos 12 horas.

**Tempo real**: a comunicacao entre servidor e clientes usa Server-Sent Events (SSE). Quando alguem entra no grupo, vota, ou o threshold e atingido, todos os clientes conectados recebem o evento instantaneamente.

**Anonimato**: o app mostra quem esta no grupo, mas nunca revela quem votou ou quantos votos foram computados. A unica informacao publica e quando a maioria ja votou.

**Notificacoes**: ao entrar num grupo, o app solicita permissao de notificacao. Quando o threshold e atingido, uma notificacao push e disparada mesmo se o usuario estiver em outra aba.

## Licenca

[MIT](LICENSE)
