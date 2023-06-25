import React from "react";
import { useRouter } from "next/router";
import NavBarUsers from "../components/NavBarUsers";
import NavBarAdmin from "@/components/NavBarAdmin";
import Footer from "../components/Footer";
import Header from "@/components/Header";
import Home from "./Home";
import Products from "./users/Products";
import Details from "./users/Details";
import Favorites from "./users/Favorites";
import Profile from "./users/Profile";
import Admin from "./admin/Admin";
import ProductsAdmin from "./admin/ProductsAdmin";
import TermsConditions from "./users/TermsConditions";
import 'tailwindcss/tailwind.css';

export default function Index() {
  const router = useRouter();
  const admin = true;

  return (
    <div className="w-full h-screen " >
      <Header />
      { admin ? (
        <div>
          <NavBarAdmin />
          {router.asPath === "/" && <Admin />}
          {router.asPath === "/admin/products" && <ProductsAdmin />}
          {router.asPath === "/admin/terms-and-conditions" && <TermsConditions />}
        </div>
      ) : (
        <div>
          <NavBarUsers />
          {router.asPath === "/" && <Home />}
          {router.asPath === "/products" && <Products />}
          {router.asPath === "/details" && <Details />}
          {router.asPath === "/favorites" && <Favorites />}
          {router.asPath === "/client-profile" && <Profile />}
        </div>
      )}
      <Footer admin={admin} />
    </div>
  );
}
