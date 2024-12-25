import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import HotelIcon from "@/assets/svg/HotelIcon";
import PlaneIcon from "@/assets/svg/PlaneIcon";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlightTab from "./FlightTab";
import FlightImage from "../../assets/img/flight.jpeg";
import HotelImage from "../../assets/img/hotel.jpeg";
// import HotelTab from "./HotelTab";

const Header = () => {
  const [activeTab, setActiveTab] = useState("flight");
  const [direction, setDirection] = useState(0);

  const handleTabChange = (value: string) => {
    setDirection(value === "flight" ? -1 : 1);
    setActiveTab(value);
  };

  return (
    <>
      <div className="relative flex flex-col justify-center items-center w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={activeTab}
            src={activeTab === "flight" ? FlightImage : HotelImage}
            alt={activeTab === "flight" ? "Flight image" : "Hotel image"}
            className="w-full h-[400px] object-cover object-center z-0"
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "defaultImage.jpg";
            }}
          />
        </AnimatePresence>

          
        <div className="px-4 absolute z-10 top-[70px] w-full flex flex-col items-center justify-center">
          <h1 className="font-bold lg:text-[30px] md:text-[25px] sm:text-[30px] text-[22px] text-white capitalize">
            Flight and Hotel Booking made easy
          </h1>
          <p className="text-white font-semibold lg:text-[25px] md:text-[25px] sm:text-[20px] text-[15px]">
            {activeTab === "flight"
              ? "Plan Your Domestic & International Flights"
              : "Find the Best Hotel Deals"}
          </p>
        </div>

        <div className="section-width px-4 w-full flex items-center absolute z-10 top-[200px]">
          <Tabs
            defaultValue="flight"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList
              className="grid grid-cols-2 lg:w-[400px] md:w-[400px] sm:w-full w-full"
              aria-label="Flight and Hotel Tabs"
            >
              <TabsTrigger value="flight">
                <p className="flex gap-3 items-center font-medium text-[15px]">
                  <span>
                    <PlaneIcon size="20" />
                  </span>
                  Flight
                </p>
              </TabsTrigger>
              {/* <TabsTrigger value="hotel">
                <p className="flex gap-3 items-center font-medium text-[15px]">
                  <span>
                    <HotelIcon useGrayScale size="20" />
                  </span>
                  Hotel
                </p>
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="flight">
              <Card>
                <FlightTab />
              </Card>
            </TabsContent>
            <TabsContent value="hotel">
              <Card>
                {/* <HotelTab /> */}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Header;
