import { atom } from 'recoil';

export const paginationIndexState = atom({ key: 'paginationIndexState', default: 1 });

export const paginationChunkState = atom({ key: 'paginationChunkState', default: 100 });
