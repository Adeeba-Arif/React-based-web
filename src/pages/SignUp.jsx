/* SignUp.jsx - Redirect to Home After Signup */
import { getAuth, createUserWithEmailAndPassword , GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import React, { useState } from "react";
import { app } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setFormData({ email: "", password: "" }); // Reset form after successful signup
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Signup Error: ", error);
    }
  };

  const handleSignupWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
      setFormData({ email: "", password: "" });
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Google Signup Error: ", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center px-8 py-6 gap-5 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-700">Create an Account</h1>
        
        <form className="w-full flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* OR Separator */}
        <div className="flex items-center w-full gap-2">
          <hr className="w-full border-gray-300" />
          <p className="text-gray-500 text-sm">or</p>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleSignupWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};