import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBarAdmin from '@/components/NavBarAdmin';
import NavBar from '@/components/NavBar';
import Footer from '../components/Footer';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import 'tailwindcss/tailwind.css';
require('typeface-montserrat');
require('typeface-roboto');

function App({ Component, pageProps, session }) {
  const [typeUser, setTypeUser] = useState('guest');
  
  const handleUserChange = (event) => {
    setTypeUser(event.target.value);
  };

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className="w-full font-montserrat mt-32 bg-gray-100">
          <Header />
            <select value={typeUser} onChange={handleUserChange}>
              <option value="admin">Admin</option>
              <option value="users">Users</option>
              <option value="guest">Guest</option>
            </select>
          <div className='page-container w-full min-h-[calc(100vh-378px)] flex flex-col justify-center items-center p-4'>
            {typeUser === 'admin' && <NavBarAdmin />}
            {(typeUser === 'users' || typeUser === 'guest') && <NavBar typeUser={typeUser}/>}
            <Component {...pageProps} />
          </div>
          <Footer className='mt-auto' />
        </div>
      </Provider>
    </SessionProvider>
  );
}

export default App;
