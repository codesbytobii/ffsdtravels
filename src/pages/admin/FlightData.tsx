// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import Modal from "@/components/components/modal/Modal";
// import { Button } from "@/components/ui/button";
// import CustomTable from "@/components/components/table/CustomTable";

// interface FlightDetails {
//   reference: string;
//   flightNumber: string;
//   departure: string;
//   arrival: string;
//   departureTime: string;
//   arrivalTime: string;
//   airline: string;
//   status: string;
//   order_id: string;
//   itinerary: {
//     order_id: string;
//   }
//   associated_records?: {
//     pnr: string;
//     id: string;
//   }
// }

// interface ErrorResponseData {
//   message?: string;
// }

// const FlightData: React.FC = () => {
//   const [flights, setFlights] = useState<FlightDetails[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [markupPercentage, setMarkupPercentage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const toggleModal = async () => {
//     setModalOpen(!modalOpen);
//     if (!modalOpen) {
//       await fetchMarkupPercentage();
//     }
//   };

//   const validatePercentage = (value: string): boolean => {
//     const number = parseFloat(value);
//     return !isNaN(number) && number >= 0 && number <= 100;
//   };

//   const getToken = (): string | null => {
//     return localStorage.getItem("userToken");
//   };

//   const fetchMarkupPercentage = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     try {
//       const response = await axios.get("https://test.ffsdtravels.com/api/markup/show/15", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const fee_percentage = response.data.data.fee_percentage;
//       console.log('markupresponse', response.data.data.fee_percentage)
//       setMarkupPercentage(fee_percentage.toString());
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       toast.error(err.response?.data?.message || "Failed to fetch markup percentage.");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validatePercentage(markupPercentage)) {
//       setError("Please enter a valid markup percentage between 0 and 100.");
//       return;
//     }

//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const markUpUrl = "https://test.ffsdtravels.com/api/markup/update/15";
//       const payload = {
//         fee_name: "markup",
//         fee_percentage: parseFloat(markupPercentage),
//       };

//       const response = await fetch(markUpUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success("Markup applied successfully!");
//         setModalOpen(false);
//       } else {
//         throw new Error("Failed to apply markup");
//       }
//     } catch (error) {
//       toast.error("Error applying markup. Please try again later.");
//       console.error("Error applying markup:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = getToken();

//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     const fetchBookedFlights = async () => {
//       try {
//         const responses = await axios.get(
//           "https://test.ffsdtravels.com/api/get/flights/booked",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "application/json",
//             },
//           }
//         );

//         const flightsData = responses?.data?.data;

//         const formattedFlights = flightsData.map((flight: FlightDetails) => ({
//           reference: flight.reference,
//           pnr: flight.associated_records[0].pnr,
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
//     { header: "Reference Number", accessor: "reference" },
//     { header: "PNR NUMBER", accessor: "pnr" },
//   ];

//   return (
//     <div className="flex flex-col">
//       <div className="flex gap-4 mt-5">
//         <Button
//           onClick={toggleModal}
//           className="bg-primaryRed text-white w-52 rounded capitalize"
//           aria-label="Mark Up"
//         >
//           Mark Up
//         </Button>

//         <Modal isOpen={modalOpen} onClose={toggleModal}>
//           <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
//             <h2 className="text-lg font-semibold mb-4">Enter The MarkUp Percentage</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <input
//                 type="number"
//                 value={markupPercentage}
//                 onChange={(e) => setMarkupPercentage(e.target.value)}
//                 placeholder="Enter Markup Percentage"
//                 className="border border-gray-300 w-full sm:w-[500px] rounded-md p-2 focus:outline-none focus:border-primaryRed"
//               />
//               {error && <p className="text-red-500 text-sm">{error}</p>}
//               <Button type="submit" className="bg-primaryRed text-white" disabled={loading}>
//                 {loading ? "Submitting..." : "Submit"}
//               </Button>
//             </form>
//           </div>
//         </Modal>
//       </div>
//       <div className="mt-7">
//         <CustomTable
//           data={flights}
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
//   reference: string;
//   flightNumber: string;
//   departure: string;
//   arrival: string;
//   departureTime: string;
//   arrivalTime: string;
//   airline: string;
//   status: string;
//   order_id: string;
//   itinerary: {
//     order_id: string;
//   }
//   associated_records?: {
//     pnr: string;
//     id: string;
//   }
// }

// interface Markup {
//   id: number;
//   fee_name: string;
//   fee_percentage: number;
// }

// interface ErrorResponseData {
//   message?: string;
// }

// const FlightData: React.FC = () => {
//   const [flights, setFlights] = useState<FlightDetails[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [markups, setMarkups] = useState<Markup[]>([]);
//   const [loading, setLoading] = useState(false);

//   const toggleModal = () => setModalOpen(!modalOpen);

//   const getToken = (): string | null => {
//     return localStorage.getItem("userToken");
//   };

//   const fetchMarkups = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.get("https://test.ffsdtravels.com/api/markup/home", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       console.log("Markups Response:", response.data);

//       const markupsData = response.data?.data || [];
//       setMarkups(markupsData);
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       toast.error(err.response?.data?.message || "Failed to fetch markups.");
//       console.error("Error fetching markups:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMarkups();
//   }, []);

//   const columns = [
//     { header: "ID", accessor: "id" },
//     { header: "Fee Name", accessor: "fee_name" },
//     { header: "Fee Percentage", accessor: "fee_percentage" },
//   ];

//   return (
//     <div className="flex flex-col">
//       <div className="flex gap-4 mt-5">
//         <Button
//           onClick={toggleModal}
//           className="bg-primaryRed text-white w-52 rounded capitalize"
//           aria-label="View Markups"
//         >
//           View Markups
//         </Button>

//         <Modal isOpen={modalOpen} onClose={toggleModal}>
//           <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
//             <h2 className="text-lg font-semibold mb-4">Markup Details</h2>
//             <CustomTable
//               data={markups}
//               columns={columns}
//               isLoading={loading}
//               totalPages={1}
//               currentPage={1}
//               onPageChange={() => {}}
//             />
//           </div>
//         </Modal>
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
//   reference: string;
//   flightNumber: string;
//   departure: string;
//   arrival: string;
//   departureTime: string;
//   arrivalTime: string;
//   airline: string;
//   status: string;
//   order_id: string;
//   itinerary: {
//     order_id: string;
//   }
//   associated_records?: {
//     pnr: string;
//     id: string;
//   }
// }

// interface Markup {
//   id: number;
//   fee_name: string;
//   fee_percentage: number;
// }

// interface ErrorResponseData {
//   message?: string;
// }

// const FlightData: React.FC = () => {
//   const [flights, setFlights] = useState<FlightDetails[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [markups, setMarkups] = useState<Markup[]>([]);
//   const [loading, setLoading] = useState(false);

//   const toggleModal = () => setModalOpen(!modalOpen);

//   const getToken = (): string | null => {
//     return localStorage.getItem("userToken");
//   };

//   const fetchMarkups = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.get("https://test.ffsdtravels.com/api/markup/home", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       console.log("Markups Response:", response.data);

//       const markupsData = response.data?.data || [];
//       setMarkups(markupsData);
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       toast.error(err.response?.data?.message || "Failed to fetch markups.");
//       console.error("Error fetching markups:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (id: number) => {
//     // Logic to handle edit action
//     toast.info(`Edit functionality for ID: ${id}`);
//     // You can add logic to open an edit modal or navigate to an edit page
//   };

//   const handleDelete = async (id: number) => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     try {
//       const response = await axios.delete(`https://test.ffsdtravels.com/api/markup/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         toast.success("Markup deleted successfully.");
//         setMarkups((prev) => prev.filter((markup) => markup.id !== id));
//       }
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       toast.error(err.response?.data?.message || "Failed to delete markup.");
//       console.error("Error deleting markup:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMarkups();
//   }, []);

//   const columns = [
//     { header: "ID", accessor: "id" },
//     { header: "Fee Name", accessor: "fee_name" },
//     { header: "Fee Percentage", accessor: "fee_percentage" },
//     {
//       header: "Actions",
//       accessor: "actions", // Optional, not used for rendering
//       Cell: ({ row: { original } }: { row: { original: Markup } }) => (
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleEdit(original.id)}
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(original.id)}
//             className="bg-red-500 text-white px-3 py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];
  

//   return (
//     <div className="flex flex-col">
//       <div className="flex gap-4 mt-5">
//         <Button
//           onClick={toggleModal}
//           className="bg-primaryRed text-white w-52 rounded capitalize"
//           aria-label="View Markups"
//         >
//           View Markups
//         </Button>

//         <Modal isOpen={modalOpen} onClose={toggleModal}>
//           <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
//             <h2 className="text-lg font-semibold mb-4">Markup Details</h2>
//             <CustomTable
//               data={markups}
//               columns={columns}
//               isLoading={loading}
//               totalPages={1}
//               currentPage={1}
//               onPageChange={() => {}}
//             />
//           </div>
//         </Modal>
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

// interface Markup {
//   id: number;
//   fee_name: string;
//   fee_percentage: number;
// }

// interface ErrorResponseData {
//   message?: string;
// }

// const FlightData: React.FC = () => {
//   const [markups, setMarkups] = useState<Markup[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingRowId, setEditingRowId] = useState<number | null>(null);
//   const [updatedPercentage, setUpdatedPercentage] = useState<number | null>(null);

//   const toggleModal = () => setModalOpen(!modalOpen);

//   const getToken = (): string | null => {
//     return localStorage.getItem("userToken");
//   };

//   const fetchMarkups = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.get("https://test.ffsdtravels.com/api/markup/home", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const markupsData = response.data?.data || [];
//       setMarkups(markupsData);
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       toast.error(err.response?.data?.message || "Failed to fetch markups.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (id: number, currentPercentage: number) => {
//     setEditingRowId(id);
//     setUpdatedPercentage(currentPercentage);
//   };

//   const handleSave = async (id: number) => {
//     if (updatedPercentage === null) return;

//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     try {
//       await axios.put(
//         `https://test.ffsdtravels.com/api/markup/${id}`,
//         { fee_percentage: updatedPercentage },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );
//       toast.success("Fee percentage updated successfully!");
//       setMarkups((prevMarkups) =>
//         prevMarkups.map((markup) =>
//           markup.id === id ? { ...markup, fee_percentage: updatedPercentage } : markup
//         )
//       );
//     } catch (error) {
//       toast.error("Failed to update fee percentage.");
//     } finally {
//       setEditingRowId(null);
//     }
//   };

//   const handleCancel = () => {
//     setEditingRowId(null);
//   };

//   const handleDelete = async (id: number) => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     try {
//       await axios.delete(`https://test.ffsdtravels.com/api/markup/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       toast.success("Markup deleted successfully!");
//       setMarkups((prevMarkups) => prevMarkups.filter((markup) => markup.id !== id));
//     } catch (error) {
//       toast.error("Failed to delete markup.");
//     }
//   };

//   useEffect(() => {
//     fetchMarkups();
//   }, []);

//   const columns = [
//     { header: "ID", accessor: "id" },
//     { header: "Fee Name", accessor: "fee_name" },
//     {
//       header: "Fee Percentage",
//       accessor: "fee_percentage",
//       Cell: ({ row: { original } }: { row: { original: Markup } }) => (
//         editingRowId === original.id ? (
//           <input
//             type="number"
//             value={updatedPercentage ?? ""}
//             onChange={(e) => setUpdatedPercentage(Number(e.target.value))}
//             className="border border-gray-300 rounded px-2 py-1"
//           />
//         ) : (
//           <span>{original.fee_percentage}%</span>
//         )
//       ),
//     },
//     {
//       header: "Actions",
//       accessor: "actions",
//       Cell: ({ row: { original } }: { row: { original: Markup } }) => (
//         <div className="flex gap-2">
//           {editingRowId === original.id ? (
//             <>
//               <button
//                 onClick={() => handleSave(original.id)}
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-500 text-white px-3 py-1 rounded"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => handleEdit(original.id, original.fee_percentage)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(original.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="flex flex-col">
//       <div className="flex gap-4 mt-5">
//         <Button
//           onClick={toggleModal}
//           className="bg-primaryRed text-white w-52 rounded capitalize"
//           aria-label="View Markups"
//         >
//           View Markups
//         </Button>

//         <Modal isOpen={modalOpen} onClose={toggleModal}>
//           <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
//             <h2 className="text-lg font-semibold mb-4">Markup Details</h2>
//             <CustomTable
//               data={markups}
//               columns={columns}
//               isLoading={loading}
//               totalPages={1}
//               currentPage={1}
//               onPageChange={() => {}}
//             />
//           </div>
//         </Modal>
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

// interface Markup {
//   id: number;
//   fee_name: string;
//   fee_percentage: number;
// }

// interface Flight {
//   id: number;
//   reference: string;
//   associated_records?: {
//     pnr: string;
//     id: string;
//   }[];
//   Itinerary?: {
//     segments: {
//       departure: {
//         at: string;
//       };
//     }[];
//   }[];
//   airline: string;
//   status: string;
// }

// interface ErrorResponseData {
//   message?: string;
// }

// const FlightData: React.FC = () => {
//   const [markups, setMarkups] = useState<Markup[]>([]);
//   const [flights, setFlights] = useState<Flight[]>([]);
//   const [loadingMarkups, setLoadingMarkups] = useState(false);
//   const [loadingFlights, setLoadingFlights] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [newMarkup, setNewMarkup] = useState({ fee_name: "", fee_percentage: 0 });

//   const toggleModal = () => setModalOpen(!modalOpen);
//   const toggleAddModal = () => setAddModalOpen(!addModalOpen);

//   const getToken = (): string | null => {
//     return localStorage.getItem("userToken");
//   };

//   const fetchMarkups = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     setLoadingMarkups(true);

//     try {
//       const response = await axios.get("https://test.ffsdtravels.com/api/markup/home", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const markupsData = response.data?.data || [];
//       setMarkups(markupsData);
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       toast.error(err.response?.data?.message || "Failed to fetch markups.");
//     } finally {
//       setLoadingMarkups(false);
//     }
//   };

//   const fetchFlights = async () => {
//     const token = getToken();
//     if (!token) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     setLoadingFlights(true);

//     try {
//       const response = await axios.get("https://test.ffsdtravels.com/api/get/flights/booked", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const flightsData = response.data?.data || [];
//       setFlights(flightsData);
//     } catch (error) {
//       const err = error as AxiosError<ErrorResponseData>;
//       toast.error(err.response?.data?.message || "Failed to fetch flights.");
//     } finally {
//       setLoadingFlights(false);
//     }
//   };

//   useEffect(() => {
//     fetchMarkups();
//     fetchFlights();
//   }, []);

//   const markupColumns = [
//     { header: "ID", accessor: "id" },
//     { header: "Fee Name", accessor: "fee_name" },
//     { header: "Fee Percentage", accessor: "fee_percentage" },
//   ];

//   const flightColumns = [
//     { header: "Reference", accessor: "reference" },
//     {
//       header: "PNR",
//       accessor: "associated_records",
//       Cell: ({ row }: { row: { original: Flight } }) => {
//         const associatedRecords = row.original.associated_records;
//         return associatedRecords && associatedRecords[0]?.pnr
//           ? associatedRecords[0].pnr
//           : "N/A";
//       },
//     },
//     {
//       header: "Departure Time",
//       accessor: "Itinerary",
//       Cell: ({ row }: { row: { original: Flight } }) => {
//         const itinerary = row.original.Itinerary;
//         return itinerary && itinerary[0]?.segments[0]?.departure.at
//           ? new Date(itinerary[0].segments[0].departure.at).toLocaleString()
//           : "N/A";
//       },
//     },
//     { header: "Airline", accessor: "airline" },
//     { header: "Status", accessor: "status" },
//   ];

//   return (
//     <div className="flex flex-col">
//       {/* Markups Section */}
//       <div className="flex gap-4 mt-5">
//         <Button
//           onClick={toggleModal}
//           className="bg-primaryRed text-white w-52 rounded capitalize"
//           aria-label="View Markups"
//         >
//           View Markups
//         </Button>

//         <Modal isOpen={modalOpen} onClose={toggleModal}>
//           <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
//             <h2 className="text-lg font-semibold mb-4">Markup Details</h2>
//             <CustomTable
//               data={markups}
//               columns={markupColumns}
//               isLoading={loadingMarkups}
//               totalPages={1}
//               currentPage={1}
//               onPageChange={() => {}}
//             />
//             <div className="mt-4">
//               <Button
//                 onClick={toggleAddModal}
//                 className="bg-green-600 text-white w-36 rounded capitalize"
//                 aria-label="Add Markup"
//               >
//                 Add Markup
//               </Button>
//             </div>
//           </div>
//         </Modal>
//       </div>

//       {/* Flights Section */}
//       <div className="mt-10">
//         <h2 className="text-lg font-semibold mb-4">Booked Flights</h2>
//         <CustomTable
//           data={flights}
//           columns={flightColumns}
//           isLoading={loadingFlights}
//           totalPages={1}
//           currentPage={1}
//           onPageChange={() => {}}
//         />
//       </div>
//     </div>
//   );
// };

// export default FlightData;










import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
// import Modal from "@/components/components/modal/Modal";
// import { Button } from "@/components/ui/button";
import CustomTable from "@/components/components/table/CustomTable";

// interface Markup {
//   id: number;
//   fee_name: string;
//   fee_percentage: number;
// }

interface Flight {
  id: number;
  reference: string;
  flightNumber: string;
  associated_records?: {
    pnr: string;
    id: string;
  };
  Itinerary?: [
    {
      id: any;
      segments: [
        {
          departure: {
            at: any;
          };
        }
      ];
    }
  ];
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  status: string;
}

interface ErrorResponseData {
  message?: string;
}

const FlightData: React.FC = () => {
  // const [markups, setMarkups] = useState<Markup[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  // const [loadingMarkups, setLoadingMarkups] = useState(false);
  const [loadingFlights, setLoadingFlights] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // const toggleModal = () => setModalOpen(!modalOpen);

  const getToken = (): string | null => {
    return localStorage.getItem("userToken");
  };

  // const fetchMarkups = async () => {
  //   const token = getToken();
  //   if (!token) {
  //     toast.error("User token is missing. Please log in.");
  //     return;
  //   }

  //   // setLoadingMarkups(true);

  //   try {
  //     const response = await axios.get("https://test.ffsdtravels.com/api/markup/home", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //       },
  //     });

  //     const markupsData = response.data?.data || [];
  //     setMarkups(markupsData);
  //   } catch (error) {
  //     const err = error as AxiosError<ErrorResponseData>;
  //     toast.error(err.response?.data?.message || "Failed to fetch markups.");
  //   } finally {
  //     setLoadingMarkups(false);
  //   }
  // };

  const fetchFlights = async () => {
    const token = getToken();
    if (!token) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    setLoadingFlights(true);

    try {
      const response = await axios.get("https://test.ffsdtravels.com/api/get/flights/booked", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const flightsData = response.data?.data || [];
      setFlights(flightsData);
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      toast.error(err.response?.data?.message || "Failed to fetch flights.");
    } finally {
      setLoadingFlights(false);
    }
  };

  useEffect(() => {
    // fetchMarkups();
    fetchFlights();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedFlights = flights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(flights.length / itemsPerPage);

  // const markupColumns = [
  //   { header: "ID", accessor: "id" },
  //   { header: "Fee Name", accessor: "fee_name" },
  //   { header: "Fee Percentage", accessor: "fee_percentage" },
  // ];

  const flightColumns = [
    { header: "Reference", accessor: "reference" },
    {
      header: "PNR",
      accessor: "associated_records",
      Cell: ({ row }: { row: { original: Flight } }) => {
        const associatedRecords = row.original.associated_records;
        return associatedRecords && associatedRecords[0]?.pnr
          ? associatedRecords[0].pnr
          : "N/A";
      },
    },
  ];

  return (
    <div className="flex flex-col">
      {/* <div className="flex gap-4 mt-5">
        <Button
          onClick={toggleModal}
          className="bg-primaryRed text-white w-52 rounded capitalize"
          aria-label="View Markups"
        >
          View Markups
        </Button>

        <Modal isOpen={modalOpen} onClose={toggleModal}>
          <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
            <h2 className="text-lg font-semibold mb-4">Markup Details</h2>
            <CustomTable
              data={markups}
              columns={markupColumns}
              isLoading={loadingMarkups}
              totalPages={1}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
        </Modal>
      </div> */}

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Booked Flights</h2>
        <CustomTable
          data={paginatedFlights}
          columns={flightColumns}
          isLoading={loadingFlights}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FlightData;



