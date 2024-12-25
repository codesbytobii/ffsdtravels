import Details from "@/assets/svg/Details";
import React, { useState } from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Define transaction types and interfaces
type TransactionType =
  | "Account Top-Up"
  | "Transfer"
  | "Withdraw"
  | "Flight Booked";

interface Transaction {
  transactionId: string;
  type: TransactionType;
  amount: number;
  status: string;
  date: string;
  details:
    | AccountTopUpDetails
    | TransferDetails
    | WithdrawDetails
    | FlightBookedDetails;
}

interface AccountTopUpDetails {
  method: string;
  referenceNumber: string;
}

interface TransferDetails {
  recipient: string;
  recipientAccount: string;
  referenceNumber: string;
}

interface WithdrawDetails {
  bank: string;
  accountNumber: string;
  referenceNumber: string;
}

interface FlightBookedDetails {
  flightNumber: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
  passengerName: string;
  referenceNumber: string;
}

// Type guard functions
function isAccountTopUpDetails(
  details:
    | AccountTopUpDetails
    | TransferDetails
    | WithdrawDetails
    | FlightBookedDetails
): details is AccountTopUpDetails {
  return (details as AccountTopUpDetails).method !== undefined;
}

function isTransferDetails(
  details:
    | AccountTopUpDetails
    | TransferDetails
    | WithdrawDetails
    | FlightBookedDetails
): details is TransferDetails {
  return (details as TransferDetails).recipient !== undefined;
}

function isWithdrawDetails(
  details:
    | AccountTopUpDetails
    | TransferDetails
    | WithdrawDetails
    | FlightBookedDetails
): details is WithdrawDetails {
  return (details as WithdrawDetails).bank !== undefined;
}

function isFlightBookedDetails(
  details:
    | AccountTopUpDetails
    | TransferDetails
    | WithdrawDetails
    | FlightBookedDetails
): details is FlightBookedDetails {
  return (details as FlightBookedDetails).flightNumber !== undefined;
}

// TransactionDetails component
interface TransactionDetailsProps {
  type: TransactionType;
  details:
    | AccountTopUpDetails
    | TransferDetails
    | WithdrawDetails
    | FlightBookedDetails;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  type,
  details,
}) => {
  if (type === "Account Top-Up" && isAccountTopUpDetails(details)) {
    return (
      <div>
        <strong>Method:</strong> {details.method}
        <br />
        <strong>Reference:</strong> {details.referenceNumber}
      </div>
    );
  }

  if (type === "Transfer" && isTransferDetails(details)) {
    return (
      <div>
        <strong>Recipient:</strong> {details.recipient}
        <br />
        <strong>Account:</strong> {details.recipientAccount}
        <br />
        <strong>Reference:</strong> {details.referenceNumber}
      </div>
    );
  }

  if (type === "Withdraw" && isWithdrawDetails(details)) {
    return (
      <div>
        <strong>Bank:</strong> {details.bank}
        <br />
        <strong>Account:</strong> {details.accountNumber}
        <br />
        <strong>Reference:</strong> {details.referenceNumber}
      </div>
    );
  }

  if (type === "Flight Booked" && isFlightBookedDetails(details)) {
    return (
      <div>
        <strong>Flight:</strong> {details.flightNumber}
        <br />
        <strong>Departure:</strong> {formatDate(details.departure)}
        <br />
        <strong>Arrival:</strong> {formatDate(details.arrival)}
        <br />
        <strong>Origin:</strong> {details.origin}
        <br />
        <strong>Destination:</strong> {details.destination}
        <br />
        <strong>Passenger:</strong> {details.passengerName}
        <br />
        <strong>Reference:</strong> {details.referenceNumber}
      </div>
    );
  }

  return null;
};

// Define props for the TransactionTable component
interface TransactionTableProps {
  transactions: Transaction[];
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-tl-lg max-w-lg w-full h-full right-0 absolute">
        <h2 className="text-lg font-semibold mb-4">
          Transaction Details for {transaction.transactionId}
        </h2>
        <div>
          <strong>Type:</strong> {transaction.type}
        </div>
        <div>
          <strong>Amount:</strong> ₦ {transaction.amount.toLocaleString()}
        </div>
        <div>
          <strong>Status:</strong> {transaction.status}
        </div>
        <div>
          <strong>Date:</strong> {formatDate(transaction.date)}
        </div>
        <div className="mt-4">
          <TransactionDetails
            type={transaction.type}
            details={transaction.details}
          />
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-primaryRed text-white px-4 py-3 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// TransactionTable component
const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primaryRed text-white">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest"
            >
              Transaction ID
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest"
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.transactionId || index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="px-4 text-xs tracking-widest">{transaction.transactionId}</td>
              <td className="px-4 text-xs tracking-widest">{transaction.type}</td>
              <td className="px-4 text-xs tracking-widest">
                ₦ {formatAmount(transaction.amount)}
              </td>
              <td
                className={`px-4 text-xs font-semibold tracking-widest ${
                  transaction.status === "Success"
                    ? "text-green-500"
                    : transaction.status === "Failed"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {transaction.status}
              </td>
              <td className="px-6 text-xs tracking-widest">{formatDate(transaction.date)}</td>
              <td className="px-6 text-xs tracking-widest">
                <button onClick={() => openModal(transaction)}>
                  <Details size="30" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default TransactionTable;
