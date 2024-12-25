import { X } from "lucide-react";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Modal from "@/components/components/modal/Modal";
import CustomTable from "@/components/components/table/CustomTable";

interface ErrorResponseData {
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

const ManagePermissions: React.FC = () => {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreatePermissions, setIsCreatePermissions] =
    useState<boolean>(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    const fetchPermissions = async (page: number) => {
      try {
        const response = await axios.get(
          `${BASE_URL}permissions/all?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
            },
          }
        );
        // console.log({ response });

        const { data, current_page, last_page } = response.data;

        const formattedData = data.map((item: any) => ({
          ...item,
          created_at: formatDate(item.created_at),
          updated_at: formatDate(item.updated_at),
        }));

        setPermissions(formattedData);
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

    fetchPermissions(currentPage);
  }, [currentPage]);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    // { header: "Guard Name", accessor: "guard_name" },
    // { header: "Created By", accessor: "created_by_user_id" },
    { header: "Created At", accessor: "created_at" },
    // { header: "Updated At", accessor: "updated_at" },
  ];

  return (
    <div className="flex flex-col ">
      <div className="flex gap-4 mt-5">
        <Button
          onClick={() => setIsCreatePermissions(true)}
          className="bg-primaryRed text-white w-52 rounded capitalize"
          aria-label="Create Permissions"
        >
          Create Permissions
        </Button>

        <Modal
          isOpen={isCreatePermissions}
          onClose={() => setIsCreatePermissions(false)}
        >
          <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4 pb-0 m-0">
            <div className="rounded-md flex items-center justify-between">
              <button
                onClick={() => setIsCreatePermissions(false)}
                aria-label="Close"
              >
                <X size={30} />
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <div className="mt-7">
        <CustomTable
          data={permissions}
          columns={columns}
          isLoading={isLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManagePermissions;
