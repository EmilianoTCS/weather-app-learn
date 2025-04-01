"use client";
import { useState, useEffect } from "react";
import {
  LocationSearchResult,
  CurrentWeather,
  FiveDayForecast,
  HourlyForecast,
} from "@/types/accuweather";
import SearchBar from "./SearchBar";
import CurrentWeatherCard from "./CurrentWeatherCard";
import ForecastList from "./ForecastList";
import {
  searchLocation,
  getCurrentWeather,
  getFiveDayForecast,
  getLocationByCoordinates,
  getTwelveHoursForecast,
} from "@/lib/api";
import { useUnits } from "@/context/UnitsContext";

export default function WeatherDashboard() {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSearchResult | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const [forecast, setForecast] = useState<FiveDayForecast | null>(null);
  const [hourForecast, setHourForecast] = useState<HourlyForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { units, toggleUnits } = useUnits();
  // const auxWeatherData = {
  //   LocalObservationDateTime: "2025-04-01T15:35:00-03:00",
  //   EpochTime: 1743532500,
  //   WeatherText: "Mayormente soleado",
  //   WeatherIcon: 2,
  //   HasPrecipitation: false,
  //   PrecipitationType: null,
  //   IsDayTime: true,
  //   Temperature: {
  //     Metric: {
  //       Value: 23.6,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     Imperial: {
  //       Value: 74,
  //       Unit: "F",
  //       UnitType: 18,
  //     },
  //   },
  //   RealFeelTemperature: {
  //     Metric: {
  //       Value: 24.8,
  //       Unit: "C",
  //       UnitType: 17,
  //       Phrase: "Agradable",
  //     },
  //     Imperial: {
  //       Value: 77,
  //       Unit: "F",
  //       UnitType: 18,
  //       Phrase: "Agradable",
  //     },
  //   },
  //   RealFeelTemperatureShade: {
  //     Metric: {
  //       Value: 22.2,
  //       Unit: "C",
  //       UnitType: 17,
  //       Phrase: "Agradable",
  //     },
  //     Imperial: {
  //       Value: 72,
  //       Unit: "F",
  //       UnitType: 18,
  //       Phrase: "Agradable",
  //     },
  //   },
  //   RelativeHumidity: 29,
  //   IndoorRelativeHumidity: 29,
  //   DewPoint: {
  //     Metric: {
  //       Value: 4.5,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     Imperial: {
  //       Value: 40,
  //       Unit: "F",
  //       UnitType: 18,
  //     },
  //   },
  //   Wind: {
  //     Direction: {
  //       Degrees: 68,
  //       Localized: "ENE",
  //       English: "ENE",
  //     },
  //     Speed: {
  //       Metric: {
  //         Value: 10.7,
  //         Unit: "km/h",
  //         UnitType: 7,
  //       },
  //       Imperial: {
  //         Value: 6.6,
  //         Unit: "mi/h",
  //         UnitType: 9,
  //       },
  //     },
  //   },
  //   WindGust: {
  //     Speed: {
  //       Metric: {
  //         Value: 12.8,
  //         Unit: "km/h",
  //         UnitType: 7,
  //       },
  //       Imperial: {
  //         Value: 8,
  //         Unit: "mi/h",
  //         UnitType: 9,
  //       },
  //     },
  //   },
  //   UVIndex: 3,
  //   UVIndexText: "Moderado",
  //   Visibility: {
  //     Metric: {
  //       Value: 16.1,
  //       Unit: "km",
  //       UnitType: 6,
  //     },
  //     Imperial: {
  //       Value: 10,
  //       Unit: "mi",
  //       UnitType: 2,
  //     },
  //   },
  //   ObstructionsToVisibility: "",
  //   CloudCover: 25,
  //   Ceiling: {
  //     Metric: {
  //       Value: 12192,
  //       Unit: "m",
  //       UnitType: 5,
  //     },
  //     Imperial: {
  //       Value: 40000,
  //       Unit: "ft",
  //       UnitType: 0,
  //     },
  //   },
  //   Pressure: {
  //     Metric: {
  //       Value: 1014,
  //       Unit: "mb",
  //       UnitType: 14,
  //     },
  //     Imperial: {
  //       Value: 29.94,
  //       Unit: "inHg",
  //       UnitType: 12,
  //     },
  //   },
  //   PressureTendency: {
  //     LocalizedText: "En descenso",
  //     Code: "F",
  //   },
  //   Past24HourTemperatureDeparture: {
  //     Metric: {
  //       Value: 2.6,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     Imperial: {
  //       Value: 5,
  //       Unit: "F",
  //       UnitType: 18,
  //     },
  //   },
  //   ApparentTemperature: {
  //     Metric: {
  //       Value: 20.6,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     Imperial: {
  //       Value: 69,
  //       Unit: "F",
  //       UnitType: 18,
  //     },
  //   },
  //   WindChillTemperature: {
  //     Metric: {
  //       Value: 23.3,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     Imperial: {
  //       Value: 74,
  //       Unit: "F",
  //       UnitType: 18,
  //     },
  //   },
  //   WetBulbTemperature: {
  //     Metric: {
  //       Value: 13.1,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     Imperial: {
  //       Value: 56,
  //       Unit: "F",
  //       UnitType: 18,
  //     },
  //   },
  //   WetBulbGlobeTemperature: {
  //     Metric: {
  //       Value: 19.4,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     Imperial: {
  //       Value: 67,
  //       Unit: "F",
  //       UnitType: 18,
  //     },
  //   },
  //   Precip1hr: {
  //     Metric: {
  //       Value: 0,
  //       Unit: "mm",
  //       UnitType: 3,
  //     },
  //     Imperial: {
  //       Value: 0,
  //       Unit: "in",
  //       UnitType: 1,
  //     },
  //   },
  //   PrecipitationSummary: {
  //     Precipitation: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //     PastHour: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //     Past3Hours: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //     Past6Hours: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //     Past9Hours: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //     Past12Hours: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //     Past18Hours: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //     Past24Hours: {
  //       Metric: {
  //         Value: 0,
  //         Unit: "mm",
  //         UnitType: 3,
  //       },
  //       Imperial: {
  //         Value: 0,
  //         Unit: "in",
  //         UnitType: 1,
  //       },
  //     },
  //   },
  //   TemperatureSummary: {
  //     Past6HourRange: {
  //       Minimum: {
  //         Metric: {
  //           Value: 14.4,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Imperial: {
  //           Value: 58,
  //           Unit: "F",
  //           UnitType: 18,
  //         },
  //       },
  //       Maximum: {
  //         Metric: {
  //           Value: 23.6,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Imperial: {
  //           Value: 74,
  //           Unit: "F",
  //           UnitType: 18,
  //         },
  //       },
  //     },
  //     Past12HourRange: {
  //       Minimum: {
  //         Metric: {
  //           Value: 9.5,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Imperial: {
  //           Value: 49,
  //           Unit: "F",
  //           UnitType: 18,
  //         },
  //       },
  //       Maximum: {
  //         Metric: {
  //           Value: 23.6,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Imperial: {
  //           Value: 74,
  //           Unit: "F",
  //           UnitType: 18,
  //         },
  //       },
  //     },
  //     Past24HourRange: {
  //       Minimum: {
  //         Metric: {
  //           Value: 9.5,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Imperial: {
  //           Value: 49,
  //           Unit: "F",
  //           UnitType: 18,
  //         },
  //       },
  //       Maximum: {
  //         Metric: {
  //           Value: 23.6,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Imperial: {
  //           Value: 74,
  //           Unit: "F",
  //           UnitType: 18,
  //         },
  //       },
  //     },
  //   },
  //   MobileLink:
  //     "http://www.accuweather.com/es/ar/la-rioja/4573/current-weather/4573",
  //   Link: "http://www.accuweather.com/es/ar/la-rioja/4573/current-weather/4573",
  // };
  // const auxForecastData = {
  //   Headline: {
  //     EffectiveDate: "2025-04-04T07:00:00-03:00",
  //     EffectiveEpochDate: 1743760800,
  //     Severity: 4,
  //     Text: "Bastante más fresco el viernes",
  //     Category: "cooler",
  //     EndDate: "2025-04-04T19:00:00-03:00",
  //     EndEpochDate: 1743804000,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?unit=c",
  //   },
  //   DailyForecasts: [
  //     {
  //       Date: "2025-04-01T07:00:00-03:00",
  //       EpochDate: 1743501600,
  //       Temperature: {
  //         Minimum: {
  //           Value: 10.2,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Maximum: {
  //           Value: 23.6,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //       },
  //       Day: {
  //         Icon: 2,
  //         IconPhrase: "Mayormente soleado",
  //         HasPrecipitation: false,
  //       },
  //       Night: {
  //         Icon: 33,
  //         IconPhrase: "Despejado",
  //         HasPrecipitation: false,
  //       },
  //       Sources: ["AccuWeather"],
  //       MobileLink:
  //         "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=1&unit=c",
  //       Link: "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=1&unit=c",
  //     },
  //     {
  //       Date: "2025-04-02T07:00:00-03:00",
  //       EpochDate: 1743588000,
  //       Temperature: {
  //         Minimum: {
  //           Value: 13.9,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Maximum: {
  //           Value: 25.7,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //       },
  //       Day: {
  //         Icon: 1,
  //         IconPhrase: "Soleado",
  //         HasPrecipitation: false,
  //       },
  //       Night: {
  //         Icon: 33,
  //         IconPhrase: "Despejado",
  //         HasPrecipitation: false,
  //       },
  //       Sources: ["AccuWeather"],
  //       MobileLink:
  //         "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=2&unit=c",
  //       Link: "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=2&unit=c",
  //     },
  //     {
  //       Date: "2025-04-03T07:00:00-03:00",
  //       EpochDate: 1743674400,
  //       Temperature: {
  //         Minimum: {
  //           Value: 14,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Maximum: {
  //           Value: 27.1,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //       },
  //       Day: {
  //         Icon: 6,
  //         IconPhrase: "Mayormente nublado",
  //         HasPrecipitation: false,
  //       },
  //       Night: {
  //         Icon: 12,
  //         IconPhrase: "Chubascos",
  //         HasPrecipitation: true,
  //         PrecipitationType: "Rain",
  //         PrecipitationIntensity: "Moderate",
  //       },
  //       Sources: ["AccuWeather"],
  //       MobileLink:
  //         "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=3&unit=c",
  //       Link: "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=3&unit=c",
  //     },
  //     {
  //       Date: "2025-04-04T07:00:00-03:00",
  //       EpochDate: 1743760800,
  //       Temperature: {
  //         Minimum: {
  //           Value: 9.4,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Maximum: {
  //           Value: 16.6,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //       },
  //       Day: {
  //         Icon: 18,
  //         IconPhrase: "Lluvia",
  //         HasPrecipitation: true,
  //         PrecipitationType: "Rain",
  //         PrecipitationIntensity: "Light",
  //       },
  //       Night: {
  //         Icon: 38,
  //         IconPhrase: "Mayormente nublado",
  //         HasPrecipitation: false,
  //       },
  //       Sources: ["AccuWeather"],
  //       MobileLink:
  //         "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=4&unit=c",
  //       Link: "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=4&unit=c",
  //     },
  //     {
  //       Date: "2025-04-05T07:00:00-03:00",
  //       EpochDate: 1743847200,
  //       Temperature: {
  //         Minimum: {
  //           Value: 9.9,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //         Maximum: {
  //           Value: 19.7,
  //           Unit: "C",
  //           UnitType: 17,
  //         },
  //       },
  //       Day: {
  //         Icon: 4,
  //         IconPhrase: "Nubes y claros",
  //         HasPrecipitation: false,
  //       },
  //       Night: {
  //         Icon: 34,
  //         IconPhrase: "Mayormente despejado",
  //         HasPrecipitation: false,
  //       },
  //       Sources: ["AccuWeather"],
  //       MobileLink:
  //         "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=5&unit=c",
  //       Link: "http://www.accuweather.com/es/ar/la-rioja/4573/daily-weather-forecast/4573?day=5&unit=c",
  //     },
  //   ],
  // };
  // const auxHourForecastData = [
  //   {
  //     DateTime: "2025-04-01T16:00:00-03:00",
  //     EpochDateTime: 1743534000,
  //     WeatherIcon: 2,
  //     IconPhrase: "Mayormente soleado",
  //     HasPrecipitation: false,
  //     IsDaylight: true,
  //     Temperature: {
  //       Value: 22.9,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=16&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=16&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-01T17:00:00-03:00",
  //     EpochDateTime: 1743537600,
  //     WeatherIcon: 2,
  //     IconPhrase: "Mayormente soleado",
  //     HasPrecipitation: false,
  //     IsDaylight: true,
  //     Temperature: {
  //       Value: 22.8,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=17&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=17&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-01T18:00:00-03:00",
  //     EpochDateTime: 1743541200,
  //     WeatherIcon: 1,
  //     IconPhrase: "Soleado",
  //     HasPrecipitation: false,
  //     IsDaylight: true,
  //     Temperature: {
  //       Value: 21.8,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=18&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=18&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-01T19:00:00-03:00",
  //     EpochDateTime: 1743544800,
  //     WeatherIcon: 1,
  //     IconPhrase: "Soleado",
  //     HasPrecipitation: false,
  //     IsDaylight: true,
  //     Temperature: {
  //       Value: 20.2,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=19&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=19&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-01T20:00:00-03:00",
  //     EpochDateTime: 1743548400,
  //     WeatherIcon: 33,
  //     IconPhrase: "Despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 18.6,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=20&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=20&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-01T21:00:00-03:00",
  //     EpochDateTime: 1743552000,
  //     WeatherIcon: 34,
  //     IconPhrase: "Mayormente despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 17.3,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=21&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=21&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-01T22:00:00-03:00",
  //     EpochDateTime: 1743555600,
  //     WeatherIcon: 33,
  //     IconPhrase: "Despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 16.7,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=22&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=22&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-01T23:00:00-03:00",
  //     EpochDateTime: 1743559200,
  //     WeatherIcon: 33,
  //     IconPhrase: "Despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 15.7,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=23&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=1&hbhhour=23&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-02T00:00:00-03:00",
  //     EpochDateTime: 1743562800,
  //     WeatherIcon: 33,
  //     IconPhrase: "Despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 14.8,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=0&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=0&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-02T01:00:00-03:00",
  //     EpochDateTime: 1743566400,
  //     WeatherIcon: 33,
  //     IconPhrase: "Despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 14.1,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=1&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=1&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-02T02:00:00-03:00",
  //     EpochDateTime: 1743570000,
  //     WeatherIcon: 33,
  //     IconPhrase: "Despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 13.5,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=2&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=2&unit=c",
  //   },
  //   {
  //     DateTime: "2025-04-02T03:00:00-03:00",
  //     EpochDateTime: 1743573600,
  //     WeatherIcon: 33,
  //     IconPhrase: "Despejado",
  //     HasPrecipitation: false,
  //     IsDaylight: false,
  //     Temperature: {
  //       Value: 12.8,
  //       Unit: "C",
  //       UnitType: 17,
  //     },
  //     PrecipitationProbability: 0,
  //     MobileLink:
  //       "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=3&unit=c",
  //     Link: "http://www.accuweather.com/es/ar/la-rioja/4573/hourly-weather-forecast/4573?day=2&hbhhour=3&unit=c",
  //   },
  // ];
 
  useEffect(() => {
    // Función para obtener la ubicación del usuario
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            console.log(position);
            try {
              const { latitude, longitude } = position.coords;
              const location = await getLocationByCoordinates(
                latitude,
                longitude
              );
              handleLocationSelect(location);
            } catch (err) {
              setError("Error al obtener la ubicación automática.");
              console.error(err);
              setLoading(false);
            }
          },
          (error) => {
            console.error("Error de geolocalización:", error);
            setLoading(false);
          }
        );
      }
    };

    getUserLocation();
  }, []);

  const handleLocationSelect = async (location: LocationSearchResult) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedLocation(location);

      // Pasar el parámetro de unidades
      const isMetric = units === "metric";
      const [weatherData, forecastData, hourForecast] = await Promise.all([
        getCurrentWeather(location.Key),
        getFiveDayForecast(location.Key, isMetric),
        getTwelveHoursForecast(location.Key, isMetric),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setHourForecast(hourForecast);
    } catch (err) {
      setError("Error al obtener datos del clima. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">AccuWeather App</h1>
        <button
          onClick={toggleUnits}
          className="px-3 py-2 rounded bg-sky-950 hover:bg-sky-900 cursor-pointer w-full sm:w-auto text-white text-sm sm:text-base"
        >
          {units === "metric" ? "Cambiar a °F" : "Cambiar a °C"}
        </button>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <SearchBar
          onSearch={searchLocation}
          onLocationSelect={handleLocationSelect}
        />
      </div>

      {loading && (
        <div className="text-center py-6 sm:py-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base">Cargando datos del clima...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center my-3 sm:my-4 p-3 sm:p-4 bg-red-50 rounded-lg text-sm sm:text-base">
          {error}
        </div>
      )}

      {!loading && selectedLocation && currentWeather && (
        <div className="mt-4 sm:mt-6">
          <CurrentWeatherCard
            weather={currentWeather}
            locationName={selectedLocation.LocalizedName}
            hourly={hourForecast}
          />
        </div>
      )}

      {!loading && forecast && (
        <div className="mt-4 sm:mt-6">
          <ForecastList forecast={forecast} />
        </div>
      )}
    </div>
  );
}