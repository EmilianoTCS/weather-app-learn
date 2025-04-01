import Image from "next/image";
import { DailyForecast } from "@/types/accuweather";
import { getWeatherIconUrl } from "@/lib/api";

interface ForecastCardProps {
  forecast: DailyForecast;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const date = new Date(forecast.Date);
  const dayName = date.toLocaleDateString("es-ES", { weekday: "short" });
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className=" rounded-lg shadow-sm p-4 flex flex-col items-center">
      <h3 className="font-bold text-lg">{dayName}</h3>
      <p className="text-gray-500 text-sm">{formattedDate}</p>

      <Image
        src={getWeatherIconUrl(forecast.Day.Icon)}
        alt={forecast.Day.IconPhrase}
        width={100}
        height={30}
        className="my-2"
      />

      <p className="text-sm mb-1">{forecast.Day.IconPhrase}</p>

      <div className="flex justify-around w-full mt-2">
        <span className="font-bold">
          Máx: {Math.round(forecast.Temperature.Maximum.Value)}°
        </span>
        <span className="text-gray-500">
          Min: {Math.round(forecast.Temperature.Minimum.Value)}°
        </span>
      </div>
    </div>
  );
}
