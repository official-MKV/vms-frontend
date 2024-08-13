import React, { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPersonAddOutline, IoEnter } from "react-icons/io5";
import Table from "../Components/Table";
import Register from "../Components/Register";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../config";

const VisitorList = () => {
  const [active, setActiveView] = useState("approved");
  const [registerPopUp, setRegisterPopUp] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const fetchVisitors = async (isApproved) => {
    const response = await axios.get(
      `${config.REACT_APP_API_URL}/api/visitorList?isApproved=${isApproved}&checkOut=False`
    );
    return response.data;
  };

  const { data: approvedList, isLoading: approvedListLoading } = useQuery({
    queryKey: ["visitorList", true],
    queryFn: () => fetchVisitors("True"),
  });

  const { data: waitingList, isLoading: waitingListLoading } = useQuery({
    queryKey: ["visitorList", false],
    queryFn: () => fetchVisitors("False"),
  });

  const { mutate: checkIn, isLoading: checkInLoading } = useMutation({
    mutationFn: async (id) => {
      await axios.post(`${config.REACT_APP_API_URL}/api/checkin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["visitorList"]);
    },
  });

  const { mutate: checkOut, isLoading: checkOutLoading } = useMutation({
    mutationFn: async (id) => {
      await axios.post(`${config.REACT_APP_API_URL}/api/checkout/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["visitorList"]);
    },
  });

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  }, []);

  const filteredData = (
    active === "approved" ? approvedList : waitingList
  )?.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchQuery) ||
      item.lastName.toLowerCase().includes(searchQuery) ||
      item.phoneNumber.includes(searchQuery)
  );

  if (
    approvedListLoading ||
    waitingListLoading ||
    checkInLoading ||
    checkOutLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-[50px] flex flex-col items-center">
      {registerPopUp && <Register close={() => setRegisterPopUp(false)} />}
      <div className="w-[50%] py-[10px] items-center flex bg-[#EAEFF9] rounded-md px-[10px] text-[#696969]">
        <TabButton
          label="Approved List"
          isActive={active === "approved"}
          onClick={() => setActiveView("approved")}
        />
        <TabButton
          label="Waiting List"
          isActive={active === "waiting"}
          onClick={() => setActiveView("waiting")}
        />
      </div>

      <div className="mt-[20px] flex items-center w-[40%] h-[40px] gap-2 border-[1px] border-black rounded-full px-[20px]">
        <FaSearch />
        <input
          className="w-full h-full focus:outline-none"
          type="text"
          onChange={handleSearch}
          placeholder="Search by Name or Phone"
        />
        <button
          onClick={() => setRegisterPopUp(true)}
          className="text-white bg-[#4285F4] rounded-full py-[9px] px-[13px] flex gap-2 items-center cursor-pointer absolute right-10"
        >
          <span>Schedule a visit</span>
          <span className="font-bold text-[25px]">
            <IoPersonAddOutline />
          </span>
        </button>
      </div>
      <TableView
        tableData={filteredData}
        checkIn={checkIn}
        checkOut={checkOut}
      />
    </div>
  );
};

const TabButton = ({ label, isActive, onClick }) => (
  <div
    className={`${
      isActive ? "bg-[#4285F4] text-white" : ""
    } w-[50%] flex justify-center cursor-pointer py-[5px] rounded-md`}
    onClick={onClick}
  >
    {label}
  </div>
);

const TableView = ({ tableData, checkIn, checkOut }) => (
  <div className="mt-[50px] overflow-x-hidden relative w-full px-[30px]">
    <Table
      head={[
        "S/N",
        "First Name",
        "Last Name",
        "Phone Number",
        "Whom To See",
        "Department",
        "Reason",
        "Organization Represented",
        "Actions",
      ]}
    >
      {tableData?.map((item, key) => (
        <TableRow
          key={item.id}
          data={item}
          counter={key}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      ))}
    </Table>
  </div>
);

const TableRow = ({ data, counter, checkIn, checkOut }) => {
  const [checkedIn, setCheckIn] = useState(data.checkedIn);

  const handleCheckIn = () => {
    checkIn(data.id);
    setCheckIn(true);
  };

  const handleCheckOut = () => {
    checkOut(data.id);
    setCheckIn(false);
  };

  return (
    <tr
      className={`group/row h-[80px] text-center ${
        counter % 2 === 0 ? "bg-[#C8DCFF]/20" : ""
      } relative overflow-x-hidden`}
    >
      <td>{counter + 1}</td>
      <td className="px-[10px] py-[10px] font-semibold text-center">
        {data.firstName}
      </td>
      <td className="px-[10px] py-[10px] font-semibold text-center">
        {data.lastName}
      </td>
      <td className="px-[10px] py-[10px] font-semibold text-center">
        {data.phoneNumber}
      </td>
      <td className="px-[10px] py-[10px] font-semibold text-center">
        {`${data.whomToSee.firstName}, ${data.whomToSee.lastName}`}
      </td>
      <td className="px-[10px] py-[10px] font-semibold text-center">
        {data.department?.departmentName}
      </td>
      <td className="px-[10px] py-[10px] font-semibold text-center">
        {data.reason}
      </td>
      <td className="px-[10px] py-[10px] font-semibold text-center">
        {data.organization}
      </td>
      <td className="text-center">
        <button
          onClick={!checkedIn ? handleCheckIn : handleCheckOut}
          className={`group/button relative ${
            !checkedIn
              ? "transition-all duration-700 ease-in-out bg-[#4285F4]/20 translate-x-[300px] group-hover/row:translate-x-0 text-[gray]/30"
              : "text-[black]/70 border-[1px] border-[gray]/20 bg-white drop-shadow-md"
          } justify-center py-[5px] w-[100px] rounded-[4px] flex gap-2 items-center cursor-pointer hover:text-white text-[12px] hover:bg-[#4285F4]`}
        >
          <span>
            <IoEnter />
          </span>
          <span className="relative">
            <span className="">{!checkedIn ? "Check In" : "Checked In"}</span>
            {checkedIn && (
              <span
                onClick={handleCheckOut}
                className="absolute inset-0 bg-white group-hover/button:text-white text-black group-hover/button:bg-[#4285F4]"
              >
                CheckOut
              </span>
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};

export default VisitorList;
