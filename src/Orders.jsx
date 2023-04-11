import React, { useEffect, useState, useRef } from 'react';
import { getStorage,ref,getDownloadURL, uploadBytesResumable  } from "firebase/storage";
import { getFirestore,collection,addDoc } from "firebase/firestore";
import {  query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import app from './Firebase';
function Orders() {
    const db = getFirestore(app);
    // console.log(props.products);
    const ref = useRef(null);
    const navigate=useNavigate();
    const [pubadmin, changepubadmin] = useState(JSON.parse(localStorage.getItem('pubadmin')));
    const [ordersarray, changeordersarray] = useState([]);
    async function getorders() {
        axios.get('http://localhost:1234/api/order/getallorders',{
            headers: {
                'Authorization': `Bearer ${pubadmin.accessToken}`
            }
        }).then((res) => {
            // console.log(res.data);
            changeordersarray(res.data);
            console.log(res.data)
        })
    }
    useEffect(()=>{
        // console.log(localStorage.getItem('user'));
        if(localStorage.getItem('user')){
        if(JSON.parse(localStorage.getItem('user'))["isAdmin"]==true){
            getorders();
    }
    else
    {
        navigate('/login');
    }
    }
    else
    {
        navigate('/login');
    }
    },[])
    // console.log(elements);
    return (
        <div>
            <ul>
                
                {ordersarray.map((value, index) => {
                    // console.log(index);\
                    return <div className=" bg-white h-max px-5 my-8 rounded-md py-5 mx-auto flex w-3/4 related">
                        <div className=" flex justify-center align-center flex-col w-3/4">
                            <li className="text-black">
                            <div className="flex">
                                    <h1 className="mx-3">Ordered ID:</h1>
                                    <h1>{value.id}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Ordered By:</h1>
                                    <h1>{value.ordered_by}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Delivery Date:</h1>
                                    <h1>{value.delivery_date}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Delivery Status:</h1>
                                    <h1>{value.delivery_status}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Ordered On:</h1>
                                    <h1>{value.createdAt.toString().substring(0,10)}</h1>
                                </div>
                                
                            </li>
                        </div>
                        
                    </div>
                })}
            </ul>
        </div>
    );
}

export default Orders;