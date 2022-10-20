import { FormControlLabel, Switch } from '@mui/material';
import produce from 'immer';
import React, { FC, memo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { conditionState, storageState } from '../../states/plugin';
import { useConditionIndex } from '../condition-index-provider';

const Component: FC = () => {
  const conditionIndex = useConditionIndex();
  const condition = useRecoilValue(conditionState(conditionIndex));
  if (!condition) {
    return null;
  }

  const onSwitchChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean, option: keyof kintone.plugin.Condition) => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions[conditionIndex][option] = checked as never;
          })
        );
      },
    [conditionIndex]
  );

  const setEditable = (checked: boolean) => onSwitchChange(checked, 'editable');
  const setSortable = (checked: boolean) => onSwitchChange(checked, 'sortable');
  const setIgnoreLetterCase = (checked: boolean) => onSwitchChange(checked, 'ignoresLetterCase');
  const setIgnoreKatakana = (checked: boolean) => onSwitchChange(checked, 'ignoresKatakana');

  return (
    <>
      <FormControlLabel
        control={<Switch color='primary' checked={condition.editable} />}
        onChange={(_, checked) => setEditable(checked)}
        label='一覧での編集を有効にする(未実装)'
      />
      <FormControlLabel
        control={<Switch color='primary' checked={condition.sortable} />}
        onChange={(_, checked) => setSortable(checked)}
        label='並び替えを有効にする'
      />
      <FormControlLabel
        control={<Switch color='primary' checked={condition.ignoresLetterCase} />}
        onChange={(_, checked) => setIgnoreLetterCase(checked)}
        label='絞り込みの際、大文字と小文字を区別しない'
      />
      <FormControlLabel
        control={<Switch color='primary' checked={condition.ignoresKatakana} />}
        onChange={(_, checked) => setIgnoreKatakana(checked)}
        label='絞り込みの際、カタカナとひらがなを区別しない'
      />
    </>
  );
};

export default memo(Component);
