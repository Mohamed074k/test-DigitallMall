import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "./../components/HEADERS/AppHeader.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTopBtn from "../components/ScrollToTopBtn.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const isReelsPage = location.pathname === "/reels";

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}
        {!isReelsPage && <AppHeader />}

        <main className={`flex-grow ${!isReelsPage ? 'pb-16 md:pb-0' : ''}`}>
          <Outlet />
        </main>

        {!isReelsPage && <Footer />}
        {!isReelsPage && <ScrollToTopBtn />}
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
      />
    </>
  );
};

export default App;
