import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function AllUser(props) {
    const [user, setUser] = useState([])
    // const { id } = useParams();
    const navigate = useNavigate();


    const getUser = () => {

        axios.get('http://localhost:3030/allusers')
            .then((res) => {
                console.log(res.data.result)
                setUser(res.data.result);
            }).catch((err) => {
                console.log(err);
            })
    }

    const deleteUser = (id) => {
        console.log(id)
        axios.get(`http://localhost:3030/deleteuser/${id}`)
            .then((res) => {
                console.log(res.data)
                // setUser(res.data.result);
                // setTimeout(() => {  
                getUser();
                // }, 1000);
                // window.location.reload()
                navigate('/allusers', alert('Are you sure? You want to delete your id. '))
            }).catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        getUser();
    }, [])
    console.log(user);

    return (
        <div>
            <table className="table dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">E-mail</th>
                        {/* <th scope="col">Password</th> */}
                        <th scope="col">Phone Number</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user?.map((value) => {
                        const files = btoa(
                            // String.fromCharCode(...new Uint8Array(value.img.data.data))
                            String.fromCharCode(...new Uint8Array(value.img))
                        );
                        return (
                            <tr key={value._id}>
                                <th scope="row">{value._id}</th>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                {/* <td>{value.password}</td> */}
                                <td>{value.phone}</td>

                                <td><img src={`data:image/png;base64,${files}`} width="150px"/></td>
                                <td>
                                    <a href={`/update/${value._id}`} className='btn btn-success'>Edit</a>
                                    <a onClick={() => deleteUser(value._id)} className='btn btn-danger'>Delete</a>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}







// <div>
// <table className="table dark">
//     <thead>
//         <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Name</th>
//             <th scope="col">E-mail</th>
//             <th scope="col">Password</th>
//             <th scope="col">Phone Number</th>
//             <th>Action</th>
//         </tr>
//     </thead>
//     <tbody>
//         {Array.isArray(user) && user.map((value) =>
//         (
//             <tr key={value.id}>
//                 <th scope="row">{value.id}</th>
//                 <td>{value.name}</td>
//                 <td>{value.email}</td>
//                 <td>{value.password}</td>
//                 <td>{value.phone}</td>
//                 <td>
//                     <a href={`/update/${value.id}`} className='btn btn-success'>Edit</a>
//                     {/* <a onClick={() => deleteUser(value.id)} className='btn btn-danger'>Delete</a> */}
//                 </td>
//             </tr>
//         ))
//         }
//     </tbody>
// </table>
// </div>