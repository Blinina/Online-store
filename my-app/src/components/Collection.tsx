import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import like from "../assets/images/Like.png";
import { Form } from 'react-bootstrap';
import ProductCard from './ProductCard';
import axios from 'axios';
import { sassFalse } from 'sass';

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

    const buildName = (str: string) => {
        const arr = str.split(' ').slice(0, 3).join(' ');
        return str.length > 20 ? `${arr}...` : str;
    };
    const getNewPrice = (price: number, sales: number) => {
        return (price * (1 - sales / 100)).toFixed(2)
    }

    return (
        <div className="collection-page">
            <div>
                filtres
            </div>
            <div >
                <div className='sortind'>
                    <Form>
                        <Form.Group
                            controlId="sortind">
                            <Form.Label>Sort by</Form.Label>
                            <Form.Select size="sm"
                            >
                                <option>none</option>
                                <option>raiting</option>
                                <option>price</option>
                            </Form.Select>
                            <button type='submit' className='hidden'></button>
                        </Form.Group>
                    </Form>
                </div>
                <div className='cards'>
                    {items?.map((el) =>
                        <div className='card-collection' key={el._id}>
                            <figure>
                                <div className='images'>
                                    <img src={el.image[0]}
                                        onClick={() => navigate(`/product/${el._id}`)}
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
                                        <img src={like} alt="like" className='card-like' />
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
                                        }</div>
                                </figcaption>
                            </figure>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}