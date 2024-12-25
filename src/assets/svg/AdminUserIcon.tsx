import React from "react";

interface AdminUserIconProps {
  size?: string;
  useGrayScale?: boolean;
}

const AdminUserIcon: React.FC<AdminUserIconProps> = ({
  size = "60",
  useGrayScale = false,
}) => {
  const colors = {
    black: useGrayScale ? "#232323" : "#232323",
    red: useGrayScale ? "#666666" : "#E5302F",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      data-name="Layer 1"
      viewBox="-6.4 -6.4 76.8 76.8"
      strokeWidth={2.5}
      width={size}
      height={size}
    >
      <path
        // fill={colors.red}
        strokeWidth={0}
        d="M32 54.816c4.243.452 8.834 1.02 12.534-1.106 3.701-2.127 5.933-6.222 7.272-10.275 1.217-3.682.238-7.571-.096-11.435-.307-3.548-.71-6.954-1.788-10.347-1.313-4.13-1.498-9.435-5.211-11.669-3.702-2.228-8.426 1.437-12.711.884-5.181-.668-9.773-5.994-14.756-4.426-4.809 1.513-8.166 6.898-8.935 11.88-.753 4.88 4.926 8.74 4.991 13.678.065 4.83-6.412 8.98-4.63 13.47 1.691 4.26 7.992 4.019 12.248 5.724 3.67 1.47 7.15 3.203 11.082 3.622"
      />
      <g
        fill={colors.black}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M24.76 28.1A10.35 10.35 0 1 1 35.1 17.75 10.36 10.36 0 0 1 24.76 28.1Zm0-16.69a6.35 6.35 0 1 0 6.34 6.34 6.35 6.35 0 0 0-6.34-6.34ZM24.76 56.59a28.11 28.11 0 0 1-16.4-5.22 2 2 0 0 1-.83-1.43v-.82a17.26 17.26 0 1 1 34.51 0 7.31 7.31 0 0 1 0 .81 2 2 0 0 1-.83 1.44c-.68.48-1.39.94-2.1 1.36a2 2 0 1 1-2-3.45c.33-.2.66-.4 1-.61a13.25 13.25 0 0 0-26.49 0 24.13 24.13 0 0 0 13.25 3.92 24.87 24.87 0 0 0 3.67-.27 2 2 0 0 1 .61 4 27.84 27.84 0 0 1-4.39.27ZM47.85 30.54a2 2 0 0 1-2-2v-13.3a2 2 0 0 1 4 0v13.3a2 2 0 0 1-2 2Z" />
      <path d="M54.5 23.89H41.2a2 2 0 0 1 0-4h13.3a2 2 0 0 1 0 4Z" />
      </g>
      {/* <title /> */}
      
    </svg>
  );
};

export default AdminUserIcon;
