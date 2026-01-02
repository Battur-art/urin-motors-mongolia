import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { CarFilters, FilterState, defaultFilters } from "@/components/CarFilters";
import { cars } from "@/data/cars";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "price-asc" | "price-desc" | "year-desc" | "mileage-asc";

const CarsPage = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("year-desc");

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          car.name.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Brand filter
      if (filters.brand && filters.brand !== "all" && car.brand !== filters.brand) return false;

      // Model filter
      if (filters.model && filters.model !== "all" && car.model !== filters.model) return false;

      // Year range
      if (car.year < filters.yearMin || car.year > filters.yearMax) return false;

      // Price range
      if (car.price < filters.priceMin || car.price > filters.priceMax) return false;

      // Mileage range
      if (car.mileage < filters.mileageMin || car.mileage > filters.mileageMax) return false;

      // Engine type
      if (filters.engineType && filters.engineType !== "all" && car.engineType !== filters.engineType) return false;

      // Drive type
      if (filters.driveType && filters.driveType !== "all" && car.driveType !== filters.driveType) return false;

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "year-desc":
          return b.year - a.year;
        case "mileage-asc":
          return a.mileage - b.mileage;
        default:
          return 0;
      }
    });

    return result;
  }, [filters, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Машинууд
          </h1>
          <p className="text-muted-foreground">
            Нийт {cars.length} машин, {filteredCars.length} илэрц олдлоо
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <CarFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Эрэмбэлэх" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year-desc">Шинэ эхэнд</SelectItem>
                <SelectItem value="price-asc">Үнэ: Бага → Их</SelectItem>
                <SelectItem value="price-desc">Үнэ: Их → Бага</SelectItem>
                <SelectItem value="mileage-asc">Гүйлт: Бага → Их</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <CarFilters
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
          />

          {/* Car Grid */}
          <div className="flex-1">
            {filteredCars.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  Таны хайлтад тохирох машин олдсонгүй
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-primary font-medium hover:underline"
                >
                  Шүүлтүүр арилгах
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarsPage;
