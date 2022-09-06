import {
  Properties,
  Record as KintoneRecord,
  ViewForParameter,
} from '@kintone/rest-api-client/lib/client/types';
import { OneOf } from '@kintone/rest-api-client/lib/KintoneFields/types/property';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: PickType<OneOf, 'type'>[] = [
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

const IGNORE_FIELDS: PickType<OneOf, 'type'>[] = ['GROUP'];

class FlexKintone extends KintoneRestAPIClient {
  constructor(...options: ConstructorParameters<typeof KintoneRestAPIClient>) {
    const url = kintone.api.url('/k/v1/app', true);
    const found = url.match(/k\/guest\/([0-9]+)\//);

    if (found && found.length > 1) {
      super({
        guestSpaceId: found[1],
        ...(options[0] || {}),
      });
      return;
    }

    super(...options);
  }
}

/** REST APIクライアント(シングルトン) */
export const kintoneClient = new FlexKintone();

/**
 * 実行されている環境がモバイル端末である場合はTrueを返却します
 */
export const isMobile = (eventType?: string) => {
  if (eventType) {
    return eventType.includes('mobile.');
  }
  return !kintone.app.getId();
};

export const getApp = (eventType?: string): typeof kintone.mobile.app | typeof kintone.app =>
  isMobile(eventType) ? kintone.mobile.app : kintone.app;

export const getAppId = () => getApp().getId();
export const getRecordId = () => getApp().record.getId();

export const getSpaceElement = (spaceId: string) => getApp().record.getSpaceElement(spaceId);

/**
 * 現在の検索条件を返却します
 * @returns 検索条件
 */
export const getQuery = () => getApp().getQuery();

/**
 * 現在の検索条件のうち、絞り込み情報の部分のみを返却します
 * @returns 検索条件の絞り込み情報
 */
export const getQueryCondition = () => getApp().getQueryCondition();

/**
 * 現在表示しているレコード情報を返却します
 * - デバイス毎に最適な情報を返します
 * @returns レコード情報
 */
export const getCurrentRecord = () => getApp().record.get();

/**
 * 現在表示しているレコード情報へデータを反映します
 * @param record レコード情報
 */
export const setCurrentRecord = (record: { record: any }) => getApp().record.set(record);

export const setFieldShown = (code: string, visible: boolean) =>
  getApp().record.setFieldShown(String(code), visible);

/**
 * ヘッダー部分のHTML要素を返却します
 * - デバイス毎に最適な情報を返します
 * - レコード一覧以外で実行した場合はnullが返ります
 * @returns ヘッダー部分のHTML要素
 */
export const getHeaderSpace = (eventType: string) => {
  if (isMobile(eventType)) {
    kintone.mobile.app.getHeaderSpaceElement();
  } else if (!~eventType.indexOf('index')) {
    return kintone.app.record.getHeaderMenuSpaceElement();
  }
  return kintone.app.getHeaderMenuSpaceElement();
};

export const getAppFields = async (targetApp?: string | number) => {
  const app = targetApp || getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { properties } = await kintoneClient.app.getFormFields({ app });

  return properties;
};

export const getUserDefinedFields = async (): Promise<Properties> => {
  const fields = await getAppFields();

  const filtered = Object.entries(fields).filter(
    ([_, value]) => !DEFAULT_DEFINED_FIELDS.includes(value.type)
  );

  return filtered.reduce<Properties>((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

export const getFieldsWithoutIgnores = async (): Promise<Properties> => {
  const fields = await getAppFields();

  const filtered = Object.entries(fields).filter(
    ([_, value]) => !IGNORE_FIELDS.includes(value.type)
  );

  return filtered.reduce<Properties>((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

export const getAppLayout = async () => {
  const app = getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { layout } = await kintoneClient.app.getFormLayout({ app });

  return layout;
};

export const getAppViews = async () => {
  const app = getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { views } = await kintoneClient.app.getViews({ app });

  return views;
};

export const updateAppViews = async (views: Record<string, ViewForParameter>) => {
  const app = getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  return kintoneClient.app.updateViews({ app, views });
};

export const getQuickSearchString = (record: KintoneRecord): string => {
  const values = Object.values(record).map((field) => {
    switch (field.type) {
      case 'CREATOR':
      case 'MODIFIER':
        return field.value.name;

      case 'CHECK_BOX':
      case 'MULTI_SELECT':
      case 'CATEGORY':
        return field.value.join('');

      case 'USER_SELECT':
      case 'ORGANIZATION_SELECT':
      case 'GROUP_SELECT':
      case 'STATUS_ASSIGNEE':
        return field.value.map(({ name }) => name).join('');

      case 'FILE':
        return field.value.map(({ name }) => name).join('');

      case 'SUBTABLE':
        return field.value.map(({ value }) => getQuickSearchString(value)).join('');

      default:
        return field.value || '';
    }
  });

  return values.join('');
};
