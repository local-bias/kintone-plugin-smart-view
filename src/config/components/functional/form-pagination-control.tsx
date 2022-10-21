import { FormControlLabel, Switch } from '@mui/material';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { enablesPaginationChunkControlState } from '../../states/plugin';
import { useConditionIndex } from '../condition-index-provider';

const Component: FC = () => {
  const conditionIndex = useConditionIndex();
  const enables = useRecoilValue(enablesPaginationChunkControlState(conditionIndex));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean) => {
        set(enablesPaginationChunkControlState(conditionIndex), checked);
      },
    [conditionIndex]
  );

  return (
    <FormControlLabel
      control={<Switch color='primary' checked={enables} />}
      onChange={(_, checked) => onChange(checked)}
      label='一覧から表示件数を変更可能にする'
    />
  );
};

export default memo(Component);
