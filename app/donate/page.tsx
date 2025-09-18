"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  age: string; // keeping as string for input handling
  weight: string;
  email: string;
  phone: string;
  bloodGroup: string;
  healthStatus: boolean;
  certificate: File | null;
}

interface Errors {
  name?: string;
  age?: string;
  weight?: string;
  email?: string;
  phone?: string;
  bloodGroup?: string;
  healthStatus?: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    weight: "",
    email: "",
    phone: "",
    bloodGroup: "",
    healthStatus: false,
    certificate: null,
  });

  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age || Number(formData.age) < 17)
      newErrors.age = "Minimum age is 17";
    if (!formData.weight || Number(formData.weight) < 50)
      newErrors.weight = "Minimum weight is 50kg";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.phone || formData.phone.length < 10)
      newErrors.phone = "Valid phone number is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Select blood group";
    if (!formData.healthStatus)
      newErrors.healthStatus = "You must confirm you are healthy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        certificate: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Blood Donation Requirements
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10">
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Age:</strong> Minimum 17 years, no upper limit.</li>
          <li><strong>Weight:</strong> At least 50kg (110 pounds).</li>
          <li><strong>Health:</strong> Must be in good health, no alcohol/drugs.</li>
          <li><strong>ID:</strong> Valid photo ID required.</li>
          <li><strong>Nutrition:</strong> Eat healthy 4 hrs before donation, stay hydrated.</li>
          <li><strong>Medications:</strong> Some deferrals (HIV, ART, certain cancer).</li>
          <li><strong>Medical Procedures:</strong> Wait 7 days after dental work, 3 months after transfusion.</li>
          <li><strong>Travel/Disease Exposure:</strong> Malaria/COVID-19 may defer donation.</li>
          <li><strong>Other:</strong> Tattoos/piercings with non-sterile equipment → 3 months deferral.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        Donor Registration Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-xl space-y-5"
      >
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name text-black"
            className="w-full border p-3 rounded text-black"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full border p-3 rounded text-black"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
        </div>

        {/* Weight */}
        <div>
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            className="w-full border p-3 rounded text-black"
            value={formData.weight}
            onChange={handleChange}
          />
          {errors.weight && (
            <p className="text-red-600 text-sm">{errors.weight}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded text-black"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded text-black"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <select
            name="bloodGroup"
            className="w-full border p-3 rounded text-black"
            value={formData.bloodGroup}
            onChange={handleChange}
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
              (group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              )
            )}
          </select>
          {errors.bloodGroup && (
            <p className="text-red-600 text-sm">{errors.bloodGroup}</p>
          )}
        </div>

        {/* Health Confirmation */}
        <div className="flex items-center gap-2 text-black">
          <input
            type="checkbox"
            name="healthStatus"
            checked={formData.healthStatus}
            onChange={handleChange}
          />
          <label htmlFor="healthStatus text-black">I confirm that I am in good health</label>
        </div>
        {errors.healthStatus && (
          <p className="text-red-600 text-sm">{errors.healthStatus}</p>
        )}

        {/* Doctor Certificate Upload */}
        <div>
          <label className="block mb-2 font-medium text-black">
            Upload Doctor's Certificate (optional)
          </label>
          <input
            type="file"
            name="certificate"
            accept="image/*,.pdf"
            className="w-full border p-2 rounded text-black"
            onChange={handleChange}
          />
          {formData.certificate && (
            <p className="text-green-600 text-sm mt-1">
              {formData.certificate.name} uploaded ✅
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
