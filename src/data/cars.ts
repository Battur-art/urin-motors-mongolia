import prius41Exterior from "@/assets/cars/prius-41-exterior-1.jpg";
import prius41Interior from "@/assets/cars/prius-41-interior-1.jpg";
import prius41Engine from "@/assets/cars/prius-41-engine-1.jpg";
import lexusRxExterior from "@/assets/cars/lexus-rx-exterior-1.jpg";
import harrierExterior from "@/assets/cars/harrier-exterior-1.jpg";
import camryExterior from "@/assets/cars/camry-exterior-1.jpg";
import crownExterior from "@/assets/cars/crown-exterior-1.jpg";
import saiExterior from "@/assets/cars/sai-exterior-1.jpg";

export interface CarImage {
  url: string;
  category: "exterior" | "interior" | "engine";
}

export interface Car {
  id: string;
  name: string;
  brand: "Toyota" | "Lexus";
  model: string;
  year: number;
  mileage: number;
  engineType: "Hybrid" | "Gasoline";
  driveType: "AWD" | "FWD";
  transmission: string;
  fuelConsumption: string;
  price: number;
  description: string;
  images: CarImage[];
  featured?: boolean;
}

export const cars: Car[] = [
  {
    id: "toyota-prius-41-2019",
    name: "Toyota Prius 41",
    brand: "Toyota",
    model: "Prius 41",
    year: 2019,
    mileage: 45000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "CVT автомат",
    fuelConsumption: "3.5л / 100км",
    price: 42000000,
    description: "Япон улсаас шууд татан авсан, маш сайн нөхцөлтэй Toyota Prius 41. Хайбрид технологи нь түлш хэмнэлттэй, байгаль орчинд ээлтэй. Бүх оношилгоо хийгдсэн, хуудас бичиг баримт бүрдүүлсэн.",
    images: [
      { url: prius41Exterior, category: "exterior" },
      { url: prius41Exterior, category: "exterior" },
      { url: prius41Exterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
      { url: prius41Engine, category: "engine" },
    ],
    featured: true,
  },
  {
    id: "lexus-rx-450h-2020",
    name: "Lexus RX 450h",
    brand: "Lexus",
    model: "RX 450h",
    year: 2020,
    mileage: 32000,
    engineType: "Hybrid",
    driveType: "AWD",
    transmission: "CVT автомат",
    fuelConsumption: "5.8л / 100км",
    price: 98000000,
    description: "Дээд зэрэглэлийн Lexus RX 450h. AWD хөтлөгчтэй, Монголын уур амьсгалд тохиромжтой. Бүрэн арьсан салон, Mark Levinson аудио систем, 360 камер.",
    images: [
      { url: lexusRxExterior, category: "exterior" },
      { url: lexusRxExterior, category: "exterior" },
      { url: lexusRxExterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
      { url: prius41Engine, category: "engine" },
    ],
    featured: true,
  },
  {
    id: "toyota-harrier-2021",
    name: "Toyota Harrier",
    brand: "Toyota",
    model: "Harrier",
    year: 2021,
    mileage: 28000,
    engineType: "Hybrid",
    driveType: "AWD",
    transmission: "CVT автомат",
    fuelConsumption: "4.8л / 100км",
    price: 78000000,
    description: "Шинэ загварын Toyota Harrier. Загварлаг дизайн, өргөн салон, хайбрид хөдөлгүүр. Toyota Safety Sense бүрэн багцтай.",
    images: [
      { url: harrierExterior, category: "exterior" },
      { url: harrierExterior, category: "exterior" },
      { url: harrierExterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
    ],
    featured: true,
  },
  {
    id: "toyota-camry-2020",
    name: "Toyota Camry",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 52000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "CVT автомат",
    fuelConsumption: "4.2л / 100км",
    price: 55000000,
    description: "Toyota Camry Hybrid. Бизнес зэрэглэлийн седан, тав тухтай суудал, JBL аудио систем. Япон улсаас татсан, бүх баримт бичиг бэлэн.",
    images: [
      { url: camryExterior, category: "exterior" },
      { url: camryExterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
    ],
  },
  {
    id: "toyota-crown-2019",
    name: "Toyota Crown",
    brand: "Toyota",
    model: "Crown",
    year: 2019,
    mileage: 48000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "8 шатлалт автомат",
    fuelConsumption: "5.0л / 100км",
    price: 65000000,
    description: "Toyota Crown - Японы дотоод зах зээлийн шилдэг седан. Дээд зэрэглэлийн тоноглол, арьсан салон, adaptive suspension.",
    images: [
      { url: crownExterior, category: "exterior" },
      { url: crownExterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
    ],
  },
  {
    id: "toyota-sai-2018",
    name: "Toyota Sai",
    brand: "Toyota",
    model: "Sai",
    year: 2018,
    mileage: 62000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "CVT автомат",
    fuelConsumption: "4.0л / 100км",
    price: 35000000,
    description: "Toyota Sai - эдийн засагтай хайбрид седан. Түлш хэмнэлттэй, найдвартай. Гэр бүлийн хэрэгцээнд тохиромжтой.",
    images: [
      { url: saiExterior, category: "exterior" },
      { url: saiExterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
    ],
  },
  {
    id: "toyota-prius-30-2017",
    name: "Toyota Prius 30",
    brand: "Toyota",
    model: "Prius 30",
    year: 2017,
    mileage: 78000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "CVT автомат",
    fuelConsumption: "3.8л / 100км",
    price: 28000000,
    description: "Алдартай Toyota Prius 30. Найдвартай хайбрид систем, засвар үйлчилгээ хялбар. Анхны эзэмшигчээс.",
    images: [
      { url: prius41Exterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
    ],
  },
  {
    id: "toyota-prius-40-2018",
    name: "Toyota Prius 40",
    brand: "Toyota",
    model: "Prius 40",
    year: 2018,
    mileage: 55000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "CVT автомат",
    fuelConsumption: "3.6л / 100км",
    price: 38000000,
    description: "Toyota Prius Alpha (40 series). 7 суудалтай өргөтгөсөн загвар. Гэр бүлд тохиромжтой, өргөн ачааны хэсэг.",
    images: [
      { url: prius41Exterior, category: "exterior" },
      { url: prius41Interior, category: "interior" },
      { url: prius41Engine, category: "engine" },
    ],
  },
];

export const brands = ["Toyota", "Lexus"] as const;
export const models = ["Prius 30", "Prius 40", "Prius 41", "Harrier", "Sai", "Camry", "Crown", "RX 450h"] as const;
export const engineTypes = ["Hybrid", "Gasoline"] as const;
export const driveTypes = ["AWD", "FWD"] as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("mn-MN").format(price) + "₮";
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("mn-MN").format(mileage) + " км";
}
