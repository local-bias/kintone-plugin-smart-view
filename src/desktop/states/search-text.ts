import { URL_SEARCH_PARAMS_TEXT } from '@/lib/statics';
import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

export const searchTextAtom = atom(
  new URLSearchParams(location.search).get(URL_SEARCH_PARAMS_TEXT) ?? ''
);

export const searchTextEffect = atomEffect((get) => {
  const text = get(searchTextAtom);
  const url = new URL(location.href);
  if (!text) {
    url.searchParams.delete(URL_SEARCH_PARAMS_TEXT);
  } else {
    url.searchParams.set(URL_SEARCH_PARAMS_TEXT, text);
  }
  history.replaceState(null, '', url.toString());
});
