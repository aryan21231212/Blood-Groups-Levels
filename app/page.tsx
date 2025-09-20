"use client";
import React, { useState, useEffect } from "react";
import { Globe, Heart, Droplet, Activity, Users, MapPin, Clock, Link2 } from "lucide-react";
import Link from "next/link";

interface BloodStat {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  delay: string;
}

interface HeartItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

const bloodInfo: Record<string, string> = {
  "A+": "Can donate to A+ and AB+, can receive from A+, A-, O+, O-",
  "A-": "Can donate to A+, A-, AB+, AB-, can receive from A- and O-",
  "B+": "Can donate to B+ and AB+, can receive from B+, B-, O+, O-",
  "B-": "Can donate to B+, B-, AB+, AB-, can receive from B- and O-",
  "AB+": "Universal recipient, can receive blood from anyone",
  "AB-": "Can donate to AB+ and AB-, can receive from AB-, A-, B-, O-",
  "O+": "Can donate to O+, A+, B+, AB+, can receive from O+ and O-",
  "O-": "Universal donor, can donate to anyone, but can only receive from O-",
};

const bloodStats: BloodStat[] = [
  { icon: Users, label: "Lives Saved", value: "12,450+", delay: "0s" },
  { icon: Droplet, label: "Units Donated", value: "8,230+", delay: "200ms" },
  { icon: Heart, label: "Active Donors", value: "2,180+", delay: "400ms" },
  { icon: MapPin, label: "Centers", value: "45+", delay: "600ms" },
];

const BloodDropAnimation: React.FC<{ delay?: number; className?: string }> = ({ 
  delay = 0, 
  className = "" 
}) => (
  <div 
    className={`absolute animate-pulse ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
    }}
  >
    <Droplet className="text-red-400 opacity-30 animate-bounce" size={20} />
  </div>
);

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
      }));
      setHearts(newHearts);
    };
    
    generateHearts();
    const interval = setInterval(generateHearts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-bounce opacity-40"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart className="text-red-300" size={16} />
        </div>
      ))}
    </div>
  );
};

const Page: React.FC = () => {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Custom Tailwind Animations */}
      <style jsx global>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        @keyframes float-up {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 10s ease-out infinite;
        }
      `}</style>
      
      <FloatingHearts />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 text-gray-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <BloodDropAnimation delay={0} className="top-20 left-20" />
          <BloodDropAnimation delay={1} className="top-20 left-10" />
          <BloodDropAnimation delay={2} className="top-40 right-20" />
          <BloodDropAnimation delay={3} className="bottom-40 left-20" />
          <BloodDropAnimation delay={4} className="bottom-20 right-10" />
        </div>

        {/* Navbar */}
        <header className="w-full flex justify-between items-center px-10 py-6 bg-white/90 backdrop-blur-md shadow-lg fixed top-0 left-0 z-50 border-b border-red-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
              <Droplet className="text-white animate-heartbeat relative z-10" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              BloodCare
            </h1>
          </div>
          
          <nav className="space-x-6 hidden md:flex">
            <Link href="#groups" className="hover:text-red-600 transition-colors duration-300 relative group">
              Blood Groups
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="levels" className="hover:text-red-600 transition-colors duration-300 relative group">
              Blood Levels
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="diseases" className="hover:text-red-600 transition-colors duration-300 relative group">
              Diseases  
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="donate" className="hover:text-red-600 transition-colors duration-300 relative group">
              Donate Now
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          <button className="flex items-center gap-2 border border-red-200 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 transform hover:scale-105">
            <Globe size={18}/> 
            <span>Language</span>
          </button>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-10 text-center relative">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-pink-600 to-red-700 bg-clip-text text-transparent">
              Save Lives Through
              <br />
              <span className="relative">
                Blood Donation
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse"></div>
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Every donation can save up to three lives. Join our community of heroes making a difference.
            </p>
            <Link href="/donate" >
            <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-heartbeat">
              <Heart className="inline mr-2" size={20} />
              Donate Now
            </button>
            </Link>
           
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-16 px-10 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {bloodStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className={`text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: stat.delay,
                      animationDelay: stat.delay 
                    }}
                  >
                    <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                      <IconComponent className="text-white relative z-10" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blood Groups Section */}
        <section id="groups" className="py-20 px-10">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-4 text-gray-800">Blood Groups</h3>
            <p className="text-center text-gray-600 mb-12 text-lg">Discover compatibility and donation information</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.keys(bloodInfo).map((group, index) => (
                <div
                  key={group}
                  className={`relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer border border-red-100 group ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animationDelay: `${index * 100}ms`
                  }}
                  onMouseEnter={() => setHoveredGroup(group)}
                  onMouseLeave={() => setHoveredGroup(null)}
                >
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-600 to-red-800 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:animate-heartbeat relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                      <Droplet className="text-white relative z-10" size={28} />
                    </div>
                    <p className="font-bold text-2xl text-gray-800 mb-2">{group}</p>
                    <div className="w-full h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Enhanced Tooltip */}
                  {hoveredGroup === group && (
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm rounded-2xl p-4 shadow-2xl z-20 animate-in slide-in-from-top-2 duration-300 border border-red-400">
                      <div className="flex items-center mb-2">
                        <Activity className="mr-2" size={16} />
                        <span className="font-semibold">Compatibility Info</span>
                      </div>
                      <p className="leading-relaxed">{bloodInfo[group]}</p>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="donate" className="py-20 px-10 bg-gradient-to-r from-red-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 animate-bounce">
              <Heart size={40} />
            </div>
            <div className="absolute top-20 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
              <Droplet size={35} />
            </div>
            <div className="absolute bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
              <Activity size={30} />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h3 className="text-4xl font-bold mb-6">Ready to Save Lives?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of donors who are making a difference in their communities every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <MapPin size={20} />
                Find Donation Center
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Clock size={20} />
                Schedule Donation
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-12 px-10 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                  <Droplet className="text-white relative z-10" size={20} />
                </div>
                <span className="text-xl font-bold">BloodCare</span>
              </div>
              <div className="flex gap-6 text-sm">
                <Link href="#" className="hover:text-red-400 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-red-400 transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-red-400 transition-colors">Contact Us</Link>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>© 2025 BloodCare. All rights reserved. Saving lives, one donation at a time.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Page;