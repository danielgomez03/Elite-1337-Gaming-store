import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import SignInRegister from "./SignInRegister";
import LoginPassport from "./LoginPassport";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, postLogout } from "@/redux/actions";


function Header() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user);
  const typeUser = useSelector(state => state.typeUser);
  const userId = useSelector(state => state.userId);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showSignInRegister, setShowSignInRegister] = useState(false);

  const openSignInRegister = (button) => {
    setSelectedButton(button);
    setShowSignInRegister(true);
  };

  const closeSignInRegister = () => {
    setSelectedButton(null);
    setShowSignInRegister(false);
  };

  const closeSession = () => {
    dispatch(postLogout(userId));    
    localStorage.removeItem('typeUser');
    localStorage.removeItem('tokenRedux');
    localStorage.removeItem('userId');
  };

  return (
    <div className="bg-white fixed top-0 left-0 right-0 h-16  z-50 flex justify-between p-4 space-x-10">
      <div className="ml-4 flex lg:ml-0">
        <Link href="/" className="ml-10">
          <span className="sr-only">1337 Hardware</span>
          <div
            onClick={() => { dispatch(getProducts()) }}
            className="relative flex flex-col items-center justify-center pr-4" >
            <h2 className="absolute top-4 text-gray-500 text-xl">Hardware</h2>
            <h1 className="font-montserrat mb-6 text-3xl">1337</h1>
          </div>
        </Link>
      </div>

      <SearchBar />
      {typeUser !== "guest" ? (
        <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6">
          <div className="flex gap-2 items-center">
            <img
              src="https://forma-architecture.com/wp-content/uploads/2021/04/Foto-de-perfil-vacia-thegem-person.jpg"
              className="w-8"
              alt="Foto perfil vacía" />
            <h3>{user.firstName} {user.lastName}</h3>
          </div>
          <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button onClick={closeSession} >Log out</button>
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
