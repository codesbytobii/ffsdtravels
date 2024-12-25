import { useMemo } from "react";

// Function to convert a hex color to grayscale
const hexToGrayScale = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const gray = Math.round(r * 0.3 + g * 0.59 + b * 0.11);
  const grayHex = gray.toString(16).padStart(2, "0");
  return `#${grayHex}${grayHex}${grayHex}`;
};

// Function to convert a hex color to white scale (lighter shade)
const hexToWhiteScale = () => {
  return "#FFFFFF";
};
const hexToBlackScale = () => {
  return "#000000";
};

export const useGrayScale = (colors: { [key: string]: string }) => {
  return useMemo(() => {
    return Object.keys(colors).reduce((acc, key) => {
      acc[key] = hexToGrayScale(colors[key]);
      return acc;
    }, {} as { [key: string]: string });
  }, [colors]);
};

export const useWhiteScale = (colors: { [key: string]: string }) => {
  return useMemo(() => {
    return Object.keys(colors).reduce((acc, key) => {
      acc[key] = hexToWhiteScale(); // Corrected here to not pass any argument
      return acc;
    }, {} as { [key: string]: string });
  }, [colors]);
};

export const useBlackScale = (colors: { [key: string]: string }) => {
  return useMemo(() => {
    return Object.keys(colors).reduce((acc, key) => {
      acc[key] = hexToBlackScale(); // Corrected here to not pass any argument
      return acc;
    }, {} as { [key: string]: string });
  }, [colors]);
};