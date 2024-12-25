import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import RoundTripSearchHeader from "./RoundTripSearchHeader";
// import SearchSidebar from "./SearchSidebar";
import RoundSearchResult from "./RoundTripSearchResult";
import Navbar from "@/components/components/navbar/Navbar";

// Define the type for search parameters
type SearchParams = {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  selectedClass: string;
};

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
  pricingOptions: { fareType: string[]; includedCheckedBagsOnly: boolean };
  source: string;
  travelerPricings: {
    travelerType: string;
    fareDetailsBySegment: {
      class: string;
      includedCheckedBags: { quantity: number };
    }[];
  }[];
  type: string;
  validatingAirlineCodes: string[];
}

const RoundTripSearch: React.FC = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults;
  const searchData = searchResults;

  const initialSearchParams: SearchParams = location.state?.searchParams || {
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    returnDate: "",
    adultCount: 0,
    childCount: 0,
    infantCount: 0,
    selectedClass: "",
  };

  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);
  const [filteredData, setFilteredData] = useState<Flight[]>(searchData);

  useEffect(() => {
    if (location.state?.searchParams) {
      setSearchParams(location.state.searchParams);
    }
  }, [location.state?.searchParams]);

  const handleSearchParamsChange = useCallback((newParams: SearchParams) => {
    setSearchParams(newParams);
  }, []);

  const handleFilterChange = useCallback((newFilteredData: Flight[]) => {
    setFilteredData(newFilteredData);
  }, []);

  handleFilterChange;

  return (
    <>
      <Navbar />
      <div className="w-full overflow-hidden pt-4 section-width">
        <div className="w-full lg:flex hidden">
          {/* <h1>hello</h1> */}
          <RoundTripSearchHeader
            searchParams={searchParams}
            onChange={handleSearchParamsChange}
          />
        </div>
        <div className="flex flex-1 mt-3 gap-2 justify-between">
          {/* <div className="lg:flex hidden w-[40%] px-4 my-3">
            <SearchSidebar
              searchData={searchData}
              onFilterChange={handleFilterChange}
            />
          </div> */}
          <div className="w-full overflow-hidden px-4 my-3">
            {/* Pass the filteredData correctly to SearchResult */}
            <RoundSearchResult searchData={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoundTripSearch;

