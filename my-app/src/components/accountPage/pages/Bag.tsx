import { typeLoggedIn, useAuth } from "../../../context/authContext";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from "../../Cards";
import { getNewPrice } from "../../../helpers";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductToBasket, getBasket } from "../../../store/basketSlice";


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
type BagType = {
    product: Product,
    quantity: number,
    _id?: number
}

export default function Bag() {
    const navigate = useNavigate();
    const auth = useAuth();
    const dispath = useDispatch();
    const { _id } = auth?.loggedIn as typeLoggedIn;
    const items = useSelector(getBasket).flat();

    const getPrice = (price: number, sales: { sales: boolean, count: number }) =>
        sales.sales ? ((price * (1 - sales.count / 100)).toFixed(2)) : price;

    const getFullPrice = (quantity: number, price: number, sales: { sales: boolean, count: number }) =>
        quantity * getPrice(price, sales);

    const getSubtotal = () => {
        const result = items.reduce((acc: number, item: BagType) => {
            acc += getFullPrice(item.quantity, item.product.price, item.product.sales)
            return acc;
        }, 0);
        return result;
    };

    const handleDelete = async (el: BagType) => {
        console.log(el)
        // deleteProductToBasket({id: el.product._id })
        dispath(deleteProductToBasket())

        // try {
        //     const res = await axios.post('/basket/deleteProduct', {            
        //             userId: _id, 
        //             product: el._id             
        //     });
        //     console.log(res.data)
        // } catch (e) {
        //     console.log(e)
        // };
    }

    return (

        <div className="bag-container">
            <div>
                <div>
                    <h2 className='home-title'>My Bag</h2>
                </div>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: BagType) =>
                            <tr>
                                <th className="bag-name" onClick={() => navigate(`/product/${item.product._id}`)}>
                                    <img className="bag-img"
                                        src={item.product.image[0]}
                                        alt={item.product.title} />
                                    <div>{item.product.title}</div>
                                </th>
                                <th><p>${getPrice(item.product.price, item.product.sales)}</p></th>
                                <th><p>{item.quantity}</p></th>
                                <th><p>${getFullPrice(item.quantity, item.product.price, item.product.sales)}</p></th>
                                <th><div
                                    className="M-btn"
                                    onClick={() => handleDelete(item)}
                                >Delete</div></th>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </div>
            <div className="result-card">
                <div><b>Subtotal:</b> ${getSubtotal()}</div>
                <div><p>Number of products: {items.length}</p></div>
                <div className="M-btn btn-green">Complete order</div>
            </div>
        </div>
    )
}
