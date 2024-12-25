import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { PlaneIcon, HotelIcon } from "lucide-react";
const BestOffer = () => {
  const slidesData = [
    {
      title: "Best Price Guarantee",
      percentOff: 20,
      type: "hotel",
    },
    {
      title: "Domestic Flights",
      percentOff: 20,
      type: "flight",
    },
    {
      title: "Holiday Packages",
      percentOff: 35,
      type: "holiday",
    },
  ];

  return (
    <>
      <div className="lg:mt-[140px] mt-[550px] mb-10 px-4 w-full overflow-hidden">
        <div className="section-width">
          <h1 className="font-bold text-gray-600 capitalize">Best Offer</h1>

          <div className="w-full my-4">
            <Carousel>
              <CarouselContent>
                {slidesData.map((s, index) => {
                  return (
                    <CarouselItem key={index} className="lg:basis-1/2">
                      {/* The following code determines whether the offer type is a hotel, flight, or holiday and displays the appropriate gradient accordingly. */}
                      <Card
                        className={`text-white cursor-pointer relative ${
                          s.type === "hotel" && "hotel-offer"
                        } ${s.type === "flight" && "flight-offer"} ${
                          s.type === "holiday" && "holiday-offer"
                        }`}
                      >
                        <CardHeader>
                          <h1 className="w-[150px]">{s.title}</h1>
                        </CardHeader>
                        <CardContent>
                          <p>Up to</p>
                          <p className="font-bold text-2xl">
                            {s.percentOff}% OFF
                          </p>
                        </CardContent>
                        <CardFooter>
                          <button className="text-xl text-blue-600 hover:text-blue-500">
                            Book now
                          </button>
                        </CardFooter>
                        {/* Icon for Hotel offers */}
                        {s.type === "hotel" && (
                          <HotelIcon
                            className="absolute top-5 right-1"
                            size="80"
                          />
                        )}
                        {/* Icon for Flight offers and Holiday Offers*/}
                        {(s.type === "flight" || s.type === "holiday") && (
                          <PlaneIcon
                            className="absolute top-5 right-1"
                            size="80"
                          />
                        )}
                      </Card>
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
    </>
  );
};

export default BestOffer;
