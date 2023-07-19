import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { editableState } from '../../../states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(editableState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(editableState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='一覧での編集を有効にする(未実装)'
    />
  );
};

export default memo(Component);
