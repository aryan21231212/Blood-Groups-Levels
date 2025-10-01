"use client";
import React, { useEffect, useState } from "react";
import { Roboto, Poppins } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

interface UserData {
  name: string;
  email: string;
  donations: number;
  active: boolean;
  lastLogin: string;
}

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Simulate fetching from DB
    setTimeout(() => {
      setUser({
        name: "Aryan Singh",
        email: "aryan@example.com",
        donations: 12,
        active: true,
        lastLogin: "2025-09-25 10:30 AM",
      });
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 ${roboto.className}`}
    >
      {/* Header */}
      <header className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <h1
          className={`text-3xl sm:text-4xl font-bold text-gray-800 ${poppins.className}`}
        >
          Admin Dashboard
        </h1>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
          Logout
        </button>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-700">
                {user?.name}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <p
                className={`mt-3 font-semibold ${
                  user?.active ? "text-green-600" : "text-red-600"
                }`}
              >
                {user?.active ? "Active" : "Inactive"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Last Login: {user?.lastLogin}
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Donations */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            {loading ? (
              <div className="animate-pulse h-16 w-16 bg-gray-300 rounded-full"></div>
            ) : (
              <>
                <span className="text-4xl font-bold text-red-600">
                  {user?.donations}
                </span>
                <p className="text-gray-500 mt-2">Donations Made</p>
              </>
            )}
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            {loading ? (
              <div className="animate-pulse h-16 w-16 bg-gray-300 rounded-full"></div>
            ) : (
              <>
                <span
                  className={`text-2xl font-bold ${
                    user?.active ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user?.active ? "✔ Active" : "✖ Inactive"}
                </span>
                <p className="text-gray-500 mt-2">Account Status</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
