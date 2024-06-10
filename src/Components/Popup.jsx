import React from "react";
import { createPortal } from "react-dom";
import { MdOutlineCancel } from "react-icons/md";

const Popup = ({ children, close }) => {
  return createPortal(
    <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
      <div>{children}</div>
      <div onClick={close}>
        <MdOutlineCancel />
      </div>
    </div>,

    document.getElementById("root")
  );
};

export default Popup;
