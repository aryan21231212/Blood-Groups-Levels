"use client"
import React, { useState, useEffect } from "react";

const BloodLevelsPage: React.FC = () => {
  // Example blood level data with status indicators
  const [bloodLevels, setBloodLevels] = useState([
    { group: "A+", units: 15, status: "adequate" },
    { group: "A-", units: 7, status: "low" },
    { group: "B+", units: 20, status: "good" },
    { group: "B-", units: 5, status: "critical" },
    { group: "AB+", units: 10, status: "adequate" },
    { group: "AB-", units: 4, status: "critical" },
    { group: "O+", units: 25, status: "good" },
    { group: "O-", units: 8, status: "low" },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  // Determine status color and message
  const getStatusInfo = (status: string) => {
    switch(status) {
      case "critical":
        return { color: "bg-red-500", text: "Critical", pulse: "animate-pulse" };
      case "low":
        return { color: "bg-orange-500", text: "Low", pulse: "" };
      case "adequate":
        return { color: "bg-yellow-500", text: "Adequate", pulse: "" };
      case "good":
        return { color: "bg-green-500", text: "Good", pulse: "" };
      default:
        return { color: "bg-gray-500", text: "Unknown", pulse: "" };
    }
  };

  // Blood drop animation component
  const BloodDrop = () => (
    <div className="relative w-6 h-8">
      <div className="absolute w-6 h-6 bg-red-500 rounded-full bottom-0"></div>
      <div className="absolute w-4 h-6 bg-red-500 rounded-b-full left-1"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12 px-6">
      {/* Header with animation */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <div className="animate-bounce">
            <BloodDrop />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-red-700 mx-4">
            Current Blood Inventory Levels
          </h1>
          <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            <BloodDrop />
          </div>
        </div>
        <p className="text-gray-600">
          Last updated: {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
        </p>
      </div>

      {isLoading ? (
        // Loading state
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center animate-pulse"
            >
              <div className="h-7 w-12 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-100 rounded mt-3"></div>
            </div>
          ))}
        </div>
      ) : (
        // Blood levels grid
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {bloodLevels.map((item) => {
            const statusInfo = getStatusInfo(item.status);
            return (
              <div
                key={item.group}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                {/* Status indicator */}
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${statusInfo.color} ${statusInfo.pulse}`}></div>
                
                <h2 className="text-xl font-bold text-red-600">{item.group}</h2>
                <p className="text-gray-600 mt-2">{item.units} units</p>
                
                {/* Visual blood level indicator */}
                <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <div 
                    className={`h-full ${statusInfo.color} transition-all duration-1000`}
                    style={{ width: `${Math.min(item.units * 4, 100)}%` }}
                  ></div>
                </div>
                
                <span className={`text-xs font-medium mt-2 ${statusInfo.color.replace('bg-', 'text-')}`}>
                  {statusInfo.text}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">Inventory Status Legend</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs">Good (20+ units)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-xs">Adequate (10-19 units)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-xs">Low (5-9 units)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-xs">Critical (&lt;5 units)</span>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-600 mt-10 text-sm">
        Data is updated every 24 hours. Please check before scheduling donations.
      </p>

      {/* Urgent call to action for critical levels */}
      {bloodLevels.some(item => item.status === "critical") && (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center animate-pulse">
          <h3 className="text-red-700 font-semibold">Urgent Need for Donors!</h3>
          <p className="text-red-600 text-sm mt-1">
            Critical levels detected for {bloodLevels.filter(item => item.status === "critical").map(item => item.group).join(', ')}.
            Please consider donating if eligible.
          </p>
        </div>
      )}
    </div>
  );
};

export default BloodLevelsPage;