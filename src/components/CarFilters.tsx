import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { brands, models, engineTypes, driveTypes } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface FilterState {
  brand: string;
  model: string;
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  mileageMin: number;
  mileageMax: number;
  engineType: string;
  driveType: string;
}

interface CarFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const defaultFilters: FilterState = {
  brand: "all",
  model: "all",
  yearMin: 2010,
  yearMax: 2025,
  priceMin: 0,
  priceMax: 150000000,
  mileageMin: 0,
  mileageMax: 300000,
  engineType: "all",
  driveType: "all",
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "сая";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "мянга";
  }
  return num.toString();
}

function FiltersContent({ filters, onFilterChange, onReset }: CarFiltersProps) {
  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    const defaultValue = defaultFilters[key as keyof FilterState];
    return value !== defaultValue;
  });

  return (
    <div className="space-y-6">
      {/* Brand */}
      <div>
        <label className="text-sm font-medium mb-2 block">Брэнд</label>
        <Select
          value={filters.brand}
          onValueChange={(value) => onFilterChange({ ...filters, brand: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Бүгд" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Model */}
      <div>
        <label className="text-sm font-medium mb-2 block">Загвар</label>
        <Select
          value={filters.model}
          onValueChange={(value) => onFilterChange({ ...filters, model: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Бүгд" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            {models.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Үйлдвэрлэсэн он: {filters.yearMin} - {filters.yearMax}
        </label>
        <div className="px-1">
          <Slider
            min={2010}
            max={2025}
            step={1}
            value={[filters.yearMin, filters.yearMax]}
            onValueChange={([min, max]) =>
              onFilterChange({ ...filters, yearMin: min, yearMax: max })
            }
            className="mt-4"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Үнэ: {formatNumber(filters.priceMin)}₮ - {formatNumber(filters.priceMax)}₮
        </label>
        <div className="px-1">
          <Slider
            min={0}
            max={150000000}
            step={5000000}
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={([min, max]) =>
              onFilterChange({ ...filters, priceMin: min, priceMax: max })
            }
            className="mt-4"
          />
        </div>
      </div>

      {/* Mileage Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Гүйлт: {formatNumber(filters.mileageMin)}км - {formatNumber(filters.mileageMax)}км
        </label>
        <div className="px-1">
          <Slider
            min={0}
            max={300000}
            step={10000}
            value={[filters.mileageMin, filters.mileageMax]}
            onValueChange={([min, max]) =>
              onFilterChange({ ...filters, mileageMin: min, mileageMax: max })
            }
            className="mt-4"
          />
        </div>
      </div>

      {/* Engine Type */}
      <div>
        <label className="text-sm font-medium mb-2 block">Хөдөлгүүр</label>
        <Select
          value={filters.engineType}
          onValueChange={(value) => onFilterChange({ ...filters, engineType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Бүгд" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            {engineTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === "Hybrid" ? "Хайбрид" : type === "Gasoline 2.5 turbo" ? "Бензин 2.5 турбо" : "Бензин"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Drive Type */}
      <div>
        <label className="text-sm font-medium mb-2 block">Хөтлөгч</label>
        <Select
          value={filters.driveType}
          onValueChange={(value) => onFilterChange({ ...filters, driveType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Бүгд" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүгд</SelectItem>
            {driveTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={onReset}>
          <X className="h-4 w-4 mr-2" />
          Шүүлтүүр арилгах
        </Button>
      )}
    </div>
  );
}

export function CarFilters(props: CarFiltersProps) {
  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 bg-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Шүүлтүүр
          </h3>
          <FiltersContent {...props} />
        </div>
      </aside>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Шүүлтүүр
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Шүүлтүүр
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
