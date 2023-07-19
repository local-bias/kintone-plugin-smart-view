import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { sortableState } from '../../../states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(sortableState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(sortableState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='並び替えを有効にする'
    />
  );
};

export default memo(Component);
