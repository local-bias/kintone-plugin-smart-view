import { PluginViewField } from '@/schema/plugin-config';
import { atom } from 'jotai';
import { pluginConditionAtom } from './plugin';
import { atomWithDefault } from 'jotai/utils';

/**
 * 画面上で表示するフィールドの配列
 * ユーザーが変更した場合はその値を、そうでない場合はプラグイン設定のviewFieldsを返す
 */
export const visibleFieldsAtom = atomWithDefault<PluginViewField[]>((get) => {
  return get(pluginConditionAtom)?.viewFields ?? [];
});

/**
 * 表示フィールド設定ダイアログの開閉状態
 */
export const isFieldSettingsDialogOpenAtom = atom(false);
