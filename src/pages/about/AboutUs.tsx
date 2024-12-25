import aboutImg from "../../assets/img/aboutus.jpg";

export default function AboutUs() {
  return (
    <div className="lg:mt-[140px] mt-[3rem] mb-10 px-4 w-full h-auto">
      <div className="flex lg:flex-row flex-col justify-between gap-10 section-width lg:items-start items-center">
        <div className="relative w-50">
          <div className="lg:absolute w-[400px] lg:w-[500px] left-7 shadow-md h-[400px] lg:h-[500px] rounded-lg top-0 z-40 primary-bg bg-center bg-no-repeat">
            <img
              src={aboutImg}
              alt="about us img"
              className="w-full h-full rounded-lg object-fill"
            />
          </div>
          <div className="absolute w-[380px] left-0 h-[367px] bg-transparent border border-[#E5302f] rounded-lg top-16 z-30 max-lg:hidden"></div>
        </div>
        <div className="max-w-[600px] w-full flex flex-col gap-3">
          <h1 className="text-[#E5302f] font-semibold lg:text-left text-center">
            About Us
          </h1>
          <p className="font-bold text-3xl lg:text-left text-center">
            Book all the major travel services effortlessly in just one click!
          </p>
          <p className="font-medium lg:text-left text-center">
            We are one of the leading travel agency specialized in creating
            dream vacations, whether you're planning a romantic honeymoon or a
            fun-filled family getaway. Our travel service covers everything you
            need, from flights and visas to buses and hotels. And with our focus
            on making your trip special, we'll ensure every moment is memorable.
            So sit back, relax, and let us handle the details while you create
            lasting memories.
          </p>
          <div className="flex lg:flex-row flex-col gap-7 justify-between items-center">
            <div className="flex gap-2">
              <div>
                <h1 className="bg-gray-300 w-[80px] h-[80px] flex justify-center items-center rounded-full text-[#E5302f] text-2xl font-bold m-auto">
                  13+
                </h1>
                <p className="capitalize text-gray-500 text-center max-w-[100px]">
                  Year Experience
                </p>
              </div>
              <div>
                <h1 className="bg-gray-300 w-[80px] h-[80px] flex justify-center items-center rounded-full text-[#E5302f] text-2xl font-bold m-auto">
                  17K+
                </h1>
                <p className="capitalize text-gray-500 text-center max-w-[100px]">
                  Happy Customers
                </p>
              </div>
              <div>
                <h1 className="bg-gray-300 w-[80px] h-[80px] flex justify-center items-center rounded-full text-[#E5302f] text-2xl font-bold m-auto">
                  117+
                </h1>
                <p className="capitalize text-gray-500 text-center max-w-[100px]">
                  Destinations Covered
                </p>
              </div>
            </div>
            {/* <button className="p-4 border-2 border-[#e52f2fc3] text-[#E5302f] font-bold">
              More About
            </button>  */}
          </div>
          {/* <button className="p-4 border-2 border-[#e52f2fc3] text-[#E5302f] font-bold">
            More About
          </button> */}
        </div>
      </div>
    </div>
  );
}
