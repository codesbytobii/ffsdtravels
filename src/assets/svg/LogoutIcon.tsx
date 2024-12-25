import React from "react";

interface LogoutIconProps {
  size?: string;
  useGrayScale?: boolean;
}

const LogoutIcon: React.FC<LogoutIconProps> = ({
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
        d="M12 21.64c1.711-.248 3.38 1.294 5.051.85 1.687-.45 2.998-1.842 4.011-3.263.993-1.393 1.102-3.17 1.715-4.767.709-1.844 2.66-3.501 2.201-5.422-.46-1.927-3.164-2.33-4.42-3.863C19.323 3.668 19.486.942 17.702.16 15.897-.632 13.972 1.446 12 1.422 9.996 1.397 8.1-.703 6.23.018 4.404.722 4.2 3.28 3.058 4.868 1.973 6.377-.13 7.337-.36 9.179c-.236 1.876 1.696 3.322 2.233 5.134.497 1.678.096 3.522.805 5.122.794 1.794 1.604 4.178 3.513 4.63 2.067.489 3.706-2.12 5.809-2.424"
      />
      <g stroke={colors.black} strokeLinecap="round" strokeWidth={1.5}>
        <path strokeLinejoin="round" d="M10 12h10m0 0-3-3m3 3-3 3" />
        <path d="M4 12a8 8 0 0 1 8-8m0 16a7.985 7.985 0 0 1-6.245-3" />
      </g>
    </svg>
  );
};

export default LogoutIcon;
