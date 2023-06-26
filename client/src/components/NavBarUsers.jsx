import React, { useState } from 'react';
import Link from 'next/link';

function NavBarUsers() {

  return (
    <div>
      <ul>
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
    </div>
  );
}

export default NavBarUsers;
