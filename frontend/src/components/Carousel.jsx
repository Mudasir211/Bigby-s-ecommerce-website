import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="p-6">
    <div className="relative w-full overflow-hidden lg:h-full" {...swipeHandlers}>
      <div className="flex transition-transform duration-500 ease-in-out lg:h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full lg:h-full">
            <img src={slide} alt={`Slide ${index}`} className="object-cover w-full h-64 lg:h-full " />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button onClick={prevSlide} className="absolute p-2 -translate-y-1/2 rounded-full shadow top-1/2 left-2 bg-white/70 hover:bg-white">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute p-2 -translate-y-1/2 rounded-full shadow top-1/2 right-2 bg-white/70 hover:bg-white">
        <ChevronRight />
      </button>

      {/* Indicators */}
      <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'} transition-colors duration-300`}
          />
        ))}
      </div>
    </div></div>
  );
};

export default Carousel;
