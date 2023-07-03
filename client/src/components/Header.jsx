import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import SignInRegister from "./SignInRegister";

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
    <div className="bg-white fixed top-0 left-0 right-0 h-16  z-50 flex justify-between p-4 space-x-10">
      <div className="ml-4 flex lg:ml-0">
        <Link href="/" className="ml-10">
          <span className="sr-only">1337 Hardware</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </Link>
      </div>
      <SearchBar />
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
