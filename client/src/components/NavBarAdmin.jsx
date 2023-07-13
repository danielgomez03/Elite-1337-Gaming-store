import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavBarAdmin() {
  const router = useRouter();

  const isActiveLink = (href) => {
    return router.pathname === href ? 'bg-white text-gray-900' : '';
  };

  return (
    <ul className="bg-gradient-to-r from-indigo-950 to-indigo-950 via-indigo-900 to-indigo-900 mx-auto px-4 sm:px-6 lg:px-8 w-full flex h-16 items-center justify-center fixed top-16 left-0 z-10 text-white">
        <Link 
          className={`flex items-center justify-center h-full px-5 transition-colors duration-300 hover:bg-white hover:text-gray-900 ${isActiveLink('/admin/Dashboard')}`}
          href="/admin/Dashboard">
            Dashboards
        </Link>
        <Link
          className={`flex items-center justify-center h-full px-5 transition-colors duration-300 hover:bg-white hover:text-gray-900 ${isActiveLink('/admin/ProductsAdmin')}`} 
          href="/admin/ProductsAdmin">
            Products
        </Link>
        <Link         
        className={`flex items-center justify-center h-full px-5 transition-colors duration-300 hover:bg-white hover:text-gray-900 ${isActiveLink('/admin/Orders')}`}
        href="/admin/Orders">
            Orders
        </Link>
        <Link 
          className={`flex items-center justify-center h-full px-5 transition-colors duration-300 hover:bg-white hover:text-gray-900 ${isActiveLink('/admin/Reports')}`}
          href="/admin/Reports">
            Reports
        </Link>
        <Link 
          className={`flex items-center justify-center h-full px-5 transition-colors duration-300 hover:bg-white hover:text-gray-900 ${isActiveLink('/admin/UserAccounts')}`}
          href="/admin/UserAccounts">
            User Accounts
        </Link>
        <Link
          className={`flex items-center justify-center h-full px-5 transition-colors duration-300 hover:bg-white hover:text-gray-900 ${isActiveLink('/admin/Support')}`}
          href="/admin/Support">
          Support
        </Link>
        <Link
          className={`flex items-center justify-center h-full px-5 transition-colors duration-300 hover:bg-white hover:text-gray-900 ${isActiveLink('/users/userProfile')}`}
          href="/users/userProfile">
          Profile
        </Link>
    </ul>
  );
}

export default NavBarAdmin;
