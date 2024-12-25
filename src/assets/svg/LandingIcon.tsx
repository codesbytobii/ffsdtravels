import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface LandingIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
}

const LandingIcon: React.FC<LandingIconProps> = ({
  size = "60",
  isGrayScale = false,
  isWhiteScale = false,
}) => {
  const originalColors = {
    default: "#444",
  };

  const grayScaledColors = useGrayScale(originalColors);
  const whiteScaledColors = useWhiteScale(originalColors);

  const colors = isGrayScale
    ? grayScaledColors
    : isWhiteScale
    ? whiteScaledColors
    : originalColors;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-1.6 -1.6 19.2 19.2"
    >
      <g fill={colors.default}>
        <path d="M13.64 7c-.71-.2-1.89-.43-3.23-.67L6.59 2.09a2.268 2.268 0 0 0-.746-.544L4.65 1c-.09 0-.15 0-.1.11S6 4 6.84 5.7c-1.84-.29-3.5-.53-4.23-.63a.917.917 0 0 1-.608-.406L1.28 3.59a.925.925 0 0 0-.474-.358L0 3l.61 3.26c.067.34.318.609.644.699C2.58 7.34 6.07 8.3 8.78 8.88c6 1.28 6.8 1.28 7.12.91S15.23 7.41 13.64 7zM0 13h16v1H0v-1z" />
      </g>
    </svg>
  );
};

export default LandingIcon;
