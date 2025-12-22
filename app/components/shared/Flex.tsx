import type { ComponentProps, FC, JSX, Ref } from 'react';
import { forwardRef, useMemo } from 'react';

import { cn } from '~/utils/cn';

export type FlexProps<T extends keyof JSX.IntrinsicElements = 'div'> = Omit<
  ComponentProps<T>,
  'as'
> & {
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'normal';
  as?: keyof JSX.IntrinsicElements;
  gap?: number;
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'normal'
    | 'stretch'
    | 'baseline'
    | 'space-evenly'
    | 'space-around'
    | 'space-between';
  vertical?: boolean;
  wrap?: boolean;
};

export const Flex = forwardRef(
  <T extends keyof JSX.IntrinsicElements>(
    {
      align = 'normal',
      as,
      className,
      gap = 0,
      justify = 'normal',
      vertical,
      wrap,
      ...props
    }: FlexProps<T>,
    ref: Ref<Element>,
  ) => {
    const Component = useMemo(() => as ?? 'div', [as]) as unknown as FC;

    const justifyContentClass = useMemo(() => {
      switch (justify) {
        case 'start':
          return 'justify-start';
        case 'end':
          return 'justify-end';
        case 'center':
          return 'justify-center';
        case 'space-between':
          return 'justify-between';
        case 'space-around':
          return 'justify-around';
        case 'space-evenly':
          return 'justify-evenly';
        case 'normal':
          return 'justify-normal';
        case 'stretch':
          return 'justify-stretch';
        case 'baseline':
          return 'justify-baseline';
        default:
          return '';
      }
    }, [justify]);

    const alignItemsClass = useMemo(() => {
      switch (align) {
        case 'start':
          return 'items-start';
        case 'end':
          return 'items-end';
        case 'center':
          return 'items-center';
        case 'stretch':
          return 'items-stretch';
        case 'baseline':
          return 'items-baseline';
        default:
          return '';
      }
    }, [align]);

    const wrapClass = useMemo(() => (wrap ? 'flex-wrap' : ''), [wrap]);
    const directionClass = useMemo(() => (vertical ? 'flex-col' : 'flex-row'), [vertical]);

    return (
      <Component
        ref={ref}
        style={{ gap }}
        className={cn([
          `flex ${justifyContentClass} ${alignItemsClass} ${wrapClass} ${directionClass}`,
          className,
        ])}
        {...props}
      />
    );
  },
);

Flex.displayName = 'Flex';
