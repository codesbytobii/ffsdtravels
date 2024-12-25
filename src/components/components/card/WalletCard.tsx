import React, { useState, useEffect } from "react";
import TopUpIcon from "@/assets/svg/TopUpIcon";
import TransferIcon from "@/assets/svg/TransferIcon";
import WithdrawIcon from "@/assets/svg/WithdrawIcon";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const WalletCard: React.FC = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch balance from API
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("userToken"); // Ensure this is how you store and retrieve the token
        if (!token) {
          throw new Error("User is not authenticated. Token is missing.");
        }

        const response = await fetch(
          "https://test.ffsdtravels.com/api/corporate/wallet",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error: ${response.status} - ${errorDetails}`);
        }

        const data = await response.json();
        // console.log("API Response Data:", data); // Log response data for debugging

        // Safely check and set the balance if it exists
        if (data && data.data && typeof data.data.balance !== "undefined") {
          const balanceValue = parseFloat(data.data.balance); // Convert balance to a number
          if (isNaN(balanceValue)) {
            throw new Error("Balance value is not a valid number.");
          }
          setBalance(balanceValue);
        } else {
          throw new Error("Balance field is missing or undefined in the response");
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch balance error:", err); // Log the full error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prevState) => !prevState);
  };

  return (
    <div className="border-2 flex flex-col border-gray-400 shadow-lg px-4 py-2 rounded-lg w-[400px]">
      <div className="flex flex-col">
        <p className="uppercase font-medium text-sm text-gray-800">
          Current Balance
        </p>
        <div className="flex gap-6 pl-4 mt-2 items-center text-gray-500 justify-between">
          {loading ? (
            <h1 className="uppercase italic font-semibold ">Loading...</h1>
          ) : error ? (
            <h1 className="uppercase italic font-semibold text-red-500">
              Error: {error}
            </h1>
          ) : (
            <h1 className="uppercase italic font-semibold ">
              ₦ {isBalanceVisible && balance !== null ? balance.toFixed(2) : "••••••••"}
            </h1>
          )}
          <button
            onClick={toggleBalanceVisibility}
            aria-label="Toggle balance visibility"
            className="focus:outline-none text-primaryRed"
          >
            {isBalanceVisible ? <BsEye size={35} /> : <BsEyeSlash size={35} />}
          </button>
        </div>
      </div>

      <div className="flex gap-10 mt-6 justify-center">
        <IconButton
          ariaLabel="Transfer"
          icon={<TransferIcon size="30" stroke="#FFFFFF" />}
          tooltip="Transfer"
        />
        <IconButton
          ariaLabel="Withdraw"
          icon={<WithdrawIcon size="30" stroke="#FFFFFF" />}
          tooltip="Withdraw"
        />
        <IconButton
          ariaLabel="Top Up"
          icon={<TopUpIcon size="30" />}
          tooltip="Top Up"
        />
      </div>
    </div>
  );
};

interface IconButtonProps {
  ariaLabel: string;
  icon: React.ReactNode;
  tooltip: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  icon,
  tooltip,
}) => (
  <div className="relative group flex flex-col gap-1 items-center">
    <button
      aria-label={ariaLabel}
      className="flex rounded-full h-[45px] w-[45px] bg-primaryRed items-center justify-center hover:scale-105 duration-300 shadow-md shadow-gray-300"
    >
      {icon}
    </button>
    <span className="font-medium text-sm tracking-wider">{tooltip}</span>
  </div>
);

export default WalletCard;
