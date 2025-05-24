import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Background Image */}
            <div className="fixed inset-0 -z-10">
                <img
                    src="/img/sepatu.jpg"
                    alt="sepatu"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            </div>

            {/* Register Card */}
            <div className="bg-white rounded-2xl p-10 w-80 sm:w-96 flex flex-col items-center drop-shadow-lg mx-4">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2 select-none">
                    <span>Soleexpress</span>
                </h1>
                <form className="w-full mt-8 space-y-6" autoComplete="off" method="POST" action="#">
                    <div className="relative">
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-600 placeholder-gray-400 pr-8 py-2"
                        />
                        <i className="fas fa-user absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    </div>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-600 placeholder-gray-400 pr-8 py-2"
                        />
                        <i className="fas fa-envelope absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-600 placeholder-gray-400 pr-8 py-2"
                        />
                        <i className="fas fa-lock absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    </div>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className="w-full border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-600 placeholder-gray-400 pr-8 py-2"
                        />
                        <i className="fas fa-lock absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white text-xs font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors"
                    >
                        REGISTER
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account? 
                        <Link to="/login" className="text-gray-900 font-semibold ml-1 hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}