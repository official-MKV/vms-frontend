import React from "react";
import Popup from "./Popup";

const Register = ({ close }) => {
  return (
    <Popup close={close}>
      <div className="bg-white w-[40vw] h-[70vh] rounded-xl px-[20px] py-[50px]">
        <div className="flex flex-wrap gap-5">
          <div>
            <span className="font-bold text-[17px]">Visitor Details</span>
            <div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Surname</label>
                  <input
                    placeholder="Surname"
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
                <span>
                  <label>FirstName</label>
                  <input
                    placeholder="Firstname"
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Phone Number</label>
                  <input
                    placeholder="phone number"
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
                <span>
                  <label>Email Address</label>
                  <input
                    placeholder="Email Address"
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Organisation</label>
                  <input
                    placeholder="Organisation"
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-[17px]">Staff Details</span>
            <div>
              <div className="flex gap-2 w-full">
                <span>
                  <label>Whom to See</label>
                  <input
                    placeholder="Full Name"
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
                <span>
                  <label>Department</label>
                  <input
                    placeholder="Department"
                    className="focus:outline-none border-[1px] border-black rounded-md w-full px-[5px]"
                  />
                </span>
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <label>Cause of Visit:</label>
              <div className="flex gap-3">
                <Option value="Excursion" />
                <Option value="Personal" />
                <Option value="Marketing" />
                <Option value="Official" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center text-white bg-[#4285F4] w-[70%] py-[5px] rounded-full">
            Schedule a visit
          </div>
        </div>
      </div>
    </Popup>
  );
};
const Option = ({ value }) => {
  return (
    <div className="rounded-full px-[5px] py-[4px] border-[1px] border-black">
      <span>{value}</span>
    </div>
  );
};
export default Register;
