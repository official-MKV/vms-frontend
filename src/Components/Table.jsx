import React from "react";

const Table = ({ children, head }) => {
  return (
    <table class="table-auto w-full relative">
      <thead className=" ">
        <tr>
          {head.map((item) => {
            return (
              <th className="relative font-light px-[30px]  w-1/8">{item}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
<div></div>;

export default Table;
