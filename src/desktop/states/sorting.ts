import { atom } from 'jotai';

export type Sorting = { field: string; order: 'desc' | 'asc' };

export const sortingAtom = atom<Sorting>({ field: '', order: 'desc' });
