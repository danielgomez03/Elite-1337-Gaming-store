import React, { useState } from 'react';
import Link from 'next/link';

function NavBarUsers() {

  return (
    <ul 
      className="bg-white fixed top-16 left-0 w-full flex justify-center p-4 space-x-10 z-50 font-bold "
    >
      <li>
        <Link href="/products">Hardware</Link>
      </li>
      <li>
        <Link href="/products">Software</Link>
      </li>
      <li>
        <Link href="/products">Pre-built Systems</Link>
      </li>
      <li>
        <Link href="/products">Upgrade Bundles</Link>
      </li>
      <li>
        <Link href="/profile">My Account</Link>
      </li>
      <li>
        <Link href="/notifications">Notifications</Link>
      </li>
      <li>
        <Link href="/shopCart">Shop Cart</Link>
      </li>
    </ul>
  );
}

export default NavBarUsers;
