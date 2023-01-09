import { useAuth, typeLoggedIn } from "../../../context/authContext";
import { useEffect, useState } from 'react';
import Cards from "../../Cards";
import { deleteAllLikeStore, getLike } from "../../../store/likeSlice";
import { useDispatch, useSelector } from 'react-redux';

export default function Wishlist() {
    const getLikes = useSelector(getLike);
    const items = getLikes.map(({ product }) => product);
    return (
        <div>
            <div>
                <h2 className='home-title'>My wishlist</h2>
            </div>
            <div>
                {items.length
                    ?
                    <Cards items={items} />
                    :
                    <div>
                        <h4>Your wishlist is empty</h4>
                    </div>
                }
            </div>
        </div>
    )
}