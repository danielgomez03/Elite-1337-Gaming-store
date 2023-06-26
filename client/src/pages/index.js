import React from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Home from "./Home";
import Products from "./users/Products";
import Details from "./users/Details";
import Favorites from "./users/Favorites";
import Profile from "./users/Profile";
import Admin from "./admin/Admin";
import ProductsAdmin from "./admin/ProductsAdmin";
import TermsConditions from "./users/TermsConditions";
import CreateProduct from "./admin/CreateProduct";

export default function Index() {
  const router = useRouter();
  

  return (
    <div>
      <NavBar />

      {router.pathname === "/" && <Home />}
      {router.pathname === "/products" && <Products />}
      {router.pathname === "/details" && <Details />}
      {router.pathname === "/favorites" && <Favorites />}
      {router.pathname === "/client-profile" && <Profile />}
      {router.pathname === "/admin" && <Admin />}
      {router.pathname === "/admin/products" && <ProductsAdmin />}
      {router.asPath === "/terms-and-conditions" && <TermsConditions />}
      {router.asPath === "/admin/CreateProduct" && <CreateProduct />}

      <Footer />
    </div>
  );
}
