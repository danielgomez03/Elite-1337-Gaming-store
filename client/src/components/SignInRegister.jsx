import React, { useState } from 'react'
import axios from 'axios'
import { userValidation } from './validations.js'
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react'

function SignInRegister({ selectedButton, onClose }) {
    const { data: session, status } = useSession()
    console.log(session, status);
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        country: '',
        region: '',
        city: '',
        address: '',
        postalCode: '',
        birthDate: '',
        phoneNumber: '',
        idNumber: '',
        email: '',
        password: '',
        repeatPassword: '',
    })

    const changeHandler = (e) => {
        e.preventDefault();
        setError(
            userValidation({
                ...input, [e.target.name]: e.target.value
            })
        )
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(input)/* 
        if (Object.keys(error).length)
            return alert('missing info') */

        if (selectedButton === "register") {
            axios.post("http://localhost:3001/users/register", input)
                .then(res => alert(res.data))
                .catch(alert("error"))
        } else if (selectedButton === "signIn") {
            axios.post("http://localhost:3001/users/singin", input)
                .then(res => alert(res.data))
                .catch(alert("error"))
        }
    }

    return (
        <form
            action="/products"
            method={selectedButton === "register" ? "POST" : "GET"}
            encType="multipart/form-data"
            onSubmit={submitHandler}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5 z-50"
        >
            <div className="w-10 relative h-auto min-w-[600px] bg-white rounded-lg flex flex-col justify-center items-center p-10">
                <button
                    className="absolute top-2 right-4"
                    onClick={onClose}>
                    X
                </button>
                <div className="w-full flex flex-row flex-wrap justify-between" >
                    {selectedButton === "register" ? (
                        <div className="w-full flex flex-row flex-wrap justify-between" >
                            <p className="mb-2 w-full text-xs" >
                                Fields marked with * are required
                            </p>
                            <div className="mb-4 w-1/2 pr-2">
                                <label htmlFor="firstName" className="block mb-2">
                                    First Names *
                                </label>
                                <input
                                    id='firstName'
                                    onChange={changeHandler}
                                    name="firstName"
                                    value={input.firstName}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                                {error.firstName ? <p className="text-red-500 text-sm">{error.firstName}</p> : ""}
                            </div>

                            <div className="mb-4 w-1/2 pl-2">
                                <label htmlFor="lastName" className="block mb-2">
                                    Last Name *
                                </label>
                                <input
                                    id='lastName'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="lastName"
                                    value={input.lastName}
                                    type="text" />
                                {error.lastName ? <p className="text-red-500 text-sm">{error.lastName}</p> : ""}
                            </div>

                            <div className="mb-4 w-1/3 pr-2">
                                <label htmlFor="country" className="block mb-2">
                                    Country *
                                </label>
                                <input
                                    id='country'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="country"
                                    value={input.country}
                                    type="text" />
                                {error.country ? <p className="text-red-500 text-sm">{error.country}</p> : ""}
                            </div>

                            <div className="mb-4 w-1/3 px-2">
                                <label htmlFor="region" className="block mb-2">
                                    Region
                                </label>
                                <input
                                    id='region'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="region"
                                    value={input.region}
                                    type="text"
                                />
                                {error.region ? <p className="text-red-500 text-sm">{error.region}</p> : ""}
                            </div>

                            <div className="mb-4 w-1/3 pl-2">
                                <label htmlFor="city" className="block mb-2">
                                    City
                                </label>
                                <input
                                    id='city'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="city"
                                    value={input.city}
                                    type="text" />
                                {error.city ? <p className="text-red-500 text-sm">{error.city}</p> : ""}
                            </div>

                            <div className="mb-4 w-4/5 pr-2">
                                <label htmlFor="adress" className="block mb-2">
                                    Adress
                                </label>
                                <input
                                    id='adress'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="address"
                                    value={input.address}
                                    type="text" />
                                {error.adress ? <p className="text-red-500 text-sm">{error.adress}</p> : ""}
                            </div>

                            <div className="mb-4 w-1/5 pl-2">
                                <label htmlFor="postalCode" className="block mb-2">
                                    Postal Code
                                </label>
                                <input
                                    id='postalCode'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="postalCode"
                                    value={input.postalCode}
                                    type="text" />
                                {error.postalCode ? <p className="text-red-500 text-sm">{error.postalCode}</p> : ""}
                            </div>
                        </div>
                    ) : null}

                    <div className={`mb-4 ${selectedButton === "register" ? "w-1/3" : "w-full"} pr-2`} >
                        <label htmlFor="email" className="block mb-2">
                            E-mail *
                        </label>
                        <input
                            id='email'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            onChange={changeHandler}
                            name="email"
                            value={input.email}
                            type="text" />
                        {error.email ? <p className="text-red-500 text-sm">{error.email}</p> : ""}
                    </div>

                    {selectedButton === "register" ? (
                        <div className="w-2/3 flex flex-wrap justify-between" >
                            <div className="mb-4 w-1/2 px-2">

                                <label htmlFor="phoneNumber" className="block mb-2">
                                    Phone Number
                                </label>
                                <input
                                    id='phoneNumber'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    type="text" />
                                {error.phoneNumber ? <p className="text-red-500 text-sm">{error.phoneNumber}</p> : ""}
                            </div>

                            <div className="mb-4 w-1/2 pl-2">
                                <label htmlFor="birthDate" className="block mb-2">
                                    Birth Date
                                </label>
                                <input
                                    id='birthDate'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="birthDate"
                                    value={input.birthDate}
                                    type="date" />
                                {error.birthDate ? <p className="text-red-500 text-sm">{error.birthDate}</p> : ""}
                            </div>

                        </div>
                    ) : null}

                    <div className={`mb-4 ${selectedButton === "register" ? "w-1/2" : "w-full"} pr-2`} >
                        <label htmlFor="password" className="block mb-2">
                            Password *
                        </label>
                        <input
                            id='password'
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            onChange={changeHandler}
                            name="password"
                            value={input.password}
                            type="password" />
                        {selectedButton === "signIn" ? <button className='w-full text-right text-sm'>reset password</button> : ""}
                        {error.password ? <p className="text-red-500 text-sm">{error.password}</p> : ""}
                    </div>

                    {selectedButton === "register" ? (
                        <div className="w-1/2 flex flex-wrap justify-between">
                            <div className="mb-4 w-full pl-2">
                                <label htmlFor="repeatPassword" className="block mb-2">
                                    Repeat Password *
                                </label>
                                <input
                                    id='repeatPassword'
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    onChange={changeHandler}
                                    name="repeatPassword"
                                    value={input.repeatPassword}
                                    type="password" />
                                {error.repeatPassword ? <p className="text-red-500 text-sm">{error.repeatPassword}</p> : ""}
                            </div>
                        </div>
                    ) : null}

                </div>

                {selectedButton === "register" ? (
                    <div>
                        <p
                            className='mt-2 mb-10' >
                            Review the <Link href="/users/termsConditions" className='font-bold' >Terms && Conditions</Link> of our services.
                        </p>
                        <div className='flex justify-center' >
                            <input
                                type="checkbox"
                                name="ok"
                                id="ok"
                                checked={isChecked}
                                onChange={handleCheckboxChange} />
                            <label
                                htmlFor="ok"
                                className='ml-6' >
                                I accept the Terms && Conditions.
                            </label>
                        </div>
                    </div>
                ) : null}
                <button
                    className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    type='submit'
                    disabled={selectedButton === "register" && error !== null && !isChecked}>
                    {selectedButton === "register" ? "Register" : "Sign In"}
                </button>


                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='flex' >
                        <button onClick={() => signIn()}>Sign In with Google</button>
                        <button>Sign In with Facebook</button>
                    </div>
                    <p>Don't have an account yet?</p>
                    <button
                        className="w-1/6 px-2 mt-2 py-1 bg-indigo-500 text-white font-sm rounded-md hover:bg-indigo-600" >
                        {selectedButton === "register" ? "Sign In" : "Register"}
                    </button>
                </div>
            </div>
        </form >
    )
}

export default SignInRegister