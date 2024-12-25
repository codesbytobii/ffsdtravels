import React from 'react';
import CarouselCards from './CarouselCards';

const Review: React.FC =() => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="section-width">
        <h1 className="text-center text-5xl font-semibold">Client Review</h1>
        <h2 className="text-center m-auto text-[17px] font-medium mt-5">Discover What Our Clients Have to Say About Their Experiences</h2>
        <CarouselCards />
      </div>
    </div>
  )
}

export default Review;