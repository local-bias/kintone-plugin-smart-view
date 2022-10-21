import React, { FC } from 'react';
import { useRecoilCallback } from 'recoil';
import { produce } from 'immer';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { getNewCondition } from '@common/plugin';

import { storageState } from '../../states/plugin';

type ContainerProps = Readonly<{ label: string }>;

type Props = ContainerProps & Readonly<{ addCondition: () => void }>;

const Component: FC<Props> = ({ addCondition, label }) => (
  <Button
    variant='outlined'
    color='primary'
    size='small'
    startIcon={<AddIcon />}
    onClick={addCondition}
    style={{ marginTop: '16px' }}
  >
    {label}
  </Button>
);

const Container: FC<ContainerProps> = ({ label }) => {
  const addCondition = useRecoilCallback(
    ({ set }) =>
      () => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions.push(getNewCondition());
          })
        );
      },
    []
  );

  return <Component {...{ label, addCondition }} />;
};

export default Container;
