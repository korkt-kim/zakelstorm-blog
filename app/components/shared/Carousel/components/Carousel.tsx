import {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ComponentProps,
  type PropsWithChildren,
} from 'react';
import { useCarousel } from '../hooks/useCarousel';

export interface CarouselHandle {
  onClickLeft: () => void;
  onClickRight: () => void;
}

export interface CarouselProps {
  defaultIndex?: number;
  onChange?: (currentIndex: number) => void;
}

export const Carousel = forwardRef<
  CarouselHandle,
  PropsWithChildren<Omit<ComponentProps<'div'>, 'onChange'>> & CarouselProps
>(({ children, style, className, onChange, defaultIndex = 0, ...props }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);

  const mounted = useRef(false);
  const {
    style: innerStyle,
    onClickLeft,
    onClickRight,
    currentIndex,
  } = useCarousel(Children.toArray(children), defaultIndex);

  useImperativeHandle(ref, () => ({
    onClickLeft,
    onClickRight,
  }));

  useEffect(() => {
    onChange?.(currentIndex);

    if (mounted.current) {
      return;
    }
    if (innerRef.current) {
      innerRef.current.style.width = `${innerRef.current.clientWidth * Children.toArray(children).length}px`;
      mounted.current = true;
    }
  }, [children, currentIndex, onChange]);

  return (
    <div
      {...props}
      className={className}
      style={{
        ...innerStyle,
        ...style,
      }}
      ref={innerRef}
    >
      {Children.map(children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
});

Carousel.displayName = 'Carousel';
