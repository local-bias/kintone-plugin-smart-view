import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { disableCursorAPIState } from '../../../states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(disableCursorAPIState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(disableCursorAPIState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='レコード取得時、カーソルAPIを使用しない'
    />
  );
};

export default memo(Component);
