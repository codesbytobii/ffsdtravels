import React, { useState, useCallback, useEffect } from "react";
import TransactionIcon from "@/assets/svg/TransactionIcon";
// import { format } from "date-fns";
import SelectInput from "@/components/components/input/SelectInput";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/components/dropdown/Dropdown";
import { toast } from "react-toastify";
import axiosInstance from "@/config/axios";
import { ticketClasses } from "../../data/data.json";
import CityInput from "@/components/components/input/CityInput";
import Loading from "@/components/components/withStatus/loading/Loading";
import { useNavigate } from "react-router-dom";
import {
  PASSENGER_LIMIT,
  NO_CITY_MESSAGE,
  // NO_FLIGHT_MESSAGE,
  PASSENGER_LIMIT_MESSAGE,
  // INFANT_EXCEED_ADULT_MESSAGE,
} from "@/config/api";
import DateInput from "@/components/components/input/DateInput";
import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
import { Trash2 } from "lucide-react"; // Import Trash icon

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

interface Section {
  id: number; // Add a unique ID field
  departureCityInput: string;
  departureCity: string;
  arrivalCityInput: string;
  arrivalCity: string;
  departureDate: Date;
  adultCount: number;
  childCount: number;
  infantCount: number;
  selectedClass: string;
}


const MultiCityTab = () => {
  const navigate = useNavigate();

  const [sections, setSections] = useState<Section[]>([
    {
      id: 1, // Assign a unique ID
      departureCityInput: "",
      departureCity: "",
      arrivalCityInput: "",
      arrivalCity: "",
      departureDate: new Date(),
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      selectedClass: ticketClasses[0].value,
    },
  ]);

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
  const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

  const showErrorMessage = useCallback((message: string) => {
    toast.error(message);
  }, []);

  const totalPassengers = sections.reduce(
    (sum, section) =>
      sum + section.adultCount + section.childCount + section.infantCount,
    0
  );

  const maxPassengers = PASSENGER_LIMIT;

  const handleIncrement = (index: number, field: keyof Section) => {
    if (totalPassengers < maxPassengers) {
      setSections((prevSections) =>
        prevSections.map((section, i) =>
          i === index
            ? {
                ...section,
                [field]:
                  typeof section[field] === "number"
                    ? section[field] + 1
                    : section[field], // Leave it unchanged if it's not a number
              }
            : section
        )
      );
    } else {
      showErrorMessage(PASSENGER_LIMIT_MESSAGE);
    }
  };

  const handleDecrement = (index: number, field: keyof Section) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index
          ? {
              ...section,
              [field]:
                typeof section[field] === "number"
                  ? Math.max(0, section[field] - 1)
                  : section[field], // Leave it unchanged if it's not a number
            }
          : section
      )
    );
  };

  // Ensure infants do not exceed adults in each section
  useEffect(() => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.infantCount > section.adultCount) {
          return { ...section, infantCount: section.adultCount };
        }
        return section;
      })
    );
  }, [sections]);

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

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      {
        id: prevSections.length + 1, // Assign a unique ID
        departureCityInput: "",
        departureCity: "",
        arrivalCityInput: "",
        arrivalCity: "",
        departureDate: new Date(),
        adultCount: 1,
        childCount: 0,
        infantCount: 0,
        selectedClass: ticketClasses[0].value,
      },
    ]);
  };

  const deleteSection = (index: number) => {
    setSections((prevSections) => {
      if (prevSections.length === 1) {
        // Prevent deleting the last remaining section
        showErrorMessage("At least one section is required.");
        return prevSections;
      }
      return prevSections.filter((_, i) => i !== index);
    });
  };

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
    console.log("sections", sections);
    setFlightSearchLoading(true); // Start loading
    const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

    const totalAdults = sections.reduce(
      (sum, section) => sum + section.adultCount,
      0
    );
    const totalChildren = sections.reduce(
      (sum, section) => sum + section.childCount,
      0
    );
    const totalInfants = sections.reduce(
      (sum, section) => sum + section.infantCount,
      0
    );

    // Create the originDestinations array based on the sections
  const originDestinations = sections.map((section, index) => ({
    id: (index + 1).toString(), // Unique ID for each section
    originLocationCode: section.departureCity,
    destinationLocationCode: section.arrivalCity,
    departureDateTimeRange: {
      date: section.departureDate.toLocaleDateString('en-CA'), // Format date as 'YYYY-MM-DD'
      time: "10:00:00", // You can make this dynamic if needed
    },
  }));

  // Generate the traveler array, ensuring unique traveler IDs across all sections
  const travelers = [
    ...Array.from({ length: totalAdults }, (_, i) => ({
      id: `${i + 1}`,
      travelerType: "ADULT",
      fareOptions: ["STANDARD"],
    })),
    ...Array.from({ length: totalChildren }, (_, i) => ({
      id: `${totalAdults + i + 1}`,
      travelerType: "CHILD",
      fareOptions: ["STANDARD"],
    })),
    ...Array.from({ length: totalInfants }, (_, i) => ({
      id: `${totalAdults + totalChildren + i + 1}`,
      travelerType: "HELD_INFANT",
      associatedAdultId: `${i + 1}`, // Infants associated with the first adults
      fareOptions: ["STANDARD"],
    })),
  ];

    // Format departure date to 'YYYY-MM-DD'
  // const formattedDepartureDate = format(departureDate, "yyyy-MM-dd");
    
    // ...existing payload logic...
    const payload = {
      currencyCode: "NGN",
      originDestinations,
      travelers,
      sources: ["GDS"],
      searchCriteria: {
        maxFlightOffers: 50, // Adjust as needed
        pricingOptions: {
          fareType: ["PUBLISHED"]
        },
        flightFilters: {
          cabinRestrictions: [
            {
              cabin: selectedClass.toUpperCase(),
              coverage: "MOST_SEGMENTS",
              originDestinationIds: ["1"]
            }
          ]
        }
      },
      additionalInformation: {
        brandedFares: true
      }
    };
    
    console.log("payload is", payload);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_TOKEN`, // Replace with your actual token
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();

      console.log("data isdjsd", data.data);

      // const flightData: FlightData[] = data.map((offer: any) => mapFlightData(offer));

      navigate("/multicitysearch", {
        state: {
          searchResults: data.data ,
          searchParams: {
            departureCity,
            arrivalCity,
            departureDate,
            adultCount: totalAdults,
            childCount: totalChildren,
            infantCount: totalInfants,
            selectedClass,
          },
        },
      });
      // console.log('Flight Search Results:', data);
      // return data;
  
    } catch (error) {
      console.error('Error fetching flight data:', error);
      showErrorMessage('Failed to fetch flight data.'); // Show a generic error message
    } finally {
      setFlightSearchLoading(false); // End loading
    }
  };
  
  
  // Call the function
  // searchFlight();
  
  
  

  const handleDepartureDateChange = (date: Date | undefined, index: number) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, departureDate: date || new Date() } : section
      )
    );

    // Update the global or independent departure date state
    setDepartureDate(date || new Date());
  };
  

  const handleDepartureCityChange = (value: string, city: DataItem, index: number) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index
          ? {
              ...section,
              departureCity: city.city.iata,
              departureCityInput: city.city.iata, // Update the input field as well
              someOtherField: value,
            }
          : section
      )
    );
    // Update the global departure city state (or any other state tracking this)
    setDepartureCity(city.city.iata);
  };
  
  const handleArrivalCityChange = (value: string, city: DataItem, index: number) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index
          ? {
              ...section,
              arrivalCity: city.city.iata,
              arrivalCityInput: city.city.iata, // Update the input field as well
              someOtherField: value,
            }
          : section
      )
    );

    // Update the global departure city state (or any other state tracking this)
    setArrivalCity(city.city.iata);
  };
  

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      {sections.map((section, index) => (
        <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
        <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
          <CityInput
            value={section.departureCityInput}
            data={departureCityOptions}
            label="From where?"
            placeholder="City"
            onSearch={setDepartureCityInput}
            loading={departureLoading}
            onChange={(value, city) => handleDepartureCityChange(value, city, index)} // Use updated handler
          />

          <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
            <TransactionIcon size="10" stroke="#E5302f" />
          </div>
          
          <CityInput
            value={section.arrivalCityInput}
            data={arrivalCityOptions}
            label="To where?"
            placeholder="City"
            onSearch={setArrivalCityInput}
            loading={arrivalLoading}
            onChange={(value, city) => handleArrivalCityChange(value, city, index)} // Use updated handler
          />
        </div>

        <DateInput labelText="Departure" onChange={(date) => handleDepartureDateChange(date, index)}  />

        <SelectInput
          data={ticketClasses}
          label="Class"
          placeholder="Class"
          value={selectedClass}
          onChange={setSelectedClass}
        />

        <Dropdown label="Add Passengers" btnText={`${section.adultCount} Adults, ${section.childCount} Children, ${section.infantCount} Infants`}>
          <div className="flex flex-col gap-3 py-2">
          <PassengerCounter
                label="Adults ( ≥ 12 years)"
                count={section.adultCount}
                increment={() => handleIncrement(index, "adultCount")}
                decrement={() => handleDecrement(index, "adultCount")}
              />
              <PassengerCounter
                label="Children ( 2 - 12 years)"
                count={section.childCount}
                increment={() => handleIncrement(index, "childCount")}
                decrement={() => handleDecrement(index, "childCount")}
              />
              <PassengerCounter
                label="Infants ( < 2 years)"
                count={section.infantCount}
                increment={() => handleIncrement(index, "infantCount")}
                decrement={() => handleDecrement(index, "infantCount")}
              />
          </div>
        </Dropdown>

        {/* Delete Button */}
        {sections.length > 1 && (
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
              onClick={() => deleteSection(index)}
              aria-label="Delete section"
            >
              <Trash2 size={16} color="#FFFFFF" />
            </Button>
          )}
      </div>
      ))}
      

      <div className="flex gap-5">
        <Button
          className="bg-primaryRed duration-300 h-12"
          onClick={addSection}
        >
          Add Another Flight
          {/* <Plus /> */}
        </Button>

        <Button
          className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
          onClick={searchFlight}
          disabled={flightSearchLoading}
        >
          {flightSearchLoading ? (
            <Loading color="#FFFFFF" size="20" />
          ) : (
            "Search"
          )}
        </Button>
      </div>

      
    </div>
  );
};

export default MultiCityTab;