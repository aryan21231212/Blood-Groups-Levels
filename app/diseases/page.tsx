"use client";

import React from "react";
import { Activity } from "lucide-react";

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
    desc: "A rare disorder in which your blood doesn’t clot normally due to lack of clotting factors.",
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-20 px-10">
      <h3 className="text-3xl font-bold text-center mb-12 text-red-700">
        Blood-Related Diseases
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {diseases.map((disease, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <Activity className="text-red-600 w-12 h-12 mb-4" />
            <h4 className="text-xl font-bold text-red-700 mb-2">
              {disease.name}
            </h4>
            <p className="text-gray-600 mb-4">{disease.desc}</p>
            <a
              href={disease.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
