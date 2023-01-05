import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth, typeLoggedIn } from "../context/authContext";
import { getNewPrice} from "../helpers";
import like from "../assets/images/likeGreen.png";
import shop from "../assets/images/whiteBag.png";
import { Form } from "react-bootstrap";



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
    console.log(item)

    const { fullName, email, role, _id } = auth?.loggedIn as typeLoggedIn;
   
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

    const addToBasket = async () => {
        const data = {
            userId: _id,
            product: { productId: item, quantity: 1 }
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
        <div className="card-1">
            <div>
                <h2>{item?.title}</h2>
            </div>
            <div className="card-product">
                <div>
                    <img src={item?.image[0]} alt={item?.title} className="main-img" />
                </div>
                <div>
                    <div className="header">
                        <div>
                            {item?.sales.sales
                                ?
                                <div className='sales-price'>
                                    <p className='price new-price'>${getNewPrice(item.price, item.sales.count)}</p>
                                    <p className='old-price'>${item.price}</p>
                                </div>
                                :
                                <p className='price static-price'>${item?.price}</p>
                            }
                        </div>
                        <div> <p>{item?.rating}</p></div>
                    </div>
                    <div className="bag-container">
                        <Form>
                        <input type="number" min="1" />
                        <button type="submit" className="M-btn btn-green" onClick={addToBasket}>
                            <img src={shop} alt="shop"/>
                            <p>Add to cart</p>
                            </button>
                        </Form>
                        <div className="M-btn">
                        <img src={like} alt="like"/>
                            <p>Favourite</p></div>
                    </div>
                    <div>
                        Show 
                        <details>kek</details>
                    </div>
                    <div>Share</div>
                </div>
            </div>
        </div>
    )
}