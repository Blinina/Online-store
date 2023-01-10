import { typeLoggedIn, useAuth } from "../../../context/authContext";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductToBasket, getBasket } from "../../../store/basketSlice";
import { deleteProductToBasketAPI } from "../../../http/basketAPI";
import { Product } from "../../../TSType";
import { useState } from "react";
import OrderModal from "./OrderModal";
import { buildName } from "../../../helpers";

type BagType = {
    product: Product,
    quantity: number,
    _id: string
}

type Sales = {
    sales: boolean,
    count: number
}

export default function Bag() {
    const navigate = useNavigate();
    const auth = useAuth();
    const dispath = useDispatch();
    const items = useSelector(getBasket).flat();
    const [openOrderModal, setopenOrderModal] = useState({user: false, text: ''});

    const getPrice = (price: number, sales: Sales) => {
        const newPrice: number = Math.floor((price * (1 - sales.count / 100)) * 100) / 100;
        return sales.sales ? newPrice : price;
    };

    const getFullPrice = (quantity: number, price: number, sales: Sales) => {
        const correntPrice: number = getPrice(price, sales);
        return quantity * correntPrice;
    };
    const getSubtotal = () => {
        const result = items.reduce((acc: number, item: BagType) => {
            acc += getFullPrice(item.quantity, item.product.price, item.product.sales)
            return acc;
        }, 0);
        return result;
    };

    const handleDelete = async (el: BagType) => {
        dispath(deleteProductToBasket({ id: el.product._id }));
        auth?.loggedIn && deleteProductToBasketAPI( auth?.loggedIn._id, el.product);
    }
    const handleComplit = ()=>{
        if(auth?.loggedIn?._id){
          return setopenOrderModal({user: true, text: 'Sorry,  this is a study project. 😁'})
        }
        setopenOrderModal({user: false, text: 'To place an order please login'})
    }

    return (
        <div className="bag-container">
            <div>
                <div>
                    <h2 className='home-title'>My Bag</h2>
                </div>
                <div>
                    {items.length ? <Table striped hover>
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
                                        <div>{buildName(item.product.title)}</div>
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
                        :
                        <div>
                            <h4>Your bag is empty</h4>
                        </div>
                    }
                </div>
            </div>
            <div className="result-card">
                <div><b>Subtotal:</b> ${getSubtotal()}</div>
                <div><p>Number of products: {items.length}</p></div>
                <div className="M-btn btn-green" onClick={handleComplit}>Complete order</div>
            </div>
            {!!openOrderModal.text && <OrderModal openOrderModal={openOrderModal} setopenOrderModal={setopenOrderModal}/> }
        </div>
    )
}
