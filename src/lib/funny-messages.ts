const funnyMessages = [
  "Aguenta mais um pouquinho... ou nao 😅",
  "Seu voto foi computado! Agora e torcer pra galera pensar igual 🤞",
  "Relaxa, ninguem vai saber que foi voce 🤫",
  "Ja ta querendo ir? Ta cedo ainda... ou nao 🕐",
  "Segura firme! Se a galera concordar, ja era 🏃",
  "Voto secreto registrado com sucesso! 🗳️",
  "A operacao 'vazar do role' foi iniciada... 🚀",
  "Calma que o Uber ta longe ainda... ou sera que nao? 🚗",
  "Voce nao e o unico querendo ir embora, confia 😏",
  "Missao: Me Tira Daqui em andamento... 🕵️",
  "Seu pedido de resgate foi registrado! 🆘",
  "Firme e forte! A liberdade ta chegando... 🗽",
  "O sofá de casa ta te chamando, ne? 🛋️",
  "Segura a onda, a galera ta decidindo... 🌊",
  "Contagem regressiva pra liberdade iniciada! ⏳",
];

export function getRandomFunnyMessage(): string {
  return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
}

export function getAllFunnyMessages(): string[] {
  return [...funnyMessages];
}
