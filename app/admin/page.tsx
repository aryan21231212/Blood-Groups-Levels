"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const [username, setusername] = useState("")
    const [pass, setpass] = useState("")
    const router = useRouter();

    const adminUsers = {
        username: "admin",
        password: "admin123"
    }

    function check(e: React.FormEvent) {
        e.preventDefault(); // prevent page reload
        if (username === adminUsers.username && pass === adminUsers.password) {
            router.push("/verified"); // ✅ redirect to verified page
        } else {
            alert("Login Failed");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-red-700 mb-4">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                    Welcome to the admin section of the application. Manage users and system settings.
                </p>
            </div>

            {/* Form Section */}
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Add New User</h2>
                    <p className="text-red-100 text-sm mt-1">Create a new admin user account</p>
                </div>

                <section className="p-6 sm:p-8">
                    <form className="space-y-6" onSubmit={check}>
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                                placeholder="Enter username"
                                onChange={(e) => setusername(e.target.value)}
                                value={username}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="pass"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="pass"
                                name="password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                                placeholder="Enter password"
                                onChange={(e) => setpass(e.target.value)}
                                value={pass}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Add User
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AdminPage;
