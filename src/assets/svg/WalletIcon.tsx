import React from "react";

interface WalletIconProps {
  size?: string;
  useGrayScale?: boolean;
}

const WalletIcon: React.FC<WalletIconProps> = ({
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
      viewBox="-2.4 -2.4 28.8 28.8"
      width={size}
      height={size}
    >
      <path
        // fill={colors.red}
        strokeWidth={0}
        d="M12 21.767c2.197.066 3.962 3.525 5.962 2.614 1.976-.9.652-4.343 1.835-6.163 1.026-1.58 3.366-1.859 4.4-3.434 1.151-1.758 1.98-3.88 1.764-5.97-.22-2.123-1.135-4.48-2.96-5.587-1.924-1.166-4.483.325-6.66-.242C14.685 2.552 13.7.573 12 .358c-1.713-.216-3.354.698-4.903 1.46-1.542.758-3.059 1.635-4.126 2.981-1.067 1.345-1.768 2.987-1.96 4.693-.183 1.642.457 3.219.895 4.812.423 1.54 1 2.973 1.647 4.432.809 1.827.775 4.615 2.656 5.29 1.975.708 3.694-2.323 5.791-2.26"
      />
      <path
        stroke={colors.black}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.5 14.15h.01M19 4.001H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 5.521 3 6.081 3 7.201v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108v-5.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874c-.428-.218-.988-.218-2.108-.218H7m9.95 6.15a.45.45 0 1 1-.9 0 .45.45 0 0 1 .9 0Z"
      />
    </svg>
  );
};

export default WalletIcon;
