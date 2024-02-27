import { AuthenticationResponse, authentication } from '@/lib/auth';
import { getSortFromQuery, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom, atomFamily, selector } from 'recoil';

const PREFIX = 'plugin';

export const pluginConditionState = atom<Plugin.Condition | null>({
  key: `${PREFIX}pluginConditionState`,
  default: null,
});

export const defaultSortConditionState = atom<ReturnType<typeof getSortFromQuery>>({
  key: `${PREFIX}defaultSortConditionState`,
  default: [],
});

export const extractedSearchConditionsState = atomFamily<
  Plugin.ExtractedSearchCondition | null,
  number
>({
  key: `${PREFIX}extractedSearchConditionsState`,
  default: (index) => null,
});

export const loadingState = atom({ key: `${PREFIX}loadingState`, default: true });

export const errorState = atom<string | null>({
  key: `${PREFIX}errorState`,
  default: null,
});
