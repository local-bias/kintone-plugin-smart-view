import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { openDetailInNewTabState } from '../../states/plugin';
import { useConditionIndex } from '../condition-index-provider';

const Component: FC = () => {
  const conditionIndex = useConditionIndex();
  const enables = useRecoilValue(openDetailInNewTabState(conditionIndex));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(openDetailInNewTabState(conditionIndex), checked);
      },
    [conditionIndex]
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
