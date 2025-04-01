'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

type UnitSystem = "metric" | "imperial";

interface UnitsContextType {
  units: UnitSystem;
  toggleUnits: () => void;
}

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export const UnitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [units, setUnits] = useState<UnitSystem>('metric');
  
    const toggleUnits = () => {
      setUnits((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
    };
  
    return (
      <UnitsContext.Provider value={{ units, toggleUnits }}>
        {children}
      </UnitsContext.Provider>
    );
  };
  
  export const useUnits = (): UnitsContextType => {
    const context = useContext(UnitsContext);
    if (context === undefined) {
      throw new Error('useUnits must be used within a UnitsProvider');
    }
    return context;
  };