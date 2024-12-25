const SubtractIcon = ({ size = "60", stroke = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={size}
      height={size}
      className="cf-icon-svg"
      viewBox="-3 0 19 19"
    >
      <path
        fill={stroke}
        d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H1.319a1.03 1.03 0 1 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03z"
      />
    </svg>
  );
};

export default SubtractIcon;