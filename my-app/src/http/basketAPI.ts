import axios from "axios";

type Product = {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    type: string;
    image: string[];
    rating: number;
    newColection: boolean;
    sales: {
        sales: boolean;
        count: number;
    };
};


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
