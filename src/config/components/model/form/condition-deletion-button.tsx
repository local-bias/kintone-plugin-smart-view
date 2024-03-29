import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import { storageState, tabIndexState } from '../../../states/plugin';
import { PluginConditionDeleteButton } from '@konomi-app/kintone-utilities-react';
import { useSnackbar } from 'notistack';

const Container: FC = () => {
  const index = useRecoilValue(tabIndexState);
  const { enqueueSnackbar } = useSnackbar();

  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions.splice(index, 1);
          })
        );
        set(tabIndexState, (i) => (i === 0 ? i : i - 1));
        enqueueSnackbar('プラグイン設定を削除しました', { variant: 'success' });
      },
    [index]
  );

  return <PluginConditionDeleteButton {...{ onClick }} />;
};

export default memo(Container);
