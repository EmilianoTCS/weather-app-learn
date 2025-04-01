// Tipo para la respuesta de búsqueda de ubicación
export interface LocationSearchResult {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

// Tipo para la respuesta del clima actual
export interface CurrentWeather {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RealFeelTemperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  RelativeHumidity: number;
  Wind: {
    Direction: {
      Degrees: number;
      Localized: string;
      English: string;
    };
    Speed: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  };
  UVIndex: number;
  UVIndexText: string;
  Visibility: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  CloudCover: number;
}

// Tipo para pronóstico diario
export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType?: string;
    PrecipitationIntensity?: string;
  };
}

// Tipo para la respuesta del pronóstico de 5 días
export interface FiveDayForecast {
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
  };
  DailyForecasts: DailyForecast[];
}

export type HourlyForecast = Array<{
  DateTime: string;
  WeatherIcon: number;
  IconPhrase: string;
  hasPrecipitation: boolean;
  isDayLight: boolean;
  Temperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  RealFeelTemperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Rain: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  CloudCover: number;
}>;
