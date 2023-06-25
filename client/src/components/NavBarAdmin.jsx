import React from 'react'
import Link from 'next/link';

function NavBarAdmin() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Dashboards</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/orders">Orders</Link>
        </li>
        <li>
          <Link href="/customers">Customers</Link>
        </li>
        <li>
          <Link href="/reports">Reports</Link>
        </li>
        <li>
          <Link href="/userAccounts">User Accounts</Link>
        </li>
        <li>
          <Link href="/support">Support</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBarAdmin