import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import like from "../assets/images/Like.png";
import ProductCard from './ProductCard';
import axios from 'axios';

type Product = {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rating: {
        count: number,
        rate: number
    }
};

export default function Collection() {
    const [items, setItems] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const useParamsId = useParams();
    const CategoryId = useParamsId.id;
    const url = `https://fakestoreapi.com/products/category/${CategoryId}'s%20clothing`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    console.log(error)
                }
            )
    }, [url]);
    
    const buildName = (str: string) => {
        const arr = str.split(' ').slice(0, 3).join(' ');
        return str.length > 20 ? `${arr}...` : str;
    };

    return (
        <>
        <div className='cards-page-coloms'>
        <div></div>
        <div className='cards'>
            {items?.map((el) =>
                <div className='card-collection' key={el.id} onClick={()=>navigate(`/product/${el.id}`)}>
                    <figure>
                        <div className='images'>
                            <img src={el.image} alt={el.title} />
                            <img src={like} alt="like" className='card-like' />
                        </div>
                        <figcaption>
                            <p className='card-title'>{buildName(el.title)}</p>
                            <p className='price'>${el.price}</p>
                        </figcaption>
                    </figure>
                </div>
            )}
        </div>
        </div>
        </>
    )
}