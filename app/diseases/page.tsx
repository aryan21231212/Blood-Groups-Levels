"use client";

import React from "react";
import { Activity, Heart, ArrowRight, Sparkles } from "lucide-react";

interface Disease {
  name: string;
  desc: string;
  link: string;
}

const diseases: Disease[] = [
  {
    name: "Anemia",
    desc: "A condition where you lack enough healthy red blood cells to carry oxygen.",
    link: "https://en.wikipedia.org/wiki/Anemia",
  },
  {
    name: "Thalassemia",
    desc: "An inherited blood disorder that causes your body to have less hemoglobin than normal.",
    link: "https://en.wikipedia.org/wiki/Thalassemia",
  },
  {
    name: "Hemophilia",
    desc: "A rare disorder in which your blood doesn't clot normally due to lack of clotting factors.",
    link: "https://en.wikipedia.org/wiki/Hemophilia",
  },
  {
    name: "Leukemia",
    desc: "A type of cancer found in your blood and bone marrow, caused by rapid production of abnormal white blood cells.",
    link: "https://en.wikipedia.org/wiki/Leukemia",
  },
  {
    name: "Sickle Cell Disease",
    desc: "An inherited disorder that causes red blood cells to become misshapen and break down.",
    link: "https://en.wikipedia.org/wiki/Sickle_cell_disease",
  },
];

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-20 px-6">
      {/* Header section */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center mb-4">
          <Heart className="text-red-600 w-12 h-12 mr-4" fill="currentColor" />
          <h1 className="text-4xl md:text-5xl font-bold text-red-700">
            Blood-Related Diseases
          </h1>
          <Heart className="text-red-600 w-12 h-12 ml-4" fill="currentColor" />
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
          Learn about various blood-related conditions and disorders that affect millions worldwide.
        </p>
      </div>

      {/* Disease cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {diseases.map((disease, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
          >
            {/* Card background effect */}
            <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-red-100 rounded-full"></div>
            
            {/* Icon */}
            <div className="relative mb-4">
              <Activity className="text-red-600 w-10 h-10" />
            </div>
            
            <h4 className="text-xl font-bold text-red-700 mb-3">
              {disease.name}
            </h4>
            <p className="text-gray-600 mb-5 leading-relaxed">
              {disease.desc}
            </p>
            <a
              href={disease.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-all duration-300 group"
            >
              <span className="mr-2 font-medium">Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>

      {/* Additional information section */}
      <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex items-start">
          <div className="bg-red-100 p-3 rounded-full mr-4 flex-shrink-0">
            <Sparkles className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-3">Understanding Blood Disorders</h3>
            <p className="text-gray-600">
              Blood disorders can affect any of the three main components of blood: red blood cells, which carry oxygen to the bodys tissues; white blood cells, which fight infections; and platelets, which help blood to clot. Many blood disorders are inherited, while others may develop as a result of other diseases, medications, or a lack of certain nutrients in your diet.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-6">Want to learn how you can help those affected by blood disorders?</p>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 flex items-center mx-auto">
          <Heart className="w-5 h-5 mr-2" fill="white" />
          Find Donation Opportunities
        </button>
      </div>
    </div>
  );
};

export default Page;