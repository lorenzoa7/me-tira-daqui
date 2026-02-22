const funnyMessages = [
  "Aguenta mais um pouquinho... ou não",
  "Seu voto foi computado! Agora é torcer pra galera pensar igual",
  "Relaxa, ninguém vai saber que foi você",
  "Já tá querendo ir? Tá cedo ainda... ou não",
  "Segura firme! Se a galera concordar, já era",
  "Voto secreto registrado com sucesso!",
  "A operação 'vazar do rolê' foi iniciada...",
  "Calma que o Uber tá longe ainda... ou será que não?",
  "Você não é o único querendo ir embora, confia",
  "Missão: Me Tira Daqui em andamento...",
  "Seu pedido de resgate foi registrado!",
  "Firme e forte! A liberdade tá chegando...",
  "O sofá de casa tá te chamando, né?",
  "Segura a onda, a galera tá decidindo...",
  "Contagem regressiva pra liberdade iniciada!",
];

export function getRandomFunnyMessage(): string {
  return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
}

export function getAllFunnyMessages(): string[] {
  return [...funnyMessages];
}
