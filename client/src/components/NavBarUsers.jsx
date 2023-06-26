import React, { useState } from 'react';
import Link from 'next/link';

function NavBarUsers() {

  return (
    <ul 
      className="bg-white fixed top-16 left-0 w-full flex justify-center p-4 space-x-10 z-50 font-bold "
    >
      <li>
        <Link href="/users/Products">Hardware</Link>
      </li>
      <li>
        <Link href="/users/Products">Software</Link>
      </li>
      <li>
        <Link href="/users/Products">Pre-built Systems</Link>
      </li>
      <li>
        <Link href="/users/Products">Upgrade Bundles</Link>
      </li>
      <li>
        <Link href="/users/Profile">My Account</Link>
      </li>
      <li>
        <Link href="/users/Notifications">Notifications</Link>
      </li>
      <li>
        <Link href="/users/ShopCart">Shop Cart</Link>
      </li>
    </ul>
  );
}

export default NavBarUsers;
