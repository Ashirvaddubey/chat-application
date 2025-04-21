import mockResponses from '../mockResponses.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomDelay = () => delay(Math.floor(Math.random() * 1500) + 500);

const simulateNetworkError = () => Math.random() < 0.1;

export const fetchMessages = async () => {
  await randomDelay();
  
  if (simulateNetworkError()) {
    throw new Error('Network error: Failed to fetch messages');
  }
  
  return mockResponses.previousMessages || [];
};

export const sendMessage = async (message) => {
  await randomDelay();
  
  if (simulateNetworkError()) {
    throw new Error('Network error: Failed to send message');
  }
  
  const botResponses = mockResponses.botResponses;
  const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
  
  const botResponse = {
    id: `bot-${Date.now()}`,
    text: randomResponse,
    sender: 'bot',
    timestamp: new Date().toISOString(),
  };
  
  return {
    sentMessage: { ...message, pending: false },
    response: botResponse
  };
};