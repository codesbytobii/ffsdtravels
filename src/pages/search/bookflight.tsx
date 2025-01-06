import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/components/navbar/Navbar";

// Utility to format numbers as currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const BookFlightPage: React.FC = () => {
  // State for passenger forms data
  const [passengerForms, setPassengerForms] = useState<
    {
      name: {
        firstName: string;
        lastName: string;
      };
      emailAddress: string;
      phones: {
        deviceType: string;
        countryCallingCode: string;
        number: string;
      };
      dateOfBirth: string;
      passportNumber: string;
      passportExpiryDate: string;
      passportIssuanceCountry: string;
      nationality: string;
      gender: any;
    }[]
  >([]);

  // State for flight details
  const [flightPrice, setFlightPrice] = useState(0);
  const [departureDate, setDepartureDate] = useState("");
  const [departureAirline, setDepartureAirline] = useState("");
  const [arrivalAirline, setArrivalAirline] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [total, setTotal] = useState(0);

  // Traveler counts
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);
  const [infantCount, setInfantCount] = useState<number>(0);
  const [travelerCount, setTravelerCount] = useState<number>(0);

  // Traveler prices
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [infantPrice, setInfantPrice] = useState(0);
  const [flightDetails, setFlightDetails] = useState(null);


  // State to handle loading
  const [loading, setLoading] = useState(true);

  // Function to handle input changes for a specific passenger
  const handlePassengerChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedForms = [...passengerForms];
    const fields = field.split("."); // Split to handle nested properties
    if (fields.length === 2) {
      updatedForms[index] = {
        ...updatedForms[index],
        [fields[0]]: {
          ...updatedForms[index][fields[0]],
          [fields[1]]: value, // Update the nested property
        },
      };
    } else {
      updatedForms[index] = { ...updatedForms[index], [field]: value };
    }
    setPassengerForms(updatedForms);
  };
  

  // console.log('handlePassengerChange', handlePassengerChange)

  useEffect(() => {
    const storedFlightData = localStorage.getItem("selectedFlight");
  
    if (storedFlightData) {
      const parsedFlightDetails = JSON.parse(storedFlightData);
      setFlightDetails(parsedFlightDetails);
  
      // Set other state variables based on parsedFlightDetails...
    }
    setLoading(false);
  }, []);

  // Function to initiate Paystack payment
  const initiatePayment = () => {
    if (!flightDetails) {
      console.error("Flight details not loaded");
      return;
    }

    const paystackHandler = (window as any).PaystackPop.setup({
      key: "pk_test_974d7130e8c147763327503821103c1914899b4e", // Replace with your Paystack public key
      email: passengerForms[0]?.emailAddress,
      amount: total * 100, // Amount is in kobo (100 kobo = 1 NGN)
      currency: "NGN",
      callback: (response: any) => {
        console.log("Payment successful:", response);
        // Handle successful payment
        handleBooking()
      },
      onClose: () => {
        console.log("Payment closed");
      },
    });
    paystackHandler.openIframe();
  };

  const handleBooking = async () => {
    try {
      if (!flightDetails || !passengerForms.length) {
        console.error("Missing flight or passenger details");
        return;
      }

      const bookingData = {
        data: {
          type: "flight-order",
          flightOffers: [flightDetails],
          travelers: [passengerForms],
    //       travelers: [
    //   {
    //     id: "1",
    //     dateOfBirth: "1982-01-16",
    //     name: {
    //       firstName: "rrr",
    //       lastName: "GONZALES"
    //     },
    //     gender: "MALE",
    //     contact: {
    //       emailAddress: "jorge.gonzales833@telefonica.ES",
    //       phones: [
    //         {
    //           deviceType: "MOBILE",
    //           countryCallingCode: "34",
    //           number: "480080076"
    //         }
    //       ]
    //     }
    //   }

      
      
    // ],
          remarks: {
            general: [
              {
                subType: "GENERAL_MISCELLANEOUS",
                text: "FFSD ONLINE BOOKING.",
              },
            ],
          },
          ticketingAgreement: {
            option: "DELAY_TO_CANCEL",
            delay: "6D",
          },
          contacts: [
            {
              addresseeName: {
                firstName: "KINGSLEY",
                lastName: "UCHE",
              },
              companyName: "FFSD TRAVELS",
              purpose: "STANDARD",
              phones: [
                {
                  deviceType: "LANDLINE",
                  countryCallingCode: "34",
                  number: "480080071",
                },
                {
                  deviceType: "MOBILE",
                  countryCallingCode: "33",
                  number: "480080072",
                },
              ],
              emailAddress: "support@ffsdtravels.com",
              address: {
                lines: ["Calle Prado, 16"],
                postalCode: "28014",
                cityName: "Madrid",
                countryCode: "ES",
              },
            },
          ],
        },
        // paymentReference, // Pass the Paystack reference
      };

      console.log('bookingDatadfdsfg', bookingData)

      const confirmPriceToken = localStorage.getItem("confirmPriceToken");
      const payToken = localStorage.getItem("payToken");
      console.log('payToken', payToken)

      const response = await fetch(
        "https://test.ffsdtravels.com/api/flight/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${confirmPriceToken}`
          },
          body: JSON.stringify(bookingData),
        }
      );

      // const responsee = await response.json();
      console.log('Raw response', response)
      console.log('Booking Data:', bookingData.data);
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);


      if (response.headers.get('content-type')?.includes('application/json')) {
        const responsee = await response.json();
        console.log('Parsed JSON Response:', responsee);
      } else {
        const textResponse = await response.text();
        console.error('Non-JSON Response:', textResponse);
        throw new Error('Unexpected response format');
      }



      if (response.ok) {
        console.log("Flight booked successfully:", );
        // const result = await response.json();
        alert("Flight booked successfully!");
      } else {
        console.error("Error booking flight:", response.statusText);
        alert("Failed to book flight. Please contact support.");
      }
    } catch (error) {
      console.error("Error booking flight:", error);
      alert("An error occurred while booking the flight. Please try again.");
    }
  };

  // Handle form submission and store passenger data in localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("passengerInfo", JSON.stringify(passengerForms));
    console.log("Passenger Data:", passengerForms);

    // Initiate the payment
    initiatePayment();
  };

  // Load flight data from localStorage on component mount
  useEffect(() => {
    const storedFlightData = localStorage.getItem("selectedFlight");

    if (storedFlightData) {
      const flightDetails = JSON.parse(storedFlightData);
      console.log('flightDetails', flightDetails);
      setFlightPrice(flightDetails.price.ffsd_total || 0);
      setDepartureDate(flightDetails.lastTicketingDate || "");
      setDepartureAirline(flightDetails.DepartureAirport || "");
      setArrivalAirline(flightDetails.arrivalAirport || "");
      setAirlineName(flightDetails.itineraries.airlineName || "");

      const getTravelerCountByType = (type: string) => {
        return flightDetails.travelerPricings.filter(
          (traveler: { travelerType: string }) =>
            traveler.travelerType === type
        ).length;
      };

      const getTravelerPrices = () => {
        const travelerTypes = ["ADULT", "CHILD", "HELD_INFANT"];

        const travelerPrices = travelerTypes.reduce((prices, type) => {
          const totalPrice = flightDetails.travelerPricings
            .filter(
              (traveler: { travelerType: string }) =>
                traveler.travelerType === type
            )
            .reduce(
              (
                total: number,
                traveler: { price: { total_charge: string } }
              ) => total + parseFloat(traveler.price.total_charge),
              0
            );

          prices[type] = totalPrice;
          return prices;
        }, {} as Record<string, number>);

        return travelerPrices;
      };

      setAdultCount(getTravelerCountByType("ADULT"));
      setChildCount(getTravelerCountByType("CHILD"));
      setInfantCount(getTravelerCountByType("HELD_INFANT"));
      setTravelerCount(flightDetails.travelerPricings.length);

      const travelerPrices = getTravelerPrices();
      setAdultPrice(travelerPrices.ADULT);
      setChildPrice(travelerPrices.CHILD);
      setInfantPrice(travelerPrices.HELD_INFANT);

      // Initialize passenger forms
      const totalTravelers = flightDetails.travelerPricings.length;
      setPassengerForms(
        Array(totalTravelers).fill({
          name: { firstName: "", lastName: "",},
          // firstName: "",
          // lastName: "",
          emailAddress: "",
          // phone: "",
          phones: 
            {
              deviceType: "Mobile", // or "home", "work"
              countryCallingCode: "+234",
              number: "",
            },
          
          
          dateOfBirth: "",
          gender: "",
          passportNumber: "",
          passportExpiryDate: "",
          passportIssuanceCountry: "",
          nationality: "",
        })
      );
    }
    setLoading(false); // Set loading to false after data fetch
  }, []);

  useEffect(() => {
    const calculatedTotal =
      adultPrice + childPrice + infantPrice;
    setTotal(calculatedTotal);
  }, [adultPrice, childPrice, infantPrice]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading flight details...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full overflow-hidden pt-4 section-width">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Passenger Information Section */}
          <div className="flex-1 w-full md:w-[60%] px-4 my-3">

            {/* Flight details card */}
            <Card className="bg-white shadow-md p-4 rounded-sm">
              <CardContent className="p-0">
                <div className="p-2 border-b-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <b className="text-base">
                        {airlineName || "Airline Name"}
                      </b>
                    </div>
                  </div>

                  <div className="flex gap-5 items-center">
                    <div className="text-end">
                      <p className="text-sm font-medium">Full pay</p>
                      <p className="text-sm font-semibold text-gray-600">
                        {formatCurrency(flightPrice)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between space-x-1">
                    <p className="text-base text-gray-600">
                      <span className="font-bold text-black">Departure Date</span>{" "}
                      <span className="font-medium">{departureDate}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-x-1 p-3 rounded-xs mt-2">
                    <div className="flex flex-col items-start w-[35%]">
                      <p className="font-semibold text-gray-500 capitalize">
                        {departureAirline || "Departure Airport"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end w-[35%]">
                      <p className="font-semibold text-gray-500 capitalize">
                        {arrivalAirline || "Arrival Airport"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md p-6 mt-4">
              <CardHeader className="text-lg font-semibold">
                Passenger Information
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {passengerForms.map((form, index) => (
                    <div key={index} className="p-4 border rounded mb-4">
                      <h3 className="font-bold mb-2">
                        Passenger {index + 1}
                      </h3>
                      <div>
                        <label htmlFor={`firstName-${index}`} className="block font-medium">
                           First Name
                        </label>
                        <input
                          type="text"
                          id={`firstName-${index}`}
                          value={form.name.firstName}
                          onChange={(e) =>
                            handlePassengerChange(index, "name.firstName", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label htmlFor={`lastName-${index}`} className="block font-medium">
                           Last Name
                        </label>
                        <input
                          type="text"
                          id={`lastName-${index}`}
                          value={form.name.lastName}
                          onChange={(e) =>
                            handlePassengerChange(index, "name.lastName", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label htmlFor={`emailAddress-${index}`} className="block font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          id={`emailAddress-${index}`}
                          value={form.emailAddress}
                          onChange={(e) =>
                            handlePassengerChange(index, "emailAddress", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label htmlFor={`phone-${index}`} className="block font-medium">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id={`phone-${index}`}
                          value={form.phones.number}
                          onChange={(e) =>
                            handlePassengerChange(index, "phones", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      {/* <div>
                        <label htmlFor={`phone-${index}`} className="block font-medium">
                          Phone
                        </label>
                        <div className="flex space-x-2">
                          <select
                            id={`deviceType-${index}`}
                            value={form.phones[index]?.deviceType || ""}
                            onChange={(e) =>
                              handlePassengerChange(index, "phones[index].deviceType", e.target.value)
                              
                            }
                            required
                            className="w-1/4 p-2 border border-gray-300 rounded"
                          >
                            <option value="">Select Device</option>
                            <option value="mobile">Mobile</option>
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                          </select>

                          <input
                            type="text"
                            id={`countryCode-${index}`}
                            value={form.phones[index]?.countryCallingCode || ""}
                            onChange={(e) =>
                              handlePassengerChange(index, "countryCallingCode", e.target.value)
                              
                            }
                            placeholder="+1"
                            required
                            className="w-1/4 p-2 border border-gray-300 rounded"
                          />

                          <input
                            type="tel"
                            id={`phoneNumber-${index}`}
                            value={form.phones[index]?.number || ""}
                            onChange={(e) =>
                              handlePassengerChange(index, "number", e.target.value)
                             
                            }
                            placeholder="1234567890"
                            required
                            className="w-2/4 p-2 border border-gray-300 rounded"
                          />
                        </div>
                      </div> */}


                      
                      <div>
                        <label htmlFor={`dateOfBirth-${index}`} className="block font-medium">
                          Date Of Birth
                        </label>
                        <input
                          type="date"
                          id={`dateOfBirth-${index}`}
                          value={form.dateOfBirth}
                          onChange={(e) =>
                            handlePassengerChange(index, "dateOfBirth", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div>
                        <label htmlFor={`gender-${index}`} className="block font-medium">
                          Gender
                        </label>
                        <select
                          id={`gender-${index}`}
                          value={form.gender}
                          onChange={(e) =>
                            handlePassengerChange(index, "gender", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>


                      <div>
                        <label htmlFor={`passportNumber-${index}`} className="block font-medium">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          id={`passportNumber-${index}`}
                          value={form.passportNumber}
                          onChange={(e) =>
                            handlePassengerChange(index, "passportNumber", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`passportExpiryDate-${index}`} className="block font-medium">
                          Passport Expiry Date
                        </label>
                        <input
                          type="date"
                          id={`passportExpiryDate-${index}`}
                          value={form.passportExpiryDate}
                          onChange={(e) =>
                            handlePassengerChange(index, "passportExpiryDate", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div>
                        <label htmlFor={`passportIssuanceCountry-${index}`} className="block font-medium">
                        Passport Issuance Country
                        </label>
                        <input
                          type="country"
                          id={`passportIssuanceCountry-${index}`}
                          value={form.passportIssuanceCountry}
                          onChange={(e) =>
                            handlePassengerChange(index, "passportIssuanceCountry", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div>
                        <label htmlFor={`nationality-${index}`} className="block font-medium">
                         Nationality
                        </label>
                        <input
                          type="country"
                          id={`nationality-${index}`}
                          value={form.nationality}
                          onChange={(e) =>
                            handlePassengerChange(index, "nationality", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      
                    </div>
                  ))}
                  <Button type="submit" className="bg-primaryRed text-white mt-4">
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Payment Breakdown Section */}
          <div className="w-full md:w-[30%] px-4 my-3">
            <Card className="bg-white shadow-md p-6">
              <CardHeader className="text-lg font-semibold">
                Payment Details
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Adult (X{adultCount}):</span>
                    <span>{formatCurrency(adultPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Children (X{childCount}):</span>
                    <span>{formatCurrency(childPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infant (X{infantCount}):</span>
                    <span>{formatCurrency(infantPrice)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total ({travelerCount} Travelers):</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookFlightPage;







// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Navbar from "@/components/components/navbar/Navbar";

// // Utility to format numbers as currency
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// const BookFlightPage: React.FC = () => {
//   // State for passenger forms data
//   const [passengerForms, setPassengerForms] = useState<
//     { firstName: string; lastName: string; emailAddress: string; phone: string; dateOfBirth: string; passportNumber: string; passportExpiryDate: string; passportIssuanceCountry: string; nationality: string; gender: any; }[]
//   >([]);

//   // State for flight details
//   const [flightPrice, setFlightPrice] = useState(0);
//   const [departureDate, setDepartureDate] = useState("");
//   const [departureAirline, setDepartureAirline] = useState("");
//   const [arrivalAirline, setArrivalAirline] = useState("");
//   const [airlineName, setAirlineName] = useState("");
//   const [total, setTotal] = useState(0);

//   // Traveler counts
//   const [adultCount, setAdultCount] = useState<number>(0);
//   const [childCount, setChildCount] = useState<number>(0);
//   const [infantCount, setInfantCount] = useState<number>(0);
//   const [travelerCount, setTravelerCount] = useState<number>(0);

//   // Traveler prices
//   const [adultPrice, setAdultPrice] = useState(0);
//   const [childPrice, setChildPrice] = useState(0);
//   const [infantPrice, setInfantPrice] = useState(0);
//   const [flightDetails, setFlightDetails] = useState(null);

//   // State to handle loading
//   const [loading, setLoading] = useState(true);

//   // Function to handle input changes for a specific passenger
//   const handlePassengerChange = (
//     index: number,
//     field: string,
//     value: string
//   ) => {
//     const updatedForms = [...passengerForms];
//     updatedForms[index] = { ...updatedForms[index], [field]: value };
//     setPassengerForms(updatedForms);
//     console.log('updatedForms', updatedForms);
//   };

//   useEffect(() => {
//     const storedFlightData = localStorage.getItem("selectedFlight");
  
//     if (storedFlightData) {
//       const parsedFlightDetails = JSON.parse(storedFlightData);
//       setFlightDetails(parsedFlightDetails);
  
//       // Set other state variables based on parsedFlightDetails...
//     }
//     setLoading(false);
//   }, []);

//   // Function to initiate Paystack payment
//   const initiatePayment = () => {
//     if (!flightDetails) {
//       console.error("Flight details not loaded");
//       return;
//     }

//     const paystackHandler = (window as any).PaystackPop.setup({
//       key: "pk_test_974d7130e8c147763327503821103c1914899b4e", // Replace with your Paystack public key
//       email: passengerForms[0]?.emailAddress,
//       amount: total * 100, // Amount is in kobo (100 kobo = 1 NGN)
//       currency: "NGN",
//       callback: (response: any) => {
//         console.log("Payment successful:", response);
//         // Handle successful payment
//         handleBooking()
//       },
//       onClose: () => {
//         console.log("Payment closed");
//       },
//     });
//     paystackHandler.openIframe();
//   };

//   const handleBooking = async () => {
//     try {
//       if (!flightDetails || !passengerForms.length) {
//         console.error("Missing flight or passenger details");
//         return;
//       }

//       const bookingData = {
//         data: {
//           type: "flight-order",
//           flightOffers: [flightDetails],
//           travelers: [passengerForms],
//           remarks: {
//             general: [
//               {
//                 subType: "GENERAL_MISCELLANEOUS",
//                 text: "FFSD ONLINE BOOKING.",
//               },
//             ],
//           },
//           ticketingAgreement: {
//             option: "DELAY_TO_CANCEL",
//             delay: "6D",
//           },
//           contacts: [
//             {
//               addresseeName: {
//                 firstName: "KINGSLEY",
//                 lastName: "UCHE",
//               },
//               companyName: "FFSD TRAVELS",
//               purpose: "STANDARD",
//               phones: [
//                 {
//                   deviceType: "LANDLINE",
//                   countryCallingCode: "34",
//                   number: "480080071",
//                 },
//                 {
//                   deviceType: "MOBILE",
//                   countryCallingCode: "33",
//                   number: "480080072",
//                 },
//               ],
//               emailAddress: "support@ffsdtravels.com",
//               address: {
//                 lines: ["Calle Prado, 16"],
//                 postalCode: "28014",
//                 cityName: "Madrid",
//                 countryCode: "ES",
//               },
//             },
//           ],
//         }
//         // paymentReference, // Pass the Paystack reference
//       };

//       console.log('bookingDatadfdsfg', bookingData)

//       // const confirmPriceToken = localStorage.getItem("confirmPriceToken");
//       const payToken = localStorage.getItem("payToken");
//       console.log('payToken', payToken)

//       const response = await fetch(
//         "https://test.ffsdtravels.com/api/flight/book",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${payToken}`,
//           },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       // const responsee = await response.json();
//       console.log('Raw response', response)
//       console.log('Booking Data:', bookingData.data);
//       console.log("Response Status:", response.status);
//       console.log("Response Headers:", response.headers);


//       if (response.headers.get('content-type')?.includes('application/json')) {
//         const responsee = await response.json();
//         console.log('Parsed JSON Response:', responsee);
//       } else {
//         const textResponse = await response.text();
//         console.error('Non-JSON Response:', textResponse);
//         throw new Error('Unexpected response format');
//       }

//       if (response.ok) {
//         console.log("Flight booked successfully:", );
//         // const result = await response.json();
//         alert("Flight booked successfully!");
//       } else {
//         console.error("Error booking flight:", response.statusText);
//         alert("Failed to book flight. Please contact support.");
//       }
//     } catch (error) {
//       console.error("Error booking flight:", error);
//       alert("An error occurred while booking the flight. Please try again.");
//     }
//   };

//   // Handle form submission and store passenger data in localStorage
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     localStorage.setItem("passengerInfo", JSON.stringify(passengerForms));
//     console.log("Passenger Data:", passengerForms);

//     // Initiate the payment
//     initiatePayment();
//   };

//   // Load flight data from localStorage on component mount
//   useEffect(() => {
//     const storedFlightData = localStorage.getItem("selectedFlight");

//     if (storedFlightData) {
//       const flightDetails = JSON.parse(storedFlightData);
//       console.log('flightDetails', flightDetails);
//       setFlightPrice(flightDetails.price.ffsd_total || 0);
//       setDepartureDate(flightDetails.lastTicketingDate || "");
//       setDepartureAirline(flightDetails.DepartureAirport || "");
//       setArrivalAirline(flightDetails.arrivalAirport || "");
//       setAirlineName(flightDetails.itineraries.airlineName || "");

//       const getTravelerCountByType = (type: string) => {
//         return flightDetails.travelerPricings.filter(
//           (traveler: { travelerType: string }) =>
//             traveler.travelerType === type
//         ).length;
//       };

//       const getTravelerPrices = () => {
//         const travelerTypes = ["ADULT", "CHILD", "HELD_INFANT"];

//         const travelerPrices = travelerTypes.reduce((prices, type) => {
//           const totalPrice = flightDetails.travelerPricings
//             .filter(
//               (traveler: { travelerType: string }) =>
//                 traveler.travelerType === type
//             )
//             .reduce(
//               (
//                 total: number,
//                 traveler: { price: { total_charge: string } }
//               ) => total + parseFloat(traveler.price.total_charge),
//               0
//             );

//           prices[type] = totalPrice;
//           return prices;
//         }, {} as Record<string, number>);

//         return travelerPrices;
//       };

//       setAdultCount(getTravelerCountByType("ADULT"));
//       setChildCount(getTravelerCountByType("CHILD"));
//       setInfantCount(getTravelerCountByType("HELD_INFANT"));
//       setTravelerCount(flightDetails.travelerPricings.length);

//       const travelerPrices = getTravelerPrices();
//       setAdultPrice(travelerPrices.ADULT);
//       setChildPrice(travelerPrices.CHILD);
//       setInfantPrice(travelerPrices.HELD_INFANT);

//       // Initialize passenger forms
//       const totalTravelers = flightDetails.travelerPricings.length;
//       setPassengerForms(
//         Array(totalTravelers).fill({
//           firstName: "",
//           lastName: "",
//           emailAddress: "",
//           phone: "",
//           dateOfBirth: "",
//           passportNumber: "",
//           passportExpiryDate: "",
//           passportIssuanceCountry: "",
//           nationality: "",
//           gender: "",
//         })
//       );
//     }
//     setLoading(false); // Set loading to false after data fetch
//   }, []);

//   useEffect(() => {
//     const calculatedTotal =
//       adultPrice + childPrice + infantPrice;
//     setTotal(calculatedTotal);
//   }, [adultPrice, childPrice, infantPrice]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading flight details...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="w-full overflow-hidden pt-4 section-width">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Passenger Information Section */}
//           <div className="flex-1 w-full md:w-[60%] px-4 my-3">

//             {/* Flight details card */}
//             <Card className="bg-white shadow-md p-4 rounded-sm">
//               <CardContent className="p-0">
//                 <div className="p-2 border-b-2 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div>
//                       <b className="text-base">
//                         {airlineName || "Airline Name"}
//                       </b>
//                     </div>
//                   </div>

//                   <div className="flex gap-5 items-center">
//                     <div className="text-end">
//                       <p className="text-sm font-medium">Full pay</p>
//                       <p className="text-sm font-semibold text-gray-600">
//                         {formatCurrency(flightPrice)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-3">
//                   <div className="flex items-center justify-between space-x-1">
//                     <p className="text-base text-gray-600">
//                       <span className="font-bold text-black">Departure Date</span>{" "}
//                       <span className="font-medium">{departureDate}</span>
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-between space-x-1 p-3 rounded-xs mt-2">
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="text-sm text-gray-600">Adults</p>
//                       <p className="font-medium">{adultCount}</p>
//                     </div>
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="text-sm text-gray-600">Children</p>
//                       <p className="font-medium">{childCount}</p>
//                     </div>
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="text-sm text-gray-600">Infants</p>
//                       <p className="font-medium">{infantCount}</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Passenger Form Section */}
//           <div className="flex-1 w-full md:w-[40%] px-4 my-3">
//             <form onSubmit={handleSubmit}>
//               {passengerForms.map((passenger, index) => (
//                 <div key={index} className="mb-4">
//                   <h3 className="text-lg font-semibold">Passenger {index + 1}</h3>
//                   <div className="flex gap-4">
//                     <div className="flex-1">
//                       <label className="block">First Name</label>
//                       <input
//                         type="text"
//                         value={passenger.firstName}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "firstName", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block">Last Name</label>
//                       <input
//                         type="text"
//                         value={passenger.lastName}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "lastName", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-4 mt-4">
//                     <div className="flex-1">
//                       <label className="block">Email Address</label>
//                       <input
//                         type="email"
//                         value={passenger.emailAddress}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "emailAddress", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block">Phone</label>
//                       <input
//                         type="text"
//                         value={passenger.phone}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "phone", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-4 mt-4">
//                     <div className="flex-1">
//                       <label className="block">Date of Birth</label>
//                       <input
//                         type="date"
//                         value={passenger.dateOfBirth}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "dateOfBirth", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block">Passport Number</label>
//                       <input
//                         type="text"
//                         value={passenger.passportNumber}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "passportNumber", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-4 mt-4">
//                     <div className="flex-1">
//                       <label className="block">Passport Expiry Date</label>
//                       <input
//                         type="date"
//                         value={passenger.passportExpiryDate}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "passportExpiryDate", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block">Passport Issuance Country</label>
//                       <input
//                         type="text"
//                         value={passenger.passportIssuanceCountry}
//                         onChange={(e) =>
//                           handlePassengerChange(index, "passportIssuanceCountry", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <label className="block">Nationality</label>
//                     <input
//                       type="text"
//                       value={passenger.nationality}
//                       onChange={(e) =>
//                         handlePassengerChange(index, "nationality", e.target.value)
//                       }
//                       className="w-full px-3 py-2 border rounded"
//                     />
//                   </div>

//                   <div className="mt-4">
//                     <label className="block">Gender</label>
//                     <select
//                       value={passenger.gender}
//                       onChange={(e) =>
//                         handlePassengerChange(index, "gender", e.target.value)
//                       }
//                       className="w-full px-3 py-2 border rounded"
//                     >
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               ))}
//               <Button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 mt-6"
//               >
//                 Book Now
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookFlightPage;
