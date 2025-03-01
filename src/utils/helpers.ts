/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Picks a random item from an array
 */
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Generates a shareable challenge message
 */
export const generateShareMessage = (
  username: string,
  challengeId: string
): string => {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:4200";
  const challengeUrl = `${baseUrl}/challenge/${challengeId}`;

  return `🧩 I challenge you to beat my score in Globetrotter! Join my challenge here: ${challengeUrl}`;
};
