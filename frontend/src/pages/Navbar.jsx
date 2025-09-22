import React, { useEffect, useState } from "react";
import { ShoppingCart, UserPlus, LogOutIcon, Menu, X, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart, getCartProducts } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  const admin = user?.role === "admin";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="w-full py-5 px-5 bg-white/50 backdrop-blur-md shadow-md">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xs font-bold sm:text-sm text-gray-800">
          𝑬-𝒄𝒐𝒎𝒎𝒆𝒓𝒄𝒆
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex font-medium gap-4 items-center">
          <Link to="/" className="text-gray-800 hover:text-blue-600">
            Home
          </Link>

          {user && (
            <Link to="/cart" className="relative text-gray-800 hover:text-red-600">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 left-3 text-xs bg-red-500 text-white rounded-full px-1">
                {cart?.length || 0}
              </span>
            </Link>
          )}

          {admin && (
            <Link
              to="/secret-dashboard"
              className="rounded-md bg-blue-700 text-sm text-white px-2 py-1 hover:bg-blue-800"
            >
              Dashboard
            </Link>
          )}

          {/* Auth Links */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-800 hover:text-red-600"
            >
              <LogOutIcon className="inline-block" /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-800 hover:text-blue-600"
              >
                <LogIn className="inline-block" /> 
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1 text-gray-800 hover:text-blue-600"
              >
                <UserPlus className="inline-block" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          {menuOpen ? (
            <X size={28} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu size={28} className="cursor-pointer" onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 bg-white rounded-lg shadow-md p-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="flex items-center gap-2 hover:text-red-600"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart size={20} />
              <span>Cart ({cart?.length || 0})</span>
            </Link>
          )}

          {admin && (
            <Link
              to="/secret-dashboard"
              className="rounded-md bg-blue-700 text-sm text-white px-2 py-1 hover:bg-blue-800"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 text-gray-800 hover:text-red-600"
            >
              <LogOutIcon className="inline-block" /> Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1 text-gray-800 hover:text-blue-600"
              >
                <LogIn className="inline-block" /> 
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1 text-gray-800 hover:text-blue-600"
              >
                <UserPlus className="inline-block" />
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
