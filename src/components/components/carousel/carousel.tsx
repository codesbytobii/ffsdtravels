import {
  Carousel as UiCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselProps = {
  slides: string[];
};

export default function Carousel({ slides }: CarouselProps) {
  if (!Array.isArray(slides)) {
    return <div>Error: slides prop is not an array</div>;
  }

  return (
    <>
      <div className="overflow-hidden relative">
        <div className="w-full">
          <UiCarousel>
            <CarouselContent>
              {slides.map((s, index) => (
                <CarouselItem className="basis-1/2" key={index}>
                  <div className="p-1">
                    <img
                      src={s}
                      alt={`Slide ${index + 1}`}
                      key={index}
                      className="w-full h-[270px] object-full rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </UiCarousel>
        </div>
      </div>
    </>
  );
}
