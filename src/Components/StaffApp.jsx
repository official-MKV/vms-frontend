import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { IoMdMore, IoMdPersonAdd } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import ScheduledVisits from "./ScheduledVisits";
import VisitorRequests from "./VisitorRequests";
import Calendar from "./Calendar";
import Register from "./Register";
import profile from "../assets/profile.png";
import config from "../config";

const API_BASE_URL = config.REACT_APP_API_URL;

function StaffApp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [staff, setStaff] = useState(null);
  const [register, setRegister] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const user = queryClient.getQueryData(["user"]);
    if (user?.is_staff !== true) {
      navigate("/signin");
    } else {
      setStaff(user);
    }
  }, [queryClient, navigate]);

  const fetchVisitorRequests = async ({ status, staff_id }) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/visitRequestList/?staff_id=${staff_id}&status=${status}`
    );
    return response.data;
  };

  const fetchVisitorAppointments = async ({ status, staff_id }) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/visitRequestList/?staff_id=${staff_id}&status=${status}&view_type=appointments`
    );
    return response.data;
  };

  const { data: pendingRequests } = useQuery({
    queryKey: ["visitorRequests", "Pending", staff?.user_id],
    queryFn: () =>
      fetchVisitorRequests({ status: "Pending", staff_id: staff?.user_id }),
    enabled: !!staff?.user_id,
  });

  const { data: visitsHistory, error: historyError } = useQuery({
    queryKey: ["History", "Approved", staff?.user_id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/visitRequestList/?staff_id=${staff?.user_id}&status=Approved&view_type=history`
      );
      return response.data;
    },
    enabled: !!staff?.user_id,
    onError: (error) => {
      console.error("Error fetching visit history:", error);
    },
  });

  const { data: approvedVisits, isLoading: approvedVisitsLoading } = useQuery({
    queryKey: ["visitorRequests", "Approved", staff?.user_id],
    queryFn: () =>
      fetchVisitorAppointments({
        status: "Approved",
        staff_id: staff?.user_id,
      }),
    enabled: !!staff?.user_id,
  });

  const getFormattedDate = (date) => {
    if (!date || isNaN(date.getTime())) {
      return format(new Date(), "EEEE, dd MMMM");
    }
    return format(date, "EEEE, dd MMMM");
  };

  const fixedEvents = approvedVisits?.reduce((events, visit) => {
    const { visitDate, firstName, lastName, reason, visitTime } = visit.visitor;
    const title = `${firstName} ${lastName}`;
    if (!events[visitDate]) {
      events[visitDate] = [];
    }
    events[visitDate].push({ title, reason, time: visitTime });
    return events;
  }, {});

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-full flex flex-col gap-4">
      {register && <Register close={() => setRegister(false)} />}
      <div
        id="header"
        className="relative top-0 w-full min-h-[65px] max-h-[70px] bg-[#EAEFF9] flex items-center justify-between px-[20px]"
      >
        <span className="font-bold text-[20px]">VMS</span>
        <div className="min-w-[100px] px-[10px] h-[50px] bg-[#585959] rounded-full flex items-center gap-4 text-[white]">
          <div className="size-[40px] relative rounded-full overflow-hidden">
            <img
              src={profile}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
          <div className="font-medium">
            {staff.first_name}, {staff.last_name}
          </div>
          <div className="text-[20px]">
            <IoMdMore className="text-[25px]" />
          </div>
        </div>
      </div>
      <div
        id="schedule_button"
        className="flex w-full justify-end px-[20px] cursor-pointer"
        onClick={() => setRegister(true)}
      >
        <div className="py-[10px] rounded-full font-light gap-3 flex text-white items-center px-[20px] bg-[#4285F4]">
          <span>Schedule a Visit</span>
          <IoMdPersonAdd />
        </div>
      </div>
      <div className="w-full flex h-[120vh] px-[20px] gap-[20px]">
        <div className="w-full max-h-[120vh] pb-[100px]">
          <ScheduledVisits
            scheduledVisits={approvedVisits}
            historyVisits={visitsHistory}
            close={() => setRegister(false)}
          />
        </div>
        <div className="relative w-full max-h-[120vh] flex flex-col gap-4 pb-[100px]">
          <VisitorRequests
            pendingRequests={pendingRequests}
            open={() => setRegister(true)}
          />
          <div className="flex bg-[#F6F8FB] gap-3 p-[20px] max-h-[60vh] relative overflow-hidden">
            <Calendar events={fixedEvents} onDateClick={setCurrentDate} />
            <div className="w-1/2 h-full bg-[white]">
              <div className="w-full bg-[#4285F41A] px-[10px] h-[50px] flex items-center font-bold bg-opacity-10">
                {getFormattedDate(currentDate)}
              </div>
              <div className="flex flex-col">
                {/* {(fixedEvents[format(currentDate, "yyyy-MM-dd")] || []).map(
                  (visit, index) => (
                    <div
                      key={index}
                      className="w-full h-[80px] relative border-b-[1px] border-[gray]/20"
                    >
                      <div className="w-[5px] h-full bg-[#4285F4] absolute left-0" />
                      <div className="px-[20px] py-[10px]">
                        <div className="flex gap-3 items-center justify-between">
                          <div className="flex gap-3 items-center">
                            <FaRegCalendarAlt />
                            <p className="text-[15px] font-bold">
                              {visit.title}
                            </p>
                          </div>
                          <span className="font-bold text-[15px]">
                            {visit.time}
                          </span>
                        </div>
                        <span className="pl-[26px] text-[12px] text-[gray]/40 font-medium">
                          {visit.reason}
                        </span>
                      </div>
                    </div>
                  )
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffApp;
