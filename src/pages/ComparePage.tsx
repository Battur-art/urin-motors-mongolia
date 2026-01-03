import { useState } from "react";
import { Link } from "react-router-dom";
import { Scale, X, ArrowRight } from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/data/cars";
import { useCompare } from "@/contexts/CompareContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";

const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  const carsToCompare = compareList
    .map((id) => cars.find((car) => car.id === id))
    .filter(Boolean);

  const availableCars = cars.filter((car) => !compareList.includes(car.id));

  const specs = [
    { label: "Брэнд", key: "brand" },
    { label: "Загвар", key: "model" },
    { label: "Үйлдвэрлэсэн он", key: "year" },
    { label: "Гүйлт", key: "mileage", format: formatMileage },
    { label: "Хөдөлгүүр", key: "engineType" },
    { label: "Хөтлөгч", key: "driveType" },
    { label: "Хурдны хайрцаг", key: "transmission" },
    { label: "Түлшний зарцуулалт", key: "fuelConsumption" },
    { label: "Үнэ", key: "price", format: formatPrice },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom mt-[120px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Scale className="h-8 w-8 text-primary" />
              Машинуудыг харьцуулах
            </h1>
            <p className="text-muted-foreground">
              Хамгийн ихдээ 3 машин харьцуулах боломжтой
            </p>
          </div>
          {carsToCompare.length > 0 && (
            <Button variant="outline" onClick={clearCompare}>
              Бүгдийг арилгах
            </Button>
          )}
        </div>

        {carsToCompare.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Scale className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">
              Харьцуулах машин сонгоогүй байна
            </h2>
            <p className="text-muted-foreground mb-6">
              Машинуудаас харьцуулах товчийг дарж сонгоно уу
            </p>
            <Link to="/cars">
              <Button>Машинууд үзэх</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Comparison Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden mb-12">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left font-medium text-muted-foreground w-48"></th>
                      {carsToCompare.map((car) => (
                        <th key={car!.id} className="p-4 text-center relative">
                          <button
                            onClick={() => removeFromCompare(car!.id)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <Link to={`/car/${car!.id}`} className="block group">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 mx-auto max-w-[200px]">
                              <img
                                src={car!.images.find((img) => img.category === "exterior")?.url || car!.images[0]?.url}
                                alt={car!.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <span className="font-heading font-semibold group-hover:text-primary transition-colors">
                              {car!.name}
                            </span>
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, index) => (
                      <tr
                        key={spec.key}
                        className={index !== specs.length - 1 ? "border-b border-border" : ""}
                      >
                        <td className="p-4 font-medium text-muted-foreground">{spec.label}</td>
                        {carsToCompare.map((car) => {
                          const value = car![spec.key as keyof typeof car];
                          const displayValue = spec.format
                            ? spec.format(value as number)
                            : String(value);
                          return (
                            <td key={car!.id} className="p-4 text-center font-medium">
                              {spec.key === "engineType" && value === "Hybrid" ? (
                                <span className="badge-hybrid">{displayValue}</span>
                              ) : spec.key === "price" ? (
                                <span className="text-primary font-bold text-lg">{displayValue}</span>
                              ) : (
                                <span>{displayValue}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr className="border-t border-border bg-muted/30">
                      <td className="p-4"></td>
                      {carsToCompare.map((car) => (
                        <td key={car!.id} className="p-4 text-center">
                          <Link to={`/car/${car!.id}`}>
                            <Button size="sm" className="gap-2">
                              Дэлгэрэнгүй
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add More Cars */}
            {compareList.length < 3 && availableCars.length > 0 && (
              <section>
                <h2 className="font-heading text-xl font-bold mb-4">
                  Өөр машин нэмэх
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableCars.slice(0, 3).map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ComparePage;
