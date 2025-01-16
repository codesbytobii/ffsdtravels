import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Modal from "@/components/components/modal/Modal";
import { Button } from "@/components/ui/button";
import CustomTable from "@/components/components/table/CustomTable";

interface Markup {
  id: number;
  fee_name: string;
  fee_percentage: number;
}

interface ErrorResponseData {
  message?: string;
}

const FlightData: React.FC = () => {
  const [markups, setMarkups] = useState<Markup[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [updatedPercentage, setUpdatedPercentage] = useState<number | null>(null);
  const [newFeeName, setNewFeeName] = useState<string>("");
  const [newFeePercentage, setNewFeePercentage] = useState<number | null>(null);

  const toggleModal = () => setModalOpen(!modalOpen);

  const getToken = (): string | null => {
    return localStorage.getItem("userToken");
  };

  const fetchMarkups = async () => {
    const token = getToken();
    if (!token) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get("https://test.ffsdtravels.com/api/markup/home", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const markupsData = response.data?.data || [];
      setMarkups(markupsData);
    } catch (error) {
      const err = error as AxiosError<ErrorResponseData>;
      toast.error(err.response?.data?.message || "Failed to fetch markups.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number, currentPercentage: number) => {
    setEditingRowId(id);
    setUpdatedPercentage(currentPercentage);
  };

  const handleSave = async (id: number) => {
    if (updatedPercentage === null) return;
    const token = getToken();
    if (!token) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    try {
      await axios.post(
        `https://test.ffsdtravels.com/api/markup/update/${id}`,
        { fee_percentage: updatedPercentage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      toast.success("Fee percentage updated successfully!");
      setMarkups((prevMarkups) =>
        prevMarkups.map((markup) =>
          markup.id === id ? { ...markup, fee_percentage: updatedPercentage } : markup
        )
      );
    } catch (error) {
      toast.error("Failed to update fee percentage.");
    } finally {
      setEditingRowId(null);
    }
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  const handleDelete = async (id: number) => {
    const token = getToken();
    if (!token) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    try {
      await axios.delete(`https://test.ffsdtravels.com/api/markup/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      toast.success("Markup deleted successfully!");
      setMarkups((prevMarkups) => prevMarkups.filter((markup) => markup.id !== id));
    } catch (error) {
      toast.error("Failed to delete markup.");
    }
  };

  const handleCreateMarkup = async () => {
    const token = getToken();
    if (!token) {
      toast.error("User token is missing. Please log in.");
      return;
    }

    if (!newFeeName || newFeePercentage === null) {
      toast.error("Please provide valid markup details.");
      return;
    }

    try {
      const response = await axios.post(
        "https://test.ffsdtravels.com/api/markup/create",
        {
          fee_name: newFeeName,
          fee_percentage: newFeePercentage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Markup created successfully!");
      setMarkups((prevMarkups) => [
        ...prevMarkups,
        response.data?.data,
      ]);
      setNewFeeName("");
      setNewFeePercentage(null);
    } catch (error) {
      toast.error("Failed to create markup.");
    }
  };

  useEffect(() => {
    fetchMarkups();
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Fee Name", accessor: "fee_name" },
    {
      header: "Fee Percentage",
      accessor: "fee_percentage",
      Cell: ({ row: { original } }: { row: { original: Markup } }) => (
        editingRowId === original.id ? (
          <input
            type="number"
            value={updatedPercentage ?? ""}
            onChange={(e) => setUpdatedPercentage(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <span>{original.fee_percentage}%</span>
        )
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      Cell: ({ row: { original } }: { row: { original: Markup } }) => (
        <div className="flex gap-2">
          {editingRowId === original.id ? (
            <>
              <button onClick={() => handleSave(original.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                Save
              </button>
              <button onClick={handleCancel} className="bg-gray-500 text-white px-3 py-1 rounded">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleEdit(original.id, original.fee_percentage)} className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(original.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mt-5">
        <Button
          onClick={toggleModal}
          className="bg-primaryRed text-white w-52 rounded capitalize"
          aria-label="View Markups"
        >
          View Markups
        </Button>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 text-white w-52 rounded capitalize"
          aria-label="Create Markup"
        >
          Create Markup
        </Button>
        <Modal isOpen={modalOpen} onClose={toggleModal}>
          <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
            <h2 className="text-lg font-semibold mb-4">Markup Details</h2>
            <CustomTable data={markups} columns={columns} isLoading={loading} totalPages={1} currentPage={1} onPageChange={() => {}} />
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Create New Markup</h3>
              <input
                type="text"
                placeholder="Fee Name"
                value={newFeeName}
                onChange={(e) => setNewFeeName(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Fee Percentage"
                value={newFeePercentage ?? ""}
                onChange={(e) => setNewFeePercentage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
              />
              <button
                onClick={handleCreateMarkup}
                className="bg-primaryRed text-white w-full rounded py-2"
              >
                Create Markup
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FlightData;
