import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from "../components/SearchBar";
import SignInRegister from './SignInRegister';

function Header() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [showSignInRegister, setShowSignInRegister] = useState(false);
  const logIn = false; // Se debe modificar según datos del Back

  const openSignInRegister = (button) => {
    setSelectedButton(button);
    setShowSignInRegister(true);
  };

  const closeSignInRegister = () => {
    setSelectedButton(null);
    setShowSignInRegister(false);
  };

  return (
    <div className="bg-white fixed top-0 left-0 right-0 h-16  z-50 flex justify-between p-4 space-x-10" >
      <Link href="/">
        <h1>Your Logo</h1>
      </Link>
      <SearchBar />
      {logIn ? (
        <div className="flex justify-between space-x-10" >
          <img src="" alt="" />
          <h3>{user.name}</h3>
          <button>Log out</button>
        </div>
      ) : (
        <div className="flex justify-between space-x-10" >
          <button onClick={() => openSignInRegister('register')}>Register</button>
          <button onClick={() => openSignInRegister('signIn')}>Sign In</button>
        </div>
      )}
      {showSignInRegister && (
        <SignInRegister selectedButton={selectedButton} onClose={closeSignInRegister} />
      )}
    </div>
  );
}

export default Header;
