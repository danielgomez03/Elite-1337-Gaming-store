import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBarUsers from '../components/NavBarUsers';
import NavBarAdmin from '@/components/NavBarAdmin';
import Footer from '../components/Footer';
import Header from '@/components/Header';
import 'tailwindcss/tailwind.css';
import 'typeface-montserrat';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [admin, setAdmin] = useState(true); // luego habría que linkearlo con el dato del perfil que llegue desde el back

  function toggleAdmin() {
    setAdmin((prevAdmin) => !prevAdmin);
  }  

  return (
    <Provider store={store}>
      <div className="w-full font-montserrat mt-32" >
        <Header />
        <div className='page-container min-h-[calc(100vh-378px)] flex flex-col justify-center items-center p-4 ' >
          {admin ? (
            <div>
              <NavBarAdmin />
              <button onClick={toggleAdmin}>admin</button>
            </div>
          ) : (
              <NavBarUsers />
          )}
          <Component {...pageProps} />     
        </div>
        <Footer  
          className='mt-auto' 
          admin={admin}
        />
      </div>
    </Provider>
  );
}

export default App;
