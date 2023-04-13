import React, { useEffect, useRef } from "react";
import { getStorage,ref,getDownloadURL, uploadBytesResumable  } from "firebase/storage";
import { getFirestore,collection,addDoc,updateDoc,doc } from "firebase/firestore";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import app from './Firebase';
function Editproduct() {
    const location = useLocation();
    const navigate = useNavigate();
    const storage = getStorage(app);
    const db = getFirestore(app);
    const [author, changeauthor] = useState('');
    const [publisher, changepublisher] = useState('');
    const [price, changeprice] = useState('');
    const [category, changecategory] = useState('');
    const [paperback, changepaperback] = useState('null');
    const [pubadmin, changepubadmin] = useState(JSON.parse(localStorage.getItem('pubadmin')));
    const [isbn, changeisbn] = useState('');
    const [isbn13, changeisbn13] = useState('');
    const [dimensions, changedimensions] = useState('');
    const [weight, changeweight] = useState('');
    const [age, changeage] = useState('');
    const [imagearray, changeimagearray] = useState([]);
    const [file, changefile] = useState('');
    const [image, setImage] = useState('');
    const [title, changetitle] = useState('');
    const [subtitle, changesubtitle] = useState('');
    const [language, changelanguage] = useState('');
    const [desc, changedesc] = useState('');   
    const upload = async () => {
        // e.preventDefault();
        // console.log(image);
        if (image == null)
            return;
        // changeupstatus(true);
        // changesubstatus(true);

        // ref.current.continuousStart(0);
        const storageRef = ref(storage, `files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
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
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                // console.log(submit_status, upload_status);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log(downloadURL);
                    changeimagearray([...imagearray, downloadURL]);
                });
                // ref.current.complete();
                // changeupstatus(false);
                // changesubstatus(false);
            });

        // console.log(submit_status,upload_status);
        // changeupstatus(false);

    }
    const uploadfile = async () => {
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
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                // console.log(submit_status, upload_status);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log(downloadURL);
                    changefile(downloadURL);
                });
                // ref.current.complete();
                // changeupstatus(false);
                // changesubstatus(false);
            });

        // console.log(submit_status,upload_status);
        // changeupstatus(false);

    }
    useEffect(()=>{
        if (localStorage.getItem('pubadmin')) {
            if (JSON.parse(localStorage.getItem('pubadmin'))["isAdmin"] == true) {
                // getproducts();
            }
            else {
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
        changetitle(location.state.data.title)
        changesubtitle(location.state.data.subtitle)
        changelanguage(location.state.data.language)
        changedesc(location.state.data.description)
        changeauthor(location.state.data.author)
        changepublisher(location.state.data.publisher)
        changeprice(location.state.data.price)
        changecategory(location.state.data.category)
        changepaperback(location.state.data.paperback)
        changeisbn(location.state.data.isbn)
        changeisbn13(location.state.data.isbn13)
        changedimensions(location.state.data.dimensions)
        changeweight(location.state.data.weight)
        changeage(location.state.data.age)
        // changeimagearray(location.state.data.imagearray)
        changefile(location.state.data.file)

    },[])
    return (
        <>
            {/* <LoadingBar style={{ 'backgroundColor': 'red', 'zIndex': 10 }} ref={ref} /> */}
            <div className="w-3/4 mx-auto my-5">
                <h1 className="text-black text-xl font-bold my-10 mx-auto w-1/2 text-center">Edit product</h1>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changetitle(e.target.value);
                    }} value={title} name="title" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product Title</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changesubtitle(e.target.value);
                    }} value={subtitle} name="subtitle" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="subtitle" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product subtitle</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changeauthor(e.target.value);
                    }} value={author} name="author" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product author</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changepublisher(e.target.value);
                    }} value={publisher} name="publisher" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="publisher" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product publisher</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="number" onChange={(e) => {
                        changeprice(e.target.value);
                    }} value={price} name="price" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Price</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changecategory(e.target.value);
                    }} value={category} name="category" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product category</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changeisbn(e.target.value);
                    }} value={isbn} name="isbn" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="isbn" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product ISBN</label>
                </div>
                
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changeisbn13(e.target.value);
                    }} value={isbn13} name="isbn13" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="isbn13" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product ISBN13</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changedimensions(e.target.value);
                    }} value={dimensions} name="dimensions" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="dimensions" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product dimensions</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changeweight(e.target.value);
                    }} value={weight} name="weight" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="weight" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product weight</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changeage(e.target.value);
                    }} value={age} name="age" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">product age-limit</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changedesc(e.target.value);
                    }} value={desc} name="category" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={(e) => {
                        changelanguage(e.target.value);
                    }} value={language} name="language" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600  focus:outline-none focus:border-gray-300 focus:ring-0 peer" placeholder=" " required="" />
                    <label for="language" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Language</label>
                </div>

                <div className="flex flex-col w-full justify-center items-center">
                    <div className="mb-10">
                        <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                        <button className="bg-white text-black w-max rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{ 'border': '1px solid black' }} onClick={async (e) => {
                            e.preventDefault();
                            upload();

                            // e.preventDefault();
                        }}>Upload Image</button>
                    </div>
                    <div className="mb-10">
                        <input type="file" onChange={(e) => { changefile(e.target.files[0]) }} />
                        <button className="bg-white text-black w-max rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{ 'border': '1px solid black' }} onClick={async (e) => {
                            e.preventDefault();
                            uploadfile();

                            // e.preventDefault();
                        }}>Upload File</button>
                    </div>
                    <button type="button" className="bg-white text-black w-24 rounded-lg border-0 px-3 py-2 my-2 mx-8" style={{ 'border': '1px solid black' }} onClick={async (e) => {
                        console.log(pubadmin.accessToken)
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();

                        today = mm + '-' + dd + '-' + yyyy;
                        // console.log(imagearray[0])
                        // document.write(today);
                        axios.post('http://localhost:5000/api/product/updateproduct', {
                            "title": title,
                            "author": author,
                            "publisher": publisher,
                            "language": language,
                            "paperback": 2,
                            "isbn": isbn,
                            "isbn13": isbn13,
                            "dimensions": dimensions,
                            "file": file,
                            "weight": weight,
                            "age": age,
                            "subtitle": subtitle,
                            "category": category,
                            "description": desc,
                            "rating": 0,
                            "image_url": imagearray[0],
                            "total_rating": 0,
                            "reviews": [],
                            "price": price,
                            "created_by": "admin",
                            
                            
                        },{
                            headers: {
                                'Authorization': `Bearer ${pubadmin.accessToken}`
                            },
                            params: {
                                id: location.state.id
                            }
                        },).then((res) => {
                            console.log(res.data);
                        }).catch((err) => {
                            console.log(err);
                        });
                        console.log(imagearray);
                        changeimagearray([]);
                    }}>Update</button>
                </div>
            </div>
        </>
    );
}


export default Editproduct;