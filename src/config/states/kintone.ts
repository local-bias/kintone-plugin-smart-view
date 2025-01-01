import { GUEST_SPACE_ID, isProd } from '@/lib/global';
import { t } from '@/lib/i18n';
import {
  getAllApps,
  getAppId,
  getFormFields,
  getSpace,
  getViews,
  kintoneAPI,
  withSpaceIdFallback,
} from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { atomFamily, atomWithDefault, loadable } from 'jotai/utils';
import { joinConditionsAtom } from './plugin';

export const currentAppIdAtom = atom(() => {
  const appId = getAppId();
  if (!appId) {
    throw new Error(t('config.error.appInfoRetrievalFailedError'));
  }
  return appId;
});

export const allKintoneAppsAtom = atom(async () => {
  const apps = await getAllApps({
    guestSpaceId: GUEST_SPACE_ID,
    debug: !isProd,
  });
  return apps;
});
export const joinableKintoneAppsAtom = atom(async (get) => {
  const apps = await get(allKintoneAppsAtom);
  const currentApp = String(get(currentAppIdAtom));

  const selectedApps = get(joinConditionsAtom).map((condition) => condition.dstAppId);

  return apps.filter((app) => {
    return app.appId !== currentApp && !selectedApps.includes(app.appId);
  });
});

export const kintoneSpacesAtom = atom<Promise<kintoneAPI.rest.space.GetSpaceResponse[]>>(
  async (get) => {
    const apps = await get(allKintoneAppsAtom);
    const spaceIds = [
      ...new Set(apps.filter((app) => app.spaceId).map<string>((app) => app.spaceId as string)),
    ];

    let spaces: kintoneAPI.rest.space.GetSpaceResponse[] = [];
    for (const id of spaceIds) {
      const space = await withSpaceIdFallback({
        spaceId: id,
        func: getSpace,
        funcParams: { id, debug: true },
      });
      spaces.push(space);
    }

    return spaces;
  }
);

export const allAppViewsAtom = atomWithDefault<
  Record<string, kintoneAPI.view.Response> | Promise<Record<string, kintoneAPI.view.Response>>
>(async (get) => {
  const app = get(currentAppIdAtom);
  const { views } = await getViews({
    app,
    preview: true,
    guestSpaceId: GUEST_SPACE_ID,
    debug: process.env.NODE_ENV === 'development',
  });

  return views;
});

const privateAllAppViewsErrorMessageAtom = loadable(
  atom<Promise<string | null>>(async (get) => {
    try {
      await get(allAppViewsAtom);
      return null;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return error.message;
      }
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        return error.message;
      }
      if (typeof error === 'string') {
        return error;
      }
      return t('config.error.appViewsRetrievalFailedError');
    }
  })
);

export const allAppViewsErrorMessageAtom = atom((get) => {
  const errorMessage = get(privateAllAppViewsErrorMessageAtom);
  return errorMessage.state === 'hasData' ? errorMessage.data : null;
});

export const safeAllAppViewsAtom = atom(async (get) => {
  try {
    return await get(allAppViewsAtom);
  } catch {
    return {};
  }
});

export const customViewsAtom = atom(async (get) => {
  const allViews = await get(safeAllAppViewsAtom);

  const filtered = Object.entries(allViews).filter(([, view]) => view.type === 'CUSTOM');

  return filtered.reduce<Record<string, kintoneAPI.view.Response>>(
    (acc, [name, view]) => ({ ...acc, [name]: view }),
    {}
  );
});

export const listViewsAtom = atom(async (get) => {
  const allViews = await get(safeAllAppViewsAtom);

  const filtered = Object.entries(allViews).filter(([, view]) => view.type === 'LIST');

  return filtered.reduce<Record<string, kintoneAPI.view.Response>>(
    (acc, [name, view]) => ({ ...acc, [name]: view }),
    {}
  );
});

export const dstAppFieldsAtom = atomFamily((appId: string) =>
  atom<Promise<kintoneAPI.FieldProperty[]>>(async () => {
    if (!appId) {
      return [];
    }
    const { properties } = await getFormFields({
      app: appId,
      guestSpaceId: GUEST_SPACE_ID,
      debug: !isProd,
    });

    const fields = Object.values(properties);

    const allowedFields: kintoneAPI.FieldPropertyType[] = [
      'SINGLE_LINE_TEXT',
      'CALC',
      'NUMBER',
      'RECORD_NUMBER',
      'CREATOR',
      'MODIFIER',
      'LINK',
      'CHECK_BOX',
      'DROP_DOWN',
      'MULTI_SELECT',
      'USER_SELECT',
      'GROUP_SELECT',
      'ORGANIZATION_SELECT',
      'STATUS',
    ];

    const filteredFields = fields.filter((field) => allowedFields.includes(field.type));

    return filteredFields.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  })
);
