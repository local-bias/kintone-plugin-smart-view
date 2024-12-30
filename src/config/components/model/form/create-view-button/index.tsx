import { allAppViewsAtom } from '@/config/states/kintone';
import { loadingAtom, loadingCountAtom, viewIdAtom } from '@/config/states/plugin';
import { GUEST_SPACE_ID } from '@/lib/global';
import { t } from '@/lib/i18n';
import { VIEW_ROOT_ID } from '@/lib/statics';
import { getAppId, getViews, kintoneAPI, updateViews } from '@konomi-app/kintone-utilities';
import { LoadingButton } from '@mui/lab';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { FC, useCallback } from 'react';

const ViewCreateButton: FC = () => {
  const loading = useAtomValue(loadingAtom);
  const { enqueueSnackbar } = useSnackbar();

  const onClick = useAtomCallback(
    useCallback(async (get, set) => {
      try {
        set(loadingCountAtom, (c) => c + 1);
        const allViews = await get(allAppViewsAtom);

        const views = Object.entries(allViews);

        let viewName = '🔎 高速検索';
        let counter = 1;
        while (views.some(([key]) => key === viewName)) {
          viewName = `🔎 高速検索 (${counter})`;
          counter++;
        }

        const newViews: Record<string, kintoneAPI.view.Parameter> = {
          ...allViews,
          [viewName]: {
            type: 'CUSTOM',
            device: 'ANY',
            pager: false,
            name: viewName,
            html: `<div id='${VIEW_ROOT_ID}'></div>`,
            index: views.length,
          },
        };

        await updateViews({
          app: getAppId()!,
          views: newViews,
          debug: process.env.NODE_ENV === 'development',
          guestSpaceId: GUEST_SPACE_ID,
        });

        const latestViews = await getViews({
          app: getAppId()!,
          preview: true,
          guestSpaceId: GUEST_SPACE_ID,
          debug: process.env.NODE_ENV === 'development',
        });

        const viewId = latestViews.views[viewName].id;

        set(allAppViewsAtom, latestViews.views);
        set(viewIdAtom, viewId);
        enqueueSnackbar(t('config.app.toast.createView'), { variant: 'success' });
      } catch (error) {
        process.env.NODE_ENV === 'development' && console.error(error);
        enqueueSnackbar(t('config.app.toast.createViewFailed'), { variant: 'error' });
      } finally {
        set(loadingCountAtom, (c) => c - 1);
      }
    }, [])
  );

  return (
    <LoadingButton
      variant='outlined'
      color='primary'
      size='large'
      onClick={onClick}
      loading={loading}
    >
      {t('config.app.form.createViewButton.label')}
    </LoadingButton>
  );
};

export default ViewCreateButton;
