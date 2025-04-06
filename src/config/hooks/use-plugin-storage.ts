import { t } from '@/lib/i18n';
import { PLUGIN_NAME } from '@/lib/statics';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { loadingCountAtom, pluginConfigAtom } from '../states/plugin';
import { storePluginConfig } from '@konomi-app/kintone-utilities';

export const usePluginStorage = () => {
  const { enqueueSnackbar } = useSnackbar();

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

  return { exportStorage };
};
