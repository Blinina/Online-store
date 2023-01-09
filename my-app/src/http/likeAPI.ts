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

export const addLikeAPI = async (user: string, productID: string) => {
    try {
        const res = await axios.post('/wishlist/addProduct', {
            userId: user,
            product: productID,
        });
        console.log(res.data)
    } catch (e) {
        console.log(e)
    }
}


export const deleteLikeAPI = async (user: string, productID: string) => {
    try {
        const res = await axios.post('/wishlist/deleteProduct', {
            userId: user,
            product: productID,
        });
        console.log(res.data)
    } catch (e) {
        console.log(e)
    };
};