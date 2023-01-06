import like from "../assets/images/Like.png";
import { Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import blackLike from "../assets/images/blackLike.png";
import { ChangeEvent, useEffect, useState } from "react";
import { getNewPrice } from "../helpers";
import { useDispatch, useSelector } from 'react-redux';

import { getLike } from "../store/likeSlice";
export interface CardProps {
    [key: string]: any;
};
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
export default function Cards({ items }: CardProps) {
    const navigate = useNavigate();
    const auth = useAuth();
    const dispatch = useDispatch();
    const [products, setProducts] = useState(items);

    const [sorting, setSorting] = useState('none');
    useEffect(()=>{
        setProducts(items)
    }, [items])

    const likeItems = useSelector(getLike).flat();
    const likeArr = likeItems?.map((item: Product) => item._id);
     
    const buildName = (str: string) => {
        const arr = str.split(' ').slice(0, 3).join(' ');
        return str.length > 20 ? `${arr}...` : str;
    };

    const addLike = async (el: Product) => {
        const data = {
            userId: auth?.loggedIn?._id,
            product: el,
        }
        // dispatch(addLikeStore(el))
        // try {
        //     let res = await fetch(`/wishlist/addProduct`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json;charset=utf-8'
        //         },
        //         body: JSON.stringify(data)
        //     });
        //     let result = await res.json();
        //     console.log(result)
        // } catch (e) {
        //     console.log(e)
        // }
    }
    const pp = {
        Rating: (elem: Product[]) => elem.sort((a:Product,b: Product)=>b.rating-a.rating),
        Price: (elem: Product[]) => elem.sort((a:Product,b: Product)=>b.price-a.price),
    }
   const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
    const {value } = e.target;
    setSorting(value)
    let pp;
      value === 'Rating' ? pp = items.sort((a:Product,b: Product)=>b.rating-a.rating) : pp = items.sort((a:Product,b: Product)=>b.price-a.price);
      setProducts(pp)
   }

console.log(products)


    return (
        <>
            <div className='sortind'>
                <Form>
                    <Form.Group
                        controlId="sortind">
                        <Form.Label>Sort by</Form.Label>
                        <Form.Select size="sm"
                        value={sorting}
                        onChange={(e)=>handleChange(e)}>
                            <option value="none">none</option>
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
                                        onClick={() => addLike(el)}
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