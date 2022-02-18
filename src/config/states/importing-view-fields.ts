import { atom } from 'recoil';

export const listViewDialogShownIndexState = atom<number | null>({
  key: 'listViewDialogShownIndexState',
  default: null,
});
