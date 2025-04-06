import { PluginCondition } from '@/schema/plugin-config';
import { getSortFromQuery, GetYuruCharaOptions, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { currentAppFieldPropertiesAtom, currentAppIdAtom } from './kintone';

/**
 * プラグインの設定情報から、画面表示に必要な情報を補完したテーブルのカラム情報
 */
export type ResolvedTableColumnProps = Plugin.ViewField & {
  appId: string;
};

export const pluginConditionAtom = atom<PluginCondition | null>(null);

export const yuruCharaOptionsAtom = atom<GetYuruCharaOptions>((get) => {
  const condition = get(pluginConditionAtom);
  return {
    isCaseSensitive: condition?.isCaseSensitive ?? false,
    isKatakanaSensitive: condition?.isKatakanaSensitive ?? false,
    isHankakuKatakanaSensitive: condition?.isHankakuKatakanaSensitive ?? false,
    isZenkakuEisujiSensitive: condition?.isZenkakuEisujiSensitive ?? false,
  };
});

export const resolvedTableColumnsAtom = atom<ResolvedTableColumnProps[]>((get) => {
  const condition = get(pluginConditionAtom);
  if (!condition) {
    return [];
  }
  const tableColumns = condition.viewFields.map((field) => {
    return { ...field, appId: String(get(currentAppIdAtom)) };
  });
  return tableColumns;
});

export const defaultSortConditionAtom = atom<ReturnType<typeof getSortFromQuery>>([]);

export const extractedSearchConditionsAtom = atomFamily((index: number) =>
  atom<Plugin.ExtractedSearchCondition | null>(null)
);

export const viewTypeAtom = atom<Plugin.ViewType>('table');

export const cardImageFieldCodeAtom = atom<string | null>((get) => {
  const tableColumns = get(resolvedTableColumnsAtom);
  const appProperties = get(currentAppFieldPropertiesAtom);
  if (!Object.keys(appProperties).length) {
    return null;
  }
  return (
    tableColumns.find((column) => {
      const property = appProperties[column.fieldCode] as kintoneAPI.FieldProperty | undefined;
      return property?.type === 'FILE';
    })?.fieldCode ?? null
  );
});

export const cardViewFieldsAtom = atom((get) => {
  const tableColumn = get(resolvedTableColumnsAtom);
  const imageFieldCode = get(cardImageFieldCodeAtom);
  return tableColumn.filter((column) => column.fieldCode !== imageFieldCode);
});

export const errorAtom = atom<string | null>(null);
