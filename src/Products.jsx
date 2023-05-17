import React, { useEffect, useState, useRef } from 'react';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import app from './Firebase';
import axios from 'axios';

function Products() {

    const db = getFirestore(app);
    // console.log(props.products);
    const [pubadmin, changepubadmin] = useState(JSON.parse(localStorage.getItem('pubadmin')));
    const ref = useRef(null);
    const navigate = useNavigate();
    const [productsarray, changeproductsarray] = useState([]);
    async function getproducts() {
        const products = [];
        axios.get('https://singhpublications.onrender.com/api/product/getproducts').then((res) => {
            // console.log(res.data);
            changeproductsarray(res.data);
            console.log(res.data)
        })

    }
    useEffect(() => {
        // console.log(localStorage.getItem('user'));
        if (localStorage.getItem('pubadmin')) {
            if (JSON.parse(localStorage.getItem('pubadmin'))["role"] == "admin") {
                getproducts();
            }
            else {
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
    }, [])
    // console.log(elements);
    return (
        <div>
            <h1 className="text-black text-xl font-bold my-10 mx-auto w-1/2 text-center">products</h1>
            <ul>

                {productsarray.map((value, index) => {
                    // console.log(index);\
                    return <div className=" bg-white h-max px-5 my-8 rounded-md py-5 mx-auto flex w-3/4 related" key={index}>

                        <div className=" flex justify-center align-center flex-col w-full">
                            <li className="text-black">

                                <div className="flex">
                                    <h1 className="mx-3">Title:</h1>
                                    <h1>{value.title}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Subtitle:</h1>
                                    <h1>{value.subtitle}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Author:</h1>
                                    <h1>{value.author}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Publisher:</h1>
                                    <h1>{value.publisher}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Language:</h1>
                                    <h1>{value.Language}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Paperback:</h1>
                                    <h1>{value.paperback}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Description:</h1>
                                    <h1>{value.description.toString().substring(0, 200) + '......'}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">ISBN:</h1>
                                    <h1>{value.isbn}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">ISBN13:</h1>
                                    <h1>{value.isbn13}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Dimensions:</h1>
                                    <h1>{value.dimensions}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">File:</h1>
                                    <h1>{value.file}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Age:</h1>
                                    <h1>{value.age}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Category:</h1>
                                    <h1>{value.category}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Rating:</h1>
                                    <h1>{value.rating}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Image URL:</h1>
                                    <h1>{value.image_url}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Rating:</h1>
                                    <h1>{value.rating}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Price:</h1>
                                    <h1>{value.price}</h1>
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Created By:</h1>
                                    <h1>{value.created_by}</h1>
                                </div>
                                <div className="flex w-full justify-center">
                                    <button className="bg-white text-black w-24 rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{ 'border': '1px solid black' }} onClick={async (e) => {
                                        console.log(pubadmin.accessToken)
                                        e.preventDefault();
                                        // console.log(value.id)
                                        axios.delete("https://singhpublications.onrender.com/api/product/deleteproduct", {
                                            headers: {
                                                'Authorization': `Bearer ${pubadmin.accessToken}`
                                            },
                                            params:{
                                                'id':value.id
                                            }
                                        },).then((res) => {
                                            console.log(res.data);
                                            getproducts();
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                        
                                        // e.preventDefault();
                                    }}>Delete</button>
                                    <button className="bg-white text-black w-24 rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{ 'border': '1px solid black' }} onClick={async (e) => {
                                        e.preventDefault();
                                        navigate('/editproduct', { state: { 'id': value.id, 'data': value } })
                                        // e.preventDefault();
                                    }}>Edit</button>
                                </div>

                            </li>
                        </div>

                    </div>
                })}
            </ul>
        </div>
    );
}
export default Products;