import React from "react";

interface CompanyIconProps {
  size?: string;
  useGrayScale?: boolean;
}

const CompanyIcon: React.FC<CompanyIconProps> = ({
  size = "60",
  useGrayScale = false,
}) => {
  const colors = {
    red: useGrayScale ? "#666666" : "#E5302F",
    black: "#000",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="#000"
      viewBox="-2.4 -2.4 28.8 28.8"
    >
      <path
        // fill={colors.red}
        strokeWidth={0}
        d="M12 20.195c1.677-.107 3.309.76 4.942.365 1.903-.461 4-1.139 5.055-2.788 1.056-1.654.658-3.825.416-5.772-.221-1.783-1.136-3.312-1.752-5-.752-2.06-.413-4.903-2.282-6.05-1.856-1.137-4.205.606-6.379.74-2.012.123-4.366-1.239-5.943.016-1.636 1.3-.557 4.13-1.569 5.957C3.506 9.44.734 10.004.362 12c-.365 1.953 1.188 3.746 2.312 5.384 1.063 1.55 2.208 3.286 4.007 3.828 1.758.53 3.486-.9 5.319-1.017"
      />
      <path
        stroke={colors.black}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 11V7c0-1.333.8-4 4-4 1.91 0 2.965.95 3.505 2M8 11H5v10h7M8 11h11v10h-2"
      />
    </svg>
  );
};

export default CompanyIcon;
