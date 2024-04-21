import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const [credentials, setCredentials] = useState({email: "", password: ""})
  let navigate = useNavigate()
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")

    }
    else{
      localStorage.setItem("authToken",json.authToken);
      localStorage.setItem("userEmail",credentials.email);
      
      navigate("/")
    }

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className="container">

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" placeholder="Password" onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/Signup" className='m-3 btn btn-danger'>I am a new user</Link>
        </form>
      </div>
    </>
  )
}
