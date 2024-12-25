import React from "react";
import WalletCard from "@/components/components/card/WalletCard";
// import TransactionTable from "@/components/components/table/TransactionTable";
// import jsonData from "@/data/data.json";

export type TransactionType =
  | "Account Top-Up"
  | "Transfer"
  | "Withdraw"
  | "Flight Booked";

export interface AccountTopUpDetails {
  method: string;
  referenceNumber: string;
}

export interface TransferDetails {
  recipient: string;
  recipientAccount: string;
  referenceNumber: string;
}

export interface WithdrawDetails {
  bank: string;
  accountNumber: string;
  referenceNumber: string;
}

export interface FlightBookedDetails {
  flightNumber: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
  passengerName: string;
  referenceNumber: string;
}

export interface GenericDetails {
  method?: string;
  referenceNumber: string;
  recipient?: string;
  recipientAccount?: string;
  bank?: string;
  accountNumber?: string;
  flightNumber?: string;
  departure?: string;
  arrival?: string;
  origin?: string;
  destination?: string;
  passengerName?: string;
}

export interface Transaction {
  transactionId: string;
  type: TransactionType;
  amount: number;
  status: string;
  date: string;
  details: {
    method?: string;
    referenceNumber: string;
    recipient?: string;
    recipientAccount?: string;
    bank?: string;
    accountNumber?: string;
    flightNumber?: string;
    departure?: string;
    arrival?: string;
    origin?: string;
    destination?: string;
    passengerName?: string;
  };
}

const Wallet: React.FC = () => {
  // const transactions: Transaction[] = jsonData.transactionData as Transaction[]; // Extract and cast transactionData

  return (
    <>
      <WalletCard />
      {/* <TransactionTable transactions={transactions} /> */}
    </>
  );
};

export default Wallet;
