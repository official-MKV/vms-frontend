import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import RequestList from "../Pages/RequestList";
import VisitorList from "../Pages/VisitorList";
import Login from "../Pages/Login";
import StaffApp from "../Components/StaffApp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const AttendantApp = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[70px] bg-[#EAEFF9] flex items-center justify-between px-[100px]">
        <div className="text-[13px] flex gap-4">
          <NavLink
            to={"/attendant/visitor-list"}
            className={({ isActive, isPending }) =>
              isActive && "text-[#4285F4] underline"
            }
          >
            Visitor List
          </NavLink>
        </div>
        <h1 className="font-semibold text-[24px]">Visitor Management System</h1>
        <div className="px-[10px] py-[5px] border-[2px] font-medium rounded-md border-[#4D7CC1] text-[#4D7CC1] cursor-pointer">
          Logout
        </div>
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/visitor-list" element={<VisitorList />} />
          <Route path="/request-list" element={<RequestList />} />
          <Route path="/" element={<Navigate to="visitor-list" />} />
        </Routes>
      </div>
    </div>
  );
};

const VMS = () => {
  const [verified, setVerified] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = queryClient.getQueryData(["user"]);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ToastContainer />
      <Routes>
        <Route path="/staff" element={<StaffApp />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/attendant/*" element={<AttendantApp />} />
      </Routes>
    </div>
  );
};

export default VMS;
