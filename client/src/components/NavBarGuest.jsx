import React, { useState } from 'react';
import Link from 'next/link';

function NavBarGuest() {

  return (
    <ul
      className="bg-white fixed top-16 left-0 w-full flex justify-center p-4 space-x-10 z-50 font-bold "
    >
      <li>
        <Link href="/guest/Products">All Products</Link>
      </li>
      <li>
        <Link href="/guest/Products">Pre-built Systems</Link>
      </li>
      <li>
        <Link href="/guest/Products">Upgrade Bundles</Link>
      </li>
    </ul>
  );
}

export default NavBarGuest;