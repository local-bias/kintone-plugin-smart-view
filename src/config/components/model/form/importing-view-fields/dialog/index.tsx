import React, { Suspense, FC, FCX } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import type { DeepReadonly } from 'utility-types';
import { CircularProgress, Dialog, DialogTitle } from '@mui/material';
import { listViewDialogShownIndexState } from '../../../../../states/importing-view-fields';

import Content from './content';
import { tabIndexState } from '@/config/states/plugin';

type Props = DeepReadonly<{
  conditionIndex: number;
  shownIndex: number | null;
  onDialogClose: () => void;
}>;

const Component: FCX<Props> = (props) => (
  <Dialog open={props.conditionIndex === props.shownIndex} onClose={props.onDialogClose}>
    <DialogTitle>フィールド情報をインポートする一覧を選択</DialogTitle>
    <Suspense fallback={<CircularProgress />}>
      <Content />
    </Suspense>
  </Dialog>
);

const Container: FC = () => {
  const conditionIndex = useRecoilValue(tabIndexState);
  const [shownIndex, setShownIndex] = useRecoilState(listViewDialogShownIndexState);

  const onDialogClose = () => {
    setShownIndex(null);
  };

  return <Component {...{ conditionIndex, shownIndex, onDialogClose }} />;
};

export default Container;
