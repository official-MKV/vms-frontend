import React from "react";

const Popup = ({ children, close }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

export default Popup;
