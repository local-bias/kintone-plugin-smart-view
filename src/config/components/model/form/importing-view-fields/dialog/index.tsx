import React, { Suspense, FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { CircularProgress, Dialog, DialogTitle } from '@mui/material';
import { listViewDialogShownState } from '../../../../../states/importing-view-fields';
import Content from './content';

const Component: FCX = () => {
  const open = useRecoilValue(listViewDialogShownState);

  const onDialogClose = useRecoilCallback(
    ({ reset }) =>
      () =>
        reset(listViewDialogShownState),
    []
  );

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>フィールド情報をインポートする一覧を選択</DialogTitle>
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </Dialog>
  );
};

export default Component;
