import React from 'react'
import Link from 'next/link';

function NavBarAdmin() {
  return (
    <ul
      className="bg-gradient-to-r from-indigo-950 to-indigo-950 via-indigo-900 to-indigo-900 mx-auto px-4 sm:px-6 lg:px-8 w-full flex h-16 items-center justify-center fixed top-16 left-0 z-10 text-white gap-10"
    >
      <li>
        <Link href="/admin/Dashboard">Dashboards</Link>
      </li>
      <li>
        <Link href="/admin/ProductsAdmin">Products</Link>
      </li>
      <li>
        <Link href="/admin/Orders">Orders</Link>
      </li>
      <li>
        <Link href="/admin/Customers">Customers</Link>
      </li>
      <li>
        <Link href="/admin/Reports">Reports</Link>
      </li>
      <li>
        <Link href="/admin/UserAccounts">User Accounts</Link>
      </li>
      <li>
        <Link href="/admin/Support">Support</Link>
      </li>
      <li>
        <Link href="/admin/Profile">Profile</Link>
      </li>
    </ul>
  )
}

export default NavBarAdmin