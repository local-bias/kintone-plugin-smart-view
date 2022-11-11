import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { getAppId } from '@lb-ribbit/kintone-xapp';
import { kx } from '../types/kintone.api';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: kx.FieldPropertyType[] = [
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

const IGNORE_FIELDS: kx.FieldPropertyType[] = ['GROUP'];

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

export const getAppFields = async (
  options?: Partial<{ targetApp: string | number; preview: boolean }>
) => {
  const { targetApp, preview = false } = options || {};

  const app = targetApp || getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { properties } = await kintoneClient.app.getFormFields({ app, preview });

  return properties;
};

export const getUserDefinedFields = async (): Promise<kx.FieldProperties> => {
  const fields = await getAppFields();

  const filtered = Object.entries(fields).filter(
    ([_, value]) => !DEFAULT_DEFINED_FIELDS.includes(value.type)
  );

  return filtered.reduce<kx.FieldProperties>((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

export const getFieldsWithoutIgnores = async (
  options?: Partial<{ targetApp: string | number; preview: boolean }>
): Promise<kx.FieldProperties> => {
  const fields = await getAppFields(options);

  const filtered = Object.entries(fields).filter(
    ([_, value]) => !IGNORE_FIELDS.includes(value.type)
  );

  return filtered.reduce<kx.FieldProperties>((acc, [key, value]) => ({ ...acc, [key]: value }), {});
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

export const updateAppViews = async (views: Record<string, kx.view.Parameter>) => {
  const app = getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  return kintoneClient.app.updateViews({ app, views });
};

export const getQuickSearchString = (record: kx.RecordData): string => {
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
