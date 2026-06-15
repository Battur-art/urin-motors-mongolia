import lexusRxExterior1 from "@/assets/cars/lexus-rx-exterior-2.jpg";
import lexusRxExterior2 from "@/assets/cars/lexus-rx-exterior-1.jpg";
import lexusRxExterior3 from "@/assets/cars/lexus-rx-exterior-3.jpg";
import lexusRxInterior1 from "@/assets/cars/lexus-rx-interior-1.jpg";
import lexusRxInterior2 from "@/assets/cars/lexus-rx-interior-2.jpg";
import prius41Exterior from "@/assets/cars/prius-41-exterior-1.jpg";
import harrierExterior from "@/assets/cars/harrier-exterior-1.jpg"; 
import crownExterior from "@/assets/cars/crown-exterior-1.jpg";
import crownExterior2 from "@/assets/cars/crown-exterior-2.jpg";
import crownExterior3 from "@/assets/cars/crown-exterior-3.jpg";
import crownInterior1 from "@/assets/cars/crown-interior-1.jpg";
import crownInterior2 from "@/assets/cars/crown-interior-2.jpg";
import saiExterior from "@/assets/cars/sai-exterior-1.jpg";
import prius55Exterior from "@/assets/cars/prius-55-exterior-1.jpg";
import prius40Exterior from "@/assets/cars/prius-40-exterior-1.jpg";
import prius30Exterior from "@/assets/cars/prius-30-exterior-1.png";
import prius30Exterior2 from "@/assets/cars/prius-30-exterior-2.png";

export interface CarImage {
  url: string;
  category: "exterior" | "engine" | "interior";
}

export interface Car {
  id: string;
  name: string;
  brand: "Toyota" | "Lexus";
  model: string;
  year: number;
  yearEnd?: number;
  mileage: number;
  engineType: "Hybrid" | "Gasoline" | "Gasoline 2.5 turbo";
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
    ],
    featured: true,
  },
  {
    id: "lexus-rx-200t-2020",
    name: "Lexus RX 200t sport",
    brand: "Lexus",
    model: "RX 200t",
    year: 2020,
    mileage: 70000,
    engineType: "Gasoline 2.5 turbo",
    driveType: "AWD",
    transmission: "8 шатлалт автомат",
    fuelConsumption: "12л / 100км",
    price: 98000000,
    description: "Дээд зэрэглэлийн Lexus RX 200t. AWD хөтлөгчтэй, Монголын уур амьсгалд тохиромжтой. Бүрэн арьсан салон, Mark Levinson аудио систем, 360 камер.",
    images: [
      { url: lexusRxExterior1, category: "exterior" },
      { url: lexusRxExterior2, category: "exterior" },
      { url: lexusRxExterior3, category: "exterior" },
      { url: lexusRxInterior1, category: "interior" },
      { url: lexusRxInterior2, category: "interior" },
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
    ],
    featured: true,
  },
 
  {
    id: "toyota-crown-2023",
    name: "Toyota Crown",
    brand: "Toyota",
    model: "Crown",
    year: 2023,
    mileage: 23000,
    engineType: "Hybrid",
    driveType: "AWD",
    transmission: "6 шатлалт автомат",
    fuelConsumption: "12л / 100км",
    price: 120000000,
    description: "Toyota Crown - Японы дотоод зах зээлийн шилдэг седан. Дээд зэрэглэлийн тоноглол, арьсан салон, adaptive suspension.",
    images: [
      { url: crownExterior, category: "exterior" },
      { url: crownExterior2, category: "exterior" },
      { url: crownExterior3, category: "exterior" },
      { url: crownInterior1, category: "interior" },
      { url: crownInterior2, category: "interior" },
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
      { url: prius30Exterior, category: "exterior" },
      { url: prius30Exterior2, category: "exterior" },
    ],
  },
  
  {
    id: "toyota-prius-55-2018",
    name: "Toyota Prius 55",
    brand: "Toyota",
    model: "Prius 55",
    year: 2018,
    mileage: 65000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "CVT автомат",
    fuelConsumption: "4.2л / 100км",
    price: 42000000,
    description: "Toyota Prius 55 Hybrid. Найдвартай хайбрид систем, засвар үйлчилгээ хялбар. Анхны эзэмшигчээс.",
    images: [
      { url: prius55Exterior, category: "exterior" },
      { url: prius55Exterior, category: "exterior" },
    ],
  },
  {
    id: "toyota-prius-40-2015",
    name: "Toyota Prius 40",
    brand: "Toyota",
    model: "Prius 40",
    year: 2015,
    mileage: 45000,
    engineType: "Hybrid",
    driveType: "FWD",
    transmission: "CVT автомат",
    fuelConsumption: "3.5л / 100км",
    price: 42000000,
    description: "Япон улсаас шууд татан авсан, маш сайн нөхцөлтэй Toyota Prius 40. Хайбрид технологи нь түлш хэмнэлттэй, байгаль орчинд ээлтэй. Бүх оношилгоо хийгдсэн, хуудас бичиг баримт бүрдүүлсэн.",
    images: [
      { url: prius40Exterior, category: "exterior" },
      { url: prius40Exterior, category: "exterior" },
    ],
    featured: true,
  },
];

export const brands = ["Toyota", "Lexus"] as const;
export const models = ["Prius 30", "Prius 40", "Prius 41", "Prius 55", "Harrier", "Sai", "Crown", "RX 200t"] as const;
export const engineTypes = ["Hybrid", "Gasoline", "Gasoline 2.5 turbo"] as const;
export const driveTypes = ["AWD", "FWD"] as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("mn-MN").format(price) + "₮";
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("mn-MN").format(mileage) + " км";
}
