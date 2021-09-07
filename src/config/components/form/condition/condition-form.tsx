import React, { Suspense, VFC, VFCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';
import { FormControlLabel, IconButton, Switch, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Properties } from '@kintone/rest-api-client/lib/client/types';

import { appFieldsState, storageState } from '../../../states';

import AppFieldsInput from './app-fields-input';
import ViewIdForm from './view-id';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {
  appFields: Properties;
  onViewDisplayingFieldsChange: (i: number, value: string) => void;
  addViewDisplayingField: (rowIndex: number) => void;
  removeViewDisplayingField: (rowIndex: number) => void;
  setCSVExport: (checked: boolean) => void;
  setEditable: (checked: boolean) => void;
  setSortable: (checked: boolean) => void;
};

const Component: VFCX<Props> = ({
  className,
  index,
  condition,
  onViewDisplayingFieldsChange,
  addViewDisplayingField,
  removeViewDisplayingField,
  setCSVExport,
  setEditable,
  setSortable,
}) => (
  <div {...{ className }}>
    <Suspense fallback={<div>一覧情報を取得しています...</div>}>
      <div>
        <h3>テーブルを表示する一覧の設定</h3>
        <ViewIdForm conditionIndex={index} />
      </div>
    </Suspense>
    <div>
      <h3>テーブルに表示するフィールドの設定</h3>
      {condition.viewDisplayingFields.map((field, i) => (
        <div key={i} className='row'>
          <AppFieldsInput
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
      label='並び替えを有効にする(未実装)'
    />
  </div>
);

const StyledComponent = styled(Component)`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  > div {
    border-left: 5px solid #3f51b5aa;
    > *:not(h3) {
      padding-left: 16px;
    }
    padding: 4px 0;
  }

  h3 {
    font-weight: 500;
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
`;

const Container: VFC<ContainerProps> = ({ condition, index }) => {
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
      }}
    />
  );
};

export default Container;
