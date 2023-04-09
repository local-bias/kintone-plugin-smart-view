import styled from '@emotion/styled';
import { getViews, storeStorage } from '@konomi-app/kintone-utilities';
import { getAppId } from '@lb-ribbit/kintone-xapp';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, CircularProgress } from '@mui/material';
import produce from 'immer';
import { useSnackbar } from 'notistack';
import React, { FC, FCX, useCallback, useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { updateAppViews } from '@common/kintone';
import { VIEW_ROOT_ID } from '@common/statics';
import { storageState } from '../../../states/plugin';

import ExportButton from './export-button';
import ImportButton from './import-button';
import ResetButton from './reset-button';

type Props = {
  loading: boolean;
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: FCX<Props> = ({ className, loading, onSaveButtonClick, onBackButtonClick }) => (
  <div {...{ className }}>
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
  </div>
);

const StyledComponent = styled(Component)`
  grid-area: footer;

  display: flex;
  justify-content: space-between;

  position: sticky;
  bottom: 15px;
  margin-top: 20px;
  background-color: #fff;
  border-top: 1px solid #eee;
  z-index: 30;

  button {
    margin: 8px;
  }
`;

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const onBackButtonClick = useCallback(() => history.back(), []);

  const onSaveButtonClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        try {
          setLoading(true);
          const storage = await snapshot.getPromise(storageState);

          const app = getAppId();
          if (!app) {
            throw new Error('アプリのフィールド情報が取得できませんでした');
          }
          const { views } = await getViews({ app, preview: true });

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

          await updateAppViews(newViews);

          storeStorage(storage!, () => true);
          enqueueSnackbar('設定を保存しました', {
            variant: 'success',
            action: (
              <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                プラグイン一覧に戻る
              </Button>
            ),
          });
        } finally {
          setLoading(false);
        }
      },
    []
  );

  return <StyledComponent {...{ loading, onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
