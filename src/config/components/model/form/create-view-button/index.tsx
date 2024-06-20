import { allAppViewsState } from '@/config/states/kintone';
import { loadingState, viewIdState } from '@/config/states/plugin';
import { GUEST_SPACE_ID } from '@/lib/global';
import { VIEW_ROOT_ID } from '@/lib/statics';
import { getAppId, getViews, kintoneAPI, updateViews } from '@konomi-app/kintone-utilities';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const loading = useRecoilValue(loadingState);
  const { enqueueSnackbar } = useSnackbar();

  const onClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        try {
          set(loadingState, true);
          const allViews = await snapshot.getPromise(allAppViewsState);

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

          set(allAppViewsState, latestViews.views);
          set(viewIdState, viewId);
          enqueueSnackbar('一覧を作成しました', { variant: 'success' });
        } catch (error) {
          process.env.NODE_ENV === 'development' && console.error(error);
          enqueueSnackbar('一覧の作成に失敗しました', { variant: 'error' });
        } finally {
          set(loadingState, false);
        }
      },
    []
  );

  return (
    <LoadingButton
      variant='outlined'
      color='primary'
      size='large'
      onClick={onClick}
      loading={loading}
    >
      一覧を新規作成
    </LoadingButton>
  );
};

export default Component;
