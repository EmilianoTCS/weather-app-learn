import Image from "next/image";
import { HourlyForecast } from "@/types/accuweather";
import { getWeatherIconUrl } from "@/lib/api";

interface ForecastCardProps {
  forecast: HourlyForecast;
}

export default function HourlyForecastCard({ forecast }: ForecastCardProps) {
  const date = new Date(forecast.DateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="rounded-lg shadow-sm p-1 sm:p-2 flex flex-col items-center bg-white/5 hover:bg-white/10 transition-colors">
      <h3 className="font-bold text-sm sm:text-lg">{date}</h3>

      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative my-1 sm:my-2">
        <Image
          src={getWeatherIconUrl(forecast.WeatherIcon)}
          alt={forecast.IconPhrase}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
        />
      </div>

      <p className="text-xs sm:text-sm mb-1 h-8 sm:h-10 overflow-hidden text-center px-1">
        {forecast.IconPhrase}
      </p>

      <div className="flex justify-around w-full mt-1 sm:mt-2">
        <span className="font-bold text-sm sm:text-base md:text-lg">
          {Math.round(forecast.Temperature.Value)}°{forecast.Temperature.Unit}
        </span>
      </div>
    </div>
  );
}