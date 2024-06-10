import React from "react";
import { Link } from "react-router-dom";
import ScheduledVisits from "./ScheduledVisits";
import VisitorRequests from "./VisitorRequests";
import profile from "../assets/profile.png";
import { IoMdMore } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import Calendar from "./Calendar";
import Register from "./Register";
import { useState } from "react";

function StaffApp() {
  const [register, setRegister] = useState(false);
  const [currentdate, setCurrentDate] = useState(null);
  const events = {
    "2024-06-10": [{ title: "Event 1" }],
    "2024-06-15": [{ title: "Event 2" }],
    "2024-06-20": [{ title: "Event 3" }],
  };
  return (
    <div className="relative w-full h-full flex flex-col   gap-4 ">
      {register && (
        <Register
          close={() => {
            setRegister(false);
          }}
        />
      )}
      <div
        id="header"
        className="relative top-0  w-full  min-h-[65px]  max-h-[70px] bg-[#EAEFF9] flex items-center justify-between px-[20px]"
      >
        <span className="font-bold text-[20px]">VMS</span>
        <div className="min-w-[100px] px-[10px] h-[50px] bg-[#585959] rounded-full flex items-center gap-4 text-[white] ">
          <div className="size-[40px] relative rounded-full overflow-hidden">
            <img
              src={profile}
              className="w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="font-meidum">Jane Derrick</div>
          <div className="text-[20px]">
            <IoMdMore className="text-[25px]" />
          </div>
        </div>
      </div>
      <div
        id="schedule_button"
        className=" flex w-full justify-end px-[20px] cursor-pointer"
        onClick={() => {
          setRegister(true);
        }}
      >
        <div className=" py-[10px]  rounded-full  font-light gap-3 flex text-white items-center px-[20px] bg-[#4285F4]">
          <span> Schedule a Visit</span>
          <IoMdPersonAdd />
        </div>
      </div>
      <div className="w-full flex px-[20px] gap-[20px]">
        <div className="w-full ">
          <ScheduledVisits />
        </div>
        <div className="relative w-full flex flex-col gap-4 pb-[100px] ">
          <VisitorRequests />
          <div className="flex bg-[#F6F8FB] gap-3 p-[20px]">
            <Calendar events={events} />
            <div className="w-1/2 h-full bg-[white] ">
              <div className="w-full bg-[#4285F41A] px-[10px]  h-[50px]  flex  items-center font-bold bg-opacity-10">
                Friday, 12 Jan
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffApp;
