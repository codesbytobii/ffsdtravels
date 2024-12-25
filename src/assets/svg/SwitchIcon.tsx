import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface SwitchIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
}

const SwitchIcon: React.FC<SwitchIconProps> = ({
  size = "60",
  isGrayScale = false,
  isWhiteScale = false,
}) => {
  const originalColors = {
    fill: "#444",
    stroke: "#000",
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
      xmlSpace="preserve"
      stroke={colors.stroke}
      strokeWidth={13.059}
      transform="rotate(-45)"
      width={size}
      height={size}
      viewBox="-20.4 -20.4 244.84 244.84"
    >
      <path
        d="M5.239 97.656c0-23.577 19.186-42.764 42.771-42.764h146.661L155.74 93.823l3.461 3.461 44.843-44.843-44.842-44.84-3.461 3.464 38.931 38.924H48.01C21.723 49.989.347 71.376.347 97.652v.494h4.896v-.49h-.004zM198.805 106.388c0 23.577-19.19 42.764-42.767 42.764H9.377l38.931-38.931-3.461-3.461L0 151.604l44.843 44.839 3.461-3.468-38.927-38.923h146.661c26.283 0 47.663-21.387 47.663-47.663v-.494h-4.896v.493z"
        style={{
          fill: colors.fill,
        }}
      />
    </svg>
  );
};

export default SwitchIcon;