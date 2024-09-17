import { getSortFromQuery, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { appPropertiesState } from './kintone';

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
  default: null,
});

export const viewTypeState = atom<Plugin.ViewType>({
  key: `${PREFIX}viewTypeState`,
  default: 'table',
});

export const cardImageFieldCodeState = selector<string | null>({
  key: `${PREFIX}cardImageFieldCodeState`,
  get: ({ get }) => {
    const condition = get(pluginConditionState);
    if (!condition) {
      return null;
    }
    const appProperties = get(appPropertiesState);
    if (!Object.keys(appProperties).length) {
      return null;
    }
    return (
      condition.viewFields.find((field) => {
        const property = appProperties[field.fieldCode] as kintoneAPI.FieldProperty | undefined;
        return property?.type === 'FILE';
      })?.fieldCode ?? null
    );
  },
});

export const cardViewFieldsState = selector<Plugin.ViewField[]>({
  key: `${PREFIX}cardViewFieldsState`,
  get: ({ get }) => {
    const condition = get(pluginConditionState);
    if (!condition) {
      return [];
    }
    const imageFieldCode = get(cardImageFieldCodeState);
    return condition.viewFields.filter((field) => field.fieldCode !== imageFieldCode);
  },
});

export const loadingState = atom({ key: `${PREFIX}loadingState`, default: true });

export const errorState = atom<string | null>({
  key: `${PREFIX}errorState`,
  default: null,
});
