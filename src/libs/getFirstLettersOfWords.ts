export function getFirstLettersOfWords(userName: string): string {
    const words = userName.split(' '); // Split the string into words
    const firstLetters = words.map(word => word.charAt(0)); // Get the first character of each word
    return firstLetters.join(''); // Join the first letters back into a string
  }
  