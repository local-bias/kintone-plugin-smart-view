import { t } from '@/lib/i18n';
import { migrateConfig } from '@/lib/plugin';
import { PLUGIN_NAME } from '@/lib/statics';
import { onFileLoad, storePluginConfig } from '@konomi-app/kintone-utilities';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { ChangeEventHandler, ReactNode, useCallback } from 'react';
import invariant from 'tiny-invariant';
import { loadingCountAtom, pluginConfigAtom } from '../states/plugin';

export const useSavePluginConfig = (actionComponent: ReactNode) => {
  const { enqueueSnackbar } = useSnackbar();

  return useAtomCallback(
    useCallback(
      async (get, set) => {
        try {
          set(loadingCountAtom, (c) => c + 1);
          const pluginConfig = get(pluginConfigAtom);
          storePluginConfig(pluginConfig, {
            callback: () => true,
            flatProperties: ['conditions'],
            debug: true,
          });
          enqueueSnackbar(t('config.toast.save'), {
            variant: 'success',
            action: actionComponent,
          });
        } finally {
          set(loadingCountAtom, (c) => c - 1);
        }
      },
      [actionComponent, enqueueSnackbar]
    )
  );
};

export const usePluginStorage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const importStorage: ChangeEventHandler<HTMLInputElement> = useAtomCallback(
    useCallback(
      async (get, set, event) => {
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
      },
      [enqueueSnackbar]
    )
  );

  const exportStorage = useAtomCallback(
    useCallback(
      async (get, set) => {
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
      },
      [enqueueSnackbar]
    )
  );

  return { importStorage, exportStorage };
};
