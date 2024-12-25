// // import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "@/config/api";

// Utility functions
const formatPrice = (currency, amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(parseFloat(amount));

const formatDuration = (duration) =>
  duration.replace("PT", "").replace("H", "H ");

const getNumberOfStops = (numSegments) =>
  numSegments === 1
    ? "non-stop"
    : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const calculateFlightDuration = (departure, arrival) => {
  const durationMs = new Date(arrival).getTime() - new Date(departure).getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

// FlightCard Component
const FlightCard = ({ result }) => {
  const navigate = useNavigate();

  const handleBookFlight = () => {
    localStorage.setItem("selectedFlight", JSON.stringify(result));
    navigate("/book-flight");
  };

  if (!result.itineraries.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {result.itineraries.map((itinerary, index) => (
        <Card key={index} className="bg-white shadow-md p-4 rounded-sm">
          <CardContent className="p-0">
            <div className="p-2 border-b-2 flex items-center justify-between">
              <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
                <img
                  src={`${IMAGE_URL}${itinerary.segments[0].airlineLogo}`}
                  alt={`${itinerary.segments[0].airlineName} logo`}
                  className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
                />
                <div>
                  <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
                    {itinerary.segments[0].airlineName}
                  </b>
                </div>
              </div>

              <div className="flex lg:gap-5 gap-3 items-center">
                <div className="text-end">
                  <p className="capitalize lg:text-sm text-[12px] font-medium">
                    Full pay
                  </p>
                  <p className="lg:text-sm text-[12px] font-semibold text-gray-600">
                    {formatPrice(result.price.currency, result.price.total)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3">
                <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
                <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
                  <span className="font-bold text-black">Departure Date</span>{" "}
                  <span className="font-medium">
                    {result.lastTicketingDate &&
                      formatDate(result.lastTicketingDate)}
                  </span>
                  <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
                </p>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xs mt-2">
                <div className="flex flex-col items-start w-[35%]">
                  <p className="font-semibold text-gray-500 text-start lg:text-base text-[12px]">
                    {itinerary.segments[0].departure_airport}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-lg">
                    {formatDuration(itinerary.duration)}
                  </p>
                  <p className="font-semibold text-gray-500 lg:text-base text-[8.5px]">
                    {getNumberOfStops(itinerary.segments.length)}
                  </p>
                </div>
                <div className="flex flex-col items-end w-[35%]">
                  <p className="font-semibold text-gray-500 text-end lg:text-base text-[12px]">
                    {itinerary.segments[itinerary.segments.length - 1].arrival_airport}
                  </p>
                </div>
              </div>
            </div>

            <hr />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="font-medium px-2 capitalize">
                  Flight Details
                </AccordionTrigger>
                <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
                  {itinerary.segments.map((segment) => (
                    <SegmentDetails
                      key={segment.id}
                      segment={segment}
                      travelerPricings={result.travelerPricings}
                    />
                  ))}
                  <div className="flex mt-2 w-full justify-end">
                    <Button
                      className="bg-primaryRed hover:bg-black text-white"
                      onClick={handleBookFlight}
                    >
                      Book Flight
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// SegmentDetails Component
const SegmentDetails = ({ segment, travelerPricings }) => (
  <div className="mt-3 bg-gray-100 rounded-xs">
    <div className="flex items-center justify-between p-3">
      <p className="capitalize lg:text-base text-[12px] text-gray-600">
        <span className="font-bold text-black">Departure:</span>{" "}
        {segment.departure_airport}{" "}
        <span className="font-bold text-black">
          {new Date(segment.departure.at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </p>
      <div className="flex items-center gap-2">
        <img
          src={`${IMAGE_URL}${segment.airlineLogo}`}
          alt={`${segment.airlineName} logo`}
          className="w-8 h-8 object-cover"
        />
        <b className="text-[11px]">{segment.airlineName}</b>
      </div>
    </div>

    <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3 mt-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start w-[35%]">
          <p className="font-bold lg:text-sm text-[12px]">
            {new Date(segment.departure.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="font-semibold text-gray-500 lg:text-base text-[8.5px]">
            {segment.departure.iataCode}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-gray-500 lg:text-base text-[8.5px]">
            {segment.numberOfStops === 0
              ? "No stop"
              : `${segment.numberOfStops} stops`}
          </p>
          <p className="font-bold text-lg">
            {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
          </p>
        </div>
        <div className="flex flex-col items-end w-[35%]">
          <p className="font-bold lg:text-sm text-[12px]">
            {new Date(segment.arrival.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="font-semibold text-gray-500 lg:text-base text-[8.5px]">
            {segment.arrival_airport}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start w-[35%]">
          <p className="font-bold lg:text-sm text-[12px]">Baggage</p>
          {travelerPricings.map((pricing, index) => (
            <p key={index} className="font-semibold text-gray-500 lg:text-base text-[12px]">
              {pricing.fareDetailsBySegment[0]?.includedCheckedBags?.quantity ?? 0}{" "}
              x 23kg
            </p>
          ))}
        </div>
        <div className="flex flex-col items-end w-[35%]">
          <p className="font-bold lg:text-sm text-[12px]">Airline</p>
          <p className="font-semibold text-gray-500 lg:text-base text-[8.5px]">
            {segment.carrierCode} - {segment.number}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default FlightCard;



// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { useNavigate } from "react-router-dom";
// import { IMAGE_URL } from "@/config/api";
// // import { Segment } from "framer-motion";
// import { Plane, Luggage } from "lucide-react";

// interface Segment {
//     aircraft: {
//       code: string;
//     };
//     airlineLogo: string;
//     airlineName: string;
//     arrival: {
//       at: string;
//       iataCode: string;
//       terminal: string;
//     };
//     arrival_airport: string;
//     blacklistedInEU: boolean;
//     carrierCode: string;
//     departure: {
//       at: string;
//       iataCode: string;
//       terminal: string;
//     };
//     departure_airport: string;
//     duration: string;
//     id: string;
//     number: string;
//     numberOfStops: number;
//     operating: {
//       carrierCode: string;
//     };
//   }
  
//   interface Itinerary {
//     duration: string;
//     segments: Segment[];
//   }
  
//   interface Price {
//     ffsd_total: string;
//     base: string;
//     currency: string;
//     fees: { amount: string }[];
//     grandTotal: string;
//     // total: string;
//   }
  
//   interface Flight {
//     id: string;
//     DepartureAirport: string;
//     arrivalAirport: string;
//     instantTicketingRequired: boolean;
//     isUpsellOffer: boolean;
//     itineraries: Itinerary[];
//     lastTicketingDate: string;
//     lastTicketingDateTime: string;
//     logo: string;
//     nonHomogeneous: boolean;
//     numberOfBookableSeats: number;
//     oneWay: boolean;
//     price: Price;
//     pricingOptions: {
//       fareType: string[];
//       includedCheckedBagsOnly: boolean;
//     };
//     source: string;
//     travelerPricings: {
//       travelerType: string;
//       fareDetailsBySegment: {
//         class: string;
//         includedCheckedBags: {
//           quantity: number;
//         };
//       }[];
//     }[];
//     type: string;
//     validatingAirlineCodes: string[];
//   }

// // Utility functions
// const formatPrice = (currency: string, amount: string) =>
//   new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: currency,
//   }).format(parseFloat(amount));

// const formatDuration = (duration) =>
//   duration.replace("PT", "").replace("H", "H ");

// const getNumberOfStops = (numSegments) =>
//   numSegments === 1
//     ? "non-stop"
//     : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;

// const formatDate = (dateString) =>
//   new Date(dateString).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

// const calculateFlightDuration = (departure, arrival) => {
//   const durationMs = new Date(arrival).getTime() - new Date(departure).getTime();
//   const hours = Math.floor(durationMs / (1000 * 60 * 60));
//   const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
//   return `${hours}h ${minutes}m`;
// };

// interface FlightCardProps {
//     itinerary1: Itinerary;
//     itinerary2: Itinerary;
//     itinerary3: Itinerary;
//     itinerary4: Itinerary;
//     itinerary5: Itinerary;
//     result: Flight;
//   }

// // FlightCard Component
// const FlightCard: React.FC<FlightCardProps> = ({
//     itinerary1,
//     itinerary2,
//     itinerary3,
//     itinerary4,
//     itinerary5,
//     result,
//   }) => {
//     const navigate = useNavigate();
//     const handleBookFlight = () => {
//       localStorage.setItem("selectedFlight", JSON.stringify(result));
//       navigate("/book-flight");
//     };
  
//     console.log("resulttttt", result);
  
//     return (
//       <div className="flex flex-col gap-4">
//         <Card className="bg-white shadow-md p-4 rounded-sm">
//           <CardContent className="p-0">
//             {/* Display main flight info */}
//             <div className="p-2 border-b-2 flex items-center justify-between">
//               <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
//                 <img
//                   src={`${IMAGE_URL}${itinerary1.segments[0].airlineLogo}`}
//                   alt={`${itinerary1.segments[0].airlineName} logo`}
//                   className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
//                 />
//                 <div>
//                   <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
//                     {itinerary1.segments[0].airlineName}
//                   </b>
//                 </div>
//               </div>
//               {/* Price */}
//               <div className="flex lg:gap-5 gap-3 items-center">
//                 <div className="text-end">
//                   <p className="capitalize lg:text-sm text-[12px] font-medium">
//                     Full pay
//                   </p>
//                   <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
//                     {formatPrice(result.price.currency, result.price.ffsd_total)}
//                   </p>
//                 </div>
//               </div>
//             </div>
  
//             <div className="mt-3">
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-primaryRed">Flight 1</span>{" "}
//                 </p>
//               </div>
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-black">Departure Date</span>{" "}
//                   <span className="font-medium">
//                     {formatDate(itinerary1.segments[0].departure.at)}
//                   </span>
//                   <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
//                 </p>
//               </div>
  
//               <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
//                 <div className="flex flex-col items-start w-[35%]">
//                   <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                     {itinerary1.segments[0].departure_airport}
//                   </p>
//                 </div>
  
//                 <div className="flex flex-col items-center">
//                 <Plane />
//                   <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//                     {formatDuration(itinerary1.duration)}
//                   </p>
//                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//                     {getNumberOfStops(itinerary1.segments.length)}
//                   </p>
//                 </div>
  
//                 <div className="flex flex-col items-end w-[35%]">
//                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                     {
//                       itinerary1.segments[itinerary1.segments.length - 1]
//                         .arrival_airport
//                     }
//                   </p>
//                 </div>
//               </div>
  
//               <hr />
  
//               {/* Second Itinerary */}
//               {itinerary2 && (
//                 <>
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-primaryRed">Flight 2</span>{" "}
//                 </p>
//               </div>
//                   <div className="flex items-center lg:space-x-2 space-x-1 justify-between mt-4">
//                     <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                       <span className="font-bold text-black">Departure Date</span>{" "}
//                       <span className="font-medium">
//                         {formatDate(itinerary2.segments[0].departure.at)}
//                       </span>
//                       <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
//                     </p>
//                   </div>
  
//                   <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {itinerary2.segments[0].departure_airport}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-center">
//                     <Plane />
//                       <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//                         {formatDuration(itinerary2.duration)}
//                       </p>
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//                         {getNumberOfStops(itinerary2.segments.length)}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-end w-[35%]">
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {
//                           itinerary2.segments[itinerary2.segments.length - 1]
//                             .arrival_airport
//                         }
//                       </p>
//                     </div>
//                   </div>
//                 </>
//               )}
              
  
//               <hr />
  
//               {/* Third Itinerary */}
//               {itinerary3 && (
//                 <>
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-primaryRed">Flight 3</span>{" "}
//                 </p>
//               </div>
//                   <div className="flex items-center lg:space-x-2 space-x-1 justify-between mt-4">
//                     <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                       <span className="font-bold text-black">Departure Date</span>{" "}
//                       <span className="font-medium">
//                         {formatDate(itinerary3.segments[0].departure.at)}
//                       </span>
//                       <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
//                     </p>
//                   </div>
  
//                   <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {itinerary3.segments[0].departure_airport}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-center">
//                     <Plane />
//                       <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//                         {formatDuration(itinerary3.duration)}
//                       </p>
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//                         {getNumberOfStops(itinerary3.segments.length)}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-end w-[35%]">
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {
//                           itinerary3.segments[itinerary3.segments.length - 1]
//                             .arrival_airport
//                         }
//                       </p>
//                     </div>
//                   </div>
//                 </>
//               )}
              
  
//               <hr />
  
//               {/* Fourth Itinerary */}
//               {itinerary4 && (
//                 <>
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-primaryRed">Flight 4</span>{" "}
//                 </p>
//               </div>
//                   <div className="flex items-center lg:space-x-2 space-x-1 justify-between mt-4">
//                     <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                       <span className="font-bold text-black">Departure Date</span>{" "}
//                       <span className="font-medium">
//                         {formatDate(itinerary4.segments[0].departure.at)}
//                       </span>
//                       <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
//                     </p>
//                   </div>
  
//                   <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {itinerary4.segments[0].departure_airport}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-center">
//                     <Plane />
//                       <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//                         {formatDuration(itinerary4.duration)}
//                       </p>
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//                         {getNumberOfStops(itinerary4.segments.length)}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-end w-[35%]">
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {
//                           itinerary4.segments[itinerary4.segments.length - 1]
//                             .arrival_airport
//                         }
//                       </p>
//                     </div>
//                   </div>
//                 </>
//               )}
              
  
//               <hr />
  
//               {/* Fifth Itinerary */}
//               {itinerary5 && (
//                 <>
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-primaryRed">Flight 5</span>{" "}
//                 </p>
//               </div>
//                   <div className="flex items-center lg:space-x-2 space-x-1 justify-between mt-4">
//                     <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                       <span className="font-bold text-black">Departure Date</span>{" "}
//                       <span className="font-medium">
//                         {formatDate(itinerary5.segments[0].departure.at)}
//                       </span>
//                       <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
//                     </p>
//                   </div>
  
//                   <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {itinerary5.segments[0].departure_airport}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-center">
//                     <Plane />
//                       <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//                         {formatDuration(itinerary5.duration)}
//                       </p>
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//                         {getNumberOfStops(itinerary5.segments.length)}
//                       </p>
//                     </div>
  
//                     <div className="flex flex-col items-end w-[35%]">
//                       <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                         {
//                           itinerary5.segments[itinerary5.segments.length - 1]
//                             .arrival_airport
//                         }
//                       </p>
//                     </div>
//                   </div>
//                 </>
//               )}
  
//             </div>
  
//             <Accordion type="single" collapsible className="w-full">
//               {/* Combined Itinerary Flight Details */}
//               <AccordionItem value="item-1" className="border-none">
//                 <AccordionTrigger className="font-medium px-2 capitalize">
//                   <p className="font-bold text-black capitalize">
//                     Flight Details
//                   </p>
//                 </AccordionTrigger>
//                 <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
//                   {/* Display segments for Itinerary 1 */}
//                   <p className="font-bold text-gray-700">Flight 1</p>
//                   {itinerary1.segments.map((segment) => (
//                     <SegmentDetails
//                       key={segment.id}
//                       segment={segment}
//                       travelerPricings={result.travelerPricings}
//                     />
//                   ))}
//                   {/* Display segments for Itinerary 2, if exists */}
//                   {itinerary2 && (
//                     <>
//                       <p className="font-bold text-gray-700 mt-4">Flight 2</p>
//                       {itinerary2.segments.map((segment) => (
//                         <SegmentDetails
//                           key={segment.id}
//                           segment={segment}
//                           travelerPricings={result.travelerPricings}
//                         />
//                       ))}
//                     </>
//                   )}
//                   {/* Display segments for Itinerary 3, if exists */}
//                   {itinerary3 && (
//                     <>
//                       <p className="font-bold text-gray-700 mt-4">Flight 3</p>
//                       {itinerary3.segments.map((segment) => (
//                         <SegmentDetails
//                           key={segment.id}
//                           segment={segment}
//                           travelerPricings={result.travelerPricings}
//                         />
//                       ))}
//                     </>
//                   )}
//                   {/* Display segments for Itinerary 4, if exists */}
//                   {itinerary4 && (
//                     <>
//                       <p className="font-bold text-gray-700 mt-4">Flight 4</p>
//                       {itinerary4.segments.map((segment) => (
//                         <SegmentDetails
//                           key={segment.id}
//                           segment={segment}
//                           travelerPricings={result.travelerPricings}
//                         />
//                       ))}
//                     </>
//                   )}
//                   {/* Display segments for Itinerary 5, if exists */}
//                   {itinerary5 && (
//                     <>
//                       <p className="font-bold text-gray-700 mt-4">Flight 5</p>
//                       {itinerary5.segments.map((segment) => (
//                         <SegmentDetails
//                           key={segment.id}
//                           segment={segment}
//                           travelerPricings={result.travelerPricings}
//                         />
//                       ))}
//                     </>
//                   )}
//                   <div className="flex mt-2 w-full justify-end">
//               <Button
//                 className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
//                 onClick={handleBookFlight}
//               >
//                 <p className="capitalize">book flight</p>
//               </Button>
//             </div>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
  
//             {/* <div className="flex mt-2 w-full justify-end">
//               <Button
//                 className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
//                 onClick={handleBookFlight}
//               >
//                 <p className="capitalize">book flight</p>
//               </Button>
//             </div> */}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   };
  
//   // SegmentDetails Component
//   const SegmentDetails: React.FC<{
//     segment: Segment;
//     travelerPricings: Flight["travelerPricings"];
//   }> = ({ segment, travelerPricings }) => (
//     <div className="mt-3 bg-gray-100 rounded-xs">
//       <div className="flex items-center lg:space-x-2 space-x-1 justify-between p-3 ">
//         <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px]  text-gray-600">
//           <span className="font-bold text-black">Departure</span>{" "}
//           <span className="font-medium">{segment.departure_airport}</span>{" "}
//           <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
//           <span className="font-bold text-black">
//             {new Date(segment.departure.at).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>
//         </p>
  
//         <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
//           <img
//             src={`${IMAGE_URL}${segment?.airlineLogo}`}
//             alt={`${segment?.airlineName} logo`}
//             className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
//           />
//           <div>
//             <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
//               {segment.airlineName}
//             </b>
//           </div>
//         </div>
//       </div>
  
//       <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3  mt-2">
//         <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
//           <div className="flex flex-col items-start w-[35%]">
//             <p className="font-bold capitalize lg:text-sm text-[12px]">
//               {new Date(segment.departure.at).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </p>
//             <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//               {segment.departure_airport}
//             </p>
//           </div>
  
//           <div className="flex flex-col items-center">
//             <Plane />
//             <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//               {segment.numberOfStops === 0
//                 ? "No stop"
//                 : `${segment.numberOfStops} stops`}
//             </p>
//             <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//               {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
//             </p>
//           </div>
  
//           <div className="flex flex-col items-end w-[35%]">
//             <p className="font-bold capitalize lg:text-sm text-[12px]">
//               {new Date(segment.arrival.at).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </p>
//             <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//               {segment.arrival_airport}
//             </p>
//           </div>
//         </div>
  
//         <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
//           <div className="flex flex-col items-start w-[35%]">
//           {/* <Luggage /> */}
//             <p className="font-bold capitalize lg:text-sm text-[12px]">Baggage</p>
//             {travelerPricings.map((pricing, index) => (
//               <div key={index} className="w-full flex flex-col items-start">
//                 <p className="flex font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]"><Luggage />
//                   {pricing.fareDetailsBySegment[0]?.includedCheckedBags
//                     ?.quantity ?? 0}{" "}
//                   X 23kg
//                 </p>
//               </div>
//             ))}
//           </div>
  
//           <div className="flex flex-col items-end w-[35%]">
//             <p className="font-bold capitalize lg:text-sm text-[12px]">Airline</p>
//             <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//               {segment.carrierCode} - {segment.number}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// export default FlightCard;
