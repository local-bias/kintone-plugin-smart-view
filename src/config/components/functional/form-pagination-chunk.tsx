import { MenuItem, TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { paginationChunkState } from '../../states/plugin';
import { useConditionIndex } from '../condition-index-provider';

const Component: FC = () => {
  const conditionIndex = useConditionIndex();
  const paginationChunk = useRecoilValue(paginationChunkState(conditionIndex));

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (e) => {
        set(paginationChunkState(conditionIndex), Number(e.target.value));
      },
    [conditionIndex]
  );

  return (
    <div style={{ marginTop: '.75rem' }}>
      <TextField
        label='1ページあたりの表示件数'
        select
        variant='outlined'
        color='primary'
        value={paginationChunk}
        onChange={onChange}
        sx={{ width: '170px' }}
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

export default memo(Component);
