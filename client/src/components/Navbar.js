import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
      const navigate = useNavigate();
      const handlelogout = ()=>{
          localStorage.removeItem("authToken");
          navigate('/login');
      }

      let data = useCart();

      const [cartView,setCartView] = useState(false);
  return (
    <div>
       <nav class="navbar navbar-expand-lg navbar-dark bg-success">
  <Link className="navbar-brand" to="/"><b><h2>Bro-Food</h2></b></Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ">
            <li className="nav-item active  ">
              <Link className="nav-link" to="/">
                Home{" "}
              </Link>
              {/* <span className="sr-only">(current)</span> */}
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item active  ">
                <Link className="nav-link" to="/myOrder">
                  My order{" "}
                </Link>
                {/* <span className="sr-only">(current)</span> */}
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link
                className="btn bg-white text-success nav-link m-3"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn bg-white text-success nav-link m-3"
                to="/createuser"
              >
                signup
              </Link>
            </div>
          ) : (
            <div className="d-flex">
             
              <div className="btn bg-white text-success nav-link m-3" onClick={()=>{setCartView(true)}}>
                Mycart{"  "}
                <Badge pill bg="danger">{data.length}</Badge>
              </div>
              {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}

              <div className="btn bg-white text-danger nav-link m-3" onClick={handlelogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

