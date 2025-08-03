import { URL_SEARCH_PARAMS_TEXT } from '@/lib/statics';
import { store } from '@/lib/store';
import { atom } from 'jotai';
import { observe } from 'jotai-effect';
import { paginationIndexAtom } from './pagination';
import { ChangeEvent } from 'react';

export const searchTextAtom = atom(
  new URLSearchParams(location.search).get(URL_SEARCH_PARAMS_TEXT) ?? ''
);

export const handleSearchInputChangeAtom = atom(
  null,
  (_, set, e: ChangeEvent<HTMLInputElement>) => {
    set(searchTextAtom, e.target.value);
    set(paginationIndexAtom, 1);
  }
);

observe((get) => {
  const text = get(searchTextAtom);
  const url = new URL(location.href);
  if (!text) {
    url.searchParams.delete(URL_SEARCH_PARAMS_TEXT);
  } else {
    url.searchParams.set(URL_SEARCH_PARAMS_TEXT, text);
  }
  history.replaceState(null, '', url.toString());
}, store);
