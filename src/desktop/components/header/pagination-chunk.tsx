import { MenuItem, TextField } from '@mui/material';
import React, { ChangeEventHandler, FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { paginationChunkState } from '../../states/pagination';
import { pluginConditionState } from '../../states/plugin-condition';

const Component: FC = () => {
  const paginationChunk = useRecoilValue(paginationChunkState);

  const onChunkChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (props) => {
        set(paginationChunkState, Number(props.target.value));
      },
    []
  );

  return (
    <div>
      <TextField
        label='表示件数'
        select
        variant='outlined'
        color='primary'
        size='small'
        value={paginationChunk}
        onChange={onChunkChange}
        sx={{ minWidth: '80px' }}
      >
        {[20, 40, 60, 80, 100].map((chunk) => (
          <MenuItem key={chunk} value={chunk}>
            {chunk}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const Container: FC = () => {
  const condition = useRecoilValue(pluginConditionState);

  if (!condition?.enablesPaginationChunkControl) {
    return null;
  }
  return <Component />;
};

export default Container;
