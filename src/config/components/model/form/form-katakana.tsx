import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { ignoresKatakanaState } from '../../../states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(ignoresKatakanaState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(ignoresKatakanaState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='絞り込みの際、カタカナとひらがなを区別しない'
    />
  );
};

export default memo(Component);
