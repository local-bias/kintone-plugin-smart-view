import { Autocomplete, IconButton, Skeleton, TextField, Tooltip } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { viewDisplayingFieldsState } from '../../../states/plugin';
import { appFieldsState } from '../../../states/app-fields';
import styled from '@emotion/styled';

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
  const selectedFields = useRecoilValue(viewDisplayingFieldsState);
  const fields = useRecoilValue(appFieldsState);

  const onFieldChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(viewDisplayingFieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex] = value;
          })
        );
      },
    []
  );

  const addField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(viewDisplayingFieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex + 1, 0, '');
          })
        );
      },
    []
  );

  const removeField = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number) => {
        set(viewDisplayingFieldsState, (current) =>
          produce(current, (draft) => {
            draft.splice(rowIndex, 1);
          })
        );
      },
    []
  );

  return (
    <>
      {selectedFields.map((value, i) => (
        <Row key={i}>
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
        </Row>
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
            <Row key={i}>
              <Skeleton variant='rounded' width={350} height={56} />
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
