// import React from "react";

const Details = ({ size = "60", stroke = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fill={stroke}>
        <path d="M2 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 15a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2H3Z" />
      </g>
    </svg>
  );
};

export default Details;
