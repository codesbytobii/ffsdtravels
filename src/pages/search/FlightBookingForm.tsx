import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
// import { BASE_URL } from "@/config/api";

interface FlightBookingFormProps {
  onSubmit: () => void;
}

interface BookingData {
  firstName: string;
  lastName: string;
  otherName: string;
  nationality: string;
  dateOfBirth: string;
  passportNumber: string;
  email: string;
  phone: string;
  gender: string;
}

interface ErrorResponseData {
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

const FlightBookingForm: React.FC<FlightBookingFormProps> = ({ onSubmit }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    otherName: "",
    nationality: "",
    dateOfBirth: "",
    passportNumber: "",
    email: "",
    phone: "",
    gender: "male",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Book the flight (Submit user info to the booking API)
      // Assuming you're submitting the booking data to the API:
      // const bookingResponse = await axios.post(`${BASE_URL}flight/book`, bookingData, {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      // });

      // Assuming the booking API responds with flight_order_am_id or similar
      const flightOrderId = 34; // Replace with actual ID from booking API response

      // Show success message for flight booking
      toast.success("Flight booked successfully!");

      // Step 2: Trigger the payment API after booking
      const paymentURL = `https://test.ffsdtravels.com/api/generate/payment?paid_by_email=${bookingData.email}&amount=123000&flight_order_am_id=${flightOrderId}`;

      const paymentResponse = await axios.post(paymentURL, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log(paymentResponse)

      // Step 3: Redirect to the payment gateway
      if (paymentResponse.data) {
        window.location.href = paymentResponse.data.paymentUrl; // Redirect to payment gateway
      }

      onSubmit(); // Trigger any action after successful submission (if needed)

    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-10 gap-y-6">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-small mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={bookingData.firstName}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="font-small mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={bookingData.lastName}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="otherName" className="font-small mb-2">
            Other Name
          </label>
          <input
            type="text"
            id="otherName"
            name="otherName"
            value={bookingData.otherName}
            onChange={handleInputChange}
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="nationality" className="font-small mb-2">
            Nationality
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={bookingData.nationality}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateOfBirth" className="font-small mb-2">
            Date Of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={bookingData.dateOfBirth}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="font-small mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingData.phone}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-small mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={bookingData.email}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="passportNumber" className="font-small mb-2">
            Passport Number
          </label>
          <input
            type="text"
            id="passportNumber"
            name="passportNumber"
            value={bookingData.passportNumber}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="font-small mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={bookingData.gender}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          type="submit"
          className="bg-primaryRed text-white capitalize w-52"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Book Flight"}
        </Button>
      </div>
    </form>
  );
};

export default FlightBookingForm;
