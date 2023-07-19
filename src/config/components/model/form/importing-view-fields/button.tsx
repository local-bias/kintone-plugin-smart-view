import React, { FC } from 'react';
import { useRecoilCallback } from 'recoil';
import type { DeepReadonly } from 'utility-types';
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { listViewDialogShownIndexState } from '../../../../states/importing-view-fields';
import { tabIndexState } from '@/config/states/plugin';

type Props = DeepReadonly<{ onClick: () => void }>;

const Component: FC<Props> = ({ onClick }) => (
  <Button variant='outlined' color='primary' onClick={onClick} startIcon={<ContentCopyIcon />}>
    他の一覧の設定をインポート
  </Button>
);

const Container: FC = () => {
  const onClick = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const conditionIndex = await snapshot.getPromise(tabIndexState);
        set(listViewDialogShownIndexState, conditionIndex);
      },
    []
  );

  return <Component {...{ onClick }} />;
};

export default Container;
