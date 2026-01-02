import { Link } from "react-router-dom";
import { Heart, Scale, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Car, formatPrice, formatMileage } from "@/data/cars";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CarCardProps {
  car: Car;
  index?: number;
}

export function CarCard({ car, index = 0 }: CarCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link to={`/car/${car.id}`} className="group block">
        <article className="relative">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4">
            <motion.img
              src={mainImage}
              alt={car.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-foreground/10 transition-opacity"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {car.engineType === "Hybrid" && (
                <span className="badge-hybrid">Hybrid</span>
              )}
              {car.featured && (
                <span className="bg-foreground text-background px-3 py-1 text-xs font-medium uppercase tracking-wider">
                  Онцлох
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="secondary"
                  size="icon"
                  className={`h-10 w-10 rounded-none bg-background/90 backdrop-blur-sm border-0 ${
                    favorite ? "text-foreground" : ""
                  }`}
                  onClick={handleFavoriteClick}
                >
                  <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="secondary"
                  size="icon"
                  className={`h-10 w-10 rounded-none bg-background/90 backdrop-blur-sm border-0 ${
                    inCompare ? "text-foreground" : ""
                  }`}
                  onClick={handleCompareClick}
                >
                  <Scale className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            {/* View indicator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute bottom-4 right-4"
            >
              <div className="w-10 h-10 bg-background flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg font-medium group-hover:opacity-60 transition-opacity">
                  {car.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {car.year} • {formatMileage(car.mileage)}
                </p>
              </div>
              <span className="font-heading text-lg font-medium">
                {formatPrice(car.price)}
              </span>
            </div>

            {/* Specs */}
            <div className="flex gap-4 text-xs text-muted-foreground uppercase tracking-wider pt-2">
              <span>{car.engineType}</span>
              <span>•</span>
              <span>{car.driveType}</span>
              <span>•</span>
              <span>{car.transmission}</span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
