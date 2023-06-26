import React from 'react'
import Link from 'next/link';

function NavBarAdmin() {
  return (
    <ul
      className="bg-white fixed top-16 left-0 w-full flex justify-center p-4 space-x-10 z-50 font-bold "
    >
      <li>
        <Link href="/admin/Dashboard">Dashboards</Link>
      </li>
      <li>
        <Link href="/admin/Products">Products</Link>
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