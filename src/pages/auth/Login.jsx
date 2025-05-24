import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('https://dummyjson.com/user/login', {
                username: dataForm.username,
                password: dataForm.password,
            });

            if (response.status === 200) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

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

            {/* Login Card */}
            <div className="bg-white rounded-2xl p-10 w-80 sm:w-96 flex flex-col items-center drop-shadow-lg mx-4">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2 select-none">
                    <span>Soleexpress</span>
                </h1>

                {error && (
                    <div className="w-full mt-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg flex items-center">
                        <BsFillExclamationDiamondFill className="mr-2" />
                        {error}
                    </div>
                )}

                <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            className="w-full border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-600 placeholder-gray-400 pr-8 py-2"
                            value={dataForm.username}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <i className="fas fa-user absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full border-b border-gray-300 focus:border-gray-600 focus:outline-none text-gray-600 placeholder-gray-400 pr-8 py-2"
                            value={dataForm.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <i className="fas fa-eye-slash absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white text-xs font-semibold py-3 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <ImSpinner2 className="animate-spin mr-2" />
                                Processing...
                            </div>
                        ) : (
                            'LOGIN'
                        )}
                    </button>
                </form>

                <div className="w-full mt-4 text-sm text-gray-600 space-y-2">
                    <p className="text-center">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-gray-900 font-semibold hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                    <p className="text-center">
                        <Link
                            to="/forgot"
                            className="text-gray-900 font-semibold hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}