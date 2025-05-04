import { useState, useEffect } from "react";

function useCurrencyInfo(currency: string): Record<string, number> {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        const json = await res.json();
        setData(json[currency]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
