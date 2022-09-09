import { FormControlLabel, Switch } from '@mui/material';
import produce from 'immer';
import React, { FC } from 'react';
import { useRecoilCallback } from 'recoil';
import { storageState } from '../../../states';

type Props = { condition: kintone.plugin.Condition; index: number };

const Component: FC<Props> = ({ condition, index }) => {
  const onSwitchChange = useRecoilCallback(
    ({ set }) =>
      (checked: boolean, option: keyof kintone.plugin.Condition) => {
        set(storageState, (_, _storage = _!) =>
          produce(_storage, (draft) => {
            draft.conditions[index][option] = checked as never;
          })
        );
      },
    [index]
  );

  const setCSVExport = (checked: boolean) => onSwitchChange(checked, 'enableCSVExport');
  const setEditable = (checked: boolean) => onSwitchChange(checked, 'editable');
  const setSortable = (checked: boolean) => onSwitchChange(checked, 'sortable');
  const setIgnoreLetterCase = (checked: boolean) => onSwitchChange(checked, 'ignoresLetterCase');
  const setIgnoreKatakana = (checked: boolean) => onSwitchChange(checked, 'ignoresKatakana');

  return (
    <>
      <FormControlLabel
        control={<Switch color='primary' checked={condition.enableCSVExport} />}
        onChange={(_, checked) => setCSVExport(checked)}
        label='CSV出力機能を有効にする'
      />
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

export default Component;
