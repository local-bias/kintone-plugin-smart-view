import { atom } from 'recoil';

export type Sorting = { field: string; order: 'desc' | 'asc' };

export const sortingState = atom<Sorting>({
  key: 'sortingState',
  default: { field: '', order: 'desc' },
});
