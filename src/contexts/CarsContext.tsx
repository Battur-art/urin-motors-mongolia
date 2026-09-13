import React, { createContext, useContext, useState, useEffect } from "react";
import { cars as staticCars, Car } from "@/data/cars";
import { idbGet, idbSet } from "@/utils/indexedDb";

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

  // Load from IndexedDB on mount (supports large datasets including base64 videos)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const idbCars = await idbGet<Car[]>(STORAGE_KEY);
        if (active && idbCars && Array.isArray(idbCars) && idbCars.length > 0) {
          setExtraCars(idbCars);
        }
        const idbOverrides = await idbGet<Record<string, Car>>(STORAGE_KEY + "-overrides");
        if (active && idbOverrides && typeof idbOverrides === "object") {
          setOverrides(idbOverrides);
        }
        const idbDeleted = await idbGet<string[]>(STORAGE_KEY + "-deleted");
        if (active && idbDeleted && Array.isArray(idbDeleted)) {
          setDeletedIds(idbDeleted);
        }
      } catch (err) {
        console.warn("Error loading from IndexedDB:", err);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    idbSet(STORAGE_KEY, extraCars);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(extraCars));
    } catch (e) {
      // localStorage quota exceeded is expected for videos; IndexedDB handles it safely
      console.warn("localStorage quota exceeded for cars, saved in IndexedDB safely.");
    }
  }, [extraCars]);

  useEffect(() => {
    idbSet(STORAGE_KEY + "-overrides", overrides);
    try {
      localStorage.setItem(STORAGE_KEY + "-overrides", JSON.stringify(overrides));
    } catch (e) {
      console.warn("localStorage quota exceeded for overrides, saved in IndexedDB safely.");
    }
  }, [overrides]);

  useEffect(() => {
    idbSet(STORAGE_KEY + "-deleted", deletedIds);
    try {
      localStorage.setItem(STORAGE_KEY + "-deleted", JSON.stringify(deletedIds));
    } catch (e) {
      console.warn("localStorage quota exceeded for deletedIds, saved in IndexedDB safely.");
    }
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
