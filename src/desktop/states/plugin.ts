import {
  PluginCondition,
  PluginExtractedSearchCondition,
  PluginViewField,
  PluginViewType,
} from '@/schema/plugin-config';
import { getSortFromQuery, GetYuruCharaOptions, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { ChangeEvent } from 'react';
import { currentAppFieldPropertiesAtom, currentAppIdAtom } from './kintone';
import { paginationIndexAtom } from './pagination';
import { visibleFieldsAtom } from './visible-fields';

/**
 * プラグインの設定情報から、画面表示に必要な情報を補完したテーブルのカラム情報
 */
export type ResolvedTableColumnProps = PluginViewField & {
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
    isHebonSensitive: false,
    isHyphenSensitive: false,
  };
});

export const resolvedTableColumnsAtom = atom<ResolvedTableColumnProps[]>((get) => {
  const condition = get(pluginConditionAtom);
  if (!condition) {
    return [];
  }

  const viewFields: PluginViewField[] = condition.isViewFieldsControlEnabled
    ? get(visibleFieldsAtom)
    : condition.viewFields;

  const tableColumns = viewFields.map((field) => {
    return { ...field, appId: String(get(currentAppIdAtom)) };
  });
  return tableColumns;
});

export const defaultSortConditionAtom = atom<ReturnType<typeof getSortFromQuery>>([]);

export const extractedSearchConditionsAtom = atomFamily((index: number) =>
  atom<PluginExtractedSearchCondition | null>(null)
);

export const handleExtractedSearchInputChangeAtom = atomFamily((index: number) =>
  atom(null, (_, set, event: ChangeEvent<HTMLInputElement>) => {
    set(extractedSearchConditionsAtom(index), (_c, c = _c!) => ({
      ...c,
      value: event.target.value,
    }));
    set(paginationIndexAtom, 1);
  })
);

export const handleExtractedSearchAutocompleteChangeAtom = atomFamily((index: number) =>
  atom(null, (_, set, __: unknown, value: string | null) => {
    set(extractedSearchConditionsAtom(index), (_c, c = _c!) => ({
      ...c,
      value: value ?? '',
    }));
    set(paginationIndexAtom, 1);
  })
);

export const viewTypeAtom = atom<PluginViewType>('table');

export const handleViewTypeChangeAtom = atom(null, (_, set, value: PluginViewType) => {
  set(viewTypeAtom, value);
});

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
