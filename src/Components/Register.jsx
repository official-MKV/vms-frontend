import React, { useState } from "react";
import Popup from "./Popup";
import config from "../config";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Register = ({ close }) => {
  const queryClient = useQueryClient();
  const [submit_url, setUrl] = useState(null);
  useEffect(() => {
    const staff = queryClient.getQueryData(["user"]);

    if (staff?.is_staff) {
      setUrl(`${config.REACT_APP_API_URL}/api/registerVisitor`);
    } else {
      setUrl(`${config.REACT_APP_API_URL}/api/registerVisitor`);
    }
  }, [queryClient]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    organization: "",
    department: "",
    isApproved: false,
    whomToSeeInput: "",
    numberOfGuest: 1,
    reason: "Official",
    visitDate: "",
    visitTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const registerVisitor = useMutation({
    mutationFn: async () => {
      console.log(formData);
      const response = await fetch(submit_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["visitorRequests", "Pending"],
      });

      queryClient.invalidateQueries(["visitorList"]);

      close(); // Close the popup after successful registration
    },
    onError: (error) => {
      alert(error.message || "An error occurred during registration");
    },
  });

  const handleRegister = () => {
    registerVisitor.mutate();
  };

  return (
    <Popup close={close}>
      <div
        className="bg-white w-full max-w-4xl rounded-xl p-6 md:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Schedule a Visit
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Visitor Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Surname"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <InputField
                label="Organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Visit Date"
                  name="visitDate"
                  type="date"
                  value={formData.visitDate}
                  onChange={handleChange}
                />
                <InputField
                  label="Visit Time"
                  name="visitTime"
                  type="time"
                  value={formData.visitTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Staff Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Whom to See"
                  name="whomToSeeInput"
                  value={formData.whomToSeeInput}
                  onChange={handleChange}
                />
                <InputField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cause of Visit
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Excursion", "Personal", "Marketing", "Official"].map(
                    (reason) => (
                      <Option
                        key={reason}
                        value={reason}
                        handleChange={handleChange}
                        formData={formData}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleRegister}
          >
            Schedule Visit
          </button>
        </div>
      </div>
    </Popup>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>
);

const Option = ({ value, handleChange, formData }) => {
  return (
    <div
      className={`rounded-full px-3 py-1 text-sm border border-gray-300 cursor-pointer transition-colors duration-200 ${
        formData.reason === value
          ? "bg-blue-600 text-white border-blue-600"
          : "hover:bg-gray-100"
      }`}
      onClick={() => handleChange({ target: { name: "reason", value } })}
    >
      <span>{value}</span>
    </div>
  );
};

export default Register;
