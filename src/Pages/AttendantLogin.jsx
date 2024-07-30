import React from "react";
import { useState } from "react";
import Logo from "../assets/nigcomsatlogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AttendantLogin = () => {
  const [staffId, setStaffId] = useState(null);
  const [pass, setPass] = useState(null);
  const navigate = useNavigate();
  const Submit = async () => {
    const loginAttendant = async (staffId, pass) => {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify({
          user_id: staffId,
          password: pass,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("Login failed");
      }
    };

    try {
      const data = await loginAttendant(staffId, pass);
      console.log(data);
      localStorage.setItem("verified", true);
      navigate("/table");
    } catch (error) {
      toast.error(`Error Signing in:${error} `);
      console.error("Problem Signing In:", error);
    }
  };

  return (
    <div className=" w-full flex items-center justify-center flex-col gap-[50px]">
      <div className="flex flex-col items-center gap-3">
        <img className="" src={Logo} />
        <h1 className="text-3xl font-semibold">Enter your Login</h1>
      </div>

      <div className="w-[30%] flex flex-col gap-[25px]">
        <input
          value={staffId}
          onChange={(e) => {
            setStaffId(e.currentTarget.value);
          }}
          className=" px-[30px] py-[3px] rounded-md focus:outline-blue-500 border-[2px] border-black/40"
          placeholder="Staff Id"
          type="text"
          required
        />
        <input
          value={pass}
          onChange={(e) => {
            setPass(e.currentTarget.value);
          }}
          className=" px-[30px] py-[3px] rounded-md focus:outline-blue-500 border-[2px] border-black/40"
          placeholder="password"
          type="password"
          required
        />
        <button
          className=" px-[30px] py-[3px] rounded-md bg-blue-500 text-[white] "
          onClick={Submit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AttendantLogin;
