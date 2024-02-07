import { Autocomplete, IconButton, Skeleton, TextField, Tooltip, MenuItem } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { extractedInputsState } from '../../../states/plugin';
import { extractedInputFieldsState } from '../../../states/app-fields';
import styled from '@emotion/styled';

const INPUT_TYPES: { type: Plugin.ExtractedInputType; label: string }[] = [
  { type: 'text', label: 'テキスト' },
  { type: 'autocomplete', label: 'ドロップダウン' },
  { type: 'date', label: '日付' },
  { type: 'month', label: '月' },
  { type: 'year', label: '年' },
];

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
  const extractedInputs = useRecoilValue(extractedInputsState);
  const fields = useRecoilValue(extractedInputFieldsState);

  const onTypeChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: Plugin.ExtractedInputType) => {
        set(extractedInputsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].type = value;
          })
        );
      },
    []
  );

  const onFieldCodeChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(extractedInputsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].fieldCode = value;
          })
        );
      },
    []
  );

  return (
    <>
      {extractedInputs.map(({ type, fieldCode }, i) => (
        <Row key={i}>
          <TextField
            select
            label='検索タイプ'
            color='primary'
            value={type}
            sx={{ width: '200px' }}
            onChange={(e) => onTypeChange(i, e.target.value as Plugin.ExtractedInputType)}
          >
            {INPUT_TYPES.map(({ type, label }) => (
              <MenuItem key={type} value={type}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <Autocomplete
            value={fields.find((field) => field.code === fieldCode) ?? null}
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
          <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
            <div>
              <IconButton size='small' disabled>
                <AddIcon fontSize='small' />
              </IconButton>
            </div>
          </Tooltip>
          {extractedInputs.length > 1 && (
            <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
              <div>
                <IconButton size='small'>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </div>
            </Tooltip>
          )}
        </Row>
      ))}
    </>
  );
};

const Container: FC = () => {
  return (
    <div className='grid gap-2'>
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
    </div>
  );
};

export default memo(Container);
