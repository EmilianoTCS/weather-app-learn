import axios from "axios";
import {
  LocationSearchResult,
  CurrentWeather,
  FiveDayForecast,
  HourlyForecast,
} from "@/types/accuweather";

const API_KEY = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_ACCUWEATHER_BASE_URL;

/**
 * Busca ubicación por coordenadas geográficas
 */
export async function getLocationByCoordinates(
  lat: number,
  lon: number
): Promise<LocationSearchResult> {
  try {
    const response = await axios.get(
      `${BASE_URL}/locations/v1/cities/geoposition/search`,
      {
        params: {
          apikey: API_KEY,
          q: `${lat},${lon}`,
          language: "es-es",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo ubicación por coordenadas:", error);
    throw error;
  }
}

/**
 * Busca ubicaciones por nombre
 */
export async function searchLocation(
  query: string
): Promise<LocationSearchResult[]> {
  try {
    const response = await axios.get(`${BASE_URL}/locations/v1/cities/search`, {
      params: {
        apikey: API_KEY,
        q: query,
        language: "es-es",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error buscando ubicación:", error);
    throw error;
  }
}

/**
 * Obtiene el clima actual de una ubicación por su código
 */
export async function getCurrentWeather(
  locationKey: string
): Promise<CurrentWeather> {
  try {
    const response = await axios.get(
      `${BASE_URL}/currentconditions/v1/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
          language: "es-es",
          details: true,
        },
      }
    );
    return response.data[0];
  } catch (error) {
    console.error("Error obteniendo clima actual:", error);
    throw error;
  }
}

/**
 * Obtiene el pronóstico de 12 horas para una ubicación
 */
export async function getTwelveHoursForecast(
  locationKey: string,
  useMetric: boolean = true
): Promise<HourlyForecast> {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
          language: "es-es",
          metric: useMetric,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo pronóstico:", error);
    throw error;
  }
}

/**
 * Obtiene el pronóstico de 5 días para una ubicación
 */
export async function getFiveDayForecast(
  locationKey: string,
  useMetric: boolean = true
): Promise<FiveDayForecast> {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecasts/v1/daily/5day/${locationKey}`,
      {
        params: {
          apikey: API_KEY,
          language: "es-es",
          metric: useMetric,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo pronóstico:", error);
    throw error;
  }
}

// Función para obtener la URL del ícono del clima
export function getWeatherIconUrl(iconNumber: number): string {
  return `https://developer.accuweather.com/sites/default/files/${
    iconNumber < 10 ? "0" + iconNumber : iconNumber
  }-s.png`;
}
