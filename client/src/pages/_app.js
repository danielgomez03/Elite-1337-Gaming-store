import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBarAdmin from '../components/NavBarAdmin';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import 'tailwindcss/tailwind.css';
require('typeface-montserrat');
require('typeface-roboto');/* 
import LoginPage from "./login"
import LogoutPage from "./logout" */

function App({ Component, pageProps: { session, ...pageProps }}) {
  const [typeUser, setTypeUser] = useState('guest');
  
  const handleUserChange = (event) => {
    setTypeUser(event.target.value);
  };

  return (
    
      <Provider store={store}>
        <div className="w-full font-montserrat mt-32 bg-gray-100 text-sm tracking-wider relative">
          <Header />
            <select value={typeUser} onChange={handleUserChange} className='absolute'>
              <option value="admin">Admin</option>
              <option value="users">Users</option>
              <option value="guest">Guest</option>
            </select>
          <div className='page-container w-full min-h-[calc(100vh-378px)] flex flex-col justify-center items-center'>
            {typeUser === 'admin' && <NavBarAdmin />}
            {(typeUser === 'users' || typeUser === 'guest') && <NavBar typeUser={typeUser}/>}
            {/* <LoginPage />
            <LogoutPage /> */}
            <Component {...pageProps} />
          </div>
          <Footer className='mt-auto' />
        </div>
      </Provider>
   
  );
}

export default App;
