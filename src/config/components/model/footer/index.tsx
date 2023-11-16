import styled from '@emotion/styled';
import { getViews, storeStorage, updateViews } from '@konomi-app/kintone-utilities';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { FC, FCX, useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { loadingState, storageState } from '../../../states/plugin';

import ExportButton from './export-button';
import ImportButton from './import-button';
import ResetButton from './reset-button';
import { PluginFooter } from '@konomi-app/kintone-utilities-react';
import { getAppId } from '@lb-ribbit/kintone-xapp';
import { GUEST_SPACE_ID } from '@/lib/global';
import { produce } from 'immer';
import { VIEW_ROOT_ID } from '@/lib/statics';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: FCX<Props> = ({ className, onSaveButtonClick, onBackButtonClick }) => {
  const loading = useRecoilValue(loadingState);

  return (
    <PluginFooter {...{ className }}>
      <div>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          onClick={onSaveButtonClick}
          startIcon={loading ? <CircularProgress color='inherit' size={20} /> : <SaveIcon />}
        >
          設定を保存
        </Button>
        <Button
          variant='contained'
          color='inherit'
          disabled={loading}
          onClick={onBackButtonClick}
          startIcon={
            loading ? <CircularProgress color='inherit' size={20} /> : <SettingsBackupRestoreIcon />
          }
        >
          プラグイン一覧へ戻る
        </Button>
      </div>
      <div>
        <ExportButton />
        <ImportButton />
        <ResetButton />
      </div>
    </PluginFooter>
  );
};

const StyledComponent = styled(Component)`
  button {
    margin: 8px;
  }
`;

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = useCallback(() => history.back(), []);

  const onSaveButtonClick = useRecoilCallback(
    ({ reset, set, snapshot }) =>
      async () => {
        try {
          set(loadingState, true);
          const storage = await snapshot.getPromise(storageState);

          const app = getAppId();
          if (!app) {
            throw new Error('アプリのフィールド情報が取得できませんでした');
          }
          const { views } = await getViews({
            app,
            preview: true,
            guestSpaceId: GUEST_SPACE_ID,
            debug: process.env.NODE_ENV === 'development',
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
              debug: process.env.NODE_ENV === 'development',
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
                <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                  プラグイン一覧に戻る
                </Button>
              ),
            });
          } else {
            enqueueSnackbar('設定を保存しました', {
              variant: 'success',
              action: (
                <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                  プラグイン一覧に戻る
                </Button>
              ),
            });
          }
        } finally {
          reset(loadingState);
        }
      },
    []
  );

  return <StyledComponent {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
