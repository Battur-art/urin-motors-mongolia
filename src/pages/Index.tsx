import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Award, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";
import { cars } from "@/data/cars";
import { CarCard } from "@/components/CarCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredCars = cars.filter((car) => car.featured).slice(0, 3);

  const features = [
    {
      icon: Shield,
      title: "Баталгаат чанар",
      description: "Бүх машинууд оношилгоо хийгдсэн, бүрэн шалгагдсан.",
    },
    {
      icon: Truck,
      title: "Япон импорт",
      description: "Японоос шууд татан авсан, анхны эзэмшигчийн машинууд.",
    },
    {
      icon: Award,
      title: "Найдвартай үйлчилгээ",
      description: "10+ жилийн туршлагатай, мянга мянган сэтгэл ханамжтай үйлчлүүлэгчид.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Toyota Prius"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>
          
          <div className="container-custom relative py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                Монголын #1 Хайбрид Машины Дэлгүүр
              </span>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
                Чанартай Япон машинуудын{" "}
                <span className="text-gradient">найдвартай</span> эх үүсвэр
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up delay-100">
                Toyota, Lexus брэндийн хайбрид болон бензин машинуудыг Японоос шууд татан авч, 
                Монголын зах зээлд нийлүүлж байна.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
                <Link to="/cars">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Машинууд үзэх
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+97699999999">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Холбоо барих
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card border-y border-border">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-muted/50"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                  Онцлох машинууд
                </h2>
                <p className="text-muted-foreground">
                  Манай хамгийн эрэлттэй, чанартай машинууд
                </p>
              </div>
              <Link to="/cars" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline">
                Бүгдийг үзэх
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link to="/cars">
                <Button variant="outline" className="gap-2">
                  Бүгдийг үзэх
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-dark to-slate-medium text-foreground dark:from-card dark:to-background">
          <div className="container-custom text-center">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-background dark:text-foreground">
              Таны хүссэн машиныг олж өгнө
            </h2>
            <p className="text-background/80 dark:text-muted-foreground max-w-2xl mx-auto mb-8">
              Хэрэв та тодорхой загвар, өнгө, тоноглолтой машин хайж байгаа бол бидэнтэй холбогдоно уу. 
              Япон дахь түншүүдээрээ дамжуулан таны захиалгыг биелүүлнэ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/97699999999" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  WhatsApp-р холбогдох
                </Button>
              </a>
              <a href="tel:+97699999999">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  +976 9999 9999
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
