import React, { createContext, useContext, useState, useEffect } from "react";
import { cars as staticCars, Car } from "@/data/cars";

interface CarsContextType {
  cars: Car[];
  addCar: (car: Car) => void;
  updateCar: (car: Car) => void;
  deleteCar: (id: string) => void;
}

const CarsContext = createContext<CarsContextType | undefined>(undefined);

const STORAGE_KEY = "urin-motors-cars";

export function CarsProvider({ children }: { children: React.ReactNode }) {
  const [extraCars, setExtraCars] = useState<Car[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [overrides, setOverrides] = useState<Record<string, Car>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY + "-overrides");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [deletedIds, setDeletedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY + "-deleted");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extraCars));
  }, [extraCars]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "-overrides", JSON.stringify(overrides));
  }, [overrides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "-deleted", JSON.stringify(deletedIds));
  }, [deletedIds]);

  const cars: Car[] = [
    ...staticCars
      .filter((c) => !deletedIds.includes(c.id))
      .map((c) => (overrides[c.id] ? overrides[c.id] : c)),
    ...extraCars.filter((c) => !deletedIds.includes(c.id)),
  ];

  const addCar = (car: Car) => {
    setExtraCars((prev) => [...prev, car]);
  };

  const updateCar = (car: Car) => {
    const isStatic = staticCars.some((c) => c.id === car.id);
    if (isStatic) {
      setOverrides((prev) => ({ ...prev, [car.id]: car }));
    } else {
      setExtraCars((prev) => prev.map((c) => (c.id === car.id ? car : c)));
    }
  };

  const deleteCar = (id: string) => {
    setDeletedIds((prev) => [...prev, id]);
    setExtraCars((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CarsContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error("useCars must be used within a CarsProvider");
  }
  return context;
}
