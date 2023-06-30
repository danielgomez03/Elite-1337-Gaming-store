import React, { useState } from 'react'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
// import { userValidation } from './validations.js'

function SignInRegister({ selectedButton, onClose }) {
    const { data: session, status } = useSession()
    console.log(session, status);
    
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
      image:'',
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
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 z-50">
                <button className="absolute top-2 right-4"onClick={onClose}>X</button>
                {
                    selectedButton === "register" ? (
                        <form className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 z-50" onSubmit={submitHandler}>
                        <div className="w-10 relative h-auto min-w-[600px] bg-white rounded-lg flex flex-col justify-center items-center p-10">
                            <input className="mb-4"onChange={changeHandler}name="firstName" value={input.firstName}type="name" placeholder='Name' />
                            <input className="mb-4"onChange={changeHandler}name="lastName"value={input.lastName}type="lastName" placeholder='lastName' />
                            <input className="mb-4"onChange={changeHandler}name="country"value={input.country}type="text" placeholder='country' />
                            <input className="mb-4"onChange={changeHandler}name="region"value={input.region}type="text" placeholder='region' />
                            <input className="mb-4"onChange={changeHandler}name="city"value={input.city}type="text" placeholder='city' />
                            <input className="mb-4"onChange={changeHandler}name="address"value={input.address}type="text" placeholder='address' />
                            <input className="mb-4"onChange={changeHandler}name="postalCode"value={input.postalCode}type="text" placeholder='postalCode' />
                            <input className="mb-4"onChange={changeHandler}name="birthDate"value={input.birthDate}type="date" placeholder='birthDate' />
                            <input className="mb-4"onChange={changeHandler}name="phoneNumber"value={input.phoneNumber}type="text" placeholder='phoneNumber' />
                            <input className="mb-4"onChange={changeHandler}name="idNumber"value={input.idNumber}type="text" placeholder='idNumber' />
                            <input className="mb-4"onChange={changeHandler}name="email"value={input.email}type="text" placeholder='email' />
                            <input className="mb-4" onChange={changeHandler}name="password"value={input.password}type="text" placeholder='password' />
                            <label>Image:</label>
                            <input className="mb-4"onChange={imagesHandler}name="image"value={input.image}type="text" placeholder='enter url' />
                            <button onClick={() => signIn()}>Sign In with Google</button>
                            <p>Review the <button>Terms && Conditions</button> of our services.</p>
                            <input type="checkbox" name="" id="" />
                            <p>I accept the Terms && Conditions.</p>
                            <button>reset password</button>
                            <button  className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600" type='submit'>SUBMIT</button>
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
                    <button onClick={() => signIn()}>Sign In with Google</button>
                    {/* <button>Sign In with Facebook</button> */}
                </div>
            </div>
        )
     
}   
     
  


export default SignInRegister