import { FormControlLabel, Switch } from '@mui/material';
import produce from 'immer';
import React, { FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { storageState } from '../../../states';

const Component: FC<{ paginationControl: boolean; index: number }> = memo(
  ({ paginationControl, index }) => {
    const onChange = useRecoilCallback(
      ({ set }) =>
        (checked: boolean) => {
          set(storageState, (current) =>
            produce(current, (draft) => {
              if (!draft) {
                return;
              }
              draft.conditions[index].enablesPaginationChunkControl = checked;
            })
          );
        },
      []
    );

    return (
      <FormControlLabel
        control={<Switch color='primary' checked={paginationControl} />}
        onChange={(_, checked) => onChange(checked)}
        label='一覧から表示件数を変更可能にする'
      />
    );
  }
);

const Container: FC<{ condition: kintone.plugin.Condition; index: number }> = ({
  condition,
  index,
}) => {
  const paginationControl = condition.enablesPaginationChunkControl ?? false;

  return <Component paginationControl={paginationControl} index={index} />;
};

export default Container;
