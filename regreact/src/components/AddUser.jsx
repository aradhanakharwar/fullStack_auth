
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')


    const [file, setFile] = useState('')

    // const validation = () => {
    //     let error = {}
    //     if (!user.name) {
    //         error.name = '**Please enter your name'
    //     }
    //     if (!user.email) {
    //         error.email = '**Please enter your email'
    //     }
    //     if (!user.password) {
    //         error.password = '**Please enter your password'
    //     }
    //     if (!user.phone) {
    //         error.phone = '**Please enter your phone number'
    //     }
    //     if (!user.img) {
    //         error.img = '**Please upload image.'
    //     }
    //     return error;
    // }

    const navigate = useNavigate()

    // const formHandle = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value
    //     setUser({ ...user, [name]: value })

    //     if (name === 'name') {
    //         if (value.length === 0) {
    //             setError({ ...error, name: '**Name is required' })
    //             setUser({ ...user, name: '' })
    //         } else {
    //             setError({ ...error, name: '' })
    //             setUser({ ...user, name: value })
    //         }
    //     }
    //     if (name === 'email') {
    //         if (value.length === 0) {
    //             setError({ ...error, email: '**Email is required' })
    //             setUser({ ...user, email: '' })
    //         } else {
    //             setError({ ...error, email: '' })
    //             setUser({ ...user, email: value })
    //         }
    //     }
    //     if (name === 'password') {
    //         if (value.length === 0) {
    //             setError({ ...error, password: '**password is required' })
    //             setUser({ ...user, password: '' })
    //         } else {
    //             setError({ ...error, password: '' })
    //             setUser({ ...user, password: value })
    //         }
    //     }
    //     if (name === 'phone') {
    //         if (value.length === 0) {
    //             setError({ ...error, phone: '**Phone number is required' })
    //             setUser({ ...user, phone: '' })
    //         } else {
    //             setError({ ...error, phone: '' })
    //             setUser({ ...user, phone: value })
    //         }
    //     }
    //     if (name === 'img') {
    //         if (value.length === 0) {
    //             setError({ ...error, img: '**image is required' })
    //             setUser({ ...user, img: '' })
    //         } else {
    //             setError({ ...error, img: '' })
    //             setUser({ ...user, img: value })
    //         }
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // let errorList = validation()
        // console.log(user)
        // console.log('image------', user.file);

        // setError(validation())
        // const formData = new FormData();
        // formData.append('name', user.name);
        // formData.append('email', user.email);
        // formData.append('password', user.password);
        // formData.append('phone', user.phone);
        // formData.append('img', file);

        // if (Object.keys(errorList).length === 0) {
        await axios.post('http://localhost:3030/register', { name: name, email: email, password: password, phone: phone, img: file },)
        navigate('/allusers', alert('submitted'))
        // }
    };

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //   }

    const handleFile = (e) => {
        // console.log(files);
        // setFilesize(files[0].size);
        let file = e.target.files[0];
        console.log(file);
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        const reader1 = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            console.log(img.src);
            setFile(img.src)
            // img.onload = () => {
            // const maxWidth = 1338; // maximum width in pixels
            // const maxHeight = 350; // maximum height in pixels
            // if (img.width > maxWidth || img.height > maxHeight) {
            //     alert(`Image dimensions must be less than ${maxWidth} x ${maxHeight}px`);
            // } else {
            //     // setEmailHeaderColor1(false);
            //     // setFilenameEmail1(files[0].name);
            //     setFile(img.src.replace('data:image/png;base64,', ''));
            //     return
            // }
            // };
        };
        reader1.readAsDataURL(file);
    }


    // const onImageChange = (event) => {
    //     if (event.target.files && event.target.files[0]) {
    //         setImage(URL.createObjectURL(event.target.files[0]));
    //     }
    // }

    return (
        <div>
            <h3>Add user</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group" id='registration-form'>
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" name='name' aria-describedby="emailHelp" onChange={(e) => { setName(e.target.value) }} />
                    {/* <span style={{ color: 'red' }}>{error.name}</span> */}
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} />
                    {/* <span style={{ color: 'red' }}>{error.email}</span> */}
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputEmail1" onChange={(e) => { setPassword(e.target.value) }} />
                    {/* <span style={{ color: 'red' }}>{error.password}</span> */}
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Phone</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" name='phone' aria-describedby="emailHelp" onChange={(e) => { setPhone(e.target.value) }} />
                    {/* <span style={{ color: 'red' }}>{error.phone}</span> */}
                </div>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Image</label>
                    <input type="file" class="form-control-file" name='img' alt='' id="exampleFormControlFile1" onChange={handleFile} />
                    {/* <span style={{ color: 'red' }}>{error.img}</span> */}
                </div>
                <button type="submit" className="btn btn-success">Add user</button>
            </form>
        </div>
    )
};