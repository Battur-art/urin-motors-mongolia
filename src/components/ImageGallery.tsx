import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { CarImage } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: CarImage[];
  carName: string;
}

type ImageCategory = "all" | "exterior" | "interior" | "engine";

const categoryLabels: Record<ImageCategory, string> = {
  all: "Бүгд",
  exterior: "Гадна",
  interior: "Дотор",
  engine: "Хөдөлгүүр",
};

export function ImageGallery({ images, carName }: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ImageCategory>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter((img) => img.category === activeCategory);

  const categories: ImageCategory[] = ["all", "exterior", "interior", "engine"];
  const availableCategories = categories.filter(
    (cat) => cat === "all" || images.some((img) => img.category === cat)
  );

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const handleCategoryChange = (category: ImageCategory) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  if (filteredImages.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {availableCategories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "secondary"}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className="rounded-full"
          >
            {categoryLabels[category]}
            <span className="ml-1 text-xs opacity-70">
              ({category === "all" ? images.length : images.filter((img) => img.category === category).length})
            </span>
          </Button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[16/10] bg-muted rounded-xl overflow-hidden group">
        <img
          src={filteredImages[currentIndex]?.url}
          alt={`${carName} - ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300"
          onClick={openFullscreen}
        />

        {/* Zoom Icon */}
        <button
          onClick={openFullscreen}
          className="absolute top-4 right-4 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="h-5 w-5" />
        </button>

        {/* Navigation Arrows */}
        {filteredImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm text-sm font-medium">
          {currentIndex + 1} / {filteredImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {filteredImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filteredImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
            >
              <img
                src={image.url}
                alt={`${carName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-xl border-0">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-card hover:bg-secondary transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <img
              src={filteredImages[currentIndex]?.url}
              alt={`${carName} - ${currentIndex + 1}`}
              className={`max-w-full max-h-full object-contain cursor-pointer transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-card hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Thumbnails in Fullscreen */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {filteredImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? "border-primary"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
