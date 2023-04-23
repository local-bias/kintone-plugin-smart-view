import { Autocomplete, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { viewDisplayingFieldsState } from '../../states/plugin';
import { useConditionIndex } from '../condition-index-provider';
import { appFieldsState } from '../../states/app-fields';

const Component: FC = () => {
  const conditionIndex = useConditionIndex();
  const selectedFields = useRecoilValue(viewDisplayingFieldsState(conditionIndex));
  const fields = useRecoilValue(appFieldsState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(viewDisplayingFieldsState(conditionIndex), (current) =>
          produce(current, (draft) => {
            draft[rowIndex] = value;
          })
        );
      },
    [conditionIndex]
  );

  const addField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(viewDisplayingFieldsState(conditionIndex), (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex + 1, 0, '');
          })
        );
      },
    [conditionIndex]
  );

  const removeField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(viewDisplayingFieldsState(conditionIndex), (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex, 1);
          })
        );
      },
    [conditionIndex]
  );

  return (
    <>
      {selectedFields.map((value, i) => (
        <div key={i} className='row'>
          <Autocomplete
            value={fields.find((field) => field.code === value) ?? null}
            sx={{ width: '350px' }}
            options={fields}
            isOptionEqualToValue={(option, v) => option.code === v.code}
            getOptionLabel={(option) => `${option.label}(${option.code})`}
            onChange={(_, field) => onFieldChange(i, field?.code ?? '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label='対象フィールド'
                InputLabelProps={{
                  ...params.InputLabelProps,
                  shrink: true,
                }}
                variant='outlined'
                color='primary'
              />
            )}
          />
          <Tooltip title='表示フィールドを追加する'>
            <IconButton size='small' onClick={() => addField(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {selectedFields.length > 1 && (
            <Tooltip title='この表示フィールドを削除する'>
              <IconButton size='small' onClick={() => removeField(i)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ))}
    </>
  );
};

const Container: FC = () => {
  return (
    <Suspense
      fallback={
        <>
          {new Array(3).fill('').map((_, i) => (
            <div key={i} className='row'>
              <Skeleton variant='rounded' width={350} height={56} />
              <Skeleton variant='circular' width={24} height={24} />
              <Skeleton variant='circular' width={24} height={24} />
            </div>
          ))}
        </>
      }
    >
      <Component />
    </Suspense>
  );
};

export default memo(Container);
