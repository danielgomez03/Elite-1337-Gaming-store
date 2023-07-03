import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import SignInRegister from "./SignInRegister";
import LoginPassport from "./LoginPassport";

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
    <div className="bg-white fixed top-0 left-0 right-0 h-16 text-lg  z-50 flex justify-between p-4 space-x-10 overflow-hidden mx-10">

      <Link href="/" className="flex items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25N_XsuWimAwTQXj2bQuoZkVVBJEPlfXVLsLQHEgv9eeeIu2VsY3mt7ic33eSUAqXdHI&usqp=CAU" alt="logo" />
      </Link>

      <SearchBar />
      {/* <LoginPassport /> */}
      {logIn ? (
        <div className="flex justify-between space-x-10">
          <img src="" alt="" />
          <h3>{user.name}</h3>
          <button>Log out</button>
        </div>
      ) : (
        <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
          <button
            href="#"
            onClick={() => openSignInRegister("signIn")}
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Sign in
          </button>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button
            href="#"
            onClick={() => openSignInRegister("register")}
            className="text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Create account
          </button>
        </div>
      )}
      {showSignInRegister && (
        <SignInRegister
          selectedButton={selectedButton}
          onClose={closeSignInRegister}
        />
      )}
    </div>
  );
}

export default Header;
