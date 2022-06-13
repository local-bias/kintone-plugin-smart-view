import React, { Suspense, FC, FCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';
import { FormControlLabel, IconButton, Switch, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Properties } from '@kintone/rest-api-client/lib/client/types';

import { appFieldsState, storageState } from '../../../states';

import AppFieldsInput from './app-fields-input';
import ViewIdForm from './view-id';
import ImportingViewFields from '../importing-view-fields';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {
  appFields: Properties;
  onViewDisplayingFieldsChange: (i: number, value: string) => void;
  addViewDisplayingField: (rowIndex: number) => void;
  removeViewDisplayingField: (rowIndex: number) => void;
  setCSVExport: (checked: boolean) => void;
  setEditable: (checked: boolean) => void;
  setSortable: (checked: boolean) => void;
  setIgnoreLetterCase: (checked: boolean) => void;
  setIgnoreKatakana: (checked: boolean) => void;
};

const Component: FCX<Props> = ({
  className,
  index,
  condition,
  onViewDisplayingFieldsChange,
  addViewDisplayingField,
  removeViewDisplayingField,
  setCSVExport,
  setEditable,
  setSortable,
  setIgnoreLetterCase,
  setIgnoreKatakana,
}) => (
  <div {...{ className }}>
    <Suspense fallback={<div>一覧情報を取得しています...</div>}>
      <div>
        <h3>テーブルを表示する一覧の設定</h3>
        <ViewIdForm conditionIndex={index} />
        <small>
          選択する一覧は必ず表示形式を「カスタマイズ」に設定し、「ページネーションを表示する」のチェックを外してください。
        </small>
        <small>対象の一覧が選択肢に存在しない場合は、一度アプリを更新してください。</small>
      </div>
    </Suspense>
    <div>
      <div className='titleWithButton'>
        <h3>テーブルに表示するフィールドの設定</h3>
        <ImportingViewFields conditionIndex={index} />
      </div>
      {condition.viewDisplayingFields.map((field, i) => (
        <div key={i} className='row'>
          <AppFieldsInput
            variant='standard'
            label='対象フィールド'
            value={field}
            onChange={(e) => onViewDisplayingFieldsChange(i, e.target.value)}
          />
          <Tooltip title='フィールドを追加する'>
            <IconButton size='small' onClick={() => addViewDisplayingField(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {condition.viewDisplayingFields.length > 1 && (
            <Tooltip title='このフィールドを削除する'>
              <IconButton size='small' onClick={() => removeViewDisplayingField(i)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
    <div>
      <h3>その他のオプション</h3>
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
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  > div {
    border-left: 4px solid #0002;
    > *:not(h3) {
      padding-left: 16px;
    }
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  small {
    opacity: 0.7;
    color: #f70;
  }

  h3 {
    font-weight: 600;
    color: #0008;
    margin: 0 0 12px;
    padding-left: 12px;
  }

  .MuiTextField-root {
    min-width: 200px;
  }

  .row {
    display: flex;
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: 8px;
    }

    > *:not(button) {
      margin: 0 8px;
    }
    > button {
      margin-right: 8px;
    }

    > svg {
      fill: #999;
    }
  }

  .titleWithButton {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    h3 {
      margin: 0;
      padding: 0;
    }

    margin: 0 0 12px;
  }
`;

const Container: FC<ContainerProps> = ({ condition, index }) => {
  const appFields = useRecoilValue(appFieldsState);
  const setStorage = useSetRecoilState(storageState);

  const onViewDisplayingFieldsChange = (i: number, value: string) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].viewDisplayingFields[i] = value;
      })
    );
  };

  const addViewDisplayingField = (rowIndex: number) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].viewDisplayingFields.splice(rowIndex + 1, 0, '');
      })
    );
  };
  const removeViewDisplayingField = (rowIndex: number) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].viewDisplayingFields.splice(rowIndex, 1);
      })
    );
  };

  const onSwitchChange = (checked: boolean, option: keyof kintone.plugin.Condition) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index][option] = checked as never;
      })
    );
  };

  const setCSVExport = (checked: boolean) => onSwitchChange(checked, 'enableCSVExport');
  const setEditable = (checked: boolean) => onSwitchChange(checked, 'editable');
  const setSortable = (checked: boolean) => onSwitchChange(checked, 'sortable');
  const setIgnoreLetterCase = (checked: boolean) => onSwitchChange(checked, 'ignoresLetterCase');
  const setIgnoreKatakana = (checked: boolean) => onSwitchChange(checked, 'ignoresKatakana');

  return (
    <StyledComponent
      {...{
        condition,
        index,
        appFields,
        onViewDisplayingFieldsChange,
        addViewDisplayingField,
        removeViewDisplayingField,
        setCSVExport,
        setEditable,
        setSortable,
        setIgnoreLetterCase,
        setIgnoreKatakana,
      }}
    />
  );
};

export default Container;
