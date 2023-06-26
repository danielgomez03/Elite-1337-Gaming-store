import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBarUsers from '../components/NavBarUsers';
import NavBarAdmin from '@/components/NavBarAdmin';
import Footer from '../components/Footer';
import Header from '@/components/Header';
import Index from './index';
import Products from './users/Products';
import Details from './users/Details';
import Favorites from './users/Favorites';
import Profile from './users/Profile';
import Admin from './admin/Admin';
import ProductsAdmin from './admin/ProductsAdmin';
import CreateProduct from "../components/CreateProduct"
import TermsConditions from './users/TermsConditions';
import 'tailwindcss/tailwind.css';
import 'typeface-montserrat';

function App({ Component, pageProps }) {
  const router = useRouter();
  const admin = true;

  return (
    <Provider store={store}>
      <div className="w-full font-montserrat mt-32" >
        <Header />
        {admin ? (
          <div className='page-container min-h-[calc(100vh-368px)] flex flex-col justify-center items-center p-4 ' >
            <NavBarAdmin />
            {router.asPath === '/' && <Admin />}
            {router.asPath === '/admin/products' && <ProductsAdmin />}
            {router.asPath === '/admin/products/create' && <CreateProduct />}
            {router.asPath === '/admin/terms-and-conditions' && <TermsConditions />}
          </div>
        ) : (
          <div className='page-container min-h-[calc(100vh-368px)] flex flex-col justify-center items-center p-4 ' >
            <NavBarUsers />
            {router.asPath === '/' && <Index />}
            {router.asPath === '/products' && <Products />}
            {router.asPath === '/details' && <Details />}
            {router.asPath === '/favorites' && <Favorites />}
            {router.asPath === '/client-profile' && <Profile />}
          </div>
        )}
        <Footer  
          className='mt-auto' 
          admin={admin}
        />
      </div>
    </Provider>
  );
}

export default App;


