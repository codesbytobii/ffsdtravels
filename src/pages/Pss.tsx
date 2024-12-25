import DP from "@/assets/img/aboutus.jpg";
import PssForm from "./PssForm";

const Pss = () => {

  return (
      <div className="w-screen h-screen flex ">
        <div className="w-full h-full lg:flex md:flex sm:hidden hidden">
          <img src={DP} className="object-cover w-full" alt="Background" />
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center relative">
            <PssForm />
        </div>
      </div>
      // <div className="w-screen h-screen flex overflow-hidden">
      //   <div className="w-full h-full lg:flex md:flex sm:hidden hidden">
      //     <img src={DP} className="object-cover w-full" alt="Background" />
      //   </div>

      //   <div className="w-full h-full flex flex-col items-center justify-center relative">
      //       <PssForm />
      //   </div>
      // </div>
  );
};

export default Pss;
