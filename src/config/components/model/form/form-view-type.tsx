import { getConditionPropertyState } from '@/config/states/plugin';
import { MenuItem, TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const VIEW_TYPES = [
  { value: 'table', label: '表形式' },
  { value: 'card', label: 'カード形式' },
] satisfies { value: Plugin.ViewType; label: string }[];

const state = getConditionPropertyState('viewType');

const Component: FC = () => {
  const viewType = useRecoilValue(state);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (e) => {
        set(state, e.target.value as Plugin.ViewType);
      },
    []
  );

  return (
    <div style={{ marginTop: '.75rem' }}>
      <TextField
        label='表示タイプ'
        select
        variant='outlined'
        color='primary'
        value={viewType}
        onChange={onChange}
        sx={{ width: '170px' }}
      >
        {VIEW_TYPES.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default memo(Component);
