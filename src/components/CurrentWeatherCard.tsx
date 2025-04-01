"use client";
import Image from "next/image";
import { CurrentWeather, HourlyForecast } from "@/types/accuweather";
import { getWeatherIconUrl } from "@/lib/api";
import { useUnits } from "@/context/UnitsContext";
import HourlyForecastList from "./HourlyForecastList";

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  locationName: string;
  hourly: HourlyForecast | [];
}

export default function CurrentWeatherCard({
  weather,
  locationName,
  hourly,
}: CurrentWeatherCardProps) {
  const { units } = useUnits();

  return (
    <div className="rounded-lg shadow-md shadow-black/40 p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col gap-3 sm:gap-5 w-full sm:w-auto text-center sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-gray-300">{locationName}</h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              {new Date(weather.LocalObservationDateTime).toLocaleDateString(
                "es-ES",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>
          {units === "metric" ? (
            <div>
              <p className="text-4xl sm:text-5xl font-bold">
                {weather.Temperature.Metric.Value}°
                {weather.Temperature.Metric.Unit}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                Sensación térmica: {weather.RealFeelTemperature.Metric.Value}°
              </p>
            </div>
          ) : (
            <div>
              <p className="text-4xl sm:text-5xl font-bold">
                {weather.Temperature.Imperial.Value}°
                {weather.Temperature.Imperial.Unit}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                Sensación térmica: {weather.RealFeelTemperature.Imperial.Value}°
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 sm:w-auto sm:h-auto relative">
            <Image
              src={getWeatherIconUrl(weather.WeatherIcon)}
              alt={weather.WeatherText}
              width={150}
              height={75}
              className="object-contain"
            />
          </div>
          <span className="text-xs sm:text-sm">{weather.WeatherText}</span>
        </div>
      </div>
      {units === "metric" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-14 justify-center items-center text-center">
          <div className="p-2 sm:p-3 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Humedad</h3>
            <p className="text-xl sm:text-2xl font-bold">{weather.RelativeHumidity}%</p>
            <p className="text-xs sm:text-sm text-gray-500">
              Cobertura de nubes: {weather.CloudCover}%
            </p>
          </div>

          <div className="p-2 sm:p-3 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Viento</h3>
            <p className="text-base sm:text-lg font-bold">
              {weather.Wind.Speed.Metric.Value} {weather.Wind.Speed.Metric.Unit}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Dirección: {weather.Wind.Direction.Localized}
            </p>
          </div>

          <div className="p-2 sm:p-3 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Visibilidad</h3>
            <p className="text-base sm:text-lg font-bold">
              {weather.Visibility.Metric.Value} {weather.Visibility.Metric.Unit}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Índice UV: {weather.UVIndexText}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-14 justify-center items-center text-center">
          <div className="p-2 sm:p-3 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Humedad</h3>
            <p className="text-xl sm:text-2xl font-bold">{weather.RelativeHumidity}%</p>
            <p className="text-xs sm:text-sm text-gray-500">
              Cobertura de nubes: {weather.CloudCover}%
            </p>
          </div>

          <div className="p-2 sm:p-3 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Viento</h3>
            <p className="text-base sm:text-lg font-bold">
              {weather.Wind.Speed.Imperial.Value}{" "}
              {weather.Wind.Speed.Imperial.Unit}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Dirección: {weather.Wind.Direction.Localized}
            </p>
          </div>

          <div className="p-2 sm:p-3 rounded-md">
            <h3 className="text-xs sm:text-sm font-medium text-gray-500">Visibilidad</h3>
            <p className="text-base sm:text-lg font-bold">
              {weather.Visibility.Imperial.Value}{" "}
              {weather.Visibility.Imperial.Unit}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Índice UV: {weather.UVIndexText}
            </p>
          </div>
        </div>
      )}
      <HourlyForecastList forecast={hourly} />
    </div>
  );
}