import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { ignoresZenkakuEisujiState } from '../../../states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(ignoresZenkakuEisujiState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(ignoresZenkakuEisujiState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='絞り込みの際、全角英数字と半角英数字を区別しない'
    />
  );
};

export default memo(Component);
