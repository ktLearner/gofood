import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import { UseCart } from './contextReducer';
import Cart from '../screens/Cart';
export default function Navbar() {
    const [cartView,setCartView] = useState(false)
    const navigate = useNavigate;
    let data = UseCart()
    const handleLogout = ()=>{
        localStorage.removeItem("authToken")
        localStorage.removeItem("userEmail")
        navigate("/login")
    }
    return (
        
        <div><nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                        </li>
                        {(localStorage.getItem("authToken")) ?
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My orders</Link>
                            </li>
                            : ""
                        }
                    </ul>
                    {(!localStorage.getItem("authToken")) ?
                    <>
                        <div className="d-flex">
                            <Link className="btn bg-white text-success  mx-1" to="/login">Login</Link>
                        </div>
                        <div className="d-flex">

                            <Link className="btn bg-white text-success  mx-1" to="/Signup">Signup</Link>
                        </div>
                    </>
                        : 
                        <>
                        <div className="d-flex">
                            <Link className="btn bg-white text-success  mx-2" onClick={()=>{setCartView(true)}} >
                                MY cart{""}
                                <Badge pill bg='danger'> {data.length}</Badge>
                                </Link>
                        </div>
                        {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                        <div className="d-flex">
                            <Link onClick={handleLogout} className="btn bg-white text-danger  mx-1" to="/Signup">Logout</Link>
                        </div>
                        </>
                    }

                </div>
            </div>
        </nav >
        </div >
    )
}
