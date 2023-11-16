import { URL_SEARCH_PARAMS_TEXT } from '@/lib/statics';
import { atom } from 'recoil';

export const searchTextState = atom({
  key: 'searchTextState',
  default: '',
  effects: [
    ({ onSet }) =>
      onSet((newValue, oldValue) => {
        if (newValue === oldValue) {
          return;
        }
        const url = new URL(location.href);
        if (newValue) {
          url.searchParams.set(URL_SEARCH_PARAMS_TEXT, newValue);
        } else {
          url.searchParams.delete(URL_SEARCH_PARAMS_TEXT);
        }
        history.replaceState(null, '', url.href);
      }),
  ],
});
