export const clearArray = (array) => {
    while (array.length)
        array.pop();
};
export const fancyLogError = (text) => {
    console.log.apply(console, [`%c${text}`, 'font-weight: bold; color: red']);
};
export const fancyLogSuccess = (text) => {
    console.log.apply(console, [
        `%c${text}`,
        'font-weight: bold; color: #bada55',
    ]);
};
