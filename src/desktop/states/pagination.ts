import { atom } from 'jotai';

export const paginationIndexAtom = atom(1);

export const handlePaginationIndexChangeAtom = atom(null, (_, set, __: unknown, index: number) => {
  set(paginationIndexAtom, index);
});

export const paginationChunkAtom = atom(100);
