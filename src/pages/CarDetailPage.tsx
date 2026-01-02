import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Scale, Calendar, Gauge, Fuel, Cog, Car, Settings, Share2 } from "lucide-react";
import { cars, formatPrice, formatMileage } from "@/data/cars";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";
import { ContactButtons } from "@/components/ContactButtons";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const car = cars.find((c) => c.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare, compareList } = useCompare();

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-16 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Машин олдсонгүй</h1>
          <Link to="/cars">
            <Button>Машинууд руу буцах</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const favorite = isFavorite(car.id);
  const inCompare = isInCompare(car.id);

  const handleFavoriteClick = () => {
    toggleFavorite(car.id);
    toast.success(favorite ? "Хадгалсан жагсаалтаас хасагдлаа" : "Хадгалсан жагсаалтад нэмэгдлээ");
  };

  const handleCompareClick = () => {
    if (!inCompare && compareList.length >= 3) {
      toast.error("Хамгийн ихдээ 3 машин харьцуулах боломжтой");
      return;
    }
    toggleCompare(car.id);
    toast.success(inCompare ? "Харьцуулах жагсаалтаас хасагдлаа" : "Харьцуулах жагсаалтад нэмэгдлээ");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: car.name,
          text: `${car.name} - ${formatPrice(car.price)}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Холбоос хуулагдлаа");
    }
  };

  const specs = [
    { icon: Calendar, label: "Үйлдвэрлэсэн он", value: `${car.year}` },
    { icon: Gauge, label: "Гүйлт", value: formatMileage(car.mileage) },
    { icon: Fuel, label: "Хөдөлгүүр", value: car.engineType === "Hybrid" ? "Хайбрид" : "Бензин" },
    { icon: Cog, label: "Хөтлөгч", value: car.driveType },
    { icon: Settings, label: "Хурдны хайрцаг", value: car.transmission },
    { icon: Car, label: "Түлшний зарцуулалт", value: car.fuelConsumption },
  ];

  // Related cars (same brand, excluding current)
  const relatedCars = cars
    .filter((c) => c.brand === car.brand && c.id !== car.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Нүүр</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-foreground transition-colors">Машинууд</Link>
          <span>/</span>
          <span className="text-foreground">{car.name}</span>
        </nav>

        {/* Back Button (Mobile) */}
        <Link to="/cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 md:hidden">
          <ArrowLeft className="h-4 w-4" />
          Буцах
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={car.images} carName={car.name} />
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold">{car.name}</h1>
                  <p className="text-muted-foreground">{car.brand} • {car.model}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavoriteClick}
                    className={favorite ? "border-primary text-primary" : ""}
                  >
                    <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCompareClick}
                    className={inCompare ? "border-primary text-primary" : ""}
                  >
                    <Scale className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mt-3">
                {car.engineType === "Hybrid" && (
                  <span className="badge-hybrid">Hybrid</span>
                )}
                {car.featured && (
                  <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-medium">
                    Онцлох
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <span className="text-muted-foreground text-sm block mb-1">Үнэ</span>
              <span className="font-heading text-3xl md:text-4xl font-bold text-primary">
                {formatPrice(car.price)}
              </span>
            </div>

            {/* Specs Grid */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading font-semibold text-lg mb-4">Техникийн үзүүлэлт</h3>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <spec.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading font-semibold text-lg mb-3">Тайлбар</h3>
              <p className="text-muted-foreground leading-relaxed">{car.description}</p>
            </div>

            {/* Contact Buttons */}
            <ContactButtons carName={car.name} />
          </div>
        </div>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-6">Холбоотой машинууд</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCars.map((relatedCar) => (
                <CarCard key={relatedCar.id} car={relatedCar} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CarDetailPage;
