import React from 'react'
import Link from 'next/link';

function NavBarAdmin() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/admin">Dashboards</Link>
        </li>
        <li>
          <Link href="/admin/products">Products</Link>
        </li>
        <li>
          <Link href="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link href="/admin/customers">Customers</Link>
        </li>
        <li>
          <Link href="/admin/reports">Reports</Link>
        </li>
        <li>
          <Link href="/admin/userAccounts">User Accounts</Link>
        </li>
        <li>
          <Link href="/admin/support">Support</Link>
        </li>
        <li>
          <Link href="/admin/profile">Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBarAdmin