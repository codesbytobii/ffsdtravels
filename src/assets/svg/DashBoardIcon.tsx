import React from "react";

interface DashBoardIconProps {
  size?: string;
  useGrayScale?: boolean;
}

const DashBoardIcon: React.FC<DashBoardIconProps> = ({
  size = "60",
  useGrayScale = false,
}) => {
  const colors = {
    red: useGrayScale ? "#666666" : "#E5302F",
    black: useGrayScale ? "#494949" : "#000",
    white: useGrayScale ? "#f0f0f0" : "#fff",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      data-name="dashboard layout screen"
      viewBox="-2.4 -2.4 28.8 28.8"
      width={size}
      height={size}
    >
      <path
        // fill={colors.red}
        strokeWidth={0}
        d="M12 23.98c1.7.434 3.397-1.085 4.66-2.304 1.157-1.116 1.443-2.805 2.14-4.254.562-1.171 1.23-2.258 1.588-3.507.37-1.296.827-2.637.545-3.954-.283-1.32-1.211-2.395-2.12-3.394-.875-.964-1.865-1.85-3.077-2.325-1.18-.46-2.488-.125-3.736-.337-1.506-.256-2.995-1.64-4.402-1.045-1.383.585-1.103 2.858-2.23 3.85-1.454 1.28-4.53.763-5.11 2.61-.555 1.768 1.802 3.162 2.807 4.72.728 1.129 1.391 2.264 2.322 3.234.876.913 2.085 1.382 2.973 2.284 1.358 1.376 1.767 3.944 3.64 4.422"
      />
      <g >
        <path d="M0 0h24v24H0z" />
        <g
          stroke={colors.black}
          strokeMiterlimit={10}
          strokeWidth={1.5}
          data-name="Group 2"
          transform="translate(4 4)"
        >
          <rect width={6} height={9} data-name="Rectangle 15" rx={1} />
          <rect
            width={16}
            height={4}
            data-name="Rectangle 15"
            rx={1}
            transform="translate(0 12)"
          />
          <rect
            width={7}
            height={9}
            data-name="Rectangle 15"
            rx={1}
            transform="translate(9)"
          />
        </g>
      </g>
    </svg>
  );
};

export default DashBoardIcon;
