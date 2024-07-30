import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import Table from "../Components/Table";
import Register from "../Components/Register";
import { waitingList } from "../data";
import { MdBorderColor } from "react-icons/md";
const RequestList = () => {
  const [active, setActive] = useState("waiting");
  const activeStyle = "bg-[#4285F4] text-white py-[5px] rounded-md ";
  const [registerPopUp, setRegisterPopUp] = useState(false);
  const [tableData, setTableData] = useState(waitingList);
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

  return (
    <div className="mt-[50px] flex flex-col items-center">
      {registerPopUp && <Register close={() => setRegisterPopUp(false)} />}

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
      <div className="mt-[50px]">
        <Table
          head={[
            "S/N",
            "Name",
            "Phone Number",
            "Reason",
            "Whom To See",
            "Department",
            "Email",
            "Organization Represented",
          ]}
        >
          {tableData.map((item, key) => {
            return <TableRow data={item} counter={key} />;
          })}
        </Table>
      </div>
    </div>
  );
};

const TableRow = ({ data, counter }) => {
  const dataarray = [];
  console.log(counter);
  for (const [key, value] of Object.entries(data)) {
    dataarray.push(value);
  }

  return (
    <tr className={`  ${counter % 2 == 0 && "bg-[#C8DCFF]/50"}`}>
      <td>{counter + 1}</td>
      {dataarray.map((item, key) => {
        return (
          <td className={`px-[30px] py-[10px] font-semibold $`}>{item}</td>
        );
      })}
    </tr>
  );
};
export default RequestList;
