// export const getNewPrice = (price, sales) => {
//     return (price * (1 - sales / 100)).toFixed(2)
// };
export const getNewPrice = (price: number, sales: number) => {
    return (price * (1 - sales / 100)).toFixed(2)
}

export const getNormalText = (text: string) => {
    const arrStrings = text.split('\n')
    return arrStrings.map((str: string, i: number) => <p key={`p_${i}`}>{str}</p>)
}

type starsType = {
    [key: string]: string
}
const objStars: starsType = {
    '1': '❤️🤍🤍🤍🤍',
    '2': '❤️❤️🤍🤍🤍',
    '3': '❤️❤️❤️🤍🤍',
    '4': '❤️❤️❤️❤️🤍',
    '5': '❤️❤️❤️❤️❤️',
}

export const drawRating = (num: number) => {
    const arr = Object.keys(objStars);
    const max = arr.filter((el) => Number(el) >= num)
        .map((el) => String(el));
    const value = max[0];
    return objStars[value];
};