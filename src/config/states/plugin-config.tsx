import { GUEST_SPACE_ID, isDev } from '@/lib/global';
import { t } from '@/lib/i18n';
import { migrateConfig } from '@/lib/plugin';
import { PLUGIN_NAME, VIEW_ROOT_ID } from '@/lib/statics';
import {
  getAppId,
  getViews,
  onFileLoad,
  storeStorage,
  updateViews,
} from '@konomi-app/kintone-utilities';
import { Button } from '@mui/material';
import { produce } from 'immer';
import { atom } from 'jotai';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent } from 'react';
import invariant from 'tiny-invariant';
import { loadingCountAtom, pluginConfigAtom } from './plugin';

export const updatePluginConfigAtom = atom(null, async (get, set) => {
  try {
    set(loadingCountAtom, (c) => c + 1);
    const storage = await get(pluginConfigAtom);

    const app = getAppId();
    if (!app) {
      throw new Error('アプリのフィールド情報が取得できませんでした');
    }
    const { views } = await getViews({
      app,
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
      debug: isDev,
    });

    const newViews = produce(views, (draft) => {
      for (const condition of storage?.conditions || []) {
        for (const view of Object.values(draft)) {
          if (view.id === condition.viewId && view.type === 'CUSTOM') {
            view.html = `<div id='${VIEW_ROOT_ID}'></div>`;
            view.pager = false;
          }
        }
      }
    });

    let warning: string = '';
    try {
      await updateViews({
        app,
        views: newViews,
        guestSpaceId: GUEST_SPACE_ID,
        debug: isDev,
      });
    } catch (error: any) {
      console.error(error);
      if (error?.code === 'CB_NO02') {
        warning =
          '設定を更新しましたが、システム管理権限がないため、一覧の更新がスキップされました。';
      }
    }

    storeStorage(storage!, () => true);
    if (warning) {
      enqueueSnackbar(warning, {
        variant: 'warning',
        action: (
          <Button color='inherit' size='small' variant='outlined' onClick={() => history.back()}>
            プラグイン一覧に戻る
          </Button>
        ),
      });
    } else {
      enqueueSnackbar('設定を保存しました', {
        variant: 'success',
        action: (
          <Button color='inherit' size='small' variant='outlined' onClick={() => history.back()}>
            プラグイン一覧に戻る
          </Button>
        ),
      });
    }
  } finally {
    set(loadingCountAtom, (c) => c - 1);
  }
});

export const importPluginConfigAtom = atom(
  null,
  async (_, set, event: ChangeEvent<HTMLInputElement>) => {
    try {
      set(loadingCountAtom, (c) => c + 1);
      const { files } = event.target;
      invariant(files?.length, 'ファイルが見つかりませんでした');
      const [file] = Array.from(files);
      const fileEvent = await onFileLoad(file!);
      const text = (fileEvent.target?.result ?? '') as string;
      set(pluginConfigAtom, migrateConfig(JSON.parse(text)));
      enqueueSnackbar(t('config.toast.import'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(t('config.error.import'), { variant: 'error' });
      throw error;
    } finally {
      set(loadingCountAtom, (c) => c - 1);
    }
  }
);

export const exportPluginConfigAtom = atom(null, (get, set) => {
  try {
    set(loadingCountAtom, (c) => c + 1);
    const pluginConfig = get(pluginConfigAtom);
    const blob = new Blob([JSON.stringify(pluginConfig, null)], {
      type: 'application/json',
    });
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${PLUGIN_NAME}-config.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    enqueueSnackbar(t('config.toast.export'), { variant: 'success' });
  } catch (error) {
    enqueueSnackbar(t('config.error.export'), { variant: 'error' });
    throw error;
  } finally {
    set(loadingCountAtom, (c) => c - 1);
  }
});
