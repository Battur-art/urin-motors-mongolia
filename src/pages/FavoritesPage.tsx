import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { cars } from "@/data/cars";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  const favoriteCars = favorites
    .map((id) => cars.find((car) => car.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              Хадгалсан машинууд
            </h1>
            <p className="text-muted-foreground">
              {favoriteCars.length} машин хадгалсан байна
            </p>
          </div>
        </div>

        {favoriteCars.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">
              Хадгалсан машин байхгүй байна
            </h2>
            <p className="text-muted-foreground mb-6">
              Таалагдсан машинуудаа хадгалаарай, дараа нь энд харагдана
            </p>
            <Link to="/cars">
              <Button>Машинууд үзэх</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCars.map((car) => (
              <CarCard key={car!.id} car={car!} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
