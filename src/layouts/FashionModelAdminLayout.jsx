import React from "react";
import { Outlet } from "react-router-dom";
import FashionModelAdminHeader from "../components/HEADERS/FashionModelAdminHeader.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTopBtn from "../components/ScrollToTopBtn.jsx";
import Breadcrumbs from "../components/Breadcrumbs.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FashionModelAdminLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <FashionModelAdminHeader />
        <main className="flex-1 py-6 mt-8">
          <Breadcrumbs />
          <div className="px-6">
            <Outlet />
          </div>
        </main>

        <Footer />
        <ScrollToTopBtn />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeButton={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />{" "}
    </>
  );
};

export default FashionModelAdminLayout;
