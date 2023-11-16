import {
  Autocomplete,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { viewFieldsState } from '../../../states/plugin';
import { appFieldsState } from '../../../states/app-fields';
import styled from '@emotion/styled';

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
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
`;

const Component: FC = () => {
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

  const addField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex + 1, 0, { fieldCode: '', width: 0 });
          })
        );
      },
    []
  );

  const removeField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex, 1);
          })
        );
      },
    []
  );

  return (
    <Rows>
      {selectedFields.map((value, i) => (
        <Row key={i}>
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
        </Row>
      ))}
    </Rows>
  );
};

const Container: FC = () => {
  return (
    <Suspense
      fallback={
        <>
          {new Array(3).fill('').map((_, i) => (
            <Row key={i}>
              <Skeleton variant='rounded' width={350} height={56} />
              <Skeleton variant='rounded' width={120} height={56} />
              <Skeleton variant='circular' width={24} height={24} />
              <Skeleton variant='circular' width={24} height={24} />
            </Row>
          ))}
        </>
      }
    >
      <Component />
    </Suspense>
  );
};

export default memo(Container);
