import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import kasolIcon from "../../assets/img/kasol.jpg";
import ladaskIcon from "../../assets/img/ladakh.jpg";
import mahabaleshwarIcon from "../../assets/img/mahabaleshwar.jpg";
import nainitalIcon from "../../assets/img/nainital.jpg";
import rishikeshIcon from "../../assets/img/rishikesh.jpg";
import lonavalaIcon from "../../assets/img/lonavala.jpg";
// import { CalendarIcon } from "lucide-react";

export default function TravelTips() {
  const slidesData = [
    {
      img: ladaskIcon,
      location: "The Best Time to Book Flights for Maximum Savings",
      date: "18-06-2024",
      Description:
        "Learn the ideal time to book flights for the best savings, including when and how to secure the cheapest airfare.",
    },
    {
      img: nainitalIcon,
      location: "How to Choose the Best Seat on a Flight",
      date: "18-06-2024",
      Description:
        "Find out how to choose the best seat on a flight for comfort, space, and convenience with our easy guide.",
    },
    {
      img: kasolIcon,
      location: "Packing Tips for Carry-on and Checked Luggage",
      date: "18-06-2024",
      Description:
        "Get expert packing tips for carry-on and checked luggage, ensuring you travel light, avoid fees, and stay organized.",
    },
    {
      img: mahabaleshwarIcon,
      location: "Airport Security and TSA Guidelines",
      date: "18-06-2024",
      Description:
        "Navigate airport security with ease by understanding TSA rules, avoiding delays, and speeding up your screening process.",
    },
    {
      img: rishikeshIcon,
      location: "What to Do If Your Flight is Delayed or Canceled",
      date: "18-06-2024",
      Description:
        "Prepare for flight delays or cancellations with our guide on your rights, compensation, and next steps for disrupted travel.",
    },
    {
      img: lonavalaIcon,
      location: "Essential Travel Apps for a Smooth Trip",
      date: "18-06-2024",
      Description:
        "Discover essential travel apps that will enhance your journey, from flight tracking to packing lists and navigation.",
    },
  ];

  return (
    <div className="lg:mt-[10px] mt-[3rem] mb-10 px-4 w-full overflow-hidden">
      <div className="section-width">
        <h1 className="text-center text-5xl font-semibold">
          Travel Tips and Advice
        </h1>
        {/* <h2 className="text-center m-auto text-[17px] font-medium mt-5">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have by injected humour, or randomised words which don't
          look
        </h2> */}
        <div className="w-full mb-4 mt-10">
          <Carousel>
            <CarouselContent>
              {slidesData.map((s, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3 lg:basis-1/2"
                  >
                    <div className="pt-1 cursor-pointer">
                      <div className="h-[255px] bg-no-repeat bg-center bottom-0 rounded-[20px] shadow-lg overflow-hidden">
                        <img
                          src={s.img}
                          alt={`${s.location}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex gap-3 flex-row items-center justify-between mt-3">
                        <span className="text-2xl font-semibold cursor-pointer">
                          {s.location}
                        </span>
                        {/* <div className="flex items-center justify-end gap-1 min-w-[100px]">
                          <CalendarIcon size='18'/>
                          <span className="text-[15px] pt-[3px] font-normal text-[#696969] cursor-pointer">
                            {s.date}
                          </span>
                        </div> */}
                      </div>
                      <p className="text-base font-normal text-[#696969] cursor-pointer">
                        {s.Description}
                      </p>
                      {/* <button className="mt-2 p-3 bg-red-200 rounded-xl text-[#E5302f] hover:bg-red-300">
                        View Post
                      </button> */}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
