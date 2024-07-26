import { atom } from 'recoil';

export const listViewDialogShownState = atom<boolean>({
  key: 'listViewDialogShownState',
  default: false,
});
