import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
function AdminLogin() {
    const navigate = useNavigate();
    // const history=use
    // const history = useHistor
    const [email, changeemail] = useState('');
    const [password, changepassword] = useState('');
    useEffect(()=>{
        // console.log(localStorage.getItem('user'));
        if(localStorage.getItem('pubadmin')){
            // console.log('hello');
        if(JSON.parse(localStorage.getItem('pubadmin'))["isAdmin"]==true){
            console.log("user found");
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

   
    return (
        <>
            <div className="w-2/5 mx-auto my-20">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" onChange={(e) => {
                        changeemail(e.target.value);
                    }} value={email} name="email" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="email" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" value={password} onChange={(e) => {
                        changepassword(e.target.value);
                    }} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 focus:border-gray-300 focus:outline-none focus:ring-0  peer" placeholder=" " required="" />
                    <label for="password" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>



                <button type="button" className="text-white block mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async (e) => {
                    e.preventDefault();
                    // console.log("mudittiwari")
                    axios.post("http://localhost:5000/api/user/login", {
                        email: email,
                        // mobileNumber: mobileNumber,
                        password: password,
                    }).then((res) => {
                        // console.log(res);
                        
                        if (res.status===200) {
                            // localStorage.setItem("pubuser", JSON.stringify(res.data));
                            // console.log(localStorage.getItem("pubuser"));
                            // console.log(res.data);
                            localStorage.setItem('pubadmin',JSON.stringify(res.data));
                            navigate('/addproduct');
                        } else {
                            alert("Invalid Credentials");
                        }
                    }).catch((err) => {
                        console.log(err);
                    }
                    )

                }}>Login</button>
            </div>
        </>
    );
}

export default AdminLogin;