import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import SearchBar from "../components/SearchBar";
import SignInRegister from "./SignInRegister";
import LoginPassport from "./LoginPassport";
import { useDispatch, useSelector } from 'react-redux';
import { changeUser, confirmSession, fetchUserById, getProducts, postLogout } from "@/redux/actions";

function Header() {
  const dispatch = useDispatch()
  const router = useRouter();

  const typeUser = useSelector((state) => state.typeUser);
  const tokenRedux = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const session = useSelector((state) => state.session);
  const user = useSelector((state) => state.user);

  const [sessionConfirmed, setSessionConfirmed] = useState(false);

  useEffect(() => {
    session && dispatch(fetchUserById(userId));
  }, [session])

  useEffect(() => {
    const storedTypeUser = localStorage.getItem('typeUser');
    const storedTokenRedux = localStorage.getItem('tokenRedux');
    const storedUserId = localStorage.getItem('userId');
    if (user && Object.keys(user).length !== 0) {
      if (user.userRole === "admin" || user.userRole === "super") {
        dispatch(changeUser("admin"));
      } else if (user.userRole === "common") {
        dispatch(changeUser("users"));
      }
      localStorage.setItem('typeUser', typeUser);
      localStorage.setItem('tokenRedux', tokenRedux);
      localStorage.setItem('userId', userId);
    } else if (storedTokenRedux && storedTypeUser && storedUserId) {
      dispatch(confirmSession(storedTokenRedux, storedUserId));
    }
    setSessionConfirmed(true);
  }, [tokenRedux, userId, user]);


  useEffect(() => {
    if (sessionConfirmed) {
      if (!session) {
        router.push('/');
      }
    }
  }, [sessionConfirmed, session]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
    <div className="bg-white fixed top-0 left-0 right-0 h-16  z-50 flex justify-between p-4">
      <Link href="/" className=" relative ml-5 h-10 flex flex-col items-center">
        <span className="sr-only w-0 h-0">1337 Hardware</span>
        <img
          className="fixed top-0.5 left-16 w-16"
          src="/db61332f0446b77510935fcb1c3d929b.png"
          alt="logo" />
        <h2 className="absolute top-4 left-3.5 text-gray-300 text-xl">Hardware</h2>
      </Link>

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
