import axios from "axios";
import { Product } from "../TSType";

export const addToBasketAPI = async (id: string, item: Product, quantity: number) => {
    try {
        let res = await axios.post(`/basket/addProduct`, {
            userId: id,
            product: { product: item, quantity: quantity }
        });
        console.log(res.data);
    } catch (e) {
        console.log(e);
    }
};
export const deleteProductToBasketAPI = async (id: string, product: Product) =>{
    try {
        const res = await axios.post('/basket/deleteProduct', {
            userId: id,
            product: product
        });
        console.log(res.data)
    } catch (e) {
        console.log(e)
    };
};
