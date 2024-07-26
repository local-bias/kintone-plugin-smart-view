import React, { FC } from 'react';
import { useRecoilCallback } from 'recoil';
import type { DeepReadonly } from 'utility-types';
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { listViewDialogShownState } from '../../../../states/importing-view-fields';

type Props = DeepReadonly<{ onClick: () => void }>;

const Component: FC<Props> = ({ onClick }) => (
  <Button variant='outlined' color='primary' onClick={onClick} startIcon={<ContentCopyIcon />}>
    他の一覧の設定をインポート
  </Button>
);

const Container: FC = () => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      async () => {
        set(listViewDialogShownState, true);
      },
    []
  );

  return <Component {...{ onClick }} />;
};

export default Container;
