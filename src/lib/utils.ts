import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupBy = <T>(values: T[], callback: (value: T) => string | number) => {
  return values.reduce<Record<string | number, T[]>>((acc, value) => {
    const key = callback(value);

    (acc[key] || (acc[key] = [])).push(value);

    return acc;
  }, {});
};
