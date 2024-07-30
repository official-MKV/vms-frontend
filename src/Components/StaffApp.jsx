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
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

function StaffApp() {
  const [register, setRegister] = useState(false);
  const getFormattedDate = (date) => {
    if (!date || isNaN(date.getTime())) {
      // console.error("Invalid date provided:", date);
      return format(new Date(), "EEEE, dd MMMM");
    }

    return format(date, "EEEE, dd MMMM");
  };
  const [currentdate, setCurrentDate] = useState(null);

  const requests = [
    {
      name: "Makplang Vem",
      date: "Monday, May 6",
      time: "10:00 AM",
      org: "Covenant University",
      type: "Official",
      gender: "Male",
      email: "makplangvem666@gmail.com",
    },
    {
      name: "Ifeoma Abajogu",
      date: "Friday, May 10",
      time: "1:00 PM",
      org: "Baze University",
      type: "Official",
      gender: "Female",
      email: "ifeomaabajogu@gmail.com",
    },
  ];
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
      <div className="w-full flex h-screen px-[20px] gap-[20px]">
        <div className="w-full h-full">
          <ScheduledVisits />
        </div>
        <div className="relative w-full flex flex-col gap-4 pb-[100px] ">
          <VisitorRequests />
          <div className="flex bg-[#F6F8FB] gap-3 p-[20px]">
            <Calendar events={events} onDateClick={setCurrentDate} />
            <div className="w-1/2 h-full bg-[white] ">
              <div className="w-full bg-[#4285F41A] px-[10px]  h-[50px]  flex  items-center font-bold bg-opacity-10">
                {getFormattedDate(currentdate)}
              </div>
              <div className="flex flex-col">
                {requests.map((item) => {
                  return (
                    <div className="w-full h-[80px] relative border-b-[1px] border-[gray]/20 ">
                      <div
                        className={`w-[5px] h-full bg-[#4285F4] absolute left-0  `}
                      />
                      <div className="px-[20px] py-[10px]">
                        <div className="flex gap-3 items-center justify-between">
                          <div className="flex gap-3 items-center">
                            <FaRegCalendarAlt />
                            <p className="text-[15px] font-bold">{item.name}</p>
                          </div>

                          <span className="font-bold text-[15px]">
                            {item.time}
                          </span>
                        </div>

                        <span className=" pl-[26px] text-[12px] text-[gray]/40 font-medium">
                          {item.org}.{item.reason}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffApp;
