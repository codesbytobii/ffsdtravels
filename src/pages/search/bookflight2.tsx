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
  // State for passenger form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  // State for flight details
  const [flightPrice, setFlightPrice] = useState(0);
  const [departureDate, setDepartureDate] = useState("");
  const [departureAirline, setDepartureAirline] = useState("");
  const [arrivalAirline, setArrivalAirline] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);

  // State to handle loading
  const [loading, setLoading] = useState(true);

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission and store passenger data in localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("passengerInfo", JSON.stringify(formData));
    console.log("Form Data:", formData);
  };

  // Load flight data from localStorage on component mount
  useEffect(() => {
    const storedFlightData = localStorage.getItem("selectedFlight");

    if (storedFlightData) {
      const flightDetails = JSON.parse(storedFlightData);
      console.log(flightDetails);
      setFlightPrice(flightDetails.price.ffsd_total || 0);
      setDepartureDate(flightDetails.lastTicketingDate || "");
      setDepartureAirline(flightDetails.DepartureAirport || "");
      setArrivalAirline(flightDetails.arrivalAirport || "");
      setAirlineName(flightDetails.airlineName || "");
      setTaxes(flightDetails.taxes || 0);
    }
    setLoading(false); // Set loading to false after data fetch
  }, []);

  // Update total whenever flightPrice or taxes change
  useEffect(() => {
    setTotal(flightPrice + taxes);
  }, [flightPrice, taxes]);

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
          {/* Form Section */}
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

            {/* Passenger Information Form */}
            <Card className="bg-white shadow-md p-6 mt-4">
              <CardHeader className="text-lg font-semibold">
                Passenger Information
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block font-medium"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-primaryRed text-white mt-4"
                  >
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
                Payment Breakdown
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Flight Price:</span>
                    <span>{formatCurrency(flightPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes:</span>
                    <span>{formatCurrency(taxes)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
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
