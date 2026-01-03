import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ContactButtonsProps {
  carName?: string;
  className?: string;
}

export function ContactButtons({ carName, className = "" }: ContactButtonsProps) {
  const phoneNumber = "+97699889966";
  const whatsappMessage = carName 
    ? `Сайн байна у|у! ${carName} машины талаар мэдээлэл авмаар байна.`
    : "Сайн байна уу! Машины талаар мэдээлэл авмаар байна.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={`tel:${phoneNumber}`} className="flex-1">
        <Button className="w-full gap-2 uppercase tracking-wider rounded-none h-14" size="lg">
          <Phone className="h-5 w-5" />
          Залгах
        </Button>
      </motion.a>
      <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
        <Button variant="outline" className="w-full gap-2 rounded-none h-14 uppercase tracking-wider" size="lg">
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </Button>
      </motion.a>
    </div>
  );
}
