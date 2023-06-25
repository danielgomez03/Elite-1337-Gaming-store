import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import Link from 'next/link';
import SignInRegister from './SignInRegister';

function NavBar() {
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
    <div>
      <div>
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
      <ul>
        <li>
          <Link href="/products">Hardware</Link>
        </li>
        <li>
          <Link href="/products">Software</Link>
        </li>
        <li>
          <Link href="/products">Pre-built Systems</Link>
        </li>
        <li>
          <Link href="/products">Upgrade Bundles</Link>
        </li>
        <li>
          <Link href="/profile">My Account</Link>
        </li>
        <li>
          <Link href="/notifications">Notifications</Link>
        </li>
        <li>
          <Link href="/shopCart">Shop Cart</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
