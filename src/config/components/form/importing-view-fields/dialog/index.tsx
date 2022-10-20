import React, { Suspense, FC, FCX } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { CircularProgress, Dialog, DialogTitle } from '@mui/material';
import { listViewDialogShownIndexState } from '../../../../states/importing-view-fields';

import Content from './content';

type ContainerProps = DeepReadonly<{ conditionIndex: number }>;
type Props = ContainerProps &
  DeepReadonly<{
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

const StyledComponent = styled(Component)``;

const Container: FC<ContainerProps> = ({ conditionIndex }) => {
  const [shownIndex, setShownIndex] = useRecoilState(listViewDialogShownIndexState);

  const onDialogClose = () => {
    setShownIndex(null);
  };

  return <StyledComponent {...{ conditionIndex, shownIndex, onDialogClose }} />;
};

export default Container;
