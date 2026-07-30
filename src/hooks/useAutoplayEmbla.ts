import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface UseAutoplayEmblaOptions {
  interval?: number;
  emblaOptions?: Parameters<typeof useEmblaCarousel>[0];
}

export function useAutoplayEmbla(options: UseAutoplayEmblaOptions = {}) {
  const { interval = 4000, emblaOptions = { loop: true } } = options;
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const id = isPaused ? undefined : window.setInterval(() => emblaApi.scrollNext(), interval);

    return () => {
      if (id !== undefined) window.clearInterval(id);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, isPaused, interval]);

  const pauseHandlers = {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
    onFocus: () => setIsPaused(true),
    onBlur: () => setIsPaused(false),
  };

  return { emblaRef, emblaApi, selected, scrollTo, isPaused, pauseHandlers } as const;
}
