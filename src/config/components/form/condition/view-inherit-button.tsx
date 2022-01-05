import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { Button } from '@mui/material';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { appViewsState, storageState } from '../../../states';
import { useSnackbar } from 'notistack';
import produce from 'immer';

type ContainerProps = DeepReadonly<{ conditionIndex: number }>;
type Props = DeepReadonly<{ onInheritButtonClick: () => void }>;

const Component: VFCX<Props> = ({ className, onInheritButtonClick }) => (
  <div {...{ className }}>
    <Button variant='contained' color='primary' onClick={onInheritButtonClick} sx={{ width: 250 }}>
      一覧の設定をそのまま使用する
    </Button>
  </div>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = ({ conditionIndex }) => {
  const setStorage = useSetRecoilState(storageState);
  const { enqueueSnackbar } = useSnackbar();

  const onInheritButtonClick = useRecoilCallback(({ snapshot }) => async () => {
    const views = await snapshot.getPromise(appViewsState);
    const storage = await snapshot.getPromise(storageState);

    if (!storage) {
      return;
    }

    const { viewId } = storage.conditions[conditionIndex];
    const selectedView = Object.values(views).find((view) => view.id === viewId);

    if (!selectedView) {
      enqueueSnackbar('まず一覧を選択してください', { variant: 'error' });
      return;
    } else if (selectedView.type === 'CUSTOM') {
      enqueueSnackbar('カスタマイズビューでは手動設定のみ有効です', { variant: 'error' });
      return;
    }

    setStorage((_storage) =>
      produce(_storage, (draft) => {
        if (!draft) {
          return;
        }
        const condition = draft.conditions[conditionIndex];

        if (selectedView.type === 'LIST') {
          condition.viewDisplayingFields = selectedView.fields;
        }
      })
    );
  });

  return <StyledComponent {...{ onInheritButtonClick }} />;
};

export default Container;
