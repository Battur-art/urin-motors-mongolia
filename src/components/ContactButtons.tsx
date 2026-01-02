import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactButtonsProps {
  carName?: string;
  className?: string;
}

export function ContactButtons({ carName, className = "" }: ContactButtonsProps) {
  const phoneNumber = "+97699999999";
  const whatsappMessage = carName 
    ? `Сайн байна уу! ${carName} машины талаар мэдээлэл авмаар байна.`
    : "Сайн байна уу! Машины талаар мэдээлэл авмаар байна.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a href={`tel:${phoneNumber}`} className="flex-1">
        <Button className="w-full gap-2" size="lg">
          <Phone className="h-5 w-5" />
          Залгах
        </Button>
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
        <Button variant="outline" className="w-full gap-2 border-success text-success hover:bg-success hover:text-background" size="lg">
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </Button>
      </a>
    </div>
  );
}
