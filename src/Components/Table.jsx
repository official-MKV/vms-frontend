import React from "react";

const Table = ({ children, head }) => {
  return (
    <table class="table-auto ">
      <thead className="">
        <tr>
          {head.map((item) => {
            return <th className="font-light px-[30px] ">{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
