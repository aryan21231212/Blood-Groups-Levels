"use client";
import React, { useState } from "react";
import { Globe, Heart, Droplet } from "lucide-react";
import Link from "next/link";

const bloodInfo = {
  "A+": "Can donate to A+ and AB+, can receive from A+, A-, O+, O-",
  "A-": "Can donate to A+, A-, AB+, AB-, can receive from A- and O-",
  "B+": "Can donate to B+ and AB+, can receive from B+, B-, O+, O-",
  "B-": "Can donate to B+, B-, AB+, AB-, can receive from B- and O-",
  "AB+": "Universal recipient, can receive blood from anyone",
  "AB-": "Can donate to AB+ and AB-, can receive from AB-, A-, B-, O-",
  "O+": "Can donate to O+, A+, B+, AB+, can receive from O+ and O-",
  "O-": "Universal donor, can donate to anyone, but can only receive from O-",
};

const Page = () => {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 text-gray-800">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-10 py-6 bg-white shadow-md fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold text-red-600">BloodCare</h1>
        <nav className="space-x-6 hidden md:flex">
          <Link href="/" className="hover:text-red-600">Blood Groups</Link>
          <Link href="/levels" className="hover:text-red-600">Blood Levels</Link>
          <Link href="/diseases" className="hover:text-red-600">Diseases</Link>
          <Link href="/donate" className="hover:text-red-600">Donate</Link>
        </nav>
        <button className="flex items-center gap-2 border px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white transition">
          <Globe size={18}/> Language
        </button>
      </header>



      {/* Blood Groups Section */}
      <section id="groups" className="py-20 px-10  from-red-50 to-red-100 h-screen">
        <h3 className="text-3xl font-bold text-center mb-10 mt-10">Blood Groups</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {Object.keys(bloodInfo).map((group) => (
            <div
              key={group}
              className="relative p-6 bg-red-50 rounded-xl shadow hover:scale-105 transition cursor-pointer"
              onMouseEnter={() => setHoveredGroup(group)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <Droplet className="text-red-600 w-10 h-10 mx-auto mb-3"/>
              <p className="font-bold text-xl">{group}</p>

              {/* Tooltip */}
              {hoveredGroup === group && (
                <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-56 bg-red-600 text-white text-sm rounded-lg p-3 shadow-lg">
                  {bloodInfo[group]}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-white shadow-inner mt-10 absolute bottom-0 min-w-screen">
        <p className="text-gray-500">© 2025 BloodCare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
