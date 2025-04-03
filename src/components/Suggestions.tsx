"use client";
import React, { useEffect, useState } from "react";
import GeminiQuery from "@/lib/api";
import { AllInfo } from "@/types/accuweather";

export default function Suggestion({ allInfo }: { allInfo: AllInfo }) {
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GeminiQuery(allInfo);
        setResponse(result ?? null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [allInfo]);

  return (
    <section>
      {response ? (
        <div className="mt-10 max-w-4xl mx-auto p-4 ">
          <span className="text-xl italic">¡Recomendación del día!</span>
          <p className="mt-3 text-gray-200">{response}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
