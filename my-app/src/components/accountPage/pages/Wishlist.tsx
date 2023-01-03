import { useAuth } from "../../../context/authContext";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from "../../Cards";
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

export default function Wishlist (){
    const auth = useAuth();
    const { _id } = auth.loggedIn;
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        const fn = async () => {
            const res = await axios.get('/wishlist/getWishlist', {
                params: {
                    _id
                }
            })
            // const productIdArr = res.data.products;
            console.log(res.data)
           
            setItems(res.data)
        }
        fn()
    }, []);
    return(
        <div>
        <div>
            <h2 className='home-title'>My wishlist</h2>
        </div>
        <Cards items={items}/>

        
        </div>
    )
}