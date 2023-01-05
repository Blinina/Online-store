import { typeLoggedIn, useAuth } from "../../../context/authContext";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from "../../Cards";


export default function Bag (){
    const auth = useAuth();
    const { _id } = auth?.loggedIn as typeLoggedIn;
    useEffect(() => {
        const fn = async () => {
            const res = await axios.get('/basket/getMyBasket', {
                params: {
                    _id
                }
            })
            console.log(res.data)
            // setItems(res.data)
        }
        fn()
    }, []);



    return(
        
        <div>
        <div>
            <h2 className='home-title'></h2>
        </div>
        <div>
           
        </div>
        </div>
    )
}