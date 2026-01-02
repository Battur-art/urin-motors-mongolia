import { X } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { cars, formatPrice, formatMileage } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface CompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompareModal({ open, onOpenChange }: CompareModalProps) {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  
  const carsToCompare = compareList
    .map((id) => cars.find((car) => car.id === id))
    .filter(Boolean);

  const specs = [
    { label: "Брэнд", key: "brand" },
    { label: "Он", key: "year" },
    { label: "Гүйлт", key: "mileage", format: formatMileage },
    { label: "Хөдөлгүүр", key: "engineType" },
    { label: "Хөтлөгч", key: "driveType" },
    { label: "Хурдны хайрцаг", key: "transmission" },
    { label: "Түлшний зарцуулалт", key: "fuelConsumption" },
    { label: "Үнэ", key: "price", format: formatPrice },
  ];

  if (carsToCompare.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Машинуудыг харьцуулах</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Car Headers */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${carsToCompare.length}, 1fr)` }}>
            <div className="font-medium text-muted-foreground"></div>
            {carsToCompare.map((car) => (
              <div key={car!.id} className="text-center relative">
                <button
                  onClick={() => removeFromCompare(car!.id)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <Link to={`/car/${car!.id}`} onClick={() => onOpenChange(false)}>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                    <img
                      src={car!.images.find((img) => img.category === "exterior")?.url || car!.images[0]?.url}
                      alt={car!.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-heading font-semibold hover:text-primary transition-colors">
                    {car!.name}
                  </h4>
                </Link>
              </div>
            ))}
          </div>

          {/* Specs Comparison */}
          <div className="mt-6 border-t border-border">
            {specs.map((spec, index) => (
              <div
                key={spec.key}
                className={`grid gap-4 py-3 ${index !== specs.length - 1 ? "border-b border-border" : ""}`}
                style={{ gridTemplateColumns: `200px repeat(${carsToCompare.length}, 1fr)` }}
              >
                <div className="font-medium text-muted-foreground">{spec.label}</div>
                {carsToCompare.map((car) => {
                  const value = car![spec.key as keyof typeof car];
                  const displayValue = spec.format
                    ? spec.format(value as number)
                    : String(value);
                  return (
                    <div key={car!.id} className="text-center font-medium">
                      {spec.key === "engineType" && value === "Hybrid" ? (
                        <span className="badge-hybrid">{displayValue}</span>
                      ) : spec.key === "price" ? (
                        <span className="text-primary font-bold">{displayValue}</span>
                      ) : (
                        <span>{displayValue}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={clearCompare}>
              Бүгдийг арилгах
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
