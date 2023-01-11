import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth, typeLoggedIn } from "../../context/authContext";
import { getNewPrice, drawRating, getNormalText } from "../../helpers";
import like from "../../assets/images/Like.png";
import shop from "../../assets/images/whiteBag.png";
import next from "../../assets/images/next.png";
import prev from "../../assets/images/prev.png";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket, getBasket, updateProductToBasket } from "../../store/basketSlice";
import { addLikeStore, deleteLikeStore, getLike } from "../../store/likeSlice";
import blackLike from "../../assets/images/blackLike.png";
import { Product } from "../../TSType";
import { addToBasketAPI } from "../../http/basketAPI";
import { addLikeAPI, deleteLikeAPI } from "../../http/likeAPI";
import Spinner from 'react-bootstrap/Spinner';

type FormValues = {
    quantityValue: number;
};
export default function Card() {
    const [item, setItem] = useState<Product>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showtext, setShowText] = useState(false);
    const [imgNum, setImgNum] = useState(0);
    const useParamsId = useParams();
    const productId = useParamsId.id;
    const auth = useAuth();
    const dispatch = useDispatch();
    const basket = useSelector(getBasket);
    const isProductinBasket = () => basket[0] && basket?.find((el) => el.product._id === productId);
    const ProductinBasket = isProductinBasket();
    const likeItems = useSelector(getLike);
    const likeArr = likeItems?.map(({ id }) => id);

    useEffect(() => {
        setIsLoaded(true)
        const getProduct = async () => {
            const res = await axios.get(`/${productId}`, {
                params: {
                    productId
                }
            })
            setItem(res.data);
            setIsLoaded(false);
        }
        getProduct();
    }, [productId]);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({});
    const addToBasket = handleSubmit(async (data) => {
        ProductinBasket
            ?
            dispatch(updateProductToBasket({ id: productId, quantity: data.quantityValue }))
            :
            dispatch(addProductToBasket({ id: productId, product: item, quantity: data.quantityValue }));

        auth?.loggedIn && addToBasketAPI(auth?.loggedIn._id, item as Product, data.quantityValue);
    });

    const addLike = async (el: Product) => {
        dispatch(addLikeStore({ id: el._id, product: el }));
        auth?.loggedIn && addLikeAPI(auth?.loggedIn._id, el._id);
    };

    const deleteLike = async (el: Product) => {
        dispatch(deleteLikeStore({ id: el._id }));
        auth?.loggedIn && deleteLikeAPI(auth?.loggedIn._id, el._id);
    };

    return (<>

        <div className="card-1">
            {isLoaded ?
                <div className='loading mg-100'>
                    <Spinner animation="border" variant="success" />
                </div>
                :
                <>
                    <div>
                        <h2>{item?.title}</h2>
                    </div>
                    <div className="card-product">
                        <div className="mh-image">
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
                                <Form onSubmit={addToBasket}>
                                    <Form.Control type="number"
                                        className={errors?.quantityValue && 'is-invalid'}
                                        defaultValue='1'
                                        min='1'
                                        {...register("quantityValue", { min: 1 })}
                                    />
                                    <button type="submit"
                                        className="M-btn btn-green"
                                        onClick={addToBasket}>
                                        <img src={shop} alt="shop" />
                                        <p>Add to cart</p>
                                    </button>
                                </Form>
                                <div className='container-card-like like-one-product'>
                                    <img src={likeArr.includes(item?._id) ? blackLike : like} alt="like"
                                        onClick={() => likeArr.includes(item?._id) ? deleteLike(item as Product) : addLike(item as Product)}
                                        className='card-like' />
                                </div>
                            </div>
                            <div>
                                {ProductinBasket && <p className="count-bag">There are {ProductinBasket.quantity} such items in your bag</p>}
                                <hr />
                                <div
                                    className="about"
                                    onClick={() => setShowText(!showtext)}><b>About me</b></div>
                                <hr />
                                {showtext && <text>{getNormalText(item?.description as string)}</text>}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    </>
    )
}