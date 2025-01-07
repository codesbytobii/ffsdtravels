import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IMAGE_URL } from "@/config/api";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useLocation } from "react-router-dom";
import { Luggage, Plane } from "lucide-react";

// Define the types for your data structure
interface Segment {
  aircraft: {
    code: string;
  };
  airlineLogo: string;
  airlineName: string;
  arrival: {
    at: string;
    iataCode: string;
    terminal: string;
  };
  arrival_airport: string;
  blacklistedInEU: boolean;
  carrierCode: string;
  departure: {
    at: string;
    iataCode: string;
    terminal: string;
  };
  departure_airport: string;
  duration: string;
  id: string;
  number: string;
  numberOfStops: number;
  operating: {
    carrierCode: string;
  };
}

interface Itinerary {
  duration: string;
  segments: Segment[];
}

interface Price {
  // test_total: string;
  ffsd_total: string;
  base: string;
  currency: string;
  fees: { amount: string }[];
  grandTotal: string;
  total: string;
}

interface Flight {
  id: string;
  DepartureAirport: string;
  arrivalAirport: string;
  instantTicketingRequired: boolean;
  isUpsellOffer: boolean;
  itineraries: Itinerary[];
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  logo: string;
  nonHomogeneous: boolean;
  numberOfBookableSeats: number;
  oneWay: boolean;
  price: Price;
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  source: string;
  travelerPricings: {
    travelerType: string;
    fareDetailsBySegment: {
      class: string;
      includedCheckedBags: {
        quantity: number;
      };
    }[];
  }[];
  type: string;
  validatingAirlineCodes: string[];
}

// interface SearchResultProps {
//   searchResults: Flight[];
// }

// Utility functions
const formatPrice = (currency: string, amount: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(parseFloat(amount));

const formatDuration = (duration: string) =>
  duration.replace("PT", "").replace("H", "H ");

const calculateFlightDuration = (departure: string, arrival: string) => {
  const durationMs =
    new Date(arrival).getTime() - new Date(departure).getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const getNumberOfStops = (numSegments: number) =>
  numSegments === 1
    ? "non-stop"
    : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;


const ITEMS_PER_PAGE = 10;

// FlightCard Component
const FlightCard: React.FC<{ result: Flight }> = ({ result }) => {
  const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom
  
  
  // const handleBookFlight = () => {
  //   // Optionally, store flight details in localStorage
  //   localStorage.setItem("selectedFlight", JSON.stringify(result));

  //   // Navigate to the booking page (adjust the route as needed)
  //   navigate("/book-flight");
  // };

  // const handleBookFlight = async () => {
  //   try {
  //     // Build the payload structure
  //     const payload = {
  //       data: {
  //         type: "flight-offers-pricing",
  //         flightOffers: [result], // Use the selected flight data here
  //       },
  //     };

  //     const confirmPriceToken = localStorage.getItem("confirmPriceToken");
  //     // console.log('confirmPriceToken testing', confirmPriceToken)

  //     // console.log('confirmPriceToken', confirmPriceToken)
  
  //     // Call the API to confirm the price
  //     const response = await fetch(
  //       "https://test.ffsdtravels.com/api/flight/price/confirm",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${confirmPriceToken}`, // Include token if required
  //           // Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, // Include token if required
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     console.log("Response:", response);
  //     // console.log("Response Status:", response.status);
  //     // console.log("Response Headers:", response.headers);
  
  //     const data = await response.json();
      // console.log('pricedata', data);
      // console.log('bookingRequirements',  data.data.bookingRequirements);
      // console.log('emailAddressRequired',  data.data.bookingRequirements.emailAddressRequired);


  //     localStorage.setItem("payToken", data.accessToken)
  //     localStorage.setItem("bookingRequirements", data.data.bookingRequirements)
  
  //     if (response.ok) {
  //       // If price confirmation is successful
  //       // console.log("Price confirmed:", data);
  
  //       // Optionally, store flight details in localStorage
  //       localStorage.setItem("selectedFlight", JSON.stringify(result));
  
  //       // Navigate to the booking page
  //       navigate("/book-flight");
  //     } else {
  //       // Handle errors (e.g., price mismatch or other API errors)
  //       alert(`Price confirmation failed: ${data.message || "Unknown error"}`);
  //     }
  //   } catch (error) {
  //     console.error("Error confirming price:", error);
  //     alert("An error occurred while confirming the price. Please try again.");
  //   }
  // };

  const handleBookFlight = async () => {
    try {
      const confirmPriceToken = localStorage.getItem("confirmPriceToken");
      if (!confirmPriceToken) {
        alert("Authorization token is missing. Please log in again.");
        return;
      }
  
      const payload = {
        data: {
          type: "flight-offers-pricing",
          flightOffers: [result], // Use the selected flight data here
        },
      };
  
      const response = await fetch(
        "https://test.ffsdtravels.com/api/flight/price/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${confirmPriceToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      const data = await response.json();
      console.log('pricedata', data);
      console.log('bookingRequirements',  data.data.bookingRequirements);
      console.log('emailAddressRequired',  data.data.bookingRequirements.emailAddressRequired);
  
      if (response.ok) {
        const { bookingRequirements, accessToken } = data.data;
  
        localStorage.setItem("payToken", accessToken);
        localStorage.setItem(
          "bookingRequirements",
          JSON.stringify(bookingRequirements)
        );
        localStorage.setItem("selectedFlight", JSON.stringify(result));
  
        navigate("/book-flight");
      } else {
        alert(
          `Price confirmation failed: ${data.message || "Unknown error"} (Status: ${response.status})`
        );
      }
    } catch (error) {
      console.error("Error confirming price:", error);
      alert("An error occurred while confirming the price. Please try again.");
    }
  };
  
  

  if (!result.itineraries.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {result.itineraries.map((itinerary, index) => {

        return (
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
                  <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
                    {/* {formatPrice(result.price.currency, result.price.test_total)} */}
                    {formatPrice(result.price.currency, result.price.ffsd_total)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
                <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
                  <span className="font-bold text-black">Departure Date</span>{" "}
                  <span className="font-medium">
                      {/* {itinerary.segments[0].departure.at} */}
                      {new Date(itinerary.segments[0].departure.at).toLocaleDateString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                  </span>
                  <span className="font-bold text-black">
                    {new Date(itinerary.segments[0].departure.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>              
                  <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
                </p>
              </div>

              <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
                <div className="flex flex-col items-start w-[35%]">
                  <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
                    {itinerary.segments[0].departure_airport}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                <Plane />
                  <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
                    {formatDuration(itinerary.duration)}
                  </p>
                  <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
                    {getNumberOfStops(itinerary.segments.length)}
                  </p>
                </div>

                <div className="flex flex-col items-end w-[35%]">
                  <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
                  {itinerary.segments[itinerary.segments.length - 1].arrival_airport}
                  </p>
                </div>
              </div>
            </div>

            <hr />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="font-medium px-2 capitalize">
                  <p className="font-bold text-black capitalize">
                    Flight Details
                  </p>
                </AccordionTrigger>
                <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
                  {itinerary.segments.map((segment) => (
                    <SegmentDetails
                      key={segment.id}
                      segment={segment}
                      travelerPricings={result.travelerPricings} // Pass travelerPricings here
                    />
                  ))}
                  <div className="flex mt-2 w-full justify-end">
                    <Button
                      className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
                      onClick={handleBookFlight} // Trigger navigation on click
                    >
                      <p className="capitalize">book flight</p>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )})}
    </div>
  );
};

// SegmentDetails Component
const SegmentDetails: React.FC<{
  segment: Segment;
  travelerPricings: Flight["travelerPricings"];
}> = ({ segment, travelerPricings }) => (
  <div className="mt-3 bg-gray-100 rounded-xs">
    <div className="flex items-center lg:space-x-2 space-x-1 justify-between p-3 ">
      <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px]  text-gray-600">
        <span className="font-bold text-black">Departure</span>{" "}
        <span className="font-medium">{segment.departure_airport}</span>{" "}
        <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
        <span className="font-bold text-black">
          {new Date(segment.departure.at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </p>

      <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
        <img
          src={`${IMAGE_URL}${segment?.airlineLogo}`}
          alt={`${segment?.airlineName} logo`}
          className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
        />
        <div>
          <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
            {segment.airlineName}
          </b>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3  mt-2">
      <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
        <div className="flex flex-col items-start w-[35%]">
          <p className="font-bold capitalize lg:text-sm text-[12px]">
            {new Date(segment.departure.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
            {segment.departure_airport}
          </p>
        </div>

        <div className="flex flex-col items-center">
        <Plane />
          <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
            {segment.numberOfStops === 0
              ? "No stop"
              : `${segment.numberOfStops} stops`}
          </p>
          <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
            {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
          </p>
        </div>

        <div className="flex flex-col items-end w-[35%]">
          <p className="font-bold capitalize lg:text-sm text-[12px]">
            {new Date(segment.arrival.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
            {segment.arrival_airport}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
        <div className="flex flex-col items-start w-[35%]">
          <p className="font-bold capitalize lg:text-sm text-[12px]">Baggage</p>
          {travelerPricings.map((pricing, index) => (
            <div key={index} className="w-full flex flex-col items-start">
              <p className="flex font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]"><Luggage />
                {pricing.fareDetailsBySegment[0]?.includedCheckedBags
                  ?.quantity ?? 0}{" "}
                X 23kg
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end w-[35%]">
          <p className="font-bold capitalize lg:text-sm text-[12px]">Airline</p>
          <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
            {segment.carrierCode} - {segment.number}
          </p>
        </div>
      </div>
    </div>
  </div>
);

interface SearchResultProps {
  searchData: Flight[];
}

const SearchResult: React.FC<SearchResultProps> = ({ searchData }) => {
  const location = useLocation();

  searchData;
  // Extract searchResults and searchParams from location.state
  const searchResults: Flight[] = Array.isArray(location.state?.searchResults)
    ? location.state.searchResults
    : Object.values(location.state?.searchResults);

  // const { searchParams } = location.state || {
  //   searchResults: [],
  //   // searchParams: {} as SearchParams,
  // };

  // Setup pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = searchResults.slice(startIndex, endIndex);

  // console.log(searchResults)
  // console.log("search parameters", searchParams)

  // Return when there are no search results
  if (!searchResults.length) {
    return (
      <Card className="text-center bg-white shadow-md p-4 rounded-sm">
        <CardHeader className="text-lg font-semibold mt-0">
          <p className="text-xl font-semibold">No search results found.</p>
        </CardHeader>
        <p className="text-gray-600 font-medium">
          Please try adjusting your search criteria.
        </p>
      </Card>
    );
  }

  return (

      <div className="flex flex-col gap-3">
      {paginatedData.map((result) => (
        <FlightCard key={result.id} result={result} />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {/* {totalPages > 3 && <PaginationEllipsis />} */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default SearchResult;



