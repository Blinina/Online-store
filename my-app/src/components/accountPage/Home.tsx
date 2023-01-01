import { useAuth } from "../../context/authContext"
import React, { useState } from 'react';
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Bag from "./pages/Bag";
import AddProduct from "./pages/AddProduct";

export default function HomePage() {
    const auth = useAuth();
    const [page, setPage] = useState({ type: 'profile' })
    const { fullName, email, role } = auth.loggedIn;
    console.log(page)

    const getClass = (variant: string) => {
        return variant === page.type ? 'M-btn btn-green' : 'M-btn'
    };

    return (
        <div className="pages-container">
            <div>
                <div>
                    <ul>
                        <li>
                            <div>
                                <p>{auth.loggedIn && fullName}</p>
                                <p>{auth.loggedIn && email}</p>
                            </div>
                        </li>
                        <li>
                            <div className={getClass('profile')}
                                onClick={() => setPage({ type: 'profile' })}>My profile</div>
                        </li>
                        {
                            role === 'Seller'
                            &&
                            <li>
                                <div className={getClass('AddProduct')}
                                    onClick={() => setPage({ type: 'AddProduct' })}> Add new product
                                </div>
                            </li>
                        }
                        <li>
                            <div className={getClass('bag')}
                                onClick={() => setPage({ type: 'bag' })}>My Bag</div>
                        </li>
                        <li>
                            <div className={getClass('wishlist')}
                                onClick={() => setPage({ type: 'wishlist' })}>Wishlist</div>
                        </li>
                        <li>
                            <div onClick={() => auth.logOut()}>Sign out</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {page.type === 'profile' && <Profile />}
                {page.type === 'bag' && <Bag />}
                {page.type === 'wishlist' && <Wishlist />}
                {page.type === 'AddProduct' && <AddProduct />}
            </div>
            <div>
                {
                    role !== 'Seller'
                     &&
                    <div className="M-btn btn-green">Оформить заказ</div>
                }
            </div>
        </div>
    )
}