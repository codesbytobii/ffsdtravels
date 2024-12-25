import React, { useState, useCallback, useEffect } from "react";
import TransactionIcon from "@/assets/svg/TransactionIcon";
// import { format } from "date-fns";
import SelectInput from "@/components/components/input/SelectInput";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/components/dropdown/Dropdown";
import { toast } from "react-toastify";
import axiosInstance from "@/config/axios";
import { ticketClasses } from "../../../../data/data.json";
import CityInput from "@/components/components/input/CityInput";
import Loading from "@/components/components/withStatus/loading/Loading";
// import { useNavigate } from "react-router-dom";
import {
  PASSENGER_LIMIT,
  NO_CITY_MESSAGE,
  // NO_FLIGHT_MESSAGE,
  PASSENGER_LIMIT_MESSAGE,
  INFANT_EXCEED_ADULT_MESSAGE,
} from "@/config/api";
import DateInput from "@/components/components/input/DateInput";
import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
import FlightCard from "./FlightCard";

type DataItem = {
  value: string;
  label: React.ReactNode;
  city: {
    address: {
      cityCode?: string;
      cityName?: string;
      countryName?: string;
    };
    name: string;
    iata: string;
    city: string;
    country: string;
  };
};

const RoundTripTab = () => {
  // const navigate = useNavigate();

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
  const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
  const [flightSearchLoading, setFlightSearchLoading] = useState(false);
  const [departureLoading, setDepartureLoading] = useState(false);
  const [arrivalLoading, setArrivalLoading] = useState(false);

  const [departureCityInput, setDepartureCityInput] = useState('');
  const [arrivalCityInput, setArrivalCityInput] = useState('');
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

  const [searchResults, setSearchResults] = useState(null);


  // console.log(returnDate)

  const showErrorMessage = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const totalPassengers = adultCount + childCount + infantCount;

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (totalPassengers < PASSENGER_LIMIT) {
      setter((prev) => prev + 1);
    } else {
      showErrorMessage(PASSENGER_LIMIT_MESSAGE);
    }
  };

  const handleDecrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleAdultIncrement = useCallback(() => {
    if (totalPassengers < PASSENGER_LIMIT) {
      const newCount = adultCount + 1;
      if (newCount < infantCount) {
        showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
      } else {
        setAdultCount(newCount);
      }
    } else {
      showErrorMessage(PASSENGER_LIMIT_MESSAGE);
    }
  }, [totalPassengers, adultCount, infantCount, showErrorMessage]);

  const handleAdultDecrement = useCallback(() => {
    if (adultCount > 0) {
      const newCount = adultCount - 1;
      if (newCount < infantCount) {
        showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
        setInfantCount(newCount);
      }
      setAdultCount(newCount);
    }
  }, [adultCount, infantCount, showErrorMessage]);

  const handleChildIncrement = useCallback(
    () => handleIncrement(setChildCount),
    [totalPassengers, showErrorMessage]
  );
  const handleChildDecrement = useCallback(
    () => handleDecrement(setChildCount),
    []
  );

  const handleInfantIncrement = useCallback(() => {
    if (adultCount === 0 || infantCount >= adultCount) {
      showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
    } else if (totalPassengers < PASSENGER_LIMIT) {
      setInfantCount((prev) => prev + 1);
    } else {
      showErrorMessage(PASSENGER_LIMIT_MESSAGE);
    }
  }, [adultCount, infantCount, totalPassengers, showErrorMessage]);

  const handleInfantDecrement = useCallback(
    () => handleDecrement(setInfantCount),
    []
  );

  const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedDepartureCity = useDebounce(departureCityInput, 300);
  const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

  const fetchCityData = async (
    keyword: string,
    setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (keyword.length < 2) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `flight/search/city?subType=AIRPORT&keyword=${keyword}`
      );

      const cityData = response.data?.map((item: any) => ({
        value: item?.iata,
        label: `${item?.name}`,
        city: {
          address: {
            cityCode: item?.address?.cityCode,
            cityName: item?.address?.cityName,
            countryName: item?.address?.countryName,
          },
          name: item?.name,
          iata: item?.iata,
          city: item?.city,
          country: item?.country,
        },
      }));

      // console.log(cityData)

      if (cityData && cityData.length > 0) {
        setCityOptions(cityData);
      } else {
        showErrorMessage(NO_CITY_MESSAGE);
      }
    // } catch (error) {
    //   showErrorMessage(NO_CITY_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedDepartureCity) {
      fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
    }
  }, [debouncedDepartureCity]);

  useEffect(() => {
    if (debouncedArrivalCity) {
      fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
    }
  }, [debouncedArrivalCity]);


  const searchFlight = async () => {
    setFlightSearchLoading(true); // Start loading
    const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

    // console.log("apiUrl", apiUrl)

    // Format departure date to 'YYYY-MM-DD'
    const formattedDepartureDate = departureDate.toISOString().split('T')[0];
    const formattedReturnDate = returnDate.toISOString().split('T')[0];

    // ...existing payload logic...
    const payload = {
      currencyCode: "NGN",
      originDestinations: [
        {
          id: "1",
          originLocationCode: departureCity,
          destinationLocationCode: arrivalCity,
          departureDateTimeRange: {
            date: formattedDepartureDate,
            time: "10:00:00" // You can make this dynamic if needed
          }
        },
        {
          id: "2",
          originLocationCode: arrivalCity, // Reverse for return trip
          destinationLocationCode: departureCity,
          departureDateTimeRange: {
            date: formattedReturnDate,
            time: "10:00:00" // You can make this dynamic if needed
          }
        }
      ],
      travelers: [
        ...Array.from({ length: adultCount }, (_, i) => ({
          id: `${i + 1}`,
          travelerType: "ADULT",
          fareOptions: ["STANDARD"]
        })),
        ...Array.from({ length: childCount }, (_, i) => ({
          id: `${adultCount + i + 1}`,
          travelerType: "CHILD",
          fareOptions: ["STANDARD"]
        })),
        ...Array.from({ length: infantCount }, (_, i) => ({
          id: `${adultCount + childCount + i + 1}`,
          travelerType: "HELD_INFANT",
          associatedAdultId: `${i + 1}`, // Assuming first adult is associated
          fareOptions: ["STANDARD"]
        }))
      ],
      sources: ["GDS"],
      searchCriteria: {
        maxFlightOffers: 50, // Adjust as needed
        pricingOptions: {
          fareType: ["PUBLISHED"]
        },
        flightFilters: {
          cabinRestrictions: [
            {
              cabin: "ECONOMY",
              coverage: "MOST_SEGMENTS",
              originDestinationIds: ["1", "2"]
            }
          ]
        }
      },
      additionalInformation: {
        brandedFares: true
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_TOKEN`, // Replace with your actual token
        },
        body: JSON.stringify(payload),
      });

      // console.log(response)

      // console.log(response.status, response.statusText);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // console.log("data isdjsd", data);

      // const flightData: FlightData[] = data.map((offer: any) => mapFlightData(offer));

      setSearchResults(data.data);

      // navigate("/roundtripsearch", {
      //   state: {
      //     searchResults: data.data,
      //     searchParams: {
      //       departureCity,
      //       arrivalCity,
      //       departureDate,
      //       returnDate,
      //       adultCount,
      //       childCount,
      //       infantCount,
      //       selectedClass,
      //     },
      //   },
      // });
      // console.log('Flight Search Results:', data);
      // return data;

    } catch (error) {
      console.error('Error fetching flight data:', error);
      showErrorMessage('Failed to fetch flight data.'); // Show a generic error message
    } finally {
      setFlightSearchLoading(false); // End loading
    }
  };

  const handleDepartureDateChange = useCallback(
    (date: Date | undefined) => setDepartureDate(date || new Date()),
    []
  );

  const handleReturnChange = useCallback(
    (date: Date | undefined) => setReturnDate(date || new Date()),
    []
  );

  const handleDepartureCityChange = (value: string, city: DataItem) => {
    setDepartureCity(city.city.iata); // Update with the airport name
    setDepartureCityInput(city.city.iata); // Display city and airport code in the input
    console.log("Value:", value);
    console.log("City:", city);
  };

  const handleArrivalCityChange = (value: string, city: DataItem) => {
    setArrivalCity(city.city.iata); // Update with the airport name
    setArrivalCityInput(city.city.iata); // Display city and airport code in the input
    console.log("Value:", value);
    console.log("City:", city);
  };

  return (
    <>
    <div className="flex flex-col gap-5 w-full items-center">
      <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
        <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
          <CityInput
            value={departureCityInput}
            data={departureCityOptions}
            label="From where?"
            placeholder="City"
            onSearch={setDepartureCityInput}
            loading={departureLoading}
            onChange={handleDepartureCityChange} // Use updated handler
          />

          <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
            <TransactionIcon size="10" stroke="#E5302f" />
          </div>

          <CityInput
            value={arrivalCityInput}
            data={arrivalCityOptions}
            label="To where?"
            placeholder="City"
            onSearch={setArrivalCityInput}
            loading={arrivalLoading}
            onChange={handleArrivalCityChange} // Use updated handler
          />
        </div>

        <DateInput labelText="Departure" onChange={handleDepartureDateChange} />

        <DateInput labelText="Arrival" onChange={handleReturnChange} />

        <SelectInput
          data={ticketClasses}
          label="Class"
          placeholder="Class"
          value={selectedClass}
          onChange={setSelectedClass}
        />

        <Dropdown label="Add Passengers" btnText={`${adultCount} Adults, ${childCount} Children, ${infantCount} Infants`}>
          <div className="flex flex-col gap-3 py-2">
            <PassengerCounter
              label="Adults ( ≥ 12 years)"
              count={adultCount}
              increment={handleAdultIncrement}
              decrement={handleAdultDecrement}
            />
            <PassengerCounter
              label="Children ( 2 - 12 years)"
              count={childCount}
              increment={handleChildIncrement}
              decrement={handleChildDecrement}
            />
            <PassengerCounter
              label="Infants ( < 2 years)"
              count={infantCount}
              increment={handleInfantIncrement}
              decrement={handleInfantDecrement}
            />
          </div>
        </Dropdown>
      </div>

    

      <Button
        className="col-span-2 bg-primaryRed duration-300 capitalize"
        onClick={searchFlight}
        disabled={flightSearchLoading}
      >
        {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
      </Button>


    </div>

      {/* Search Results Section */}
      {searchResults && (
      <div className="search-results">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index} className="result-item">
              {/* Customize how you display each flight result */}
              <FlightCard result={result} />
              {/* <p>{JSON.stringify(result)}</p> */}
            </div>
          ))
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    )}
    </>
  );
};

export default RoundTripTab;
