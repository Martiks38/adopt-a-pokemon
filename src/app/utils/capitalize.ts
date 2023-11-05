export const capitalize = (word: string): string => {
  const firstLetter = word.charAt(0);
  const firstLetterToUpperCase = firstLetter.toUpperCase();

  return firstLetterToUpperCase + word.slice(1);
};
