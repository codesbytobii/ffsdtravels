// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import CheckboxInput from "@/components/components/input/CheckboxInput";
// import React, { useCallback, useEffect, useState } from "react";
// import RangeSliderInput from "@/components/components/input/RangeSliderInput";
// import { IMAGE_URL } from "@/config/api";
// import { useLocation } from "react-router-dom";

// // Define interfaces for Flight Data structures
// interface Segment {
//   aircraft: { code: string };
//   airlineLogo: string;
//   airlineName: string;
//   arrival: { at: string; iataCode: string; terminal: string };
//   arrival_airport: string;
//   blacklistedInEU: boolean;
//   carrierCode: string;
//   departure: { at: string; iataCode: string; terminal: string };
//   departure_airport: string;
//   duration: string;
//   id: string;
//   number: string;
//   numberOfStops: number;
//   operating: { carrierCode: string };
// }

// interface Itinerary {
//   duration: string;
//   segments: Segment[];
// }

// interface Price {
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
//   pricingOptions: { fareType: string[]; includedCheckedBagsOnly: boolean };
//   source: string;
//   travelerPricings: {
//     travelerType: string;
//     fareDetailsBySegment: {
//       class: string;
//       includedCheckedBags: { quantity: number };
//     }[];
//   }[];
//   type: string;
//   validatingAirlineCodes: string[];
// }

// interface Filters {
//   cheapest: boolean;
//   quickest: boolean;
//   priceRange: [number, number];
//   stops: number | null; // Track single selected stop or no selection
//   airlines: Set<string>; // Track selected airlines by carrierCode
// }

// interface SearchSidebarProps {
//   searchData: FlightData[];
//   onFilterChange: (filteredData: FlightData[]) => void;
// }

// const SearchSidebar: React.FC<SearchSidebarProps> = ({
//     searchData = [],
//     onFilterChange,
//   }) => {
//     // Calculate the maximum price from the flight data
//     const calculateMaxPrice = () => {
//       return searchData.reduce((max, flight) => {
//         const price = parseFloat(flight.price.grandTotal);
//         return price > max ? price : max;
//       }, 0);
//     };
  
//     // Initialize state variables for max price and filters
//     const [maxPrice, setMaxPrice] = useState(calculateMaxPrice());
//     const [filters, setFilters] = useState<Filters>({
//       cheapest: false,
//       quickest: false,
//       priceRange: [0, calculateMaxPrice()],
//       stops: null,
//       airlines: new Set<string>(),
//     });
  
//     // Update max price and filters when searchData changes
//     useEffect(() => {
//       const newMaxPrice = calculateMaxPrice();
//       setMaxPrice(newMaxPrice);
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         priceRange: [prevFilters.priceRange[0], newMaxPrice],
//       }));
//     }, [searchData]);
  
//     // Parse ISO 8601 duration string to minutes
//     const parseDuration = (duration: string): number => {
//       const durationWithoutPrefix = duration.replace("PT", "");
//       const [hoursPart, minutesPart] = durationWithoutPrefix.split("H");
//       const hours = parseInt(hoursPart) || 0;
//       const minutes = parseInt(minutesPart.replace("M", "")) || 0;
//       return hours * 60 + minutes;
//     };
  
//     // Handle filter change for cheapest and quickest options
//     const handleFilterChange = useCallback(
//       (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { id, checked } = event.target;
//         setFilters((prevFilters) => ({
//           ...prevFilters,
//           cheapest: id === "cheapest" ? checked : false,
//           quickest: id === "quickest" ? checked : false,
//         }));
//       },
//       []
//     );
  
//     // Handle price range change
//     const handlePriceRangeChange = useCallback((min: number, max: number) => {
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         priceRange: [min, max],
//       }));
//     }, []);
  
//     // Handle stop option change
//     const handleStopChange = useCallback((numStops: number) => {
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         stops: prevFilters.stops === numStops ? null : numStops, // Toggle selection
//       }));
//     }, []);
  
//     // Handle airline selection change
//     const handleAirlineChange = useCallback((carrierCode: string) => {
//       setFilters((prevFilters) => {
//         const newAirlines = new Set(prevFilters.airlines);
//         if (newAirlines.has(carrierCode)) {
//           newAirlines.delete(carrierCode);
//         } else {
//           newAirlines.add(carrierCode);
//         }
//         return { ...prevFilters, airlines: newAirlines };
//       });
//     }, []);
  
//     // Clear all filters
//     const handleClearAll = () => {
//       setFilters({
//         cheapest: false,
//         quickest: false,
//         priceRange: [0, maxPrice],
//         stops: null,
//         airlines: new Set<string>(),
//       });
//     };
  
//     // Apply filters to search data and notify parent component
//     useEffect(() => {
//       let filteredData = [...searchData];
  
//       if (filters.cheapest) {
//         filteredData.sort(
//           (a, b) =>
//             parseFloat(a.price.grandTotal) - parseFloat(b.price.grandTotal)
//         );
//       }
  
//       if (filters.quickest) {
//         filteredData = filteredData.sort((a, b) => {
//           const durationA = a.itineraries.reduce(
//             (acc, it) => acc + parseDuration(it.duration),
//             0
//           );
//           const durationB = b.itineraries.reduce(
//             (acc, it) => acc + parseDuration(it.duration),
//             0
//           );
//           return durationA - durationB;
//         });
//       }
  
//       filteredData = filteredData.filter(
//         (flight) =>
//           parseFloat(flight.price.grandTotal) >= filters.priceRange[0] &&
//           parseFloat(flight.price.grandTotal) <= filters.priceRange[1] &&
//           (filters.stops === null ||
//             flight.itineraries.reduce(
//               (acc, it) => acc + it.segments.length - 1,
//               0
//             ) === filters.stops ||
//             (filters.stops === 2 &&
//               flight.itineraries.reduce(
//                 (acc, it) => acc + it.segments.length - 1,
//                 0
//               ) >= 3)) &&
//           (filters.airlines.size === 0 ||
//             flight.itineraries.some((itinerary) =>
//               itinerary.segments.some((segment) =>
//                 filters.airlines.has(segment.carrierCode)
//               )
//             ))
//       );
  
//       onFilterChange(filteredData);
//     }, [filters, searchData, onFilterChange]);
  
//     // Extract unique airlines from search data
//     const uniqueAirlines = searchData
//       .flatMap((flight) =>
//         flight.itineraries.flatMap((itinerary) =>
//           itinerary.segments.map((segment) => ({
//             carrierCode: segment.carrierCode,
//             airlineName: segment.airlineName,
//             airlineLogo: segment.airlineLogo,
//           }))
//         )
//       )
//       .filter(
//         (value, index, self) =>
//           self.findIndex(
//             (airline) => airline.carrierCode === value.carrierCode
//           ) === index
//       );
  
//     const stopOptions = [
//       { label: "Nonstop", value: 0 },
//       { label: "1 Stop", value: 1 },
//       { label: "2 Stops", value: 2 },
//     ];
  
//     return (
//       <div className="w-full">
//         <Card className="w-full bg-white shadow-md rounded-sm rounded-t-lg">
//           <CardHeader className="p-0 bg-primaryRed text-white rounded-t-lg">
//             <div className="flex justify-between font-medium items-center p-4">
//               <CardTitle className="text-[20px] capitalize">Filter</CardTitle>
//               <button
//                 className="text-white text-sm hover:scale-105 duration-300"
//                 onClick={handleClearAll}
//               >
//                 Clear All
//               </button>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0 text-gray-700">
//             <Accordion type="single" collapsible className="w-full">
//               <AccordionItem
//                 value="item-1"
//                 className="border-b-[0.5px] border-primaryRed"
//               >
//                 <AccordionTrigger className="font-medium p-4 capitalize">
//                   Sort By
//                 </AccordionTrigger>
//                 <AccordionContent className="p-4 flex flex-col gap-4">
//                   <CheckboxInput
//                     id="cheapest"
//                     label="Cheapest"
//                     checked={filters.cheapest}
//                     onChange={handleFilterChange}
//                   />
//                   <CheckboxInput
//                     id="quickest"
//                     label="Quickest"
//                     checked={filters.quickest}
//                     onChange={handleFilterChange}
//                   />
//                 </AccordionContent>
//               </AccordionItem>
  
//               <AccordionItem
//                 value="item-2"
//                 className="border-b-[0.5px] border-primaryRed"
//               >
//                 <AccordionTrigger className="font-medium p-4 capitalize">
//                   Price Range
//                 </AccordionTrigger>
//                 <AccordionContent className="p-4">
//                   <RangeSliderInput
//                     min={0}
//                     max={maxPrice}
//                     onChange={handlePriceRangeChange}
//                   />
//                 </AccordionContent>
//               </AccordionItem>
  
//               <AccordionItem
//                 value="item-3"
//                 className="border-b-[0.5px] border-primaryRed"
//               >
//                 <AccordionTrigger className="font-medium p-4 capitalize">
//                   Stops
//                 </AccordionTrigger>
//                 <AccordionContent className="p-4 flex flex-col gap-4">
//                   {stopOptions.map((option) => (
//                     <CheckboxInput
//                       key={option.value}
//                       id={`stops-${option.value}`}
//                       label={option.label}
//                       checked={filters.stops === option.value}
//                       onChange={() => handleStopChange(option.value)}
//                     />
//                   ))}
//                 </AccordionContent>
//               </AccordionItem>
  
//               <AccordionItem
//                 value="item-4"
//                 className="border-b-[0.5px] border-primaryRed"
//               >
//                 <AccordionTrigger className="font-medium p-4 capitalize">
//                   Airline
//                 </AccordionTrigger>
//                 <AccordionContent className="p-4 flex flex-col gap-4">
//                   {uniqueAirlines.map((airline) => (
//                     <CheckboxInput
//                       key={airline.carrierCode}
//                       id={`airline-${airline.carrierCode}`}
//                       label={
//                         <span className="flex items-center gap-2">
//                           <img
//                             src={`${IMAGE_URL}${airline.airlineLogo}`}
//                             alt={airline.airlineName}
//                             className="h-6 w-6"
//                           />
//                           {airline.airlineName}
//                         </span>
//                       }
//                       checked={filters.airlines.has(airline.carrierCode)}
//                       onChange={() => handleAirlineChange(airline.carrierCode)}
//                     />
//                   ))}
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   };
  
//   export default SearchSidebar;







// const SearchSidebar: React.FC<SearchSidebarProps> = ({
//   searchData = [],
//   onFilterChange,
// }) => {
//   // Calculate the maximum price from the flight data
//   const calculateMaxPrice = () => {
//     return searchData.reduce((max, flight) => {
//       const price = parseFloat(flight.price.grandTotal);
//       return price > max ? price : max;
//     }, 0);
//   };

//   // Initialize state variables for max price and filters
//   const [maxPrice, setMaxPrice] = useState(calculateMaxPrice());
//   const [filters, setFilters] = useState<Filters>({
//     cheapest: false,
//     quickest: false,
//     priceRange: [0, calculateMaxPrice()],
//     stops: null,
//     airlines: new Set<string>(),
//   });

//   // Update max price and filters when searchData changes
//   useEffect(() => {
//     const newMaxPrice = calculateMaxPrice();
//     setMaxPrice(newMaxPrice);
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       priceRange: [prevFilters.priceRange[0], newMaxPrice],
//     }));
//   }, [searchData]);

//   // Parse ISO 8601 duration string to minutes
//   const parseDuration = (duration: string): number => {
//     const durationWithoutPrefix = duration.replace("PT", "");
//     const [hoursPart, minutesPart] = durationWithoutPrefix.split("H");
//     const hours = parseInt(hoursPart) || 0;
//     const minutes = parseInt(minutesPart.replace("M", "")) || 0;
//     return hours * 60 + minutes;
//   };

//   // Handle filter change for cheapest and quickest options
//   const handleFilterChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const { id, checked } = event.target;
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         cheapest: id === "cheapest" ? checked : false,
//         quickest: id === "quickest" ? checked : false,
//       }));
//     },
//     []
//   );

//   // Handle price range change
//   const handlePriceRangeChange = useCallback((min: number, max: number) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       priceRange: [min, max],
//     }));
//   }, []);

//   // Handle stop option change
//   const handleStopChange = useCallback((numStops: number) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       stops: prevFilters.stops === numStops ? null : numStops, // Toggle selection
//     }));
//   }, []);

//   // Handle airline selection change
//   const handleAirlineChange = useCallback((carrierCode: string) => {
//     setFilters((prevFilters) => {
//       const newAirlines = new Set(prevFilters.airlines);
//       if (newAirlines.has(carrierCode)) {
//         newAirlines.delete(carrierCode);
//       } else {
//         newAirlines.add(carrierCode);
//       }
//       return { ...prevFilters, airlines: newAirlines };
//     });
//   }, []);

//   // Clear all filters
//   const handleClearAll = () => {
//     setFilters({
//       cheapest: false,
//       quickest: false,
//       priceRange: [0, maxPrice],
//       stops: null,
//       airlines: new Set<string>(),
//     });
//   };

//   // Apply filters to search data and notify parent component
//   useEffect(() => {
//     let filteredData = [...searchData];

//     if (filters.cheapest) {
//       filteredData.sort(
//         (a, b) =>
//           parseFloat(a.price.grandTotal) - parseFloat(b.price.grandTotal)
//       );
//     }

//     if (filters.quickest) {
//       filteredData = filteredData.sort((a, b) => {
//         const durationA = a.itineraries.reduce(
//           (acc, it) => acc + parseDuration(it.duration),
//           0
//         );
//         const durationB = b.itineraries.reduce(
//           (acc, it) => acc + parseDuration(it.duration),
//           0
//         );
//         return durationA - durationB;
//       });
//     }

//     filteredData = filteredData.filter(
//       (flight) =>
//         parseFloat(flight.price.grandTotal) >= filters.priceRange[0] &&
//         parseFloat(flight.price.grandTotal) <= filters.priceRange[1] &&
//         (filters.stops === null ||
//           flight.itineraries.reduce(
//             (acc, it) => acc + it.segments.length - 1,
//             0
//           ) === filters.stops ||
//           (filters.stops === 2 &&
//             flight.itineraries.reduce(
//               (acc, it) => acc + it.segments.length - 1,
//               0
//             ) >= 3)) &&
//         (filters.airlines.size === 0 ||
//           flight.itineraries.some((itinerary) =>
//             itinerary.segments.some((segment) =>
//               filters.airlines.has(segment.carrierCode)
//             )
//           ))
//     );

//     onFilterChange(filteredData);
//   }, [filters, searchData, onFilterChange]);

//   // Extract unique airlines from search data
//   const uniqueAirlines = searchData
//     .flatMap((flight) =>
//       flight.itineraries.flatMap((itinerary) =>
//         itinerary.segments.map((segment) => ({
//           carrierCode: segment.carrierCode,
//           airlineName: segment.airlineName,
//           airlineLogo: segment.airlineLogo,
//         }))
//       )
//     )
//     .filter(
//       (value, index, self) =>
//         self.findIndex(
//           (airline) => airline.carrierCode === value.carrierCode
//         ) === index
//     );

//   const stopOptions = [
//     { label: "Nonstop", value: 0 },
//     { label: "1 Stop", value: 1 },
//     { label: "2 Stops", value: 2 },
//   ];

//   return (
//     <div className="w-full">
//       <Card className="w-full bg-white shadow-md rounded-sm rounded-t-lg">
//         <CardHeader className="p-0 bg-primaryRed text-white rounded-t-lg">
//           <div className="flex justify-between font-medium items-center p-4">
//             <CardTitle className="text-[20px] capitalize">Filter</CardTitle>
//             <button
//               className="text-white text-sm hover:scale-105 duration-300"
//               onClick={handleClearAll}
//             >
//               Clear All
//             </button>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0 text-gray-700">
//           <Accordion type="single" collapsible className="w-full">
//             <AccordionItem
//               value="item-1"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Sort By
//               </AccordionTrigger>
//               <AccordionContent className="p-4 flex flex-col gap-4">
//                 <CheckboxInput
//                   id="cheapest"
//                   label="Cheapest"
//                   checked={filters.cheapest}
//                   onChange={handleFilterChange}
//                 />
//                 <CheckboxInput
//                   id="quickest"
//                   label="Quickest"
//                   checked={filters.quickest}
//                   onChange={handleFilterChange}
//                 />
//               </AccordionContent>
//             </AccordionItem>

//             <AccordionItem
//               value="item-2"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Price Range
//               </AccordionTrigger>
//               <AccordionContent className="p-4">
//                 <RangeSliderInput
//                   min={0}
//                   max={maxPrice}
//                   onChange={handlePriceRangeChange}
//                 />
//               </AccordionContent>
//             </AccordionItem>

//             <AccordionItem
//               value="item-3"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Stops
//               </AccordionTrigger>
//               <AccordionContent className="p-4 flex flex-col gap-4">
//                 {stopOptions.map((option) => (
//                   <CheckboxInput
//                     key={option.value}
//                     id={`stops-${option.value}`}
//                     label={option.label}
//                     checked={filters.stops === option.value}
//                     onChange={() => handleStopChange(option.value)}
//                   />
//                 ))}
//               </AccordionContent>
//             </AccordionItem>

//             <AccordionItem
//               value="item-4"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Airline
//               </AccordionTrigger>
//               <AccordionContent className="p-4 flex flex-col gap-4">
//                 {uniqueAirlines.map((airline) => (
//                   <CheckboxInput
//                     key={airline.carrierCode}
//                     id={`airline-${airline.carrierCode}`}
//                     label={
//                       <span className="flex items-center gap-2">
//                         <img
//                           src={`${IMAGE_URL}${airline.airlineLogo}`}
//                           alt={airline.airlineName}
//                           className="h-6 w-6"
//                         />
//                         {airline.airlineName}
//                       </span>
//                     }
//                     checked={filters.airlines.has(airline.carrierCode)}
//                     onChange={() => handleAirlineChange(airline.carrierCode)}
//                   />
//                 ))}
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SearchSidebar;




// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import CheckboxInput from "@/components/components/input/CheckboxInput";
// import React, { useCallback, useEffect, useState } from "react";
// import RangeSliderInput from "@/components/components/input/RangeSliderInput";
// import { IMAGE_URL } from "@/config/api";
// // import { BASE_URL, IMAGE_URL } from "@/config/api";

// // Define interfaces for Flight Data structures
// interface Segment {
//   aircraft: { code: string };
//   airlineLogo: string;
//   airlineName: string;
//   arrival: { at: string; iataCode: string; terminal: string };
//   arrival_airport: string;
//   blacklistedInEU: boolean;
//   carrierCode: string;
//   departure: { at: string; iataCode: string; terminal: string };
//   departure_airport: string;
//   duration: string;
//   id: string;
//   number: string;
//   numberOfStops: number;
//   operating: { carrierCode: string };
// }

// interface Itinerary {
//   duration: string;
//   segments: Segment[];
// }

// interface Price {
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
//   pricingOptions: { fareType: string[]; includedCheckedBagsOnly: boolean };
//   source: string;
//   travelerPricings: {
//     travelerType: string;
//     fareDetailsBySegment: {
//       class: string;
//       includedCheckedBags: { quantity: number };
//     }[];
//   }[];
//   type: string;
//   validatingAirlineCodes: string[];
// }

// interface Filters {
//   cheapest: boolean;
//   quickest: boolean;
//   priceRange: [number, number];
//   stops: number | null; // Track single selected stop or no selection
//   airlines: Set<string>; // Track selected airlines by carrierCode
// }

// interface SearchSidebarProps {
//   searchData: FlightData[];
//   onFilterChange: (filteredData: FlightData[]) => void;
// }

// const SearchSidebar: React.FC<SearchSidebarProps> = ({
//   searchData,
//   onFilterChange,
// }) => {
//   // Calculate the maximum price from the flight data
//   const calculateMaxPrice = () => {
//     return searchData.reduce((max, flight) => {
//       const price = parseFloat(flight.price.grandTotal);
//       return price > max ? price : max;
//     }, 0);
//   };

//   // Initialize state variables for max price and filters
//   const [maxPrice, setMaxPrice] = useState(calculateMaxPrice());
//   const [filters, setFilters] = useState<Filters>({
//     cheapest: false,
//     quickest: false,
//     priceRange: [0, calculateMaxPrice()],
//     stops: null,
//     airlines: new Set<string>(),
//   });

//   // Update max price and filters when searchData changes
//   useEffect(() => {
//     const newMaxPrice = calculateMaxPrice();
//     setMaxPrice(newMaxPrice);
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       priceRange: [prevFilters.priceRange[0], newMaxPrice],
//     }));
//   }, [searchData]);

//   // Parse ISO 8601 duration string to minutes
//   const parseDuration = (duration: string): number => {
//     const durationWithoutPrefix = duration.replace("PT", "");
//     const [hoursPart, minutesPart] = durationWithoutPrefix.split("H");
//     const hours = parseInt(hoursPart) || 0;
//     const minutes = parseInt(minutesPart.replace("M", "")) || 0;
//     return hours * 60 + minutes;
//   };

//   // Handle filter change for cheapest and quickest options
//   const handleFilterChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const { id, checked } = event.target;
//       setFilters((prevFilters) => ({
//         ...prevFilters,
//         cheapest: id === "cheapest" ? checked : false,
//         quickest: id === "quickest" ? checked : false,
//       }));
//     },
//     []
//   );

//   // Handle price range change
//   const handlePriceRangeChange = useCallback((min: number, max: number) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       priceRange: [min, max],
//     }));
//   }, []);

//   // Handle stop option change
//   const handleStopChange = useCallback((numStops: number) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       stops: prevFilters.stops === numStops ? null : numStops, // Toggle selection
//     }));
//   }, []);

//   // Handle airline selection change
//   const handleAirlineChange = useCallback((carrierCode: string) => {
//     setFilters((prevFilters) => {
//       const newAirlines = new Set(prevFilters.airlines);
//       if (newAirlines.has(carrierCode)) {
//         newAirlines.delete(carrierCode);
//       } else {
//         newAirlines.add(carrierCode);
//       }
//       return { ...prevFilters, airlines: newAirlines };
//     });
//   }, []);

//   // Clear all filters
//   const handleClearAll = () => {
//     setFilters({
//       cheapest: false,
//       quickest: false,
//       priceRange: [0, maxPrice],
//       stops: null,
//       airlines: new Set<string>(),
//     });
//   };

//   // Apply filters to search data and notify parent component
//   useEffect(() => {
//     let filteredData = [...searchData];

//     if (filters.cheapest) {
//       filteredData.sort(
//         (a, b) =>
//           parseFloat(a.price.grandTotal) - parseFloat(b.price.grandTotal)
//       );
//     }

//     if (filters.quickest) {
//       filteredData = filteredData.sort((a, b) => {
//         const durationA = a.itineraries.reduce(
//           (acc, it) => acc + parseDuration(it.duration),
//           0
//         );
//         const durationB = b.itineraries.reduce(
//           (acc, it) => acc + parseDuration(it.duration),
//           0
//         );
//         return durationA - durationB;
//       });
//     }

//     filteredData = filteredData.filter(
//       (flight) =>
//         parseFloat(flight.price.grandTotal) >= filters.priceRange[0] &&
//         parseFloat(flight.price.grandTotal) <= filters.priceRange[1] &&
//         (filters.stops === null ||
//           flight.itineraries.reduce(
//             (acc, it) => acc + it.segments.length - 1,
//             0
//           ) === filters.stops ||
//           (filters.stops === 2 &&
//             flight.itineraries.reduce(
//               (acc, it) => acc + it.segments.length - 1,
//               0
//             ) >= 3)) &&
//         (filters.airlines.size === 0 ||
//           flight.itineraries.some((itinerary) =>
//             itinerary.segments.some((segment) =>
//               filters.airlines.has(segment.carrierCode)
//             )
//           ))
//     );

//     onFilterChange(filteredData);
//   }, [filters, searchData, onFilterChange]);

//   // Extract unique airlines from search data
//   const uniqueAirlines = searchData
//     .flatMap((flight) =>
//       flight.itineraries.flatMap((itinerary) =>
//         itinerary.segments.map((segment) => ({
//           carrierCode: segment.carrierCode,
//           airlineName: segment.airlineName,
//           airlineLogo: segment.airlineLogo,
//         }))
//       )
//     )
//     .filter(
//       (value, index, self) =>
//         self.findIndex(
//           (airline) => airline.carrierCode === value.carrierCode
//         ) === index
//     );

//   const stopOptions = [
//     { label: "Nonstop", value: 0 },
//     { label: "1 Stop", value: 1 },
//     { label: "2 Stops", value: 2 },
//   ];

//   return (
//     <div className="w-full">
//       <Card className="w-full bg-white shadow-md rounded-sm rounded-t-lg">
//         <CardHeader className="p-0 bg-primaryRed text-white rounded-t-lg">
//           <div className="flex justify-between font-medium items-center p-4">
//             <CardTitle className="text-[20px] capitalize">Filter</CardTitle>
//             <button
//               className="text-white text-sm hover:scale-105 duration-300"
//               onClick={handleClearAll}
//             >
//               Clear All
//             </button>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0 text-gray-700">
//           <Accordion type="single" collapsible className="w-full">
//             <AccordionItem
//               value="item-1"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Sort By
//               </AccordionTrigger>
//               <AccordionContent className="p-4 flex flex-col gap-4">
//                 <CheckboxInput
//                   id="cheapest"
//                   label="Cheapest"
//                   checked={filters.cheapest}
//                   onChange={handleFilterChange}
//                 />
//                 <CheckboxInput
//                   id="quickest"
//                   label="Quickest"
//                   checked={filters.quickest}
//                   onChange={handleFilterChange}
//                 />
//               </AccordionContent>
//             </AccordionItem>

//             <AccordionItem
//               value="item-2"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Price Range
//               </AccordionTrigger>
//               <AccordionContent className="p-4">
//                 <RangeSliderInput
//                   min={0}
//                   max={maxPrice}
//                   onChange={handlePriceRangeChange}
//                 />
//               </AccordionContent>
//             </AccordionItem>

//             <AccordionItem
//               value="item-3"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Stops
//               </AccordionTrigger>
//               <AccordionContent className="p-4 flex flex-col gap-4">
//                 {stopOptions.map((option) => (
//                   <CheckboxInput
//                     key={option.value}
//                     id={`stops-${option.value}`}
//                     label={option.label}
//                     checked={filters.stops === option.value}
//                     onChange={() => handleStopChange(option.value)}
//                   />
//                 ))}
//               </AccordionContent>
//             </AccordionItem>

//             <AccordionItem
//               value="item-4"
//               className="border-b-[0.5px] border-primaryRed"
//             >
//               <AccordionTrigger className="font-medium p-4 capitalize">
//                 Airline
//               </AccordionTrigger>
//               <AccordionContent className="p-4 flex flex-col gap-4">
//                 {uniqueAirlines.map((airline) => (
//                   <CheckboxInput
//                     key={airline.carrierCode}
//                     id={`airline-${airline.carrierCode}`}
//                     label={
//                       <span className="flex items-center gap-2">
//                         <img
//                           src={`${IMAGE_URL}${airline.airlineLogo}`}
//                           alt={airline.airlineName}
//                           className="h-6 w-6"
//                         />
//                         {airline.airlineName}
//                       </span>
//                     }
//                     checked={filters.airlines.has(airline.carrierCode)}
//                     onChange={() => handleAirlineChange(airline.carrierCode)}
//                   />
//                 ))}
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SearchSidebar;
