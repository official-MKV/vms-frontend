import React, { useState } from "react";
import Popup from "./Popup";

const Register = ({ close }) => {
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

  const handleRegister = async () => {
    console.log(formData);
    try {
      const response = await fetch(
        "http://192.168.167.83:8000/api/registerVisitor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Registration successful");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Popup close={close}>
      <div className="bg-white w-[40vw] h-[70vh] rounded-xl px-[20px] py-[50px]">
        <div className="flex flex-wrap gap-5">
          <div>
            <span className="font-bold text-[17px]">Visitor Details</span>
            <div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Surname</label>
                  <input
                    name="lastName"
                    placeholder="Surname"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
                <span>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Phone Number</label>
                  <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
                <span>
                  <label>Email Address</label>
                  <input
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Organization</label>
                  <input
                    name="organization"
                    placeholder="Organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Visit Date</label>
                  <input
                    name="visitDate"
                    placeholder="Visit Date"
                    type="date"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Visit Time</label>
                  <input
                    name="visitTime"
                    placeholder="Visit Time"
                    type="time"
                    value={formData.visitTime}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-[17px]">Staff Details</span>
            <div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Whom to See</label>
                  <input
                    name="whomToSeeInput"
                    placeholder="Full Name"
                    value={formData.whomToSeeInput}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
                <span>
                  <label>Department</label>
                  <input
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <label>Cause of Visit:</label>
              <div className="flex gap-3">
                <Option
                  value="Excursion"
                  handleChange={handleChange}
                  formData={formData}
                />
                <Option
                  value="Personal"
                  handleChange={handleChange}
                  formData={formData}
                />
                <Option
                  value="Marketing"
                  handleChange={handleChange}
                  formData={formData}
                />
                <Option
                  value="Official"
                  handleChange={handleChange}
                  formData={formData}
                />
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center text-white bg-[#4285F4] w-[70%] py-[5px] rounded-full cursor-pointer"
            onClick={handleRegister}
          >
            Schedule a visit
          </div>
        </div>
      </div>
    </Popup>
  );
};

const Option = ({ value, handleChange, formData }) => {
  return (
    <div
      className={`rounded-full px-[5px] py-[4px] border-[1px] border-black cursor-pointer ${
        formData.reason === value ? "bg-[#4285F4] text-white" : ""
      }`}
      onClick={() => handleChange({ target: { name: "reason", value } })}
    >
      <span>{value}</span>
    </div>
  );
};

export default Register;
