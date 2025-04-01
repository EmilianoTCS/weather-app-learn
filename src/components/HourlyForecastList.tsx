import { useState, useEffect } from "react";
import { HourlyForecast } from "@/types/accuweather";
import HourlyForecastCard from "./HourlyForecastCard";

interface HourlyForecastListProps {
  forecast: HourlyForecast[];
}

export default function ForecastList({ forecast }: HourlyForecastListProps) {
  // Número de tarjetas visibles según el tamaño de pantalla
  const [itemsToShow, setItemsToShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ajustar el número de elementos visibles según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1); // Móviles: mostrar 1
      } else if (window.innerWidth < 768) {
        setItemsToShow(2); // Tablets pequeñas: mostrar 2
      } else if (window.innerWidth < 1024) {
        setItemsToShow(3); // Tablets: mostrar 3
      } else {
        setItemsToShow(4); // Desktop: mostrar 4
      }
    };

    handleResize(); // Ejecutar al iniciar
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalItems = forecast.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  // Cuando cambie itemsToShow, asegurarse de que currentIndex no supere maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsToShow, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Calcular el ancho de cada tarjeta basado en itemsToShow
  const cardWidth = 100 / itemsToShow;

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 max-w-6xl mx-auto px-2 sm:px-0">
      <h2 className="text-sm sm:text-md font-bold mb-2 sm:mb-4 px-2 sm:px-0">
        Pronóstico para las siguientes 12 horas
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Botón Anterior */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-black shadow-md z-10 disabled:opacity-30 mr-1 sm:mr-2"
          aria-label="Ver pronóstico anterior"
        >
          &lt;
        </button>

        {/* Contenedor del carrusel */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * cardWidth}%)`,
            }}
          >
            {forecast.map((day) => (
              <div 
                key={day.DateTime} 
                className="flex-none" 
                style={{ width: `${cardWidth}%` }}
              >
                <div className="px-1 sm:px-2">
                  <HourlyForecastCard forecast={day} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="bg-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-black shadow-md z-10 disabled:opacity-30 ml-1 sm:ml-2"
          aria-label="Ver pronóstico siguiente"
        >
          &gt;
        </button>
      </div>

      {/* Indicadores de posición */}
      <div className="flex justify-center mt-3 sm:mt-4 space-x-2">
        {Array.from({ length: Math.min(totalItems, 8) }).map((_, idx) => {
          // Mostrar máximo 8 indicadores para no saturar en móviles
          const adjustedIdx = Math.floor(idx * (totalItems / Math.min(totalItems, 8)));
          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(Math.min(maxIndex, adjustedIdx))}
              className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full ${
                adjustedIdx >= currentIndex && adjustedIdx < currentIndex + itemsToShow
                  ? "bg-blue-400"
                  : "bg-gray-600"
              }`}
              aria-label={`Ver pronóstico ${adjustedIdx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}