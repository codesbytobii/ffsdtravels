import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Importing Heroicons
import headshot1 from "../../assets/img/headshot1.jpg";
import headshot2 from "../../assets/img/headshot1.jpg";
import headshot3 from "../../assets/img/headshot1.jpg";

interface CardProps {
  img: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ img, title, description }) => {
  return (
    <div className="bg-red-100 shadow-lg rounded-lg p-6 max-w-2xl mx-auto hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-row gap-8 h-full items-center justify-center">
        <img src={img} alt={`image`} className="h-24 w-24 rounded-full object-cover border" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const CarouselCards: React.FC = () => {
  const cards = [
    {
      img: headshot2,
      name: "Osayaba Andrew Ize-Iyamu",
      review:
        " I had an amazing experience booking my vacation with FFSD TRAVELS. From the moment I reached out, their customer service was exceptional.",
    },
    {
      img: headshot3,
      name: "Olaoluwa Slawn",
      review:
        " I had an amazing experience booking my vacation with FFSD TRAVELS. From the moment I reached out, their customer service was exceptional.",
    },
    {
      img: headshot1,
      name: "Bowofoluwa Olufisayo Odunsi",
      review:
        " I had an amazing experience booking my vacation with FFSD TRAVELS. From the moment I reached out, their customer service was exceptional.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-10">
      <div className="relative flex items-center">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-primaryRed hover:bg-red-300 text-gray-800 font-bold p-2 rounded-full focus:outline-none z-20"
          style={{ transform: 'translateX(-50%)' }}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        {/* Card Container */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <Card img={card.img} title={card.name} description={card.review} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 bg-primaryRed hover:bg-red-300 text-gray-800 font-bold p-2 rounded-full focus:outline-none"
          style={{ transform: 'translateX(50%)' }}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default CarouselCards;
