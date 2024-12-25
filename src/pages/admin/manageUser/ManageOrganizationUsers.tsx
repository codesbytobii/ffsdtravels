// import { useEffect, useState } from "react";
// import Modal from "@/components/components/modal/Modal";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import axios, { AxiosError } from "axios";
// import { BASE_URL } from "@/config/api";
// import { toast } from "react-toastify";
// import CustomTable from "@/components/components/table/CustomTable";
// import { FaEdit } from "react-icons/fa";
// import CreateStaffForm from "./CreateStaffUserForm";

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
//   organization_id: string; // Added organization_id to match user data
//   edit?: string;
// }

// interface ErrorResponseData {
//   message?: string;
//   errors?: {
//     [key: string]: string[];
//   };
// }

// const ManageOrganizationUsers: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
//   const [editingUser, setEditingUser] = useState<User | null>(null);

//   // Function to format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
//   };

//   useEffect(() => {
//     // Retrieve user token and organization ID from localStorage
//     const userToken = localStorage.getItem("userToken");
//     const orgId = localStorage.getItem("organizationId");

//     if (!userToken) {
//       toast.error("User token is missing. Please log in.");
//       return;
//     }

//     if (!orgId) {
//       toast.error("Organization ID is missing.");
//       return;
//     }

//     const fetchUsers = async (page: number) => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}users/all?page=${page}`,
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//               Accept: "application/json",
//             },
//           }
//         );

//         const { data, current_page, last_page } = response?.data?.users;

//         // Log the API response for debugging purposes
//         console.log("Fetched users: ", data);

//         // Filter users based on matching organization ID from localStorage
//         const filteredData = data.filter(
//           (item: User) => item.organization_id === orgId
//         );

//         // Format and map the data
//         const formattedData = filteredData.map((item: User) => ({
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

//     // Fetch users once the organization ID is set
//     fetchUsers(currentPage);
//   }, [currentPage]);

//   const handleEdit = (user: User) => {
//     setEditingUser(user);
//     setIsCreateFormOpen(true);
//   };

//   const handleUpdateUser = (updatedUser: User) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//     );
//     setEditingUser(null);
//     setIsCreateFormOpen(false);
//     toast.success("User updated successfully.");
//   };

//   const handleCancelEdit = () => {
//     setEditingUser(null);
//     setIsCreateFormOpen(false);
//   };

//   const columns = [
//     { header: "Name", accessor: "name" },
//     { header: "User Type", accessor: "user_type" },
//     { header: "Phone Number", accessor: "phone" },
//     { header: "Email Address", accessor: "email" },
//     { header: "Created At", accessor: "created_at" },
//     { header: "Updated At", accessor: "updated_at" },
//     {
//       header: "Edit",
//       accessor: "edit",
//       Cell: ({ row }: { row: { original: User } }) => (
//         <button onClick={() => handleEdit(row.original)}>
//           <FaEdit className="text-blue-500 hover:text-blue-700" />
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div className="flex flex-col">
//       <div className="flex gap-4 mt-5">
//         <Button
//           onClick={() => setIsCreateFormOpen(true)}
//           className="bg-primaryRed text-white w-52 rounded capitalize"
//           aria-label="Create Staff"
//         >
//           Create Staff
//         </Button>

//         {/* Modal for Create and Edit User */}
//         <Modal isOpen={isCreateFormOpen} onClose={handleCancelEdit}>
//           <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4 pb-0 m-0">
//             <div className="rounded-md flex items-center justify-between">
//               <div className="flex flex-col items-start">
//                 <h1 className="text-gray-700 font-bold">
//                   {editingUser ? "Edit User" : "Create User"}
//                 </h1>
//                 <p className="text-gray-600 font-bold">
//                   {editingUser ? "Edit user details." : "Create a Staff."}
//                 </p>
//               </div>
//               <button onClick={handleCancelEdit} aria-label="Close">
//                 <X size={30} />
//               </button>
//             </div>
//             <div className="mt-6">
//               <CreateStaffForm
//                 user={editingUser}
//                 onSubmit={handleUpdateUser}
//               />
//             </div>
//           </div>
//         </Modal>
//       </div>

//       {/* Custom Table */}
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

// export default ManageOrganizationUsers;


import { useEffect, useState } from "react";
// import CreateUserForm from "./CreateUserForm";
import Modal from "@/components/components/modal/Modal";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config/api";
import { toast } from "react-toastify";
import CustomTable from "@/components/components/table/CustomTable";
import { FaEdit } from "react-icons/fa";
import CreateStaffForm from "./CreateStaffUserForm";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  companyName: string;
  companyCountry: string;
  user_type: string;
  paymentType: string;
  created_at: string;
  updated_at: string;
  user_company_id: string; // Ensure this matches your API response
  edit?: string;
}

interface ErrorResponseData {
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

const ManageOrganizationUsers : React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const organizationId = localStorage.getItem("organizationId");

    if (!userToken) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    const fetchUsers = async (page: number) => {
      try {
        const response = await axios.get(`${BASE_URL}users/all?page=${page}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
          },
        });

        const { data, current_page, last_page } = response?.data?.users;

        const formattedData = data
          .filter((item: User) => item.user_company_id === organizationId) // Filter based on organizationId
          .map((item: User) => ({
            ...item,
            name: `${item.lastName} ${item.firstName}`,
            created_at: formatDate(item.created_at),
            updated_at: formatDate(item.updated_at),
          }));

        setUsers(formattedData);
        setCurrentPage(current_page);
        setTotalPages(last_page);
        setIsLoading(false);
      } catch (error) {
        const err = error as AxiosError<ErrorResponseData>;
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers(currentPage);
  }, [currentPage]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsCreateFormOpen(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
    setIsCreateFormOpen(false);
    toast.success("User updated successfully.");
    
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsCreateFormOpen(false);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "User Type", accessor: "user_type" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Email Address", accessor: "email" },
    { header: "Created At", accessor: "created_at" },
    { header: "Updated At", accessor: "updated_at" },
    {
      header: "Edit",
      accessor: "edit",
      Cell: ({ row }: { row: { original: User } }) => (
        <button onClick={() => handleEdit(row.original)}>
          <FaEdit className="text-blue-500 hover:text-blue-700" />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mt-5">
        <Button
          onClick={() => setIsCreateFormOpen(true)}
          className="bg-primaryRed text-white w-52 rounded capitalize"
          aria-label="Create User"
        >
          Create User
        </Button>

        {/* Modal for Create and Edit User */}
        <Modal
          isOpen={isCreateFormOpen}
          onClose={handleCancelEdit}
        >
          <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4 pb-0 m-0">
            <div className="rounded-md flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h1 className="text-gray-700 font-bold">
                  {editingUser ? "Edit User" : "Create User"}
                </h1>
                <p className="text-gray-600 font-bold">
                  {editingUser
                    ? "Edit user details."
                    : "Create an Admin and Organization user."}
                </p>
              </div>
              <button onClick={handleCancelEdit} aria-label="Close">
                <X size={30} />
              </button>
            </div>
            <div className="mt-6">
              {/* <CreateUserForm user={editingUser} onSubmit={handleUpdateUser} /> */}
              <CreateStaffForm user={editingUser} onSubmit={handleUpdateUser} />
            </div>
          </div>
        </Modal>
      </div>
      <div className="mt-7">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p>Loading...</p> {/* Replace with your spinner component */}
          </div>
        ) : (
          <CustomTable
              data={users}
              columns={columns}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage} isLoading={false}          />
        )}
      </div>
    </div>
  );
};

export default ManageOrganizationUsers ;




