import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import like from "../assets/images/Like.png";
import { Form } from 'react-bootstrap';
import ProductCard from './Card';
import axios from 'axios';
import { sassFalse } from 'sass';
import { useAuth } from "../context/authContext";
import Cards from './Cards';

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

export default function Collection() {
    const [items, setItems] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const useParamsId = useParams();
    const CategoryId = useParamsId.id;
    const auth = useAuth();
    const { fullName, email, role, _id } = auth.loggedIn;
    useEffect(() => {
        const fn = async () => {
            const res = await axios.get('/category', {
                params: {
                    CategoryId
                }
            })
            setItems(res.data)
        }
        fn()
    }, [CategoryId]);


    return (
        <div className="collection-page">
            <div>
                filtres
            </div>
            <div >
                <Cards items={items}/>
            </div>
        </div>
    )
}