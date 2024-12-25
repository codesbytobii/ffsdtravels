// import React from "react";

const WithdrawIcon = ({ size = "60", stroke = "#1C274C" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fill={stroke}>
        <path
          fillRule="evenodd"
          d="M23 4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h1a1 1 0 1 0 0-2H4a1 1 0 0 1-1-1V8h18v6a1 1 0 0 1-1 1h-1a1 1 0 1 0 0 2h1a3 3 0 0 0 3-3V4Zm-2 2V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2h18Z"
          clipRule="evenodd"
        />
        <path d="M13 22a1 1 0 1 1-2 0v-5.593L9.707 17.7a1 1 0 1 1-1.414-1.414l3-2.994a1 1 0 0 1 1.413.001l2.999 3a1 1 0 1 1-1.414 1.413L13 16.416V22Z" />
      </g>
    </svg>
  );
};

export default WithdrawIcon;
