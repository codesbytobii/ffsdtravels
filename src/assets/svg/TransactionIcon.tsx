// import React from "react";

const TransactionIcon = ({ size = "60", stroke = "#000" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="none"
        xmlSpace="preserve"
        width={size}
        height={size}
        stroke={stroke}
        strokeWidth={2}
        d="M2 7h18m-4-5 5 5-5 5m6 5H4m4-5-5 5 5 5"
      />
    </svg>
  );
};

export default TransactionIcon;
