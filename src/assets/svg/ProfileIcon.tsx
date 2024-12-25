import React from "react";

interface ProfileIconProps {
  size?: string;
  useGrayScale?: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = "60",
  useGrayScale = false,
}) => {
  const colors = {
    red: useGrayScale ? "#666666" : "#E5302F",
    black: useGrayScale ? "#494949" : "#000",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        // fill={colors.red}
        strokeWidth={0}
        d="M12 24.993c2.81-.587 4.21-3.51 6.444-5.313 2.309-1.862 6.121-2.456 6.771-5.35.651-2.898-1.628-5.753-3.828-7.75-1.78-1.614-4.63-.7-6.743-1.844-2.847-1.544-4.26-6.59-7.408-5.824-3.024.735-2.3 5.484-3.304 8.43-.735 2.155-1.588 4.118-1.75 6.39-.226 3.164-1.448 6.817.638 9.209 2.124 2.437 6.015 2.712 9.18 2.052"
      />
      <g
        stroke={colors.black}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M12.12 12.78a.963.963 0 0 0-.24 0 3.27 3.27 0 0 1-3.16-3.27c0-1.81 1.46-3.28 3.28-3.28a3.276 3.276 0 0 1 .12 6.55ZM18.74 19.38A9.934 9.934 0 0 1 12 22c-2.6 0-4.96-.99-6.74-2.62.1-.94.7-1.86 1.77-2.58 2.74-1.82 7.22-1.82 9.94 0 1.07.72 1.67 1.64 1.77 2.58Z" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      </g>
    </svg>
  );
};

export default ProfileIcon;
