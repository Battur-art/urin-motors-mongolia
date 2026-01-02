import { Link } from "react-router-dom";
import { Heart, Scale, Fuel, Gauge, Calendar, Cog } from "lucide-react";
import { Car, formatPrice, formatMileage } from "@/data/cars";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare, compareList } = useCompare();
  const favorite = isFavorite(car.id);
  const inCompare = isInCompare(car.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car.id);
    toast.success(favorite ? "Хадгалсан жагсаалтаас хасагдлаа" : "Хадгалсан жагсаалтад нэмэгдлээ");
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCompare && compareList.length >= 3) {
      toast.error("Хамгийн ихдээ 3 машин харьцуулах боломжтой");
      return;
    }
    toggleCompare(car.id);
    toast.success(inCompare ? "Харьцуулах жагсаалтаас хасагдлаа" : "Харьцуулах жагсаалтад нэмэгдлээ");
  };

  const mainImage = car.images.find((img) => img.category === "exterior")?.url || car.images[0]?.url;

  return (
    <Link to={`/car/${car.id}`} className="group">
      <article className="bg-card rounded-xl overflow-hidden border border-border card-hover">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={mainImage}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {car.engineType === "Hybrid" && (
              <span className="badge-hybrid">Hybrid</span>
            )}
            {car.featured && (
              <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                Онцлох
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className={`h-9 w-9 rounded-full shadow-md transition-colors ${
                favorite ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-primary/10"
              }`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className={`h-9 w-9 rounded-full shadow-md transition-colors ${
                inCompare ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-primary/10"
              }`}
              onClick={handleCompareClick}
            >
              <Scale className="h-4 w-4" />
            </Button>
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-3 right-3 bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
            <span className="font-heading font-bold text-lg text-primary">{formatPrice(car.price)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {car.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{car.brand} • {car.model}</p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{car.year} он</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span>{formatMileage(car.mileage)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Fuel className="h-4 w-4" />
              <span>{car.fuelConsumption}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cog className="h-4 w-4" />
              <span>{car.driveType}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
