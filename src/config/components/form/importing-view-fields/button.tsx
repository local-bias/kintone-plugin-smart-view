import React, { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { DeepReadonly } from 'utility-types';
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { listViewDialogShownIndexState } from '../../../states/importing-view-fields';

type ContainerProps = DeepReadonly<{ conditionIndex: number }>;
type Props = DeepReadonly<{ onClick: () => void }>;

const Component: VFC<Props> = ({ onClick }) => (
  <Button variant='outlined' color='primary' onClick={onClick} startIcon={<ContentCopyIcon />}>
    他の一覧の設定をインポート
  </Button>
);

const Container: VFC<ContainerProps> = ({ conditionIndex }) => {
  const setDialogShownIndex = useSetRecoilState(listViewDialogShownIndexState);

  const onClick = () => {
    setDialogShownIndex(conditionIndex);
  };

  return <Component {...{ onClick }} />;
};

export default Container;
