import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/authContext";

type ProductType = {
    title: string;
    price: number;
    description: string;
    category: string;
    type: string;
    image: string[]
    rating: number;
    newColection: boolean;
    sales: {
        sales: boolean,
        count: number,
    },
};

export default function Card() {
    const [item, setItem] = useState<ProductType>();
    const [isLoaded, setIsLoaded] = useState(false);
    const useParamsId = useParams();
    const productId = useParamsId.id;
    const auth = useAuth();
  
    const { fullName, email, role, _id } = auth.loggedIn;

    useEffect(() => {
        const fn = async () => {
            const res = await axios.get(`/${productId}`, {
                params: {
                    productId
                }
            })
            setItem(res.data)
        }
        fn()
    }, [productId]); 

    const addToBasket = async () =>{
        const data = {
            userId: _id,
            product: {productId: item, quantity: 1}
        }
        try {
            let res = await fetch(`/basket/addProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            let result = await res.json();
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

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
                    <img src={item?.image[0]} alt={item?.title} width="250" height="250"/>
                </div>
                <div>
                    <div>
                        <div>${item?.price}</div>
                        <div>{item?.rating}</div>
                    </div>
                    <div>
                        <input type="number" />
                        <button  className="btn btn-green" onClick={addToBasket}>Add to cart</button>
                        <button  className="btn">Favourite</button>
                    </div>
                    <div>Share</div>
                </div>
            </div>
        </>
    )
}