"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface FormData {
  name: string;
  age: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const files = (e.target as HTMLInputElement).files;

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
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Simulate submission process
      setTimeout(() => {
        alert("Form submitted successfully!");
        console.log(formData);
        setIsSubmitting(false);
      }, 1500);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-10 px-6">
      {/* Animated Header Section */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Blood Donation Registration
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your donation can save up to 3 lives. Join us in making a difference today.
        </p>
      </div>

      {/* Requirements Card with Animation */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mb-12 transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-start">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-700 mb-4">Donation Requirements</h2>
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
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Form Header with Animation */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {/* <Image 
              src="https://media.giphy.com/media/3o7TKsQ8UQ4l4LhGz6/giphy.gif" 
              alt="Animated blood cells" 
              fill
              className="object-cover"
            /> */}
          </div>
          <h2 className="text-2xl font-bold text-white relative z-10">Donor Registration Form</h2>
          <p className="text-red-100 mt-2 relative z-10">Please fill all the details accurately</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-4 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-black`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Age and Weight in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                className={`w-full border ${errors.age ? 'border-red-500' : 'border-gray-300'} p-4 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-black`}
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                placeholder="Weight in kg"
                className={`w-full border ${errors.weight ? 'border-red-500' : 'border-gray-300'} p-4 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-black`}
                value={formData.weight}
                onChange={handleChange}
              />
              {errors.weight && <p className="text-red-600 text-sm mt-1">{errors.weight}</p>}
            </div>
          </div>

          {/* Email and Phone in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-4 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-black`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-4 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-black`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              className={`w-full border ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'} p-4 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-black`}
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
            {errors.bloodGroup && <p className="text-red-600 text-sm mt-1">{errors.bloodGroup}</p>}
          </div>

          {/* Health Confirmation */}
          <div>
            <div className={`flex items-center gap-3 p-4 rounded-lg ${errors.healthStatus ? 'bg-red-50 border border-red-500' : 'bg-gray-50'}`}>
              <input
                type="checkbox"
                name="healthStatus"
                id="healthStatus"
                checked={formData.healthStatus}
                onChange={handleChange}
                className="h-5 w-5 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="healthStatus" className="text-gray-700 font-medium">
                I confirm that I am in good health and meet all the donation requirements
              </label>
            </div>
            {errors.healthStatus && <p className="text-red-600 text-sm mt-1">{errors.healthStatus}</p>}
          </div>

          {/* Doctor Certificate Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Doctor&apos;s Certificate (optional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 transition-colors duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-500">
                    {formData.certificate ? formData.certificate.name : "Click to upload a file"}
                  </p>
                </div>
                <input 
                  type="file" 
                  name="certificate" 
                  accept="image/*,.pdf" 
                  className="hidden" 
                  onChange={handleChange} 
                />
              </label>
            </div>
            {formData.certificate && (
              <p className="text-green-600 text-sm mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {formData.certificate.name} uploaded successfully
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg text-white font-bold transition-all duration-300 flex items-center justify-center ${
                isSubmitting 
                  ? 'bg-red-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PROCESSING...
                </>
              ) : (
                <>
                  <div className="h-6 w-6 mr-2 relative">
                    {/* <Image 
                      src="https://media.giphy.com/media/3o7TKsQ8UQ4l4LhGz6/giphy.gif" 
                      alt="Heart animation" 
                      fill
                      className="object-contain"
                    /> */}
                  </div>
                  SUBMIT REGISTRATION
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-600">
        <p>Your donation matters. Thank you for being a lifesaver! ❤️</p>
      </div>
    </div>
  );
};

export default Page;