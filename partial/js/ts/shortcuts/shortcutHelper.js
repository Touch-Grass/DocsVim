export const clearArray = (array) => {
    while (array.length)
        array.pop();
};
export const fancyLogError = (text) => {
    console.log.apply(console, [
        `%c${text}`,
        'background: #222; color: red',
    ]);
};
export const fancyLogSuccess = (text) => {
    console.log.apply(console, [
        `%c${text}`,
        'background: #222; color: #bada55',
    ]);
};
