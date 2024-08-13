// ScheduledVisits.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { useEffect } from "react";

const initialAppointments = [
  {
    date: "Tue May 7",
    time: "11:30 AM",
    name: "Ayodele Damilare",
    organization: "Truck Central",
    reason: "Personal",
  },
  {
    date: "Fri May 17",
    time: "1:00 PM",
    name: "Olika Ashley",
    organization: "Afe Babalola University",
    reason: "Excursion",
  },
  {
    date: "Mon May 13",
    time: "10:00 AM",
    name: "Makplang Vem",
    organization: "Covenant University",
    reason: "Official",
  },
  {
    date: "Fri May 17",
    time: "1:00 PM",
    name: "Olika Ashley",
    organization: "Afe Babalola University",
    reason: "Excursion",
  },
];

const initialHistory = [
  // Add some history data here if needed
];

function ScheduledVisits({ scheduledVisits, open, historyVisits }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [history, setHistory] = useState(initialHistory);
  const [activeTab, setActiveTab] = useState("appointments");
  const [visits, setVisits] = useState();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    setVisits(scheduledVisits);
  }, [scheduledVisits]);

  const renderVisits = (visits) => {
    return visits?.map((visit, index) => (
      <div
        key={index}
        className=" w-[600px] h-[170px] relative bg-white  rounded-[10px] flex overflow-hidden border-b"
      >
        <div className="h-full w-[20px] bg-[#47B399]" />
        <div className="p-4 w-full relative">
          {/* <div className="w-full h-2 rounded-full bg-gray-200 flex-shrink-0"></div> */}
          <div className="relative flex flex-col w-full gap-2 mb-[10px]">
            <div className=" items-center flex w-full justify-between text-[#939496]">
              <span className="text-[14px]">Appointment Date</span>
              <span>
                <IoMdMore className="text-[25px]" />
              </span>
            </div>

            <div className="text-[black] gap-3 flex items-center font-medium">
              <div className="flex items-center">
                <FaRegClock />
              </div>
              <div className="text-[14px]">
                {visit.visitor.visitDate} • {visit.visitor.visitTime}
              </div>
            </div>
          </div>
          <div className="h-[2px] bg-[#EEEEEE] w-[70%] " />
          <div className="mt-[10px]">
            <div className="font-bold">
              {visit.visitor.lastName},{visit.visitor.firstName}
            </div>
            <div className="text-gray-500">
              {visit.visitor.organization} • {visit.visitor.reason}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="relative h-full mb-[100px]  overflow-y-scroll bg-[#F6F8FB] flex items-center flex-col p-4 rounded shadow scrollbar-thumb-h-3">
      <div className="relative bg-white flex w-[80%] mb-4">
        <button
          className={`py-2 px-4 flex-1 ${
            activeTab === "appointments"
              ? "bg-blue-500 text-white"
              : "bg-white text-[#696969] "
          } rounded`}
          onClick={() => handleTabClick("appointments")}
        >
          Appointments
        </button>
        <button
          className={`py-2 px-4 flex-1 ${
            activeTab === "history"
              ? "bg-blue-500 text-white"
              : "bg-white  text-[#696969]"
          } rounded`}
          onClick={() => handleTabClick("history")}
        >
          History
        </button>
      </div>
      <div className="w-full flex flex-col gap-[10px]">
        {activeTab === "appointments"
          ? renderVisits(visits)
          : renderVisits(historyVisits)}
      </div>
      <div
        onClick={() => {
          open();
        }}
        className="text-blue-500 mt-4 block cursor-pointer"
      >
        Schedule a visit
      </div>
    </div>
  );
}

export default ScheduledVisits;
