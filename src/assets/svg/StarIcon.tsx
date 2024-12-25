const StarIcon = ({ size = "60", useGrayScale = false }) => {
  const colors = {
    primary: useGrayScale ? "#E4E4E4" : "#FFEB4D",
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={size}
      height={size}
      fill="none"
      viewBox="0 -0.5 24 24"
    >
      <path
        fill={colors.primary}
        fillRule="evenodd"
        d="M6.8 22.317a2 2 0 0 1-2.797-2.032l.573-5.654L.79 10.394a2 2 0 0 1 1.068-3.287l5.554-1.203 2.86-4.91a2 2 0 0 1 3.456 0l2.86 4.91 5.554 1.203a2 2 0 0 1 1.068 3.287l-3.786 4.237.572 5.654a2 2 0 0 1-2.796 2.032L12 20.025l-5.2 2.292z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default StarIcon;