import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBar from '@/components/NavBar';
import Footer from '../components/Footer';
import Header from '@/components/Header';
import 'tailwindcss/tailwind.css';
require('typeface-montserrat');
require('typeface-roboto');
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = "https://ft37bpfgrupo12-production.up.railway.app/";
function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <Provider store={store}>
        <div className="w-full font-montserrat mt-32 bg-gray-100 text-sm tracking-wider relative">
          <Header />
          <div className='page-container w-full min-h-[calc(100vh-378px)] flex flex-col justify-center items-center'>
            <NavBar />
            <Component {...pageProps} />
          </div>
          <Footer className='mt-auto' />
        </div>
      </Provider>
  );
}

export default App;
