import { typeAuthContent, typeLoggedIn, useAuth } from "../../context/authContext"
import React, { useState } from 'react';
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Bag from "./pages/Bag";
import AddProduct from "./pages/AddProduct";
import like from "../../assets/images/Like.png";
import profile from "../../assets/images/blackUser.png";
import singOut from "../../assets/images/sing out.png";
import bag from "../../assets/images/bagMenu.png";
import newProduct from "../../assets/images/shop.png";



export default function HomePage() {
    const auth = useAuth() as typeAuthContent;
    const [page, setPage] = useState({ type: 'profile' })
    const { fullName, email, role } = auth.loggedIn as typeLoggedIn;
    console.log(auth)

    const getClass = (variant: string) => {
        return variant === page.type ? 'menu-elem btn-green' : 'menu-elem'
    };

    return (
        <div className="pages-container">
            <div>
                <div className="menu">
                    <ul>
                        <li>
                            <div className="menu-elem-profile">
                                <p className="name-profile">{auth.loggedIn && fullName}</p>
                                <p className="email">{auth.loggedIn && email}</p>
                            </div>
                        </li>
                        <li>
                            <div className={getClass('profile')}
                                onClick={() => setPage({ type: 'profile' })}>
                                {page.type !== 'profile' && <img src={profile} alt="profile" />}
                                <p>My profile</p>
                                </div>
                        </li>
                        {
                            role === 'Seller'
                            &&
                            <li>
                                <div className={getClass('AddProduct')}
                                    onClick={() => setPage({ type: 'AddProduct' })}>
                                    {page.type !== 'AddProduct' && <img src={newProduct} alt="newProduct" />}
                                    <p>Add product</p>
                                </div>
                            </li>
                        }
                        <li>
                            <div className={getClass('bag')}
                                onClick={() => setPage({ type: 'bag' })}>
                                {page.type !== 'bag' && <img src={bag} alt="bag" />}
                                <p>My Bag</p>
                            </div>
                        </li>
                        <li>
                            <div className={getClass('wishlist')}
                                onClick={() => setPage({ type: 'wishlist' })}>
                                {page.type !== 'wishlist' && <img src={like} alt="like" />}
                                Wishlist</div>
                        </li>
                        <li>
                            <div className="menu-elem invalid" onClick={() => auth.logOut()}>
                                <img src={singOut} alt="sing Out" />
                                <p>Sign out</p></div>
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