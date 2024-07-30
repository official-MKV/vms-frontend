import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import Table from "../Components/Table";
import Register from "../Components/Register";
import { waitingList } from "../data";
import { MdBorderColor } from "react-icons/md";
import { useEffect } from "react";

const VisitorList = () => {
  const [active, setActiveView] = useState("approved");
  const activeStyle = "bg-[#4285F4] text-white py-[5px] rounded-md ";
  const [registerPopUp, setRegisterPopUp] = useState(false);
  const [approvedList, setApprovedList] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchApprovedList = async () => {
      try {
        const response = await fetch(
          "http://192.168.167.83:8000/api/visitorList?isApproved=True&checkOut=False"
        );

        if (response.ok) {
          const data = await response.json();
          setApprovedList(data);
          setTableData(approvedList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWaitingList = async () => {
      try {
        const response = await fetch(
          "http://192.168.167.83:8000/api/visitorList?isApproved=False&checkOut=False"
        );
        if (response.ok) {
          const data = await response.json();
          setWaitingList(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchWaitingList();
    fetchApprovedList();
  }, []);

  const handleSearch = (e) => {
    const query = e.currentTarget.value;
    if (query.length != 0) {
      const filteredData = tableData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(query);
      console.log(filteredData);
      setTableData(filteredData);
    } else {
      setTableData(waitingList);
    }
  };

  const setActive = (data) => {
    setActiveView(data);
    if (data == "approved") {
      setTableData(approvedList);
    }
    if (data == "waiting") {
      setTableData(waitingList);
    }
  };

  return (
    <div className="mt-[50px] flex flex-col items-center">
      {registerPopUp && <Register close={() => setRegisterPopUp(false)} />}
      <div className=" w-[50%] py-[10px]  items-center  flex bg-[#EAEFF9] rounded-md px-[10px] text-[#696969] ">
        <div
          className={`${
            active == "approved" && activeStyle
          } w-[50%] flex justify-center cursor-pointer`}
          onClick={() => {
            setActive("approved");
          }}
        >
          Approved List
        </div>
        <div
          className={`${
            active == "waiting" && activeStyle
          } w-[50%] flex justify-center cursor-pointer`}
          onClick={() => {
            setActive("waiting");
          }}
        >
          Waiting List
        </div>
      </div>

      <div className=" mt-[20px] flex items-center w-[40%] h-[40px] gap-2 border-[1px] border-black rounded-full px-[20px]">
        <FaSearch />
        <input
          className=" w-full h-full  focus:outline-none"
          type="text"
          onChange={handleSearch}
          placeholder="Search by Name or Phone"
        />
        <div
          onClick={() => {
            setRegisterPopUp(true);
          }}
          className="text-white bg-[#4285F4] rounded-full py-[9px] px-[13px] flex gap-2 items-center cursor-pointer absolute right-10"
        >
          <span>Schedule a visit</span>
          <span className="font-bold text-[25px]">
            <IoPersonAddOutline />
          </span>
        </div>
      </div>
      <TableView tableData={tableData} />
    </div>
  );
};

import { IoEnter } from "react-icons/io5";

const TableView = ({ tableData }) => {
  return (
    <div className="mt-[50px] overflow-x-hidden relative w-full px-[30px]">
      <Table
        head={[
          "S/N",
          "firstName",
          "lastName",
          "PhoneNumber",
          "Whom To See",
          "Department",
          "reason",

          "Organization Represented",
        ]}
      >
        {tableData.length > 0 &&
          tableData?.map((item, key) => {
            return <TableRow data={item} counter={key} />;
          })}
      </Table>
    </div>
  );
};
const TableRow = ({ data, counter }) => {
  const dataarray = [];
  const head = [
    "firstName",
    "lastName",
    "phoneNumber",
    "whomToSee",
    "department",
    "reason",
    "organization",
  ];

  for (const [key, value] of Object.entries(data)) {
    dataarray.push(value);
  }
  const id = data["id"];
  const [checkedIn, setCheckIn] = useState(false);
  const checkIn = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/checkin/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        setCheckIn(true);
      }
    } catch (error) {}
  };
  const checkOut = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/checkout/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        setCheckIn(false);
      }
    } catch (error) {}
  };

  return (
    <tr
      className={`group/row h-[80px] text-center ${
        counter % 2 === 0 ? "bg-[#C8DCFF]/20" : ""
      } relative overflow-x-hidden`}
    >
      <td>{counter + 1}</td>
      {head.map((item, key) => (
        <td key={key} className="px-[10px] py-[10px] font-semibold text-center">
          {item === "whomToSee"
            ? `${data[item].firstName},${data[item].lastName}`
            : item === "department"
            ? data[item]?.departmentName
            : data[item] ?? "-"}
        </td>
      ))}
      <td className="text-center">
        <div
          onClick={!checkedIn && checkIn}
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
                onClick={checkOut}
                className="absolute inset-0 bg-white group-hover/button:text-white text-black group-hover/button:bg-[#4285F4]"
              >
                CheckOut
              </span>
            )}
          </span>
        </div>
      </td>
    </tr>
  );
};

export default VisitorList;
