/**
 * Loops through array and pops all items out.
 * @param array The array which you want to clear
 */
export const clearArray = <T>(array: T[]): void => {
    while (array.length) array.pop();
}