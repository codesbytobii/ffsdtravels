// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { BASE_URL } from "@/config/api";
// import { toast } from "react-toastify";
// import CustomTable from "@/components/components/table/CustomTable";

// interface User {
//   id: number;
//   lastName: string;
//   firstName: string;
//   email: string;
//   phone: string;
//   companyName: string;
//   companyCountry: string;
//   user_type: string;
//   paymentType: string;
//   created_at: string;
//   updated_at: string;
//   edit?: string;
// }

// interface ErrorResponseData {
//   message?: string;
//   errors?: {
//     [key: string]: string[];
//   };
// }

// const FlightData: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
// //   const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
// //   const [editingUser, setEditingUser] = useState<User | null>(null);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
//   };

//   useEffect(() => {
//     const userToken = localStorage.getItem("userToken");

//     if (!userToken) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     const fetchUsers = async (page: number) => {
//       try {
//         const response = await axios.get(`${BASE_URL}users/all?page=${page}`, {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Accept: "application/json",
//           },
//         });

//         const { data, current_page, last_page } = response?.data?.users;

//         const formattedData = data.map((item: User) => ({
//           ...item,
//           name: `${item.lastName} ${item.firstName}`,
//           created_at: formatDate(item.created_at),
//           updated_at: formatDate(item.updated_at),
//         }));

//         setUsers(formattedData);
//         setCurrentPage(current_page);
//         setTotalPages(last_page);
//         setIsLoading(false);
//       } catch (error) {
//         const err = error as AxiosError<ErrorResponseData>;
//         if (err.response?.data?.message) {
//           toast.error(err.response.data.message);
//         } else {
//           toast.error("An unexpected error occurred.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUsers(currentPage);
//   }, [currentPage]);

// //   const handleEdit = (user: User) => {
// //     setEditingUser(user);
// //     setIsCreateFormOpen(true);
// //   };

// //   const handleUpdateUser = (updatedUser: User) => {
// //     setUsers((prevUsers) =>
// //       prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
// //     );
// //     setEditingUser(null);
// //     setIsCreateFormOpen(false);
// //     toast.success("User updated successfully.");
// //   };

// //   const handleCancelEdit = () => {
// //     setEditingUser(null);
// //     setIsCreateFormOpen(false);
// //   };

//   const columns = [
//     { header: "Name", accessor: "name" },
//     { header: "DOB", accessor: "user_type" },
//     { header: "Phone Number", accessor: "phone" },
//     { header: "Email Address", accessor: "email" },
//     { header: "Created At", accessor: "created_at" },
//     { header: "Updated At", accessor: "updated_at" },
//     // {
//     //   header: "Edit",
//     //   accessor: "edit",
//     //   Cell: ({ row }: { row: { original: User } }) => (
//     //     <button onClick={() => handleEdit(row.original)}>
//     //       <FaEdit className="text-blue-500 hover:text-blue-700" />
//     //     </button>
//     //   ),
//     // },
//   ];

//   return (
//     <div className="flex flex-col ">
      
//       <div className="mt-7">
//         <CustomTable
//           data={users}
//           columns={columns}
//           isLoading={isLoading}
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default FlightData;




// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import CustomTable from "@/components/components/table/CustomTable";

// interface FlightDetails {
//   id: number;
//   flightNumber: string;
//   departure: string;
//   arrival: string;
//   departureTime: string;
//   arrivalTime: string;
//   airline: string;
//   status: string;
// }

// interface ErrorResponseData {
//   message?: string;
// }

// const FlightData: React.FC = () => {
//   const [flight, setFlight] = useState<FlightDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const userToken = localStorage.getItem("userToken");

//     if (!userToken) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     const fetchFlightDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://test.ffsdtravels.com/api/flight/get/flight/details?flightOrderId=eJzTd9f3DbVwCvUDAAtGAmU%3D",
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//               Accept: "application/json",
//             },
//           }
//         );

//         const flightData = response.data.flight; // Adjust based on actual response structure

//         setFlight({
//           id: flightData.id,
//           flightNumber: flightData.flightNumber,
//           departure: flightData.departure,
//           arrival: flightData.arrival,
//           departureTime: new Date(flightData.departureTime).toLocaleString(),
//           arrivalTime: new Date(flightData.arrivalTime).toLocaleString(),
//           airline: flightData.airline,
//           status: flightData.status,
//         });

//         setIsLoading(false);
//       } catch (error) {
//         const err = error as AxiosError<ErrorResponseData>;
//         toast.error(err.response?.data?.message || "An unexpected error occurred.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFlightDetails();
//   }, []);

//   const columns = [
//     { header: "Flight Number", accessor: "flightNumber" },
//     { header: "Departure", accessor: "departure" },
//     { header: "Arrival", accessor: "arrival" },
//     { header: "Departure Time", accessor: "departureTime" },
//     { header: "Arrival Time", accessor: "arrivalTime" },
//     { header: "Airline", accessor: "airline" },
//     { header: "Status", accessor: "status" },
//   ];

//   return (
//     <div className="flex flex-col">
//       <div className="mt-7">
//         <CustomTable
//           data={flight ? [flight] : []}
//           columns={columns}
//           isLoading={isLoading}
//           totalPages={1}
//           currentPage={1}
//           onPageChange={() => {}}
//         />
//       </div>
//     </div>
//   );
// };

// export default FlightData;





// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import Modal from "@/components/components/modal/Modal";
// import { Button } from "@/components/ui/button";
// import CustomTable from "@/components/components/table/CustomTable";

// interface FlightDetails {
//   id: number;
//   flightNumber: string;
//   departure: string;
//   arrival: string;
//   departureTime: string;
//   arrivalTime: string;
//   airline: string;
//   status: string;
// }

// interface ErrorResponseData {
//   message?: string;
// }

// const FlightData: React.FC = () => {
//   const [flights, setFlights] = useState<FlightDetails[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const toggleModal = () => setModalOpen(!modalOpen);
//   const [markupPercentage, setMarkupPercentage] = useState(""); // State to manage PNR number
//   const [loading, setLoading] = useState(false); // State to track loading
//   const [error, setError] = useState(""); // State to track errors

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (markupPercentage.trim()) {
//       setLoading(true);
//       setError(""); // Clear previous errors
//       try {
//         // Define the API URL
//         const apiUrl = "https://test.ffsdtravels.com/api/markup/create";
  
//         // Define the payload for the POST request
//         const payload = {
//           percentage: parseFloat(markupPercentage), // Convert the input to a number
//         };
  
//         // Make the POST request to the API
//         const response = await fetch(apiUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         });
//         console.log(response)
  
//         // If response is successful
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Markup Applied Successfully:", data);
//           setModalOpen(false); // Close the modal after successful submission
//           // Optionally, handle the data here (e.g., show a success message, navigate, etc.)
//         } else {
//           throw new Error("Failed to apply markup");
//         }
//       } catch (error) {
//         setError("Error applying markup. Please try again later.");
//         console.error("Error applying markup:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       alert("Please enter a valid markup percentage.");
//     }
//   };
  

//   useEffect(() => {
//     const userToken = localStorage.getItem("userToken");

//     if (!userToken) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     const fetchBookedFlights = async () => {
//       try {
//         const response = await axios.get(
//           "https://test.ffsdtravels.com/api/get/flights/booked",
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//               Accept: "application/json",
//             },
//           }
//         );

//         const flightsData = response.data.flights; // Adjust based on actual response structure

//         const formattedFlights = flightsData.map((flight: any) => ({
//           id: flight.id,
//           flightNumber: flight.flightNumber,
//           departure: flight.departure,
//           arrival: flight.arrival,
//           departureTime: new Date(flight.departureTime).toLocaleString(),
//           arrivalTime: new Date(flight.arrivalTime).toLocaleString(),
//           airline: flight.airline,
//           status: flight.status,
//         }));

//         setFlights(formattedFlights);
//       } catch (error) {
//         const err = error as AxiosError<ErrorResponseData>;
//         toast.error(err.response?.data?.message || "An unexpected error occurred.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBookedFlights();
//   }, []);

//   const columns = [
//     { header: "Flight Number", accessor: "flightNumber" },
//     { header: "Departure", accessor: "departure" },
//     { header: "Arrival", accessor: "arrival" },
//     { header: "Departure Time", accessor: "departureTime" },
//     { header: "Arrival Time", accessor: "arrivalTime" },
//     { header: "Airline", accessor: "airline" },
//     { header: "Status", accessor: "status" },
//   ];

//   return (
//     <div className="flex flex-col">
//       <div className="flex gap-4 mt-5">
//         <Button
//           onClick={toggleModal}
//           className="bg-primaryRed text-white w-52 rounded capitalize"
//           aria-label="Create User"
//         >
//           Mark Up
//         </Button>

//         {/* Modal for Create and Edit User */}
//         <Modal
//           isOpen={modalOpen}
//           onClose={toggleModal}
//         >
//           <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
//           <h2 className="text-lg font-semibold mb-4">Enter The MarkUp Percentage</h2>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input
//               type="text"
//               value={markupPercentage}
//               onChange={(e) => setMarkupPercentage(e.target.value)}
//               placeholder="Enter Markup Percentage"
//               className="border border-gray-300 w-full sm:w-[500px] rounded-md p-2 focus:outline-none focus:border-primaryRed"
//             />
//             {error && <p className="text-red-500 text-sm">{error}</p>} 
//             <Button type="submit" className="bg-primaryRed text-white" disabled={loading}>
//               {loading ? "Submitting..." : "Submit"}
//             </Button>
//           </form>
//         </div>
//         </Modal>
//       </div>
//       <div className="mt-7">
//         <CustomTable
//           data={flights}
//           columns={columns}
//           isLoading={isLoading}
//           totalPages={1} // Adjust for pagination if necessary
//           currentPage={1} // Adjust for pagination if necessary
//           onPageChange={() => {}} // Adjust for pagination functionality
//         />
//       </div>
//     </div>
//   );
// };

// export default FlightData;







import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Modal from "@/components/components/modal/Modal";
import { Button } from "@/components/ui/button";
import CustomTable from "@/components/components/table/CustomTable";

interface FlightDetails {
  reference: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  status: string;
  order_id: string;
  itinerary: {
    order_id: string;
  }
  associated_records?: {
    pnr: string;
    id: string;
  }
}

interface ErrorResponseData {
  message?: string;
}

const FlightData: React.FC = () => {
  const [flights, setFlights] = useState<FlightDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [markupPercentage, setMarkupPercentage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleModal = () => setModalOpen(!modalOpen);

  const validatePercentage = (value: string): boolean => {
    const number = parseFloat(value);
    return !isNaN(number) && number >= 0 && number <= 100;
  };

  const getToken = (): string | null => {
    return localStorage.getItem("userToken");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePercentage(markupPercentage)) {
      setError("Please enter a valid markup percentage between 0 and 100.");
      return;
    }

    const token = getToken();
    if (!token) {
      toast.error("User token is missing. Please log in.");
      return;
    }
    // console.log('token', token)

    setLoading(true);
    setError("");
    try {
      const markUpUrl = "https://test.ffsdtravels.com/api/markup/create";
      const payload = {
        fee_name: "markup",
        // fee_percentage: markupPercentage,
        fee_percentage: parseFloat(markupPercentage),
      };

      const response = await fetch(markUpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // const data = await response.json();
        // console.log(data)
        toast.success("Markup applied successfully!");
        setModalOpen(false);
        toast("Applied Markup");
        setMarkupPercentage(markupPercentage);
      } else {
        throw new Error("Failed to apply markup");
      }
    } catch (error) {
      toast.error("Error applying markup. Please try again later.");
      console.error("Error applying markup:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    const fetchBookedFlights = async () => {
      try {
        const responses = await axios.get(
          "https://test.ffsdtravels.com/api/get/flights/booked",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        // console.log(responses.data.data)

        const flightsData = responses?.data?.data;

        // console.log('flightsData',flightsData);

        const formattedFlights = flightsData.map((flight: FlightDetails) => ({
          reference: flight.reference,
          pnr: flight.associated_records[0].pnr,
        }));


        // console.log('formattedFlights', formattedFlights)

        setFlights(formattedFlights);
      } catch (error) {
        const err = error as AxiosError<ErrorResponseData>;
        toast.error(err.response?.data?.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookedFlights();
  }, []);

  const columns = [
    { header: "Reference Number", accessor: "reference" },
    { header: "PNR NUMBER", accessor: "pnr" },
    // { header: "PNR NUMBER", accessor: "departure" },
    // { header: "Departure Time", accessor: "id" },
    // { header: "Arrival Time", accessor: "arrivalTime" },
    // { header: "Airline", accessor: "airline" },
    // { header: "Status", accessor: "status" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mt-5">
        <Button
          onClick={toggleModal}
          className="bg-primaryRed text-white w-52 rounded capitalize"
          aria-label="Mark Up"
        >
          Mark Up
        </Button>

        <Modal isOpen={modalOpen} onClose={toggleModal}>
          <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
            <h2 className="text-lg font-semibold mb-4">Enter The MarkUp Percentage</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="number"
                value={markupPercentage}
                onChange={(e) => setMarkupPercentage(e.target.value)}
                placeholder="Enter Markup Percentage"
                className="border border-gray-300 w-full sm:w-[500px] rounded-md p-2 focus:outline-none focus:border-primaryRed"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="bg-primaryRed text-white" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </Modal>
      </div>
      <div className="mt-7">
        <CustomTable
          data={flights}
          columns={columns}
          isLoading={isLoading}
          totalPages={1}
          currentPage={1}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
};

export default FlightData;






