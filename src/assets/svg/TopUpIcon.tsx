// import React from "react";

const TopUpIcon = ({ size = "60", stroke = "#FFFFFF" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={stroke}
      viewBox="0 0 24 24"
    >
      <path d="M4 5a1 1 0 0 0 1 1h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h4V8H5a2.966 2.966 0 0 1-1-.184V19a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-4.586l-1.293 1.293a1 1 0 0 1-1.414-1.414l3-3a.99.99 0 0 1 .326-.217 1 1 0 0 1 .764 0 .99.99 0 0 1 .326.217l3 3a1 1 0 0 1-1.414 1.414L13 14.414V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h16a1 1 0 0 1 0 2H5a1 1 0 0 0-1 1Z" />
    </svg>
  );
};

export default TopUpIcon;
