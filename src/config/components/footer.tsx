import React, { FC, useState, FCX, useCallback } from 'react';
import { useRecoilCallback } from 'recoil';
import styled from '@emotion/styled';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import { storeStorage } from '@common/plugin';

import { storageState } from '../states';
import { getAppViews, updateAppViews } from '@common/kintone';
import produce from 'immer';
import { VIEW_ROOT_ID } from '@common/statics';

type Props = {
  loading: boolean;
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: FCX<Props> = ({ className, loading, onSaveButtonClick, onBackButtonClick }) => (
  <div {...{ className }}>
    <Button
      variant='contained'
      color='primary'
      disabled={loading}
      onClick={onSaveButtonClick}
      startIcon={<SaveIcon />}
    >
      設定を保存
    </Button>
    <Button
      variant='contained'
      color='inherit'
      onClick={onBackButtonClick}
      disabled={loading}
      startIcon={<SettingsBackupRestoreIcon />}
    >
      プラグイン一覧へ戻る
    </Button>
  </div>
);

const StyledComponent = styled(Component)`
  position: sticky;
  bottom: 24px;
  margin-top: 20px;
  background-color: #fff;
  border-top: 1px solid #eee;

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

          const views = await getAppViews();

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
              <Button color='inherit' onClick={onBackButtonClick}>
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
