import {
  Autocomplete,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
  InputAdornment,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { viewFieldsState } from '../../../states/plugin';
import { appFieldsState } from '../../../states/app-fields';
import { useRecoilRow } from '@konomi-app/kintone-utilities-react';

const Component: FC = () => {
  const { addRow, deleteRow } = useRecoilRow({
    state: viewFieldsState,
    getNewRow: () => ({ fieldCode: '', width: 0, isEditable: true }),
  });
  const selectedFields = useRecoilValue(viewFieldsState);
  const fields = useRecoilValue(appFieldsState);

  const onWidthChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].width = Number(value);
          })
        );
      },
    []
  );

  const onFieldCodeChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].fieldCode = value;
          })
        );
      },
    []
  );

  const onEditableChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: boolean) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].isEditable = value;
          })
        );
      },
    []
  );

  return (
    <>
      {selectedFields.map((value, i) => (
        <div key={i} className='flex items-center gap-4'>
          <Autocomplete
            value={fields.find((field) => field.code === value.fieldCode) ?? null}
            sx={{ width: '350px' }}
            options={fields}
            isOptionEqualToValue={(option, v) => option.code === v.code}
            getOptionLabel={(option) => `${option.label}(${option.code})`}
            onChange={(_, field) => onFieldCodeChange(i, field?.code ?? '')}
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
          <TextField
            label='表示幅'
            type='number'
            color='primary'
            value={value.width}
            sx={{ width: '120px' }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>px</InputAdornment>,
            }}
            onChange={(e) => onWidthChange(i, e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={value.isEditable}
                onChange={(_, checked) => onEditableChange(i, checked)}
              />
            }
            label='編集画面に表示'
          />
          <Tooltip title='表示フィールドを追加する'>
            <IconButton size='small' onClick={() => addRow(i)}>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          {selectedFields.length > 1 && (
            <Tooltip title='この表示フィールドを削除する'>
              <IconButton size='small' onClick={() => deleteRow(i)}>
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
    <div className='grid gap-4'>
      <Suspense
        fallback={
          <>
            {new Array(3).fill('').map((_, i) => (
              <div key={i} className='flex items-center gap-4'>
                <Skeleton variant='rounded' width={350} height={56} />
                <Skeleton variant='rounded' width={120} height={56} />
                <FormControlLabel control={<Switch disabled />} label='編集画面に表示' />
                <IconButton size='small' disabled>
                  <AddIcon fontSize='small' />
                </IconButton>
                <IconButton size='small' disabled>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </div>
            ))}
          </>
        }
      >
        <Component />
      </Suspense>
    </div>
  );
};

export default memo(Container);
