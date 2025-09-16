// src/pages/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import "./ErrorPage.css"; 

export default function ErrorPage() {
  return (
    <div className="error-wrapper d-flex flex-column align-items-center justify-content-center text-center">
      {/* Icon */}
      <div className="pulse mb-3">
        <TbError404 size={250} color="#111" />
      </div>

      {/* Subheading */}
      <h2 className="h5 mb-3 text-dark opacity-75">
        Oops... You just found an error page
      </h2>

      {/* Small text */}
      <p className="text-muted mb-5">
        We are sorry but the page you are looking for was not found!
      </p>

      {/* Button */}
      <Link to="/" className="btn btn-dark px-4 py-2 rounded-pill bounce">
        ← &nbsp;&nbsp;Back to Home
      </Link>
    </div>
  );
}
