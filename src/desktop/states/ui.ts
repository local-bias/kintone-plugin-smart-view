import { atom } from 'jotai';

/**
 * ローディングカウンターを管理する内部atom
 * 複数の並行処理のローディング状態を追跡する
 */
const loadingCountAtom = atom(0);

/**
 * 何らかの処理が実行中かどうかを示すatom
 */
export const loadingAtom = atom((get) => get(loadingCountAtom) > 0);

/**
 * ローディング状態を開始するためのatom
 * このatomに対してwrite操作を行うとローディングカウンターが増加する
 */
export const loadingStartAtom = atom(null, (_, set) => {
  set(loadingCountAtom, (count) => count + 1);
});

/**
 * ローディング状態を終了するためのatom
 * このatomに対してwrite操作を行うとローディングカウンターが減少する
 */
export const loadingEndAtom = atom(null, (_, set) => {
  set(loadingCountAtom, (count) => Math.max(count - 1, 0));
});
