import React from "react";

const BloodLevelsPage: React.FC = () => {
  // Example blood level data (you can fetch this dynamically later)
  const bloodLevels = [
    { group: "A+", units: 15 },
    { group: "A-", units: 7 },
    { group: "B+", units: 20 },
    { group: "B-", units: 5 },
    { group: "AB+", units: 10 },
    { group: "AB-", units: 4 },
    { group: "O+", units: 25 },
    { group: "O-", units: 8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
        Current Blood Levels
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {bloodLevels.map((item) => (
          <div
            key={item.group}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold text-red-600">{item.group}</h2>
            <p className="text-gray-600 mt-2">{item.units} units</p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-600 mt-10 text-sm">
        Data is updated every 24 hours. Please check before scheduling donations.
      </p>
    </div>
  );
};

export default BloodLevelsPage;
