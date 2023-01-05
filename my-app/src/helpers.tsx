// export const getNewPrice = (price, sales) => {
//     return (price * (1 - sales / 100)).toFixed(2)
// };
export const getNewPrice = (price: number, sales: number) => {
    return (price * (1 - sales / 100)).toFixed(2)
}
// 

