import { t } from '@/lib/i18n';
import { PluginExtractedInputType } from '@/schema/plugin-config';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material';
import { produce } from 'immer';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { FC, Suspense, useCallback } from 'react';
import { extractedInputFieldsAtom } from '../../../states/app-fields';
import { extractedInputsAtom } from '../../../states/plugin';

const INPUT_TYPES: { type: PluginExtractedInputType; label: string; }[] = [
  { type: 'text', label: t('config.app.form.extractedInputs.type.text') },
  {
    type: 'autocomplete',
    label: t('config.app.form.extractedInputs.type.dropdown'),
  },
  { type: 'date', label: t('config.app.form.extractedInputs.type.date') },
  { type: 'month', label: t('config.app.form.extractedInputs.type.month') },
  { type: 'year', label: t('config.app.form.extractedInputs.type.year') },
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

function FieldSelect({ fieldCode, i }: { fieldCode: string; i: number; }) {
  const fields = useAtomValue(extractedInputFieldsAtom);
  const onFieldCodeChange = useAtomCallback(
    useCallback((_, set, rowIndex: number, value: string) => {
      set(extractedInputsAtom, (current) =>
        produce(current, (draft) => {
          draft[rowIndex].fieldCode = value;
        })
      );
    }, [])
  );
  return (
    <Autocomplete
      value={fields.find((field) => field.code === fieldCode) ?? null}
      sx={{ width: '350px' }}
      options={fields}
      isOptionEqualToValue={(option, v) => option.code === v.code}
      getOptionLabel={(option) => `${option.label}(${option.code})`}
      onChange={(_, field) => onFieldCodeChange(i, field?.code ?? '')}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component='li' {...optionProps}>
            <div className='grid'>
              <div className='text-xs text-gray-400'>
                {t('common.autocomplete.options.fieldCode', option.code)}
              </div>
              {option.label}
            </div>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('config.app.form.extractedInputs.fieldCode.label')}
          slotProps={{ inputLabel: { shrink: true } }}
          variant='outlined'
          color='primary'
        />
      )}
    />
  );
}

function FieldSelectContainer(props: { fieldCode: string; i: number; }) {
  return (
    <Suspense
      fallback={
        <Skeleton variant='rounded' width={350} height={56} />
      }
    >
      <FieldSelect {...props} />
    </Suspense>
  );
}

const Component: FC = () => {
  const extractedInputs = useAtomValue(extractedInputsAtom);
  const fields = useAtomValue(extractedInputFieldsAtom);

  const onTypeChange = useAtomCallback(
    useCallback((_, set, rowIndex: number, value: PluginExtractedInputType) => {
      set(extractedInputsAtom, (current) =>
        produce(current, (draft) => {
          draft[rowIndex].type = value;
        })
      );
    }, [])
  );

  return (
    <>
      {extractedInputs.map(({ type, fieldCode }, i) => (
        <Row key={i}>
          <TextField
            select
            label={t('config.app.form.extractedInputs.type.label')}
            color='primary'
            value={type}
            sx={{ width: '200px' }}
            onChange={(e) => onTypeChange(i, e.target.value as PluginExtractedInputType)}
          >
            {INPUT_TYPES.map(({ type, label }) => (
              <MenuItem key={type} value={type}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <FieldSelectContainer fieldCode={fieldCode} i={i} />
          <Tooltip title='無料版では１件のみ設定可能です'>
            <div>
              <IconButton size='small' disabled>
                <AddIcon fontSize='small' />
              </IconButton>
            </div>
          </Tooltip>
        </Row>
      ))}
    </>
  );
};

const Container: FC = () => {
  // React 19 optimized: Use Array.from with predictable pattern instead of Array.fill
  const skeletonRows = Array.from({ length: 3 }, (_, i) => (
    <Row key={i}>
      <Skeleton variant='rounded' width={350} height={56} />
      <Skeleton variant='rounded' width={120} height={56} />
      <Skeleton variant='circular' width={24} height={24} />
      <Skeleton variant='circular' width={24} height={24} />
    </Row>
  ));

  return (
    <div className='grid gap-2'>
      <Suspense fallback={skeletonRows}>
        <Component />
      </Suspense>
    </div>
  );
};

// React 19: Component will be automatically optimized by React Compiler
export default Container;
