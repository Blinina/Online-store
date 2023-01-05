import { useAuth, typeLoggedIn } from "../../../context/authContext";
import { useEffect, useState } from 'react';
import Cards from "../../Cards";
import { getLike } from "../../../store/likeSlice";
import {  useSelector } from 'react-redux';

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

export default function Wishlist() {
    const auth = useAuth();
    const { _id } = auth?.loggedIn as typeLoggedIn;
    // const [items, setItems] = useState<Product[]>([]);

    // useEffect(() => {
        
    // }, []);
    const items = useSelector(getLike).flat();
    return (
        <div>
            <div>
                <h2 className='home-title'>My wishlist</h2>
            </div>
            <div>
                <Cards items={items} />
            </div>
        </div>
    )
}