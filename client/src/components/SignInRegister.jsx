import React from 'react'

function SignInRegister({ selectedButton, onClose }) {
  return (
    <div>
        <button onClick={onClose}>X</button>
        {
            selectedButton === "register" ? (
                <div>
                    <input type="name" placeholder='Name' />
                    <input type="email" placeholder='E-mail' />
                    <input type="password" placeholder='Password' />
                    <input type="number" placeholder='ID Card' />
                    <input type="number" placeholder='Phone number' />
                    <p>Review the <button>Terms && Conditions</button> of our services.</p>
                    <input type="checkbox" name="" id="" />
                    <p>I accept the Terms && Conditions.</p>
                    <button>reset password</button>
                </div>
            ) : (
                <div>
                    <input type="email" placeholder='E-mail' />
                    <input type="password" placeholder='Password' />
                </div>
            )
        }
        <div>
            <button>{ selectedButton === "register" ? "Sign In" : "Register" }</button>
            <p>Don´t have an account yet?</p>
            <button>{ selectedButton === "register" ? "Register" : "Sign In" }</button>
            <button>Sign In with Google</button>
            <button>Sign In with Facebook</button>
        </div>
    </div>
  )
}

export default SignInRegister