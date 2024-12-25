// // import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import React, { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Accordion,
// //   AccordionContent,
// //   AccordionItem,
// //   AccordionTrigger,
// // } from "@/components/ui/accordion";
// // import { IMAGE_URL } from "@/config/api";
// // import {
// //   Pagination,
// //   PaginationContent,
// //   PaginationEllipsis,
// //   PaginationItem,
// //   PaginationLink,
// //   PaginationNext,
// //   PaginationPrevious,
// // } from "@/components/ui/pagination";
// // import { useNavigate } from "react-router-dom";

// // // Define the types for your data structure
// // interface Segment {
// //   aircraft: {
// //     code: string;
// //   };
// //   airlineLogo: string;
// //   airlineName: string;
// //   arrival: {
// //     at: string;
// //     iataCode: string;
// //     terminal: string;
// //   };
// //   arrival_airport: string;
// //   blacklistedInEU: boolean;
// //   carrierCode: string;
// //   departure: {
// //     at: string;
// //     iataCode: string;
// //     terminal: string;
// //   };
// //   departure_airport: string;
// //   duration: string;
// //   id: string;
// //   number: string;
// //   numberOfStops: number;
// //   operating: {
// //     carrierCode: string;
// //   };
// // }

// // interface Itinerary {
// //   duration: string;
// //   segments: Segment[];
// // }

// // interface Price {
// //   // ffsd_total: string;
// //   base: string;
// //   currency: string;
// //   fees: { amount: string }[];
// //   grandTotal: string;
// //   total: string;
// // }

// // interface FlightData {
// //   id: string;
// //   DepartureAirport: string;
// //   arrivalAirport: string;
// //   instantTicketingRequired: boolean;
// //   isUpsellOffer: boolean;
// //   itineraries: Itinerary[];
// //   lastTicketingDate: string;
// //   lastTicketingDateTime: string;
// //   logo: string;
// //   nonHomogeneous: boolean;
// //   numberOfBookableSeats: number;
// //   oneWay: boolean;
// //   price: Price;
// //   pricingOptions: {
// //     fareType: string[];
// //     includedCheckedBagsOnly: boolean;
// //   };
// //   source: string;
// //   travelerPricings: {
// //     travelerType: string;
// //     fareDetailsBySegment: {
// //       class: string;
// //       includedCheckedBags: {
// //         quantity: number;
// //       };
// //     }[];
// //   }[];
// //   type: string;
// //   validatingAirlineCodes: string[];
// // }

// // interface SearchResultProps {
// //   searchData: FlightData[];
// // }


// // // Utility functions
// // const formatPrice = (currency: string, amount: string) =>
// //   new Intl.NumberFormat("en-US", {
// //     style: "currency",
// //     currency: currency,
// //   }).format(parseFloat(amount));

// // const formatDuration = (duration: string) =>
// //   duration.replace("PT", "").replace("H", "H ");

// // const calculateFlightDuration = (departure: string, arrival: string) => {
// //   const durationMs =
// //     new Date(arrival).getTime() - new Date(departure).getTime();
// //   const hours = Math.floor(durationMs / (1000 * 60 * 60));
// //   const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
// //   return `${hours}h ${minutes}m`;
// // };

// // const getNumberOfStops = (numSegments: number) =>
// //   numSegments === 1
// //     ? "non-stop"
// //     : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;

// // const formatDate = (dateString: string) =>
// //   new Date(dateString).toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "long",
// //     year: "numeric",
// //   });

// // const ITEMS_PER_PAGE = 10;


// // // FlightCard Component
// // const FlightCard: React.FC<{ result: FlightData }> = ({ result }) => {
// //   const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom

// //   console.log(result)

// //   // Function to handle the book flight action
// //   const handleBookFlight = () => {
// //     // Optionally, store flight details in localStorage
// //     localStorage.setItem("selectedFlight", JSON.stringify(result));

// //     // Navigate to the booking page (adjust the route as needed)
// //     navigate("/book-flight");
// //   };

// //   // if (!result.itineraries.length) return null;
// //   if (!result || !result.itineraries.length) {
// //     return <p>No flights available at the moment.</p>; // Fallback UI
// //   }

// //   return (
// //     <div className="flex flex-col gap-4">
// //       {result.itineraries.map((itinerary, index) => (
// //         <Card key={index} className="bg-white shadow-md p-4 rounded-sm">
// //           <CardContent className="p-0">
// //             <div className="p-2 border-b-2 flex items-center justify-between">
// //               <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
// //                 <img
// //                   src={`${IMAGE_URL}${itinerary.segments[0].airlineLogo}`}
// //                   alt={`${itinerary.segments[0].airlineName} logo`}
// //                   className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
// //                 />
// //                 <div>
// //                   <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
// //                     {itinerary.segments[0].airlineName}
// //                   </b>
// //                 </div>
// //               </div>

// //               <div className="flex lg:gap-5 gap-3 items-center">
// //                 <div className="text-end">
// //                   <p className="capitalize lg:text-sm text-[12px] font-medium">
// //                     Full pay
// //                   </p>
// //                   <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
// //                     {formatPrice(result.price.currency, result.price.total)}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-3">
// //               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
// //                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
// //                   <span className="font-bold text-black">Departure Date</span>{" "}
// //                   <span className="font-medium">
// //                     {result.lastTicketingDate &&
// //                       formatDate(result.lastTicketingDate)}
// //                   </span>
// //                   <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
// //                 </p>
// //               </div>

// //               <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
// //                 <div className="flex flex-col items-start w-[35%]">
// //                   <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                     {itinerary.segments[0].departure_airport}
// //                   </p>
// //                 </div>

// //                 <div className="flex flex-col items-center">
// //                   <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
// //                     {formatDuration(itinerary.duration)}
// //                   </p>
// //                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //                     {getNumberOfStops(itinerary.segments.length)}
// //                   </p>
// //                 </div>

// //                 <div className="flex flex-col items-end w-[35%]">
// //                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                     {result.arrivalAirport}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <Accordion type="single" collapsible className="w-full">
// //               <AccordionItem value="item-1" className="border-none">
// //                 <AccordionTrigger className="font-medium px-2 capitalize">
// //                   <p className="font-bold text-black capitalize">
// //                     Flight Details
// //                   </p>
// //                 </AccordionTrigger>
// //                 <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
// //                   {itinerary.segments.map((segment) => (
// //                     <SegmentDetails
// //                       key={segment.id}
// //                       segment={segment}
// //                       travelerPricings={result.travelerPricings} // Pass travelerPricings here
// //                     />
// //                   ))}
// //                   <div className="flex mt-2 w-full justify-end">
// //                     <Button
// //                       className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
// //                       onClick={handleBookFlight} // Trigger navigation on click
// //                     >
// //                       <p className="capitalize">book flight</p>
// //                     </Button>
// //                   </div>
// //                 </AccordionContent>
// //               </AccordionItem>
// //             </Accordion>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // };


// // // SegmentDetails Component
// // const SegmentDetails: React.FC<{
// //   segment: Segment;
// //   travelerPricings: FlightData["travelerPricings"];
// // }> = ({ segment, travelerPricings }) => (
// //   <div className="mt-3 bg-gray-100 rounded-xs">
// //     <div className="flex items-center lg:space-x-2 space-x-1 justify-between p-3 ">
// //       <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px]  text-gray-600">
// //         <span className="font-bold text-black">Departure</span>{" "}
// //         <span className="font-medium">{segment.departure_airport}</span>{" "}
// //         <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
// //         <span className="font-bold text-black">
// //           {new Date(segment.departure.at).toLocaleTimeString([], {
// //             hour: "2-digit",
// //             minute: "2-digit",
// //           })}
// //         </span>
// //       </p>

// //       <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
// //         <img
// //           src={`${IMAGE_URL}${segment.airlineLogo}`}
// //           alt={`${segment.airlineName} logo`}
// //           className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
// //         />
// //         <div>
// //           <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
// //             {segment.airlineName}
// //           </b>
// //         </div>
// //       </div>
// //     </div>

// //     <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3  mt-2">
// //       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
// //         <div className="flex flex-col items-start w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">
// //             {new Date(segment.departure.at).toLocaleTimeString([], {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })}
// //           </p>
// //           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.departure_airport}
// //           </p>
// //         </div>

// //         <div className="flex flex-col items-center">
// //           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.numberOfStops === 0
// //               ? "No stop"
// //               : `${segment.numberOfStops} stops`}
// //           </p>
// //           <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
// //             {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
// //           </p>
// //         </div>

// //         <div className="flex flex-col items-end w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">
// //             {new Date(segment.arrival.at).toLocaleTimeString([], {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })}
// //           </p>
// //           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.arrival_airport}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
// //         <div className="flex flex-col items-start w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">Baggage</p>
// //           {travelerPricings.map((pricing, index) => (
// //             <div key={index} className="w-full flex flex-col items-start">
// //               <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                 {pricing.fareDetailsBySegment[0]?.includedCheckedBags
// //                   ?.quantity ?? 0}{" "}
// //                 X 23kg
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="flex flex-col items-end w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">Airline</p>
// //           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.carrierCode} - {segment.number}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const SearchResult: React.FC<SearchResultProps> = ({ searchData }) => {
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Calculate the index range for the current page
// //   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
// //   const endIndex = startIndex + ITEMS_PER_PAGE;
// //   const paginatedData = searchData.slice(startIndex, endIndex);
// //   const totalPages = Math.ceil(searchData.length / ITEMS_PER_PAGE);

// //   if (!searchData || searchData.length === 0) {
// //     return (
// //       <Card className="text-center bg-white shadow-md p-4 rounded-sm">
// //         <CardHeader className="text-lg font-semibold mt-0">
// //           <p className="text-xl font-semibold">No search results found.</p>
// //         </CardHeader>
// //         <p className="text-gray-600 font-medium">
// //           Please try adjusting your search criteria.
// //         </p>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col gap-3">
// //       {paginatedData.map((result) => (
// //         <FlightCard key={result.id} result={result} />
// //       ))}

// //       {/* Pagination Controls */}
// //       <div className="flex justify-center mt-4">
// //         <Pagination>
// //           <PaginationContent>
// //             <PaginationItem>
// //               <PaginationPrevious
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   if (currentPage > 1) setCurrentPage(currentPage - 1);
// //                 }}
// //               />
// //             </PaginationItem>
// //             {Array.from({ length: totalPages }, (_, index) => (
// //               <PaginationItem key={index + 1}>
// //                 <PaginationLink
// //                   href="#"
// //                   isActive={currentPage === index + 1}
// //                   onClick={(e) => {
// //                     e.preventDefault();
// //                     setCurrentPage(index + 1);
// //                   }}
// //                 >
// //                   {index + 1}
// //                 </PaginationLink>
// //               </PaginationItem>
// //             ))}
// //             {totalPages > 3 && <PaginationEllipsis />}
// //             <PaginationItem>
// //               <PaginationNext
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// //                 }}
// //               />
// //             </PaginationItem>
// //           </PaginationContent>
// //         </Pagination>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchResult;




// // import React from "react";
// // import { useLocation } from "react-router-dom";

// // const SearchResult = () => {
// //   const location = useLocation();
// //   const searchResults = Array.isArray(location.state?.searchResults) 
// //   ? location.state.searchResults 
// //   : Object.values(location.state?.searchResults || {});
// //   const {  searchParams } = location.state || { searchResults: [], searchParams: {} };


// //   console.log("Search Results:", searchResults);
// //   console.log("Search Params:", searchParams);
// //   console.log("Search length:", searchResults.length);


// //   // Optionally handle the case where there's no searchParams or searchResults
// //   if (!searchResults.length) {
// //     return <div>No results found.</div>;
// //   }

// //   return (
// //     <div>
// //       <h1>Search Results</h1>
// //       <h2>Search Parameters</h2>
// //       <p>Departure City: {searchParams.departureCity}</p>
// //       <p>Arrival City: {searchParams.arrivalCity}</p>
// //       <p>Departure Date: {searchParams.departureDate.toString()}</p>
// //       <p>Adults: {searchParams.adultCount}</p>
// //       <p>Children: {searchParams.childCount}</p>
// //       <p>Infants: {searchParams.infantCount}</p>
// //       <p>Class: {searchParams.selectedClass}</p>
      
// //       <h2>Flight Results</h2>
// //       <ul>
// //         {searchResults.map((flight: any, index: any) => (
// //           <li key={index}>
// //             {/* Render your flight details here */}
// //             <div>Flight Details: {JSON.stringify(flight)}</div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default SearchResult;


// import { useLocation } from "react-router-dom";

// interface Flight {
//   // Define the structure of a flight here, e.g.,
//   flightNumber: string;
//   departureTime: string;
//   arrivalTime: string;
//   price: number;
//   [key: string]: any;
// }

// interface SearchParams {
//   departureCity: string;
//   arrivalCity: string;
//   departureDate: Date;
//   adultCount: number;
//   childCount: number;
//   infantCount: number;
//   selectedClass: string;
// }

// const SearchResult = () => {
//   const location = useLocation();
  
//   const searchResults: Flight[] = Array.isArray(location.state?.searchResults) 
//     ? location.state.searchResults 
//     : Object.values(location.state?.searchResults);

//   const { searchParams } = location.state || { searchResults: [], searchParams: {} as SearchParams };

//   console.log("Search Results:", searchResults[1]);
//   console.log("Search Params:", searchParams);
//   console.log("Search length:", searchResults.length);

//   if (!searchResults.length) {
//     return <div>No results found.</div>;
//   }

//   return (
//     <div>
//       <h1>Search Results</h1>

//       <h2>Search Parameters</h2>
//       <p>Departure City: {searchParams?.departureCity || "N/A"}</p>
//       <p>Arrival City: {searchParams?.arrivalCity || "N/A"}</p>
//       <p>Departure Date: {searchParams?.departureDate?.toString() || "N/A"}</p>
//       <p>Adults: {searchParams?.adultCount || 0}</p>
//       <p>Children: {searchParams?.childCount || 0}</p>
//       <p>Infants: {searchParams?.infantCount || 0}</p>
//       <p>Class: {searchParams?.selectedClass || "N/A"}</p>

//       <h2>Flight Results</h2>
//       <ul>
//   {searchResults.map((flight, index) => {
//     console.log("Flight Dataqrw:", flight[1]); // Log each flight object
//     return (
//       <li key={index}>
//         <div>
//           {/* Safely access flight properties */}
//           <p>Flight Number: {flight.details?.flightNumber || "Not Available"}</p>
//           <p>Departure Time: {flight.departureTime || "Not Available"}</p>
//           <p>Arrival Time: {flight.arrivalTime || "Not Available"}</p>
//           <p>Price: {flight.price ? `$${flight.price}` : "Not Available"}</p>
//         </div>
//       </li>
//     );
//   })}
// </ul>

//     </div>
//   );
// };

// export default SearchResult;










// // import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import React, { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Accordion,
// //   AccordionContent,
// //   AccordionItem,
// //   AccordionTrigger,
// // } from "@/components/ui/accordion";
// // import { IMAGE_URL } from "@/config/api";
// // import {
// //   Pagination,
// //   PaginationContent,
// //   PaginationEllipsis,
// //   PaginationItem,
// //   PaginationLink,
// //   PaginationNext,
// //   PaginationPrevious,
// // } from "@/components/ui/pagination";
// // import { useNavigate } from "react-router-dom";

// // // Define the types for your data structure
// // interface Segment {
// //   aircraft: {
// //     code: string;
// //   };
// //   airlineLogo: string;
// //   airlineName: string;
// //   arrival: {
// //     at: string;
// //     iataCode: string;
// //     terminal: string;
// //   };
// //   arrival_airport: string;
// //   blacklistedInEU: boolean;
// //   carrierCode: string;
// //   departure: {
// //     at: string;
// //     iataCode: string;
// //     terminal: string;
// //   };
// //   departure_airport: string;
// //   duration: string;
// //   id: string;
// //   number: string;
// //   numberOfStops: number;
// //   operating: {
// //     carrierCode: string;
// //   };
// // }

// // interface Itinerary {
// //   duration: string;
// //   segments: Segment[];
// // }

// // interface Price {
// //   // ffsd_total: string;
// //   base: string;
// //   currency: string;
// //   fees: { amount: string }[];
// //   grandTotal: string;
// //   total: string;
// // }

// // interface FlightData {
// //   id: string;
// //   DepartureAirport: string;
// //   arrivalAirport: string;
// //   instantTicketingRequired: boolean;
// //   isUpsellOffer: boolean;
// //   itineraries: Itinerary[];
// //   lastTicketingDate: string;
// //   lastTicketingDateTime: string;
// //   logo: string;
// //   nonHomogeneous: boolean;
// //   numberOfBookableSeats: number;
// //   oneWay: boolean;
// //   price: Price;
// //   pricingOptions: {
// //     fareType: string[];
// //     includedCheckedBagsOnly: boolean;
// //   };
// //   source: string;
// //   travelerPricings: {
// //     travelerType: string;
// //     fareDetailsBySegment: {
// //       class: string;
// //       includedCheckedBags: {
// //         quantity: number;
// //       };
// //     }[];
// //   }[];
// //   type: string;
// //   validatingAirlineCodes: string[];
// // }

// // interface SearchResultProps {
// //   searchData: FlightData[];
// // }


// // // Utility functions
// // const formatPrice = (currency: string, amount: string) =>
// //   new Intl.NumberFormat("en-US", {
// //     style: "currency",
// //     currency: currency,
// //   }).format(parseFloat(amount));

// // const formatDuration = (duration: string) =>
// //   duration.replace("PT", "").replace("H", "H ");

// // const calculateFlightDuration = (departure: string, arrival: string) => {
// //   const durationMs =
// //     new Date(arrival).getTime() - new Date(departure).getTime();
// //   const hours = Math.floor(durationMs / (1000 * 60 * 60));
// //   const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
// //   return `${hours}h ${minutes}m`;
// // };

// // const getNumberOfStops = (numSegments: number) =>
// //   numSegments === 1
// //     ? "non-stop"
// //     : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;

// // const formatDate = (dateString: string) =>
// //   new Date(dateString).toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "long",
// //     year: "numeric",
// //   });

// // const ITEMS_PER_PAGE = 10;


// // // FlightCard Component
// // const FlightCard: React.FC<{ result: FlightData }> = ({ result }) => {
// //   const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom

// //   // console.log("this is the result", result)

// //   // Function to handle the book flight action
// //   const handleBookFlight = () => {
// //     // Optionally, store flight details in localStorage
// //     localStorage.setItem("selectedFlight", JSON.stringify(result));

// //     // Navigate to the booking page (adjust the route as needed)
// //     navigate("/book-flight");
// //   };

// //   // if (!result.itineraries.length) return null;
// //   if (!result || !result.itineraries.length) {
// //     return <p>No flights available at the moment.</p>; // Fallback UI
// //   }

// //   return (
// //     <div className="flex flex-col gap-4">
// //       {result.itineraries.map((itinerary, index) => (
// //         <Card key={index} className="bg-white shadow-md p-4 rounded-sm">
// //           <CardContent className="p-0">
// //             <div className="p-2 border-b-2 flex items-center justify-between">
// //               <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
// //                 <img
// //                   src={`${IMAGE_URL}${itinerary.segments[0].airlineLogo}`}
// //                   alt={`${itinerary.segments[0].airlineName} logo`}
// //                   className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
// //                 />
// //                 <div>
// //                   <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
// //                     {itinerary.segments[0].airlineName}
// //                   </b>
// //                 </div>
// //               </div>

// //               <div className="flex lg:gap-5 gap-3 items-center">
// //                 <div className="text-end">
// //                   <p className="capitalize lg:text-sm text-[12px] font-medium">
// //                     Full pay
// //                   </p>
// //                   <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
// //                     {formatPrice(result.price.currency, result.price.total)}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-3">
// //               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
// //                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
// //                   <span className="font-bold text-black">Departure Date</span>{" "}
// //                   <span className="font-medium">
// //                     {result.lastTicketingDate &&
// //                       formatDate(result.lastTicketingDate)}
// //                   </span>
// //                   <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
// //                 </p>
// //               </div>

// //               <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
// //                 <div className="flex flex-col items-start w-[35%]">
// //                   <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                     {itinerary.segments[0].departure_airport}
// //                   </p>
// //                 </div>

// //                 <div className="flex flex-col items-center">
// //                   <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
// //                     {formatDuration(itinerary.duration)}
// //                   </p>
// //                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //                     {getNumberOfStops(itinerary.segments.length)}
// //                   </p>
// //                 </div>

// //                 <div className="flex flex-col items-end w-[35%]">
// //                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                     {result.arrivalAirport}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <Accordion type="single" collapsible className="w-full">
// //               <AccordionItem value="item-1" className="border-none">
// //                 <AccordionTrigger className="font-medium px-2 capitalize">
// //                   <p className="font-bold text-black capitalize">
// //                     Flight Details
// //                   </p>
// //                 </AccordionTrigger>
// //                 <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
// //                   {itinerary.segments.map((segment) => (
// //                     <SegmentDetails
// //                       key={segment.id}
// //                       segment={segment}
// //                       travelerPricings={result.travelerPricings} // Pass travelerPricings here
// //                     />
// //                   ))}
// //                   <div className="flex mt-2 w-full justify-end">
// //                     <Button
// //                       className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
// //                       onClick={handleBookFlight} // Trigger navigation on click
// //                     >
// //                       <p className="capitalize">book flight</p>
// //                     </Button>
// //                   </div>
// //                 </AccordionContent>
// //               </AccordionItem>
// //             </Accordion>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // };


// // // SegmentDetails Component
// // const SegmentDetails: React.FC<{
// //   segment: Segment;
// //   travelerPricings: FlightData["travelerPricings"];
// // }> = ({ segment, travelerPricings }) => (
// //   <div className="mt-3 bg-gray-100 rounded-xs">
// //     <div className="flex items-center lg:space-x-2 space-x-1 justify-between p-3 ">
// //       <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px]  text-gray-600">
// //         <span className="font-bold text-black">Departure</span>{" "}
// //         <span className="font-medium">{segment.departure_airport}</span>{" "}
// //         <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
// //         <span className="font-bold text-black">
// //           {new Date(segment.departure.at).toLocaleTimeString([], {
// //             hour: "2-digit",
// //             minute: "2-digit",
// //           })}
// //         </span>
// //       </p>

// //       <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
// //         <img
// //           src={`${IMAGE_URL}${segment.airlineLogo}`}
// //           alt={`${segment.airlineName} logo`}
// //           className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
// //         />
// //         <div>
// //           <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
// //             {segment.airlineName}
// //           </b>
// //         </div>
// //       </div>
// //     </div>

// //     <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3  mt-2">
// //       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
// //         <div className="flex flex-col items-start w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">
// //             {new Date(segment.departure.at).toLocaleTimeString([], {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })}
// //           </p>
// //           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.departure_airport}
// //           </p>
// //         </div>

// //         <div className="flex flex-col items-center">
// //           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.numberOfStops === 0
// //               ? "No stop"
// //               : `${segment.numberOfStops} stops`}
// //           </p>
// //           <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
// //             {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
// //           </p>
// //         </div>

// //         <div className="flex flex-col items-end w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">
// //             {new Date(segment.arrival.at).toLocaleTimeString([], {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })}
// //           </p>
// //           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.arrival_airport}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
// //         <div className="flex flex-col items-start w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">Baggage</p>
// //           {travelerPricings.map((pricing, index) => (
// //             <div key={index} className="w-full flex flex-col items-start">
// //               <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                 {pricing.fareDetailsBySegment[0]?.includedCheckedBags
// //                   ?.quantity ?? 0}{" "}
// //                 X 23kg
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="flex flex-col items-end w-[35%]">
// //           <p className="font-bold capitalize lg:text-sm text-[12px]">Airline</p>
// //           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //             {segment.carrierCode} - {segment.number}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const SearchResult: React.FC<SearchResultProps> = ({ searchData }) => {
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Calculate the index range for the current page
// //   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
// //   const endIndex = startIndex + ITEMS_PER_PAGE;
// //   const paginatedData = searchData.slice(startIndex, endIndex);
// //   const totalPages = Math.ceil(searchData.length / ITEMS_PER_PAGE);
// //   console.log(searchData)

// //   if (!searchData || searchData.length === 0) {
// //     return (
// //       <Card className="text-center bg-white shadow-md p-4 rounded-sm">
// //         <CardHeader className="text-lg font-semibold mt-0">
// //           <p className="text-xl font-semibold">No search results found.</p>
// //         </CardHeader>
// //         <p className="text-gray-600 font-medium">
// //           Please try adjusting your search criteria.
// //         </p>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col gap-3">
// //       {paginatedData.map((result) => (
// //         <FlightCard key={result.id} result={result} />
// //       ))}

// //       {/* Pagination Controls */}
// //       <div className="flex justify-center mt-4">
// //         <Pagination>
// //           <PaginationContent>
// //             <PaginationItem>
// //               <PaginationPrevious
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   if (currentPage > 1) setCurrentPage(currentPage - 1);
// //                 }}
// //               />
// //             </PaginationItem>
// //             {Array.from({ length: totalPages }, (_, index) => (
// //               <PaginationItem key={index + 1}>
// //                 <PaginationLink
// //                   href="#"
// //                   isActive={currentPage === index + 1}
// //                   onClick={(e) => {
// //                     e.preventDefault();
// //                     setCurrentPage(index + 1);
// //                   }}
// //                 >
// //                   {index + 1}
// //                 </PaginationLink>
// //               </PaginationItem>
// //             ))}
// //             {totalPages > 3 && <PaginationEllipsis />}
// //             <PaginationItem>
// //               <PaginationNext
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// //                 }}
// //               />
// //             </PaginationItem>
// //           </PaginationContent>
// //         </Pagination>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchResult;






// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import React, { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { IMAGE_URL } from "@/config/api";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { useNavigate } from "react-router-dom";

// // Define the types for your data structure
// interface Segment {
//   aircraft: {
//     code: string;
//   };
//   airlineLogo: string;
//   airlineName: string;
//   arrival: {
//     at: string;
//     iataCode: string;
//     terminal: string;
//   };
//   arrival_airport: string;
//   blacklistedInEU: boolean;
//   carrierCode: string;
//   departure: {
//     at: string;
//     iataCode: string;
//     terminal: string;
//   };
//   departure_airport: string;
//   duration: string;
//   id: string;
//   number: string;
//   numberOfStops: number;
//   operating: {
//     carrierCode: string;
//   };
// }

// interface Itinerary {
//   duration: string;
//   segments: Segment[];
// }

// interface Price {
//   ffsd_total: string;
//   base: string;
//   currency: string;
//   fees: { amount: string }[];
//   grandTotal: string;
//   total: string;
// }

// interface FlightData {
//   id: string;
//   DepartureAirport: string;
//   arrivalAirport: string;
//   instantTicketingRequired: boolean;
//   isUpsellOffer: boolean;
//   itineraries: Itinerary[];
//   lastTicketingDate: string;
//   lastTicketingDateTime: string;
//   logo: string;
//   nonHomogeneous: boolean;
//   numberOfBookableSeats: number;
//   oneWay: boolean;
//   price: Price;
//   pricingOptions: {
//     fareType: string[];
//     includedCheckedBagsOnly: boolean;
//   };
//   source: string;
//   travelerPricings: {
//     travelerType: string;
//     fareDetailsBySegment: {
//       class: string;
//       includedCheckedBags: {
//         quantity: number;
//       };
//     }[];
//   }[];
//   type: string;
//   validatingAirlineCodes: string[];
// }

// interface SearchResultProps {
//   searchData: FlightData[];
// }


// // Utility functions
// const formatPrice = (currency: string, amount: string) =>
//   new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: currency,
//   }).format(parseFloat(amount));

// const formatDuration = (duration: string) =>
//   duration.replace("PT", "").replace("H", "H ");

// const calculateFlightDuration = (departure: string, arrival: string) => {
//   const durationMs =
//     new Date(arrival).getTime() - new Date(departure).getTime();
//   const hours = Math.floor(durationMs / (1000 * 60 * 60));
//   const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
//   return `${hours}h ${minutes}m`;
// };

// const getNumberOfStops = (numSegments: number) =>
//   numSegments === 1
//     ? "non-stop"
//     : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;

// const formatDate = (dateString: string) =>
//   new Date(dateString).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

// // const ITEMS_PER_PAGE = 10;

// // FlightCard Component
// const FlightCard: React.FC<{ result: FlightData }> = ({ result }) => {
//   const navigate = useNavigate();

//   const handleBookFlight = () => {
//     localStorage.setItem("selectedFlight", JSON.stringify(result));
//     navigate("/book-flight");
//   };

//   if (!result || !result.itineraries.length) {
//     return <p>No flights available at the moment.</p>;
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {result.itineraries.map((itinerary, index) => (
//         <Card key={index} className="bg-white shadow-md p-4 rounded-sm">
//           <CardContent className="p-0">
//             {/* Header Section */}
//             <div className="p-2 border-b-2 flex items-center justify-between">
//               <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
//                 <img
//                   src={`${IMAGE_URL}${itinerary.segments[0].airlineLogo}`}
//                   alt={`${itinerary.segments[0].airlineName} logo`}
//                   className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
//                 />
//                 <div>
//                   <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
//                     {itinerary.segments[0].airlineName}
//                   </b>
//                 </div>
//               </div>

//               <div className="flex lg:gap-5 gap-3 items-center">
//                 <div className="text-end">
//                   <p className="capitalize lg:text-sm text-[12px] font-medium">
//                     Full pay
//                   </p>
//                   <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
//                     {formatPrice(result.price.currency, result.price.total)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Flight Details Section */}
//             <div className="mt-3">
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-black">Departure Date</span>{" "}
//                   <span className="font-medium">
//                     {result.lastTicketingDate &&
//                       formatDate(result.lastTicketingDate)}
//                   </span>
//                   <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
//                 </p>
//               </div>

//               <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
//                 <div className="flex flex-col items-start w-[35%]">
//                   <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                     {itinerary.segments[0].departure_airport}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-center">
//                   <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//                     {formatDuration(itinerary.duration)}
//                   </p>
//                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//                     {getNumberOfStops(itinerary.segments.length)}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end w-[35%]">
//                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                     {result.arrivalAirport}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Accordion for Flight Details */}
//             <Accordion type="single" collapsible className="w-full">
//               <AccordionItem value="item-1" className="border-none">
//                 <AccordionTrigger className="font-medium px-2 capitalize">
//                   <p className="font-bold text-black capitalize">
//                     Flight Details
//                   </p>
//                 </AccordionTrigger>
//                 <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
//                   {itinerary.segments.map((segment) => (
//                     <SegmentDetails
//                       key={segment.id}
//                       segment={segment}
//                       travelerPricings={result.travelerPricings}
//                     />
//                   ))}
//                   <div className="flex mt-2 w-full justify-end">
//                     <Button
//                       className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
//                       onClick={handleBookFlight}
//                     >
//                       <p className="capitalize">Book Flight</p>
//                     </Button>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// // SegmentDetails Component
// const SegmentDetails: React.FC<{
//   segment: Segment;
//   travelerPricings: FlightData["travelerPricings"];
// }> = ({ segment, travelerPricings }) => (
//   <div className="mt-3 bg-gray-100 rounded-xs">
//     <div className="flex items-center lg:space-x-2 space-x-1 justify-between p-3 ">
//       <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px]  text-gray-600">
//         <span className="font-bold text-black">Departure</span>{" "}
//         <span className="font-medium">{segment.departure_airport}</span>{" "}
//         <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
//         <span className="font-bold text-black">
//           {new Date(segment.departure.at).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         </span>
//       </p>

//       <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
//         <img
//           src={`${IMAGE_URL}${segment.airlineLogo}`}
//           alt={`${segment.airlineName} logo`}
//           className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
//         />
//         <div>
//           <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
//             {segment.airlineName}
//           </b>
//         </div>
//       </div>
//     </div>

//     <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3  mt-2">
//       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
//         <div className="flex flex-col items-start w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">
//             {new Date(segment.departure.at).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </p>
//           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.departure_airport}
//           </p>
//         </div>

//         <div className="flex flex-col items-center">
//           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.numberOfStops === 0
//               ? "No stop"
//               : `${segment.numberOfStops} stops`}
//           </p>
//           <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//             {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
//           </p>
//         </div>

//         <div className="flex flex-col items-end w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">
//             {new Date(segment.arrival.at).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </p>
//           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.arrival_airport}
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
//         <div className="flex flex-col items-start w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">Baggage</p>
//           {travelerPricings.map((pricing, index) => (
//             <div key={index} className="w-full flex flex-col items-start">
//               <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                 {pricing.fareDetailsBySegment[0]?.includedCheckedBags
//                   ?.quantity ?? 0}{" "}
//                 X 23kg
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col items-end w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">Airline</p>
//           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.carrierCode} - {segment.number}
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // SearchResult Component
// const SearchResult: React.FC<SearchResultProps> = ({ searchData }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Constants
//   const ITEMS_PER_PAGE = 10;

//   // Calculate the index range for the current page
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;

//   // Memoize paginatedData for performance optimization
//   const paginatedData = useMemo(() => {
//     // Ensure searchData is an array before using slice
//     return Array.isArray(searchData) ? searchData.slice(startIndex, endIndex) : [];
//   }, [searchData, startIndex, endIndex]);
//   console.log("testing", searchData.length)
  

//   const totalPages = Math.ceil(searchData.length / ITEMS_PER_PAGE);

//   if (!searchData || searchData.length === 0) {
//     return (
//       <Card className="text-center bg-white shadow-md p-4 rounded-sm">
//         <CardHeader className="text-lg font-semibold mt-0">
//           <p className="text-xl font-semibold">No search results found.</p>
//         </CardHeader>
//         <p className="text-gray-600 font-medium">
//           Please try adjusting your search criteria.
//         </p>
//       </Card>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       {paginatedData.map((result) => (
//         <FlightCard key={result.id} result={result} />
//       ))}

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (currentPage > 1) setCurrentPage(currentPage - 1);
//                 }}
//               />
//             </PaginationItem>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <PaginationItem key={index + 1}>
//                 <PaginationLink
//                   href="#"
//                   isActive={currentPage === index + 1}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentPage(index + 1);
//                   }}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             {totalPages > 3 && <PaginationEllipsis />}
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//                 }}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;









// // import React, { useState, useCallback, useEffect } from "react";
// // import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Accordion,
// //   AccordionContent,
// //   AccordionItem,
// //   AccordionTrigger,
// // } from "@/components/ui/accordion";
// // import {
// //   Pagination,
// //   PaginationContent,
// //   PaginationEllipsis,
// //   PaginationItem,
// //   PaginationLink,
// //   PaginationNext,
// //   PaginationPrevious,
// // } from "@/components/ui/pagination";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import axiosInstance from "@/config/axios";
// // import { IMAGE_URL, NO_FLIGHT_MESSAGE } from "@/config/api";
// // import Loading from "@/components/components/withStatus/loading/Loading";

// // // Type Definitions
// // interface Segment {
// //   aircraft: {
// //     code: string;
// //   };
// //   airlineLogo: string;
// //   airlineName: string;
// //   arrival: {
// //     at: string;
// //     iataCode: string;
// //     terminal: string;
// //   };
// //   arrival_airport: string;
// //   blacklistedInEU: boolean;
// //   carrierCode: string;
// //   departure: {
// //     at: string;
// //     iataCode: string;
// //     terminal: string;
// //   };
// //   departure_airport: string;
// //   duration: string;
// //   id: string;
// //   number: string;
// //   numberOfStops: number;
// //   operating: {
// //     carrierCode: string;
// //   };
// // }

// // interface Itinerary {
// //   duration: string;
// //   segments: Segment[];
// // }

// // interface Price {
// //   base: string;
// //   currency: string;
// //   fees: { amount: string }[];
// //   grandTotal: string;
// //   total: string;
// // }

// // interface TravelerPricing {
// //   travelerType: string;
// //   fareDetailsBySegment: {
// //     class: string;
// //     includedCheckedBags: {
// //       quantity: number;
// //     };
// //   }[];
// // }

// // interface FlightData {
// //   id: string;
// //   DepartureAirport: string;
// //   arrivalAirport: string;
// //   instantTicketingRequired: boolean;
// //   isUpsellOffer: boolean;
// //   itineraries: Itinerary[];
// //   lastTicketingDate: string;
// //   lastTicketingDateTime: string;
// //   logo: string;
// //   nonHomogeneous: boolean;
// //   numberOfBookableSeats: number;
// //   oneWay: boolean;
// //   price: Price;
// //   pricingOptions: {
// //     fareType: string[];
// //     includedCheckedBagsOnly: boolean;
// //   };
// //   source: string;
// //   travelerPricings: TravelerPricing[];
// //   type: string;
// //   validatingAirlineCodes: string[];
// // }

// // interface SearchResultProps {
// //   searchData: FlightData[];
// // }

// // // Utility Functions
// // const formatPrice = (currency: string, amount: string) =>
// //   new Intl.NumberFormat("en-US", {
// //     style: "currency",
// //     currency: currency,
// //   }).format(parseFloat(amount));

// // const formatDuration = (duration: string) =>
// //   duration.replace("PT", "").replace("H", "H ");

// // const calculateFlightDuration = (departure: string, arrival: string) => {
// //   const durationMs =
// //     new Date(arrival).getTime() - new Date(departure).getTime();
// //   const hours = Math.floor(durationMs / (1000 * 60 * 60));
// //   const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
// //   return `${hours}h ${minutes}m`;
// // };

// // const getNumberOfStops = (numSegments: number) =>
// //   numSegments === 1
// //     ? "Non-stop"
// //     : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;

// // const formatDate = (dateString: string) =>
// //   new Date(dateString).toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "long",
// //     year: "numeric",
// //   });

// //   const ITEMS_PER_PAGE = 10;

// // // FlightCard Component
// // const FlightCard: React.FC<{ result: FlightData }> = ({ result }) => {
// //   const navigate = useNavigate();
// //   // console.log("result test", result)

// //   const showErrorMessage = useCallback((message: string) => {
// //     toast.error(message);
// //   }, []);

// //   // Function to handle the book flight action
// //   const handleBookFlight = () => {
// //     try {
// //       // Store flight details in localStorage
// //       localStorage.setItem("selectedFlight", JSON.stringify(result));

// //       // Navigate to the booking page
// //       navigate("/book-flight");
// //     } catch (error) {
// //       showErrorMessage("Failed to book the flight. Please try again.");
// //     }
// //   };

// //   if (!result.itineraries || result.itineraries.length === 0) return null;

// //   return (
// //     <div className="flex flex-col gap-4">
// //       {result.itineraries.map((itinerary, index) => (
// //         <Card key={index} className="bg-white shadow-md p-4 rounded-sm">
// //           <CardContent className="p-0">
// //             {/* Header Section */}
// //             <div className="p-2 border-b-2 flex items-center justify-between">
// //               <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
// //                 <img
// //                   src={`${IMAGE_URL}${itinerary.segments[0].airlineLogo}`}
// //                   alt={`${itinerary.segments[0].airlineName} logo`}
// //                   className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
// //                 />
// //                 <div>
// //                   <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
// //                     {itinerary.segments[0].airlineName}
// //                   </b>
// //                 </div>
// //               </div>

// //               <div className="flex lg:gap-5 gap-3 items-center">
// //                 <div className="text-end">
// //                   <p className="capitalize lg:text-sm text-[12px] font-medium">
// //                     Full pay
// //                   </p>
// //                   <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
// //                     {formatPrice(result.price.currency, result.price.total)}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Itinerary Details */}
// //             <div className="mt-3">
// //               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
// //                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
// //                   <span className="font-bold text-black">Departure Date</span>{" "}
// //                   <span className="font-medium">
// //                     {result.lastTicketingDate &&
// //                       formatDate(result.lastTicketingDate)}
// //                   </span>
// //                   <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
// //                 </p>
// //               </div>

// //               <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
// //                 <div className="flex flex-col items-start w-[35%]">
// //                   <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                     {itinerary.segments[0].departure_airport}
// //                   </p>
// //                 </div>

// //                 <div className="flex flex-col items-center">
// //                   <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
// //                     {formatDuration(itinerary.duration)}
// //                   </p>
// //                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //                     {getNumberOfStops(itinerary.segments.length)}
// //                   </p>
// //                 </div>

// //                 <div className="flex flex-col items-end w-[35%]">
// //                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                     {result.arrivalAirport}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Accordion for Flight Details */}
// //             <Accordion type="single" collapsible className="w-full">
// //               <AccordionItem value="item-1" className="border-none">
// //                 <AccordionTrigger className="font-medium px-2 capitalize">
// //                   <p className="font-bold text-black capitalize">
// //                     Flight Details
// //                   </p>
// //                 </AccordionTrigger>
// //                 <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
// //                   {itinerary.segments.map((segment) => (
// //                     <SegmentDetails
// //                       key={segment.id}
// //                       segment={segment}
// //                       travelerPricings={result.travelerPricings}
// //                     />
// //                   ))}
// //                   <div className="flex mt-2 w-full justify-end">
// //                     <Button
// //                       className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
// //                       onClick={handleBookFlight}
// //                     >
// //                       <p className="capitalize">Book Flight</p>
// //                     </Button>
// //                   </div>
// //                 </AccordionContent>
// //               </AccordionItem>
// //             </Accordion>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // };

// // // SegmentDetails Component
// // const SegmentDetails: React.FC<{
// //   segment: Segment;
// //   travelerPricings: TravelerPricing[];
// // }> = ({ segment, travelerPricings }) => {
// //   const calculateFlightDuration = useCallback(
// //     (departure: string, arrival: string) => {
// //       const durationMs =
// //         new Date(arrival).getTime() - new Date(departure).getTime();
// //       const hours = Math.floor(durationMs / (1000 * 60 * 60));
// //       const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
// //       return `${hours}h ${minutes}m`;
// //     },
// //     []
// //   );

// //   return (
// //     <div className="mt-3 bg-gray-100 rounded-xs">
// //       {/* Segment Header */}
// //       <div className="flex items-center lg:space-x-2 space-x-1 justify-between p-3 ">
// //         <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px]  text-gray-600">
// //           <span className="font-bold text-black">Departure</span>{" "}
// //           <span className="font-medium">{segment.departure_airport}</span>{" "}
// //           <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
// //           <span className="font-bold text-black">
// //             {new Date(segment.departure.at).toLocaleTimeString([], {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })}
// //           </span>
// //         </p>

// //         <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
// //           <img
// //             src={`${IMAGE_URL}${segment.airlineLogo}`}
// //             alt={`${segment.airlineName} logo`}
// //             className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
// //           />
// //           <div>
// //             <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
// //               {segment.airlineName}
// //             </b>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Segment Details */}
// //       <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3  mt-2">
// //         <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
// //           {/* Departure Info */}
// //           <div className="flex flex-col items-start w-[35%]">
// //             <p className="font-bold capitalize lg:text-sm text-[12px]">
// //               {new Date(segment.departure.at).toLocaleTimeString([], {
// //                 hour: "2-digit",
// //                 minute: "2-digit",
// //               })}
// //             </p>
// //             <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //               {segment.departure_airport}
// //             </p>
// //           </div>

// //           {/* Duration and Stops */}
// //           <div className="flex flex-col items-center">
// //             <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //               {segment.numberOfStops === 0
// //                 ? "No stop"
// //                 : `${segment.numberOfStops} stops`}
// //             </p>
// //             <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
// //               {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
// //             </p>
// //           </div>

// //           {/* Arrival Info */}
// //           <div className="flex flex-col items-end w-[35%]">
// //             <p className="font-bold capitalize lg:text-sm text-[12px]">
// //               {new Date(segment.arrival.at).toLocaleTimeString([], {
// //                 hour: "2-digit",
// //                 minute: "2-digit",
// //               })}
// //             </p>
// //             <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //               {segment.arrival_airport}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Baggage and Airline Info */}
// //         <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
// //           {/* Baggage Info */}
// //           <div className="flex flex-col items-start w-[35%]">
// //             <p className="font-bold capitalize lg:text-sm text-[12px]">Baggage</p>
// //             {travelerPricings.map((pricing, index) => (
// //               <div key={index} className="w-full flex flex-col items-start">
// //                 <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
// //                   {pricing.fareDetailsBySegment[0]?.includedCheckedBags
// //                     ?.quantity ?? 0}{" "}
// //                   X 23kg
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Airline Info */}
// //           <div className="flex flex-col items-end w-[35%]">
// //             <p className="font-bold capitalize lg:text-sm text-[12px]">Airline</p>
// //             <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
// //               {segment.carrierCode} - {segment.number}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // SearchResult Component
// // const SearchResult: React.FC<SearchResultProps> = ({ searchData }) => {

// //   console.log("SearchResult - searchData:", searchData[0].id);

// //   const navigate = useNavigate();
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [paginatedData, setPaginatedData] = useState<FlightData[]>([]);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const showErrorMessage = useCallback((message: string) => {
// //     toast.error(message);
// //   }, []);

// //   // Effect to handle pagination
// //   useEffect(() => {
// //     if (searchData && searchData.length > 0) {
// //       setTotalPages(Math.ceil(searchData.length / ITEMS_PER_PAGE));
// //       const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
// //       const endIndex = startIndex + ITEMS_PER_PAGE;
// //       setPaginatedData(searchData.slice(startIndex, endIndex));
// //       setError(null); // Reset error if data is available
// //     } else {
// //       setError(NO_FLIGHT_MESSAGE);
// //     }
// //   }, [currentPage, searchData]);

// //   if (loading) {
// //     return <Loading />; // Display loading indicator
// //   }

// //   if (error) {
// //     return (
// //       <Card className="text-center bg-white shadow-md p-4 rounded-sm">
// //         <CardHeader className="text-lg font-semibold mt-0">
// //           <p className="text-xl font-semibold">No search results found.</p>
// //         </CardHeader>
// //         <p className="text-gray-600 font-medium">
// //           Please try adjusting your search criteria.
// //         </p>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col gap-3">
// //       {paginatedData.map((result) => (
// //         <FlightCard key={result.id} result={result} />
// //       ))}

// //       {/* Pagination Controls */}
// //       <div className="flex justify-center mt-4">
// //         <Pagination>
// //           <PaginationContent>
// //             <PaginationItem>
// //               <PaginationPrevious
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   if (currentPage > 1) setCurrentPage(currentPage - 1);
// //                 }}
// //               />
// //             </PaginationItem>
// //             {Array.from({ length: totalPages }, (_, index) => (
// //               <PaginationItem key={index + 1}>
// //                 <PaginationLink
// //                   href="#"
// //                   isActive={currentPage === index + 1}
// //                   onClick={(e) => {
// //                     e.preventDefault();
// //                     setCurrentPage(index + 1);
// //                   }}
// //                 >
// //                   {index + 1}
// //                 </PaginationLink>
// //               </PaginationItem>
// //             ))}
// //             {totalPages > 3 && <PaginationEllipsis />}
// //             <PaginationItem>
// //               <PaginationNext
// //                 href="#"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// //                 }}
// //               />
// //             </PaginationItem>
// //           </PaginationContent>
// //         </Pagination>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchResult;








// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { IMAGE_URL } from "@/config/api";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { useNavigate } from "react-router-dom";

// // Define the types for your data structure
// interface Segment {
//   aircraft: {
//     code: string;
//   };
//   airlineLogo: string;
//   airlineName: string;
//   arrival: {
//     at: string;
//     iataCode: string;
//     terminal: string;
//   };
//   arrival_airport: string;
//   blacklistedInEU: boolean;
//   carrierCode: string;
//   departure: {
//     at: string;
//     iataCode: string;
//     terminal: string;
//   };
//   departure_airport: string;
//   duration: string;
//   id: string;
//   number: string;
//   numberOfStops: number;
//   operating: {
//     carrierCode: string;
//   };
// }

// interface Itinerary {
//   duration: string;
//   segments: Segment[];
// }

// interface Price {
//   // ffsd_total: string;
//   base: string;
//   currency: string;
//   fees: { amount: string }[];
//   grandTotal: string;
//   total: string;
// }

// interface FlightData {
//   id: string;
//   DepartureAirport: string;
//   arrivalAirport: string;
//   instantTicketingRequired: boolean;
//   isUpsellOffer: boolean;
//   itineraries: Itinerary[];
//   lastTicketingDate: string;
//   lastTicketingDateTime: string;
//   logo: string;
//   nonHomogeneous: boolean;
//   numberOfBookableSeats: number;
//   oneWay: boolean;
//   price: Price;
//   pricingOptions: {
//     fareType: string[];
//     includedCheckedBagsOnly: boolean;
//   };
//   source: string;
//   travelerPricings: {
//     travelerType: string;
//     fareDetailsBySegment: {
//       class: string;
//       includedCheckedBags: {
//         quantity: number;
//       };
//     }[];
//   }[];
//   type: string;
//   validatingAirlineCodes: string[];
// }

// interface SearchResultProps {
//   searchData: FlightData[];
// }


// // Utility functions
// const formatPrice = (currency: string, amount: string) =>
//   new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: currency,
//   }).format(parseFloat(amount));

// const formatDuration = (duration: string) =>
//   duration.replace("PT", "").replace("H", "H ");

// const calculateFlightDuration = (departure: string, arrival: string) => {
//   const durationMs =
//     new Date(arrival).getTime() - new Date(departure).getTime();
//   const hours = Math.floor(durationMs / (1000 * 60 * 60));
//   const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
//   return `${hours}h ${minutes}m`;
// };

// const getNumberOfStops = (numSegments: number) =>
//   numSegments === 1
//     ? "non-stop"
//     : `${numSegments - 1} ${numSegments - 1 === 1 ? "stop" : "stops"}`;

// const formatDate = (dateString: string) =>
//   new Date(dateString).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

// const ITEMS_PER_PAGE = 10;


// // FlightCard Component
// const FlightCard: React.FC<{ result: FlightData }> = ({ result }) => {
//   const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom

//   // console.log("this is the result", result)

//   // Function to handle the book flight action
//   const handleBookFlight = () => {
//     // Optionally, store flight details in localStorage
//     localStorage.setItem("selectedFlight", JSON.stringify(result));

//     // Navigate to the booking page (adjust the route as needed)
//     navigate("/book-flight");
//   };

//   // if (!result.itineraries.length) return null;
//   if (!result || !result.itineraries.length) {
//     return <p>No flights available at the moment.</p>; // Fallback UI
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {result.itineraries.map((itinerary, index) => (
//         <Card key={index} className="bg-white shadow-md p-4 rounded-sm">
//           <CardContent className="p-0">
//             <div className="p-2 border-b-2 flex items-center justify-between">
//               <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
//                 <img
//                   src={`${IMAGE_URL}${itinerary.segments[0].airlineLogo}`}
//                   alt={`${itinerary.segments[0].airlineName} logo`}
//                   className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
//                 />
//                 <div>
//                   <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
//                     {itinerary.segments[0].airlineName}
//                   </b>
//                 </div>
//               </div>

//               <div className="flex lg:gap-5 gap-3 items-center">
//                 <div className="text-end">
//                   <p className="capitalize lg:text-sm text-[12px] font-medium">
//                     Full pay
//                   </p>
//                   <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
//                     {formatPrice(result.price.currency, result.price.total)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-3">
//               <div className="flex items-center lg:space-x-2 space-x-1 justify-between">
//                 <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px] text-gray-600">
//                   <span className="font-bold text-black">Departure Date</span>{" "}
//                   <span className="font-medium">
//                     {result.lastTicketingDate &&
//                       formatDate(result.lastTicketingDate)}
//                   </span>
//                   <span className="mx-2 w-1 h-1 bg-gray-600 rounded-full"></span>
//                 </p>
//               </div>

//               <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
//                 <div className="flex flex-col items-start w-[35%]">
//                   <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                     {itinerary.segments[0].departure_airport}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-center">
//                   <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//                     {formatDuration(itinerary.duration)}
//                   </p>
//                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//                     {getNumberOfStops(itinerary.segments.length)}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end w-[35%]">
//                   <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                     {result.arrivalAirport}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <Accordion type="single" collapsible className="w-full">
//               <AccordionItem value="item-1" className="border-none">
//                 <AccordionTrigger className="font-medium px-2 capitalize">
//                   <p className="font-bold text-black capitalize">
//                     Flight Details
//                   </p>
//                 </AccordionTrigger>
//                 <AccordionContent className="p-4 flex flex-col gap-4 rounded-sm">
//                   {itinerary.segments.map((segment) => (
//                     <SegmentDetails
//                       key={segment.id}
//                       segment={segment}
//                       travelerPricings={result.travelerPricings} // Pass travelerPricings here
//                     />
//                   ))}
//                   <div className="flex mt-2 w-full justify-end">
//                     <Button
//                       className="bg-primaryRed lg:text-sm text-[11px] hover:bg-black text-white"
//                       onClick={handleBookFlight} // Trigger navigation on click
//                     >
//                       <p className="capitalize">book flight</p>
//                     </Button>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };


// // SegmentDetails Component
// const SegmentDetails: React.FC<{
//   segment: Segment;
//   travelerPricings: FlightData["travelerPricings"];
// }> = ({ segment, travelerPricings }) => (
//   <div className="mt-3 bg-gray-100 rounded-xs">
//     <div className="flex items-center lg:space-x-2 space-x-1 justify-between p-3 ">
//       <p className="capitalize lg:text-base lg:w-[40%] w-[30%] text-[12px]  text-gray-600">
//         <span className="font-bold text-black">Departure</span>{" "}
//         <span className="font-medium">{segment.departure_airport}</span>{" "}
//         <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
//         <span className="font-bold text-black">
//           {new Date(segment.departure.at).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         </span>
//       </p>

//       <div className="flex items-center lg:gap-3 md:gap-3 gap-1">
//         <img
//           src={`${IMAGE_URL}${segment.airlineLogo}`}
//           alt={`${segment.airlineName} logo`}
//           className="lg:w-10 md:w-10 sm:w-8 w-8 lg:h-10 md:h-10 sm:h-8 h-8 object-cover"
//         />
//         <div>
//           <b className="lg:text-base md:text-base sm:text-[10px] text-[11px]">
//             {segment.airlineName}
//           </b>
//         </div>
//       </div>
//     </div>

//     <div className="flex flex-col gap-y-4 bg-gray-100 rounded-xs p-3  mt-2">
//       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
//         <div className="flex flex-col items-start w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">
//             {new Date(segment.departure.at).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </p>
//           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.departure_airport}
//           </p>
//         </div>

//         <div className="flex flex-col items-center">
//           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.numberOfStops === 0
//               ? "No stop"
//               : `${segment.numberOfStops} stops`}
//           </p>
//           <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
//             {calculateFlightDuration(segment.departure.at, segment.arrival.at)}
//           </p>
//         </div>

//         <div className="flex flex-col items-end w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">
//             {new Date(segment.arrival.at).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </p>
//           <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.arrival_airport}
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center justify-between lg:space-x-2 space-x-1 w-full">
//         <div className="flex flex-col items-start w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">Baggage</p>
//           {travelerPricings.map((pricing, index) => (
//             <div key={index} className="w-full flex flex-col items-start">
//               <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
//                 {pricing.fareDetailsBySegment[0]?.includedCheckedBags
//                   ?.quantity ?? 0}{" "}
//                 X 23kg
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col items-end w-[35%]">
//           <p className="font-bold capitalize lg:text-sm text-[12px]">Airline</p>
//           <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
//             {segment.carrierCode} - {segment.number}
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const SearchResult: React.FC<SearchResultProps> = ({ searchData }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Calculate the index range for the current page
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const paginatedData = searchData.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(searchData.length / ITEMS_PER_PAGE);
//   console.log(searchData)

//   if (!searchData || searchData.length === 0) {
//     return (
//       <Card className="text-center bg-white shadow-md p-4 rounded-sm">
//         <CardHeader className="text-lg font-semibold mt-0">
//           <p className="text-xl font-semibold">No search results found.</p>
//         </CardHeader>
//         <p className="text-gray-600 font-medium">
//           Please try adjusting your search criteria.
//         </p>
//       </Card>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       {paginatedData.map((result) => (
//         <FlightCard key={result.id} result={result} />
//       ))}

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (currentPage > 1) setCurrentPage(currentPage - 1);
//                 }}
//               />
//             </PaginationItem>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <PaginationItem key={index + 1}>
//                 <PaginationLink
//                   href="#"
//                   isActive={currentPage === index + 1}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentPage(index + 1);
//                   }}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             {totalPages > 3 && <PaginationEllipsis />}
//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//                 }}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;










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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

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
  // ffsd_total: string;
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

interface SearchResultProps {
  searchResults: Flight[];
}


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

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const ITEMS_PER_PAGE = 10;


// FlightCard Component
const FlightCard: React.FC<{ result: Flight }> = ({ result }) => {
  const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom

  // console.log("this is the result", result)

  // Function to handle the book flight action
  const handleBookFlight = () => {
    // Optionally, store flight details in localStorage
    localStorage.setItem("selectedFlight", JSON.stringify(result));

    // Navigate to the booking page (adjust the route as needed)
    navigate("/book-flight");
  };

  // if (!result.itineraries.length) return null;
  if (!result || !result.itineraries.length) {
    return <p>No flights available at the moment.</p>; // Fallback UI
  }

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
                  <p className="lg:text-sm text-[12px] sm:tracking-tight sm:leading-4 font-semibold text-gray-600">
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

              <div className="flex items-center justify-between lg:space-x-2 space-x-1 p-3 rounded-xs mt-2">
                <div className="flex flex-col items-start w-[35%]">
                  <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
                    {itinerary.segments[0].departure_airport}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="font-bold text-start capitalize lg:text-lg text-[12px]">
                    {formatDuration(itinerary.duration)}
                  </p>
                  <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[8.5px]">
                    {getNumberOfStops(itinerary.segments.length)}
                  </p>
                </div>

                <div className="flex flex-col items-end w-[35%]">
                  <p className="font-semibold text-gray-500 text-end capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
                    {result.arrivalAirport}
                  </p>
                </div>
              </div>
            </div>

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
      ))}
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
          src={`${IMAGE_URL}${segment.airlineLogo}`}
          alt={`${segment.airlineName} logo`}
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
              <p className="font-semibold text-gray-500 text-start capitalize tracking-tighter leading-4 lg:text-base text-[12px]">
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

const SearchResult: React.FC<SearchResultProps> = ({ searchResults }) => {
  const [currentPage, setCurrentPage] = useState(1);


  console.log("searchResults", searchResults)
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const paginatedData = searchResults.slice(startIndex, endIndex);
  const paginatedData = (searchResults || []).slice(startIndex, endIndex);

  const totalPages = Math.ceil((searchResults || []).length / ITEMS_PER_PAGE);
  

  if (!searchResults || searchResults.length === 0) {
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
            {totalPages > 3 && <PaginationEllipsis />}
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