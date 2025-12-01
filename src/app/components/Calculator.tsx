"use client";

import { useState } from "react";

interface CalculatorProps {
  fwogSupply: number;
}
export default function Calculator({ fwogSupply }: CalculatorProps) {
  const [marketCap, setMarketCap] = useState<number>(0);
  const [amount, setAmount] = useState<number>(1);
  const [fwogPrice, setFwogPrice] = useState<number | null>(null);

  const handleCalculate = () => {
    const price = (amount / fwogSupply) * marketCap;
    setFwogPrice(price);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4"> Its just a FWOCULATOR</h2>

      <div className="mb-4">
        <label className="block mb-1">Amount of Fwog NFTs:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Estimated Market Cap (ETH):</label>
        <input
          type="number"
          value={marketCap}
          onChange={(e) => setMarketCap(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Calculate
      </button>

      {fwogPrice !== null && (
        <div className="mt-4 text-lg font-semibold">
          Price/FWOG: {fwogPrice.toFixed(2)} $
        </div>
      )}
    </div>
  );
}
