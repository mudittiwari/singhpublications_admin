import React, { useEffect, useState, useRef } from 'react';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import app from './Firebase';
import { async } from '@firebase/util';
function Orders() {
    const db = getFirestore(app);
    const storage = getStorage(app);
    // console.log(props.products);
    const [file, changefile] = useState('');
    // const ref = useRef(null);
    const navigate = useNavigate();
    const [pubadmin, changepubadmin] = useState(JSON.parse(localStorage.getItem('pubadmin')));
    const [ordersarray, changeordersarray] = useState([]);
    async function getorders() {
        axios.get('https://singh-publications.onrender.com/api/order/getallorders', {
            headers: {
                'Authorization': `Bearer ${pubadmin.accessToken}`
            }
        }).then((res) => {
            // console.log(res.data);
            changeordersarray(res.data);
            console.log(res.data)
        })
    }
    useEffect(() => {
        // console.log(localStorage.getItem('user'));
        if (localStorage.getItem('pubadmin')) {
            if (JSON.parse(localStorage.getItem('pubadmin'))["role"] == "admin") {
                // getproducts();
                getorders();
            }
            else {
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
    }, [])
    const uploadfile = async (id,ordered_by) => {
        // e.preventDefault();
        // console.log(image);
        if (file == null)
            return;
        // changeupstatus(true);
        // changesubstatus(true);

        // ref.current.continuousStart(0);
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot);
            }, (err) => {
                //catches the errors
                console.log(err);
                // ref.current.complete();
                // changeupstatus(false);
                // changesubstatus(false);
            }, async() => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                // console.log(submit_status, upload_status);
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    // console.log(downloadURL);
                    changefile(downloadURL);
                    await axios.put('https://singh-publications.onrender.com/api/order/updateinvoice', {
                        "order_id": id,
                        "invoice_file": downloadURL,
                        "useremail":ordered_by
                    },{
                        headers: {
                            'Authorization': `Bearer ${pubadmin.accessToken}`
                        }
                    }).then((res) => {
                        console.log(res);
                        getorders();
                    }).catch((err) => {
                        console.log(err);

                    })
                })
                // ref.current.complete();
                // changeupstatus(false);
                // changesubstatus(false);
            });

        // console.log(submit_status,upload_status);
        // changeupstatus(false);

    }
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
                                    <h1 className="mx-3">Ordere ID:</h1>
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
                                <div className="flex mt-2">
                                    <h1 className="mx-3">Delivery Status:</h1>
                                    <h1>{value.delivery_status}</h1>
                                    {
                                        value.delivery_status=="pending"?<button className="bg-white text-black w-max rounded-lg border-0 px-2 py-1 mb-2 mx-2" style={{ 'border': '1px solid black' }} onClick={async(e)=>{
                                            e.preventDefault();
                                            var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();

                        today = mm + '-' + dd + '-' + yyyy;
                        console.log(today);
                                            await axios.put('https://singh-publications.onrender.com/api/order/updatedelivery', {
                                                "order_id": value.id,
                                                "delivery_status":"Delivered",
                                                "useremail":value.ordered_by,
                                                "delivery_date":today
                                            },{
                                                headers: {
                                                    'Authorization': `Bearer ${pubadmin.accessToken}`
                                                }
                                            }).then((res) => {
                                                console.log(res);
                                                getorders();
                                            }).catch((err) => {
                                                console.log(err);
                        
                                            })
                                        }}>
                                            Delivered?
                                        </button>:<h1></h1>}
                                    
                                </div>
                                <div className="flex">
                                    <h1 className="mx-3">Ordered On:</h1>
                                    <h1>{value.createdAt.toString().substring(0, 10)}</h1>
                                </div>
                                {value.invoice_file == "" ? <div className="mb-10">
                                    <input type="file" onChange={(e) => { changefile(e.target.files[0]) }} />
                                    <button className="bg-white text-black w-max rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{ 'border': '1px solid black' }} onClick={async (e) => {
                                        e.preventDefault();
                                        uploadfile(value.id,value.ordered_by);
                                        // e.preventDefault();
                                    }}>Upload Invoice</button>
                                </div> : <div className="flex">
                                    <h1 className="mx-3">Invoice File:</h1>
                                    <h1>{value.invoice_file}</h1>
                                </div>
                                }

                            </li>
                        </div>

                    </div>
                })}
            </ul>
        </div>
    );
}

export default Orders;