import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (classes?: Parameters<typeof classNames>) => {
  return twMerge(classNames(classes));
};
