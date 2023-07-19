import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { openDetailInNewTabState } from '../../../states/plugin';

const Component: FC = () => {
  const enables = useRecoilValue(openDetailInNewTabState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(openDetailInNewTabState, checked);
      },
    []
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='レコードの詳細画面を新しいタブで開く'
    />
  );
};

export default memo(Component);
