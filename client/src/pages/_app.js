import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBarUsers from '../components/NavBarUsers';
import NavBarAdmin from '@/components/NavBarAdmin';
import NavBarGuest from '@/components/NavBarGuest';
import Footer from '../components/Footer';
import Header from '@/components/Header';
import 'tailwindcss/tailwind.css';
require('typeface-montserrat');
require('typeface-roboto');

function App({ Component, pageProps }) {
  const [typeUser, setTypeUser] = useState('guest');
  
  const handleUserChange = (event) => {
    setTypeUser(event.target.value);
  };

  return (
    <Provider store={store}>
      <div className="w-full font-montserrat mt-32">
        <Header />
        <select value={typeUser} onChange={handleUserChange}>
          <option value="admin">Admin</option>
          <option value="users">Users</option>
          <option value="guest">Guest</option>
        </select>
        <div className='page-container min-h-[calc(100vh-378px)] flex flex-col justify-center items-center p-4'>
          {typeUser === 'admin' && <NavBarAdmin />}
          {typeUser === 'users' && <NavBarUsers />}
          {typeUser === 'guest' && <NavBarGuest />}
          <Component {...pageProps} />
        </div>
        <Footer className='mt-auto' />
      </div>
    </Provider>
  );
}

export default App;
