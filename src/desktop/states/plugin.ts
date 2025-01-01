import { PluginCondition } from '@/schema/plugin-config';
import { getSortFromQuery, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { appPropertiesAtom } from './kintone';

export const pluginConditionAtom = atom<PluginCondition | null>(null);

export const defaultSortConditionAtom = atom<ReturnType<typeof getSortFromQuery>>([]);

export const extractedSearchConditionsAtom = atomFamily((index: number) =>
  atom<Plugin.ExtractedSearchCondition | null>(null)
);

export const viewTypeAtom = atom<Plugin.ViewType>('table');

export const cardImageFieldCodeAtom = atom<string | null>((get) => {
  const condition = get(pluginConditionAtom);
  if (!condition) {
    return null;
  }
  const appProperties = get(appPropertiesAtom);
  if (!Object.keys(appProperties).length) {
    return null;
  }
  return (
    condition.viewFields.find((field) => {
      const property = appProperties[field.fieldCode] as kintoneAPI.FieldProperty | undefined;
      return property?.type === 'FILE';
    })?.fieldCode ?? null
  );
});

export const cardViewFieldsAtom = atom<Plugin.ViewField[]>((get) => {
  const condition = get(pluginConditionAtom);
  if (!condition) {
    return [];
  }
  const imageFieldCode = get(cardImageFieldCodeAtom);
  return condition.viewFields.filter((field) => field.fieldCode !== imageFieldCode);
});

export const loadingAtom = atom(true);

export const errorAtom = atom<string | null>(null);
