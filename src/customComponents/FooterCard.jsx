import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-2xl font-bold">ApnaStore</h2>
          <p className="text-gray-400 mt-2">Your one-stop shop for all your needs.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
            <li><Link to="/products" className="text-gray-400 hover:text-white">Products</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            <li><Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com" className="text-gray-400 hover:text-white text-xl"><FaFacebookF /></a>
            <a href="https://www.twitter.com" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
            <a href="https://www.instagram.com" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
            <a href="https://www.linkedIn.com" className="text-gray-400 hover:text-white text-xl"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
