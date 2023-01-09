import like from "../assets/images/Like.png";
import { Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import { typeLoggedIn, useAuth } from "../context/authContext";
import blackLike from "../assets/images/blackLike.png";
import { ChangeEvent, useEffect, useState } from "react";
import { getNewPrice } from "../helpers";
import { useDispatch, useSelector } from 'react-redux';
import { addLikeStore, deleteLikeStore, getLike } from "../store/likeSlice";
import { addLikeAPI, deleteLikeAPI } from "../http/likeAPI";
import { Product } from "../TSType";

export interface CardProps {
    [key: string]: any;
};

export default function Cards({ items }: CardProps) {
    const navigate = useNavigate();
    const auth = useAuth();
    const { _id } = auth?.loggedIn as typeLoggedIn;

    const dispatch = useDispatch();
    const [products, setProducts] = useState(items);
    const [sorting, setSorting] = useState('none');
    useEffect(() => {
        setProducts(items)
    }, [items])

    const likeItems = useSelector(getLike);
    const likeArr = likeItems?.map(({ id }) => id);


    const buildName = (str: string) => {
        const arr = str.split(' ').slice(0, 3).join(' ');
        return str.length > 20 ? `${arr}...` : str;
    };

    const addLike = async (el: Product) => {
        dispatch(addLikeStore({ id: el._id, product: el }));
        auth?.loggedIn && addLikeAPI(_id, el._id);
    };

    const deleteLike = async (el: Product) => {
        dispatch(deleteLikeStore({id: el._id}));
        auth?.loggedIn && deleteLikeAPI(_id, el._id);
    }
    // const pp = {
    //     Rating: (elem: Product[]) => elem.sort((a: Product, b: Product) => b.rating - a.rating),
    //     Price: (elem: Product[]) => elem.sort((a: Product, b: Product) => b.price - a.price),
    // }
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setSorting(value)
        let pp;
        value === 'Rating' ? pp = items.sort((a: Product, b: Product) => b.rating - a.rating) : pp = items.sort((a: Product, b: Product) => b.price - a.price);
        setProducts(pp)
    }

    return (
        <>
            <div className='sortind'>
                <Form>
                    <Form.Group
                        controlId="sortind">
                        <Form.Label>Sort by</Form.Label>
                        <Form.Select size="sm"
                            value={sorting}
                            onChange={(e) => handleChange(e)}>
                            <option value="" disabled>none</option>
                            <option value="Rating">Rating</option>
                            <option value="Price">Price</option>
                        </Form.Select>
                        <button type='submit' className='hidden'></button>
                    </Form.Group>
                </Form>
            </div>
            <div className='cards'>
                {products?.map((el: Product) =>
                    <div className='card-collection' key={el._id}>
                        <figure>
                            <div className='images'>
                                <img src={el.image[0]}
                                    onClick={() => navigate(`/product/${el._id}`)}
                                    onMouseOver={e => (e.currentTarget.src = el.image[1])}
                                    onMouseOut={e => (e.currentTarget.src = el.image[0])}
                                    alt={el.title} />
                                {el.sales.sales
                                    &&
                                    <div className="sales-banner"
                                    >
                                        {el.sales.count} %
                                    </div>}
                                {el.newColection
                                    &&
                                    <div className="new-collection"
                                        onClick={() => navigate('/collection/newColection')}
                                    >
                                        New collection
                                    </div>}
                                <div className='container-card-like'>
                                    <img src={likeArr.includes(el._id) ? blackLike : like} alt="like"
                                        onClick={() => likeArr.includes(el._id) ? deleteLike(el) : addLike(el)}
                                        className='card-like' />
                                </div>

                            </div>
                            <figcaption onClick={() => navigate(`/product/${el._id}`)}>
                                <p className='card-title'>{buildName(el.title)}</p>
                                <div>
                                    {el.sales.sales
                                        ?
                                        <div className='sales-price'>
                                            <p className='price new-price'>${getNewPrice(el.price, el.sales.count)}</p>
                                            <p className='old-price'>${el.price}</p>
                                        </div>
                                        :
                                        <p className='price static-price'>${el.price}</p>
                                    }
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                )}
            </div>
        </>
    )
}