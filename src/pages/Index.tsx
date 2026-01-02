import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Award, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-car.jpg";
import { cars } from "@/data/cars";
import { CarCard } from "@/components/CarCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  AnimatedSection,
  AnimatedText,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

const Index = () => {
  const featuredCars = cars.filter((car) => car.featured).slice(0, 3);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div
            style={{ y: heroImageY, scale: heroScale }}
            className="absolute inset-0"
          >
            <img
              src={heroImage}
              alt="Toyota Prius"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative h-full flex items-end pb-24 md:pb-32"
          >
            <div className="container-wide w-full">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6"
                >
                  <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Монголын #1 Хайбрид Машины Дэлгүүр
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-display mb-8"
                >
                  Чанартай Япон
                  <br />
                  машинууд
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/cars">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="gap-3 uppercase tracking-wider px-8">
                        Машинууд үзэх
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                  <a href="tel:+97699999999">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" variant="outline" className="uppercase tracking-wider px-8">
                        Холбоо барих
                      </Button>
                    </motion.div>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-16 bg-gradient-to-b from-foreground to-transparent"
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 md:py-32 border-b border-border">
          <div className="container-wide">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={feature.title}>
                  <div className="group">
                    <div className="line-accent mb-8 group-hover:w-20 transition-all duration-500" />
                    <feature.icon className="h-8 w-8 mb-6 opacity-60" strokeWidth={1} />
                    <h3 className="font-heading text-xl font-medium mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section className="py-24 md:py-32">
          <div className="container-wide">
            <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground block mb-4">
                  Онцлох
                </span>
                <h2 className="text-headline">
                  Шилдэг машинууд
                </h2>
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
              {featuredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-foreground text-background">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection>
                <span className="text-sm uppercase tracking-[0.2em] opacity-60 block mb-6">
                  Захиалга
                </span>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="text-headline mb-8">
                  Таны хүссэн машиныг
                  <br />
                  олж өгнө
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-lg opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Хэрэв та тодорхой загвар, өнгө, тоноглолтой машин хайж байгаа бол бидэнтэй холбогдоно уу.
                  Япон дахь түншүүдээрээ дамжуулан таны захиалгыг биелүүлнэ.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/97699999999" target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-background text-foreground hover:bg-background/90 uppercase tracking-wider px-8"
                    >
                      WhatsApp-р холбогдох
                    </Button>
                  </motion.div>
                </a>
                <a href="tel:+97699999999">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-background/30 text-background hover:bg-background/10 uppercase tracking-wider px-8"
                    >
                      +976 9999 9999
                    </Button>
                  </motion.div>
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Brand Marquee */}
        <section className="py-16 border-b border-border overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 whitespace-nowrap"
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="text-4xl font-heading font-light opacity-20">TOYOTA</span>
                <span className="text-4xl font-heading font-light opacity-20">LEXUS</span>
                <span className="text-4xl font-heading font-light opacity-20">HYBRID</span>
                <span className="text-4xl font-heading font-light opacity-20">JAPAN</span>
              </div>
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
