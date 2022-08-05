import { MenuItem, TextField } from '@mui/material';
import produce from 'immer';
import React, { ChangeEventHandler, FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { storageState } from '../../../states';

const Component: FC<{ paginationChunk: number; index: number }> = memo(
  ({ paginationChunk, index }) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
      ({ set }) =>
        ({ target }) => {
          set(storageState, (current) =>
            produce(current, (draft) => {
              if (!draft) {
                return;
              }
              draft.conditions[index].paginationChunk = Number(target.value);
            })
          );
        },
      []
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
  }
);

const Container: FC<{ condition: kintone.plugin.Condition; index: number }> = ({
  condition,
  index,
}) => {
  const paginationChunk = condition.paginationChunk || 100;

  return <Component paginationChunk={paginationChunk} index={index} />;
};

export default Container;
