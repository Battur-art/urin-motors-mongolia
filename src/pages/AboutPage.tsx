import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactButtons } from "@/components/ContactButtons";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const AboutPage = () => {
  const features = [
    "Японоос шууд татан авалт",
    "Бүрэн оношилгоо, шалгалт",
    "Баримт бичиг бүрдүүлэлт",
    "Худалдааны дараах үйлчилгээ",
    "Зээлийн зуучлал",
    "Даатгалын зуучлал",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-card border-b border-border py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Бидний тухай
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Urin Motors нь 2015 оноос хойш Монголын зах зээлд чанартай Япон машинуудыг 
                нийлүүлж байгаа найдвартай компани юм. Бид Toyota, Lexus брэндийн хайбрид 
                болон бензин машинуудыг Японоос шууд татан авч, үйлчлүүлэгчиддээ хүргэдэг.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  Яагаад биднийг сонгох вэ?
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Бид үйлчлүүлэгчдийнхээ итгэлийг хүлээсэн, шударга үнээр чанартай машин 
                  нийлүүлдэг. 10 жилийн туршлагатай багийн гишүүд таныг зөвлөж, хамгийн 
                  тохиромжтой машиныг олоход туслана.
                </p>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-xl p-8 border border-border">
                <h3 className="font-heading text-xl font-semibold mb-6">Холбоо барих</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block">Утас</span>
                      <a href="tel:+97699889966" className="font-medium hover:text-primary transition-colors">
                        +976 99 88 99 66
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block">Имэйл</span>
                      <a href="mailto:info@urinmotors.mn" className="font-medium hover:text-primary transition-colors">
                        info@urinmotors.mn
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block">Хаяг</span>
                      <span className="font-medium">Улаанбаатар хот, Баянзүрх дүүрэг</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block">Ажлын цаг</span>
                      <span className="font-medium">Даваа - Бямба: 09:00 - 18:00</span>
                    </div>
                  </li>
                </ul>
                <ContactButtons />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 md:py-24 bg-card border-y border-border">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="font-heading text-4xl md:text-5xl font-bold text-primary block">10+</span>
                <span className="text-muted-foreground">Жилийн туршлага</span>
              </div>
              <div>
                <span className="font-heading text-4xl md:text-5xl font-bold text-primary block">5000+</span>
                <span className="text-muted-foreground">Нийлүүлсэн машин</span>
              </div>
              <div>
                <span className="font-heading text-4xl md:text-5xl font-bold text-primary block">98%</span>
                <span className="text-muted-foreground">Сэтгэл ханамж</span>
              </div>
              <div>
                <span className="font-heading text-4xl md:text-5xl font-bold text-primary block">24/7</span>
                <span className="text-muted-foreground">Дэмжлэг</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
