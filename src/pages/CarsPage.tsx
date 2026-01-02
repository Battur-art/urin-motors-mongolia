import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { CarFilters, FilterState, defaultFilters } from "@/components/CarFilters";
import { cars } from "@/data/cars";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedSection } from "@/components/AnimatedSection";

type SortOption = "price-asc" | "price-desc" | "year-desc" | "mileage-asc";

const CarsPage = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("year-desc");

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          car.name.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (filters.brand && filters.brand !== "all" && car.brand !== filters.brand) return false;
      if (filters.model && filters.model !== "all" && car.model !== filters.model) return false;
      if (car.year < filters.yearMin || car.year > filters.yearMax) return false;
      if (car.price < filters.priceMin || car.price > filters.priceMax) return false;
      if (car.mileage < filters.mileageMin || car.mileage > filters.mileageMax) return false;
      if (filters.engineType && filters.engineType !== "all" && car.engineType !== filters.engineType) return false;
      if (filters.driveType && filters.driveType !== "all" && car.driveType !== filters.driveType) return false;

      return true;
    });

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

      <main className="pt-32 pb-24">
        {/* Page Header */}
        <div className="container-wide mb-16">
          <AnimatedSection>
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground block mb-4">
              Бүх машинууд
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-headline mb-4">
              Машинууд
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground text-lg">
              Нийт {cars.length} машин, {filteredCars.length} илэрц олдлоо
            </p>
          </AnimatedSection>
        </div>

        {/* Search and Sort Bar */}
        <div className="container-wide">
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col lg:flex-row gap-4 mb-12 pb-8 border-b border-border">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Хайх..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-transparent border-border rounded-none text-base"
                />
              </div>
              <div className="flex gap-4">
                {/* Mobile Filter Button - Only visible on small screens */}
                <div className="xl:hidden">
                  <CarFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={handleResetFilters}
                  />
                </div>
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-[200px] h-12 rounded-none border-border">
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
          </AnimatedSection>

          {/* Content */}
          <div className="flex gap-12">
            {/* Desktop Filters Sidebar */}
            <div className="hidden xl:block">
              <CarFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>

            {/* Car Grid */}
            <div className="flex-1">
              {filteredCars.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24"
                >
                  <p className="text-muted-foreground text-lg mb-6">
                    Таны хайлтад тохирох машин олдсонгүй
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleResetFilters}
                    className="text-foreground font-medium uppercase tracking-wider text-sm border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
                  >
                    Шүүлтүүр арилгах
                  </motion.button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredCars.map((car, index) => (
                    <CarCard key={car.id} car={car} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarsPage;
