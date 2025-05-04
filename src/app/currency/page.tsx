"use client";

import { useState, useEffect } from "react";
import CurrencyInfo from "@/static/hooks/useCurrencyInfo";
import InputBox from "./inputBox";

const CurrencyApp = () => {
  const [amount, setAmount] = useState<number>(0);
  const [form, setForm] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<any>(0);

  const currencyInfo: Record<string, number> = CurrencyInfo(form) ?? {}; //use custom hook to get currency info

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setForm(to);
    setTo(form);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
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
              currencyOptions={options}
              onCurrencyChange={(currency) => setAmount(amount)}
              selectCurrency={form}
              onAmountChange={(amount) => setAmount(amount)}
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
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={form}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {form.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CurrencyApp;
/* 
React wraps native events in a SyntheticEvent, which mimics the native API but adds some optimizations and cross-browser normalization.

React uses a single SyntheticEvent class, but it extends that with specialized versions based on the element and event type.

For example:

React.FormEvent<HTMLFormElement> for <form onSubmit={...}>

React.ChangeEvent<HTMLInputElement> for <input onChange={...}>

React.MouseEvent<HTMLButtonElement> for <button onClick={...}>

React.KeyboardEvent<HTMLInputElement> for <input onKeyDown={...}>

These give you exactly the properties you’d expect for that kind of interaction.

*/
