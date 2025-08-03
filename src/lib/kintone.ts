import {
  getAppId,
  getFieldValueAsString,
  getFormFields,
  kintoneAPI,
} from '@konomi-app/kintone-utilities';
import { isDev } from './global';

const IGNORE_FIELDS: kintoneAPI.FieldPropertyType[] = ['GROUP', 'REFERENCE_TABLE'];

export const getAppFields = async (
  options?: Partial<{ targetApp: string | number; preview: boolean; guestSpaceId?: string }>
) => {
  const { targetApp, preview = false, guestSpaceId } = options || {};

  const app = targetApp || getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { properties } = await getFormFields({ app, guestSpaceId, preview, debug: isDev });

  return properties;
};

export const getFieldsWithoutIgnores = async (
  options?: Partial<{ targetApp: string | number; preview: boolean; guestSpaceId?: string }>
): Promise<kintoneAPI.FieldProperties> => {
  const fields = await getAppFields(options);

  const filtered = Object.entries(fields).filter(
    ([, value]) => !IGNORE_FIELDS.includes(value.type)
  );

  return filtered.reduce<kintoneAPI.FieldProperties>(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
};

export const getQuickSearchString = (record: kintoneAPI.RecordData): string => {
  const separator = '_';

  const values = Object.values(record).map((field) => getFieldValueAsString(field, { separator }));

  return values.join(separator);
};
