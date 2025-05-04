"use client";

import { useState } from "react";
import CurrencyInfo from "@/static/hooks/useCurrencyInfo";
import InputBox from "./inputBox";

const CurrencyApp = () => {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencyInfo: Record<string, number> = CurrencyInfo(from) ?? {};
  const currencyInfoKeys: string[] = Object.keys(currencyInfo);

  const swap = () => {
    const newFrom = to;
    const newTo = from;
    setFrom(newFrom);
    setTo(newTo);
    const newCurrencyInfo = CurrencyInfo(newFrom) ?? {};
    if (newCurrencyInfo[newTo]) {
      setConvertedAmount(amount * newCurrencyInfo[newTo]);
    } else {
      setConvertedAmount(0);
    }
  };

  const convert = () => {
    if (!amount || !currencyInfo[to]) {
      setConvertedAmount(0);
      return;
    }
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={(amount) => setAmount(amount)}
              currencyInfoKeys={currencyInfoKeys} //use map to get the keys
              selectCurrency={from}
              onCurrencyChange={(currency) => setFrom(currency)}
            />
          </div>
          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              swap
            </button>
          </div>
          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyInfoKeys={currencyInfoKeys}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CurrencyApp;
