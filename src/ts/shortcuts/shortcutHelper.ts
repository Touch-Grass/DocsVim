/**
 * Loops through array and pops all items out.
 * @param array The array which you want to clear
 */
export const clearArray = <T>(array: T[]): void => {
  while (array.length) array.pop();
};

export const fancyLogError = (text: string): void => {
  console.log.apply(console, [`%c${text}`, 'font-weight: bold; color: red']);
};

export const fancyLogSuccess = (text: string): void => {
  console.log.apply(console, [
    `%c${text}`,
    'font-weight: bold; color: #bada55',
  ]);
};
