import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface TakeOffIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
}

const TakeOffIcon: React.FC<TakeOffIconProps> = ({
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
        <path d="M12.57 2.26c-.65.29-1.66.85-2.8 1.5L4.31 3a2.172 2.172 0 0 0-.916.064L2.209 3.4c-.1 0-.1.1 0 .14l4.56 2c-1.54.92-2.91 1.76-3.51 2.14a.858.858 0 0 1-.726.088L1.339 7.39a.864.864 0 0 0-.586.002l-.754.308 2.52 2.1a.879.879 0 0 0 .926.128C4.649 9.39 7.819 7.93 10.179 6.7c5.24-2.78 5.82-3.26 5.82-3.7 0-.69-2-1.4-3.43-.74zM0 13h16v1H0v-1z" />
      </g>
    </svg>
  );
};

export default TakeOffIcon;
