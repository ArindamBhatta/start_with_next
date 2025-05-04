import { useId } from "react";

interface InputBoxProps {
  label: string;
  amount: number;
  onAmountChange?: (value: number) => void;
  currencyInfoKeys: string[];
  selectCurrency: string;
  onCurrencyChange?: (value: string) => void;
  amountDisable?: boolean;
  currencyDisable?: boolean;
  className?: string;
}

function InputBox({
  label,
  amount,
  onAmountChange,
  currencyInfoKeys,
  selectCurrency,
  onCurrencyChange,
  amountDisable,
  currencyDisable,
  className = "",
}: InputBoxProps) {
  const amountInputId = useId();

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black mb-2 inline-block">
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5 text-black"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-black cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyInfoKeys.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
