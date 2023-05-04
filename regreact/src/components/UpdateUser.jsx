import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser(props) {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState('')

  const { id } = useParams();
  // console.log(id);
  const getUser = (_id) => {
    axios.get(`http://localhost:3030/singleuser/${_id}`).then((res) => {
      console.log(res.data)
      const { name, email, phone, file } = res.data.result;
      setName(name);
      setEmail(email);
      // setPassword(password);
      setPhone(phone);
      setFile(file)
    }).catch((err) => {
      console.log(err)
    })
  };
  useEffect(() => {
    getUser(id);
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(name, email, phone)
    await axios.put(`http://localhost:3030/updateuser/${id}`, { name: name, email: email, phone: phone, img: file })
    navigate('/allusers', alert('updated'))
  }


  const handleFile = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    const reader1 = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      setFile(img.src.replace('data:image/png;base64,', ''))
    };
    reader1.readAsDataURL(file);
  }


  return (
    <div>
      <form style={{ margin: 'auto', width: '350px' }} onSubmit={handleUpdate}>
        <div>
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='name'
            value={name} onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            // value={user.email}
            value={email} onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name='password'
            value={password} onChange={(event) => setPassword(event.target.value)}
          />
        </div> */}
        <div>
          <label htmlFor="exampleInputEmail1">Phone Number</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='phone'
            value={phone} onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlFile1">Image</label>
          <input type="file" class="form-control-file" name='img' alt='' id="exampleFormControlFile1" onChange={handleFile} />
        </div>
        <div>
          <button type="submit" className="btn btn-success" style={{ margin: 'auto', width: '350px' }} href={`/${id}`} >
            Edit User
          </button>
        </div>
      </form>

    </div>
  )
}