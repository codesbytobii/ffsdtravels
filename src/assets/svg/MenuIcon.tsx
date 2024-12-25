const MenuIcon = ({ size = "60" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={size}
      height={size}
      className="icon flat-color"
      data-name="Flat Color"
      viewBox="0 0 24 24"
    >
      <path
        d="M2 8V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4Zm14 2v12h4a2 2 0 0 0 2-2V10Z"
        style={{
          fill: "#c2c2c2",
        }}
      />
      <path
        d="M14 10H2v10a2 2 0 0 0 2 2h10Z"
        style={{
          fill: "#e5302f",
        }}
      />
    </svg>
  );
};

export default MenuIcon;