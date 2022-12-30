import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

type ProductType = {
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

export default function ProductCard() {
    const [item, setItem] = useState<ProductType>();
    const [isLoaded, setIsLoaded] = useState(false);
    const useParamsId = useParams();
    const CategoryId = useParamsId.id;
    const url = `https://fakestoreapi.com/products/${CategoryId}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItem(result);
                },
                (error) => {
                    setIsLoaded(true);
                    console.log(error)
                }
            )
    }, [url]);
    return (
        <>
            <div>
                <h2>{item?.title}</h2>
                <div>
                    <button>General info</button>
                    <button>Product details</button>
                </div>
            </div>
            <div className="card">
                <div>
                    <img src={item?.image} alt={item?.title} width="250" height="250"/>
                </div>
                <div>
                    <div>
                        <div>${item?.price}</div>
                        <div>{item?.rating.rate}</div>
                    </div>
                    <div>
                        <input type="number" />
                        <button  className="btn btn-green">Add to cart</button>
                        <button  className="btn">Favourite</button>
                    </div>
                    <div>Share</div>
                </div>
            </div>
        </>
    )
}