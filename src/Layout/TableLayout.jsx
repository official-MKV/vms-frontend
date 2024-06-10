import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import VisitorList from "../Pages/VisitorList";

const TableLayout = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[70px] bg-[#EAEFF9] flex  items-center justify-between px-[100px]">
        <div className="text-[13px] flex gap-4">
          <NavLink to={"/table/visitor-list"}>Visitor List</NavLink>
          <NavLink to={"/table/request-list"}>Request List</NavLink>
        </div>
        <h1 className="font-semibold text-[24px]">Visitor Management System</h1>
        <div className="px-[10px] py-[5px] border-[2px] font-medium rounded-md border-[#4D7CC1] text-[#4D7CC1] cursor-pointer">
          Logout
        </div>
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/visitor-list" element={<VisitorList />} />
          <Route path="/request-list" element={<VisitorList />} />
        </Routes>
      </div>
    </div>
  );
};

export default TableLayout;
