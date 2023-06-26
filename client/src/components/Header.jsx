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
    <div className='w-full h-35'>
      <Link href="/">
        <h1>Your Logo</h1>
      </Link>
      <SearchBar />
      {logIn ? (
        <div>
          <img src="" alt="" />
          <h3>{user.name}</h3>
          <button>Log out</button>
        </div>
      ) : (
        <div>
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
