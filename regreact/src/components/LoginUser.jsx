import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3030/login', { email, password });
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
            alert('Login successfull!')
            navigate('/')
            // handle successful login, e.g. store user data in state or local storage
        } catch (error) {
            console.log(error);
            // handle login error, e.g. display error message to user
        }
    };

    return (
        <div>
            <h4>Login page</h4>
            <form onSubmit={handleLogin} id='login-form'>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
                {/* <div className="alert alert-danger" role="alert">
                    All fields are required.
                </div> */}
            </form>

            <h2></h2>

            <h6>Haven't yet sign up? <Link to="/adduser">Click here</Link></h6>

        </div>
    )
}
// {error.type}>{error.msg}







// const Login = () => {


//     return (
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;



