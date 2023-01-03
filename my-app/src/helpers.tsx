// export const getNewPrice = (price, sales) => {
//     return (price * (1 - sales / 100)).toFixed(2)
// };
export const getNewPrice = (price: number, sales: number) => {
    return (price * (1 - sales / 100)).toFixed(2)
}

// const obj = {
//     1: () => '★☆☆☆☆',
//     2: () => '★★☆☆☆',
//     3: () => '★★★☆☆',
//     4: () => '★★★★☆',
//     5: () => '★★★★★',
// }

// export const drawRating = (vote) =>{
//     const arr = Object.keys(obj);
//     const max = arr.filter((el) => el >= vote);
//     return obj[max[0]]();
// };


