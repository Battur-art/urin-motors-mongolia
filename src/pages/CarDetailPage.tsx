import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Scale, Calendar, Gauge, Fuel, Cog, Car, Settings, Share2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice, formatMileage } from "@/data/cars";
import { useCars } from "@/contexts/CarsContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageGallery } from "@/components/ImageGallery";
import { ContactButtons } from "@/components/ContactButtons";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cars } = useCars();
  const car = cars.find((c) => c.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, toggleCompare, compareList } = useCompare();

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-wide py-32 text-center">
          <h1 className="text-headline mb-6">Машин олдсонгүй</h1>
          <Link to="/cars">
            <Button className="uppercase tracking-wider">Машинууд руу буцах</Button>
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
    { icon: Calendar, label: "Үйлдвэрлэсэн он", value: car.yearEnd && car.yearEnd !== car.year ? `${car.year}–${car.yearEnd}` : `${car.year}` },
    { icon: Gauge, label: "Гүйлт", value: formatMileage(car.mileage) },
    { icon: Fuel, label: "Хөдөлгүүр", value: car.engineType === "Hybrid" ? "Хайбрид" : "Бензин" },
    { icon: Cog, label: "Хөтлөгч", value: car.driveType },
    { icon: Settings, label: "Хурдны хайрцаг", value: car.transmission },
    { icon: Car, label: "Түлшний зарцуулалт", value: car.fuelConsumption },
  ];

  const relatedCars = cars
    .filter((c) => c.brand === car.brand && c.id !== car.id)
    .slice(0, 3);


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-24">
        {/* Breadcrumb */}
        <div className="container-wide mb-6">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground transition-colors">Нүүр</Link>
            <span>/</span>
            <Link to="/cars" className="hover:text-foreground transition-colors">Машинууд</Link>
            <span>/</span>
            <span className="text-foreground">{car.name}</span>
          </motion.nav>
        </div>

        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <AnimatedSection>
              <ImageGallery images={car.images} carName={car.name} />
            </AnimatedSection>

            {/* Car Details */}
            <div className="space-y-8">
              {/* Header */}
              <AnimatedSection delay={0.1}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex gap-2 mb-4">
                      {car.engineType === "Hybrid" && (
                        <span className="badge-hybrid">Hybrid</span>
                      )}
                      {car.featured && (
                        <span className="bg-foreground text-background px-3 py-1 text-xs font-medium uppercase tracking-wider">
                          Онцлох
                        </span>
                      )}
                    </div>
                    <h1 className="text-headline mb-2">{car.name}</h1>
                    <p className="text-muted-foreground text-lg">{car.brand} • {car.model}</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Price */}
              <AnimatedSection delay={0.2}>
                <div className="border-y border-border py-6">
                  <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground block mb-2">Үнэ</span>
                  <span className="font-heading text-4xl md:text-5xl font-light">
                    {formatPrice(car.price)}
                  </span>
                </div>
              </AnimatedSection>

              {/* Actions */}
              <AnimatedSection delay={0.3}>
                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      variant={favorite ? "default" : "outline"}
                      size="lg"
                      onClick={handleFavoriteClick}
                      className="w-full gap-2 uppercase tracking-wider rounded-none"
                    >
                      <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
                      Хадгалах
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      variant={inCompare ? "default" : "outline"}
                      size="lg"
                      onClick={handleCompareClick}
                      className="w-full gap-2 uppercase tracking-wider rounded-none"
                    >
                      <Scale className="h-4 w-4" />
                      Харьцуулах
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" onClick={handleShare} className="rounded-none">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Specs Grid */}
              <AnimatedSection delay={0.4}>
                <div className="border border-border p-6">
                  <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">Техникийн үзүүлэлт</h3>
                  <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.05}>
                    {specs.map((spec) => (
                      <StaggerItem key={spec.label}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0">
                            <spec.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                          </div>
                          <div>
                            <span className="text-muted-foreground text-sm block mb-1">{spec.label}</span>
                            <span className="font-medium">{spec.value}</span>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </AnimatedSection>

              {/* Description */}
              <AnimatedSection delay={0.5}>
                <div className="border border-border p-6">
                  <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Тайлбар</h3>
                  <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                </div>
              </AnimatedSection>

              {/* Contact Buttons */}
              <AnimatedSection delay={0.6}>
                <ContactButtons carName={car.name} />
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Related Cars */}
        {relatedCars.length > 0 && (
          <section className="container-wide mt-24">
            <AnimatedSection className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground block mb-4">
                  Холбоотой
                </span>
                <h2 className="text-headline">Ижил төстэй машинууд</h2>
              </div>
              <Link
                to="/cars"
                className="group flex items-center gap-2 text-sm uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
              >
                Бүгдийг үзэх
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCars.map((relatedCar, index) => (
                <CarCard key={relatedCar.id} car={relatedCar} index={index} />
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
