import { ThreeCircles } from "react-loader-spinner";

function Loading({
  size = "80",
  className = "flex w-full h-screen items-center justify-center",
  color = "#E5302F",
}) {
  return (
    <div className={className}>
      <ThreeCircles
        visible={true}
        height={size}
        width={size}
        color={color}
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;
