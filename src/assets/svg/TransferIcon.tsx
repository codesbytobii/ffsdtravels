// import React from "react";

const TransferIcon = ({ size = "60", stroke = "#1C274C" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M9.5 4 4 10h10m6 0h-2.5M14.5 20l5.5-6H10m-6 0h2.5" />
      </g>
    </svg>
  );
};

export default TransferIcon;
