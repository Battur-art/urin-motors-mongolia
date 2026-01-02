import React, { createContext, useContext, useState } from "react";

interface CompareContextType {
  compareList: string[];
  addToCompare: (carId: string) => void;
  removeFromCompare: (carId: string) => void;
  isInCompare: (carId: string) => boolean;
  toggleCompare: (carId: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const addToCompare = (carId: string) => {
    if (compareList.length < 3) {
      setCompareList((prev) => [...prev, carId]);
    }
  };

  const removeFromCompare = (carId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== carId));
  };

  const isInCompare = (carId: string) => compareList.includes(carId);

  const toggleCompare = (carId: string) => {
    if (isInCompare(carId)) {
      removeFromCompare(carId);
    } else {
      addToCompare(carId);
    }
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, toggleCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
