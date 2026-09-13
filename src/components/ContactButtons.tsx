import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ContactButtonsProps {
  carName?: string;
  className?: string;
}

export function ContactButtons({ carName, className = "" }: ContactButtonsProps) {
  const phone1 = "+97680222270";
  const phone2 = "+97699000235";
  const whatsappMessage = carName 
    ? `Сайн байна уу! ${carName} машины талаар мэдээлэл авмаар байна.`
    : "Сайн байна уу! Машины талаар мэдээлэл авмаар байна.";
  
  const whatsappUrl = `https://wa.me/97680222270?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={`tel:${phone1}`} className="w-full">
          <Button className="w-full gap-2 uppercase tracking-wider rounded-none h-12 text-sm" size="lg">
            <Phone className="h-4 w-4" />
            8022 2270
          </Button>
        </motion.a>
        <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={`tel:${phone2}`} className="w-full">
          <Button className="w-full gap-2 uppercase tracking-wider rounded-none h-12 text-sm" size="lg">
            <Phone className="h-4 w-4" />
            9900 0235
          </Button>
        </motion.a>
      </div>
      <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
        <Button variant="outline" className="w-full gap-2 rounded-none h-12 uppercase tracking-wider text-sm" size="lg">
          <MessageCircle className="h-4 w-4" />
          WhatsApp-аар холбогдох
        </Button>
      </motion.a>
    </div>
  );
}
