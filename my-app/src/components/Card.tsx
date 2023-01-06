import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth, typeLoggedIn } from "../context/authContext";
import { getNewPrice, drawRating } from "../helpers";
import like from "../assets/images/likeGreen.png";
import shop from "../assets/images/whiteBag.png";
import next from "../assets/images/next.png";
import prev from "../assets/images/prev.png";
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
    const [showtext, setShowText] = useState(false);
    const [imgNum, setImgNum] = useState(0);
    const useParamsId = useParams();
    const productId = useParamsId.id;
    const auth = useAuth();

    const { fullName, email, role, _id } = auth?.loggedIn as typeLoggedIn;
    console.log(imgNum)
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
    const getNormalText = (text: string) => {
        const arrStrings = text.split('\n')
        return arrStrings.map((str: string, i: number) => <p key={`p_${i}`}>{str}</p>)
    }

    return (
        <div className="card-1">
            <div>
                <h2>{item?.title}</h2>
            </div>
            <div className="card-product">
                <div className="relative">
                    <div
                        className="image-nav next"
                        onClick={() => imgNum ? setImgNum(0) : setImgNum(1)}>
                        <img src={next} />
                    </div>
                    <img src={item?.image[imgNum]} alt={item?.title} className="main-img" />
                    <div
                        className="image-nav prev"
                        onClick={() => imgNum ? setImgNum(0) : setImgNum(1)}>
                        <img src={prev} />
                    </div>
                </div>
                <div>
                    <div className="header">
                        <div>
                            {item?.sales.sales
                                ?
                                <div className='sales-price'>
                                    <p className='price new-price'>${getNewPrice(item.price, item.sales.count)}</p>
                                    <p className='old-price'>${item.price}</p>
                                    <div className="sales-banner">-{item.sales.count}%</div>
                                </div>
                                :
                                <p className='price static-price'>${item?.price}</p>
                            }
                        </div>
                        <div className="rating">
                            <div>{drawRating(item?.rating as number)}</div>
                            <div>{item?.rating}</div>
                        </div>
                    </div>
                    {item?.newColection && <div className="new-collection">New Collection</div>}
                    <div className="bag-container">
                        <Form>
                            <Form.Control type="number"
                                min="1"
                                defaultValue="1"
                            />
                            <button type="submit"
                                className="M-btn btn-green"
                                onClick={addToBasket}>
                                <img src={shop} alt="shop" />
                                <p>Add to cart</p>
                            </button>
                        </Form>
                        <div className="M-btn"
                        >
                            <img src={like} alt="like" />
                            <p>Favourite</p>
                        </div>
                    </div>
                    <div>
                        <hr />
                        <div 
                        className="about"
                        onClick={() => setShowText(!showtext)}><b>About me</b></div>
                        <hr />
                        {showtext && <text>{getNormalText(item?.description as string)}</text>}
                    </div>
                </div>
            </div>
        </div>
    )
}