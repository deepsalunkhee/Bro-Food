import React, { useState } from "react";
import { Link } from "react-router-dom";




export default function Signup() {

    const [credentials,setcredentials]=useState({
        name:"",
        email:"",
        password:"",
        geolocation:""
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("https://bro-food-server.vercel.app/api/createuser",{
            method:'POST',
            headers :{
                'content-Type':'application/json',
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.geolocation
            })
        });
          const json =await response.json()
          console.log(json);
         
        }

    const onchange = (event) =>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

    
  return (
    <>

    <div  className="container"> 
      <form  onSubmit={handleSubmit}>
      <div className="mb-3">
          <label F="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={onchange}
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label F="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label F="Address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onchange}
          />
         
        </div>
        
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to='/login' className=" m-3 btn btn-danger">
            Login
        </Link>
      </form>

      </div>
    </>
  );
}
