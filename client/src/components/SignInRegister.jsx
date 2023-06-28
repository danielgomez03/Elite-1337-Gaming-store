import React, { useState } from 'react'
import axios from 'axios'
// import { userValidation } from './validations.js'

function SignInRegister({ selectedButton, onClose }) {
    const [error,setError]=useState({})
    const [input,setInput]=useState({
      firstName:'',
      lastName:'',
      country:'',
      region:'',
      city:'',
      address:'',
      postalCode:'',
      birthDate:'',
      phoneNumber:'',
      idNumber:'',
      email:'',
      password:'',
      image:{},
    })

    const imagesHandler = (event)=>{
        event.preventDefault();
        const imageUrl={url:event.target.value}
        setInput({
            ...input,
            image: {...input.image, imageUrl},
          })
    
      }
    const changeHandler=(e)=>{
        e.preventDefault();
        
        // setError(
        //   userValidation({
        //     ...input, [e.target.name]: e.target.value
        //   })
        // )
        
         setInput({
          ...input, [e.target.name]: e.target.value
         })
         
    } 
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(input)
        // if(Object.keys(error).length)
        //   return alert('missing info')
          
       
        
        axios.post("http://localhost:3001/users/register",input)
        .then(res=>alert(res.data))
        .catch(alert("error"))
     }     
  return (
    <div>
        <button onClick={onClose}>X</button>
        {
            selectedButton === "register" ? (
                <form onSubmit={submitHandler}>
                <div>
                    <input onChange={changeHandler}name="firstName" value={input.firstName}type="name" placeholder='Name' />
                    <input onChange={changeHandler}name="lastName"value={input.lastName}type="lastName" placeholder='lastName' />
                    <input onChange={changeHandler}name="country"value={input.country}type="text" placeholder='country' />
                    <input onChange={changeHandler}name="region"value={input.region}type="text" placeholder='region' />
                    <input onChange={changeHandler}name="city"value={input.city}type="text" placeholder='city' />
                    <input onChange={changeHandler}name="address"value={input.address}type="text" placeholder='address' />
                    <input onChange={changeHandler}name="postalCode"value={input.postalCode}type="text" placeholder='postalCode' />
                    <input onChange={changeHandler}name="birthDate"value={input.birthDate}type="date" placeholder='birthDate' />
                    <input onChange={changeHandler}name="phoneNumber"value={input.phoneNumber}type="text" placeholder='phoneNumber' />
                    <input onChange={changeHandler}name="idNumber"value={input.idNumber}type="text" placeholder='idNumber' />
                    <input onChange={changeHandler}name="email"value={input.email}type="text" placeholder='email' />
                    <input onChange={changeHandler}name="password"value={input.password}type="text" placeholder='password' />
                    <label>Image:</label>
                    <input onChange={imagesHandler}name="image"value={input.image}type="text" placeholder='enter url' />
                    <p>Review the <button>Terms && Conditions</button> of our services.</p>
                    <input type="checkbox" name="" id="" />
                    <p>I accept the Terms && Conditions.</p>
                    <button>reset password</button>
                    <button  type='submit'>SUBMIT</button>
                </div>
                </form>
            ) : (
                <div>
                    <input type="email" placeholder='E-mail' />
                    <input type="password" placeholder='Password' />
                </div>
            )
        }
        <div>
            <button>{ selectedButton === "register" ? "Sign In": "Register" }</button>
            <p>Don´t have an account yet?</p>
            <button>{ selectedButton === "register" ? "Register" : "Sign In" }</button>
            <button>Sign In with Google</button>
            <button>Sign In with Facebook</button>
        </div>
    </div>
  )
}

export default SignInRegister