import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { ignoresHankakuKatakanaState } from '../../../states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(ignoresHankakuKatakanaState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(ignoresHankakuKatakanaState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='絞り込みの際、半角カナと全角カナを区別しない'
    />
  );
};

export default memo(Component);
