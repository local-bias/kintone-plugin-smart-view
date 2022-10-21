import React, { FC } from 'react';
import { useRecoilCallback } from 'recoil';
import { DeepReadonly } from 'utility-types';
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { listViewDialogShownIndexState } from '../../../states/importing-view-fields';
import { useConditionIndex } from '../../condition-index-provider';

type Props = DeepReadonly<{ onClick: () => void }>;

const Component: FC<Props> = ({ onClick }) => (
  <Button variant='outlined' color='primary' onClick={onClick} startIcon={<ContentCopyIcon />}>
    他の一覧の設定をインポート
  </Button>
);

const Container: FC = () => {
  const conditionIndex = useConditionIndex();

  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(listViewDialogShownIndexState, conditionIndex);
      },
    [conditionIndex]
  );

  return <Component {...{ onClick }} />;
};

export default Container;
