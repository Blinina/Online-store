import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { sassFalse } from 'sass';
import { useAuth } from "../context/authContext";
import Cards from './Cards';
import { getData } from '../store/collectionsSlice';
import { useDispatch, useSelector } from 'react-redux';

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
    const useParamsId = useParams();
    const dispatch = useDispatch();
    const CategoryId = useParamsId.id;
    const auth = useAuth();

    useEffect(() => {
        // dispatch(getData(CategoryId))
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
    // const dataCollections = useSelector(getCollection);
    //  setItems(dataCollections)
    // const pi = useSelector(state=>state.collections.entities)
    // console.log(pi)


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