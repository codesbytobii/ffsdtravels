// import React from "react";
// import ErrorIMG from "../../../assets/ErrorIMG";
// import { startCase } from "lodash";

function Error({ label = "", title = "", ...rest  }) {
  // const title = startCase(label);
  return (
    <div className="flex gap-2 flex-col w-full h-screen justify-center items-center" {...rest}>
      {/* <div className="w-[400px]">
        <ErrorIMG />
      </div> */}
      <div>
        <h1 className="capitalize font-medium">{title}</h1>
      </div>
      <div>
        <button
          onClick={() => window.location.reload()}
          className="w-24 h-10 capitalize bg-primaryDark bg-opacity-[14%] text-gray-600 font-medium rounded-lg hover:scale-105 duration-300"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Error;
