// src/components/HEADERS/AppHeader.jsx
import React, { useState, useEffect } from "react";
import Logo from "../../components/headerComponents/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Globe,
  Menu,
  X,
  Home,
  Grid,
  Clapperboard,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../../context/AppContext/CartContext";
import { useAuth } from "../../context/AppContext";
import { useFavourite } from "../../context/AppContext/FavouriteContext";

const AppHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const { favouritesCount } = useFavourite();

  

  const navigate = useNavigate();

  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    navigate("/search");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const handleUserClick = () => {
    if (user) {
      navigate("/user-profile");
      setActiveNavItem("user-profile");
    } else {
      navigate("/user-profile");
    }
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setActiveNavItem("home");
    navigate("/");
  };

  const handleNavClick = (item) => {
    setActiveNavItem(item);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header Navbar */}
      <nav
        className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 rounded-b-3xl ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Desktop: Logo, Mobile: Menu Toggle and Globe */}
          <div className="flex items-center space-x-4">
            <div className="md:flex hidden">
              <NavLink
                to="/"
                className="text-2xl font-bold text-black !no-underline"
              >
                <Logo />
              </NavLink>
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <X size={24} color="black" />
                ) : (
                  <Menu size={24} color="black" />
                )}
              </button>
              <button onClick={toggleLanguage}>
                <Globe size={24} color="black" />
              </button>
            </div>
          </div>

          {/* Desktop: Logo in center (optional) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="md:hidden">
              <NavLink to="/" className="text-2xl font-bold text-black">
                Digital Mall
              </NavLink>
            </div>
          </div>

          {/* Desktop & Mobile: Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={handleSearchClick}>
                <Search size={24} color="black" />
              </button>
              <NavLink to="/cart" className="relative">
                <ShoppingCart size={24} color="black" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
              <NavLink to="/favourites" className="relative">
                <Heart size={24} color="black" />
                {favouritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center opacity-90">
                    {favouritesCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex gap-2">
                <button onClick={handleSearchClick}>
                  <Search size={24} color="black" />
                </button>
                <NavLink to="/cart" className="relative">
                  <ShoppingCart size={24} color="black" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </NavLink>
              </div>
              <NavLink to="/favourites" className="relative">
                <Heart size={24} color="black" />
                {favouritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center opacity-90">
                    {favouritesCount}
                  </span>
                )}
              </NavLink>

              <button onClick={handleUserClick}>
                <User size={24} color="black" className="cursor-pointer" />
              </button>
              <button onClick={toggleLanguage}>
                <Globe size={24} color="black" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t">
        <div className="flex justify-around py-2">
          <NavLink
            to="/"
            className={`flex flex-col items-center !no-underline ${
              activeNavItem === "home" ? "text-black" : "!text-gray-600"
            }`}
            onClick={() => handleNavClick("home")}
          >
            <Home
              size={24}
              color={activeNavItem === "home" ? "black" : "gray"}
            />
            <span className="text-xs">Home</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={`flex flex-col items-center !no-underline ${
              activeNavItem === "categories" ? "text-black" : "!text-gray-600"
            }`}
            onClick={() => handleNavClick("categories")}
          >
            <Grid
              size={24}
              color={activeNavItem === "categories" ? "black" : "gray"}
            />
            <span className="text-xs">Categories</span>
          </NavLink>
          <NavLink
            to="/reels"
            className={`flex flex-col items-center !no-underline ${
              activeNavItem === "reels" ? "text-black" : "!text-gray-600"
            }`}
            onClick={() => handleNavClick("reels")}
          >
            <Clapperboard
              size={24}
              color={activeNavItem === "reels" ? "black" : "gray"}
            />
            <span className="text-xs">Reels</span>
          </NavLink>
          <NavLink
            to="/cart"
            className={`flex flex-col items-center relative !no-underline ${
              activeNavItem === "cart" ? "text-black" : "!text-gray-600"
            }`}
            onClick={() => handleNavClick("cart")}
          >
            <ShoppingBag
              size={24}
              color={activeNavItem === "cart" ? "black" : "gray"}
            />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </NavLink>
          <button
            onClick={handleUserClick}
            className={`flex flex-col items-center !no-underline ${
              activeNavItem === "user-profile" ? "text-black" : "!text-gray-600"
            }`}
          >
            <User
              size={24}
              color={activeNavItem === "user-profile" ? "black" : "gray"}
            />
            <span className="text-xs">My Account</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
