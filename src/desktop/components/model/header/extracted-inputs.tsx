import { appPropertiesState } from '@/desktop/states/kintone';
import { extractedSearchConditionsState, pluginConditionState } from '@/desktop/states/plugin';
import { autocompleteValuesState } from '@/desktop/states/records';
import { Autocomplete, Skeleton, TextField } from '@mui/material';
import React, { ChangeEventHandler, FC, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

type Props = { input: Plugin.ExtractedInput; index: number };

const ExtractedAutocomplete: FC<Props> = ({ input, index }) => {
  const appFields = useRecoilValue(appPropertiesState);
  const searchCondition = useRecoilValue(extractedSearchConditionsState)[index];
  const suggests = useRecoilValue(autocompleteValuesState(input.fieldCode));

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: string | null) => {
        set(extractedSearchConditionsState, (current) => {
          const next = [...current];
          next[index] = { ...next[index], value: value ?? '' };
          return next;
        });
      },
    [index]
  );

  const label =
    Object.values(appFields).find((field) => field.code === input.fieldCode)?.label ??
    input.fieldCode;

  return (
    <Autocomplete
      value={searchCondition.value}
      sx={{ width: '250px' }}
      options={suggests}
      onChange={(_, field) => onChange(field)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputLabelProps={{
            ...params.InputLabelProps,
            shrink: true,
          }}
          variant='outlined'
          color='primary'
        />
      )}
    />
  );
};

const ExtractedInput: FC<Props> = ({ input, index }) => {
  const appFields = useRecoilValue(appPropertiesState);
  const searchCondition = useRecoilValue(extractedSearchConditionsState)[index];

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (event) => {
        set(extractedSearchConditionsState, (current) => {
          const next = [...current];
          next[index] = { ...next[index], value: event.target.value };
          return next;
        });
      },
    [index]
  );

  const label =
    Object.values(appFields).find((field) => field.code === input.fieldCode)?.label ??
    input.fieldCode;

  const inputType = input.type === 'year' ? 'number' : input.type;

  return (
    <TextField
      variant='outlined'
      color='primary'
      type={inputType}
      label={label}
      value={searchCondition.value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: input.type === 'year' ? '年' : undefined,
      }}
    />
  );
};

const ExtractedInputContainer: FC<Props> = (props) => {
  if (!props.input.fieldCode) {
    return null;
  }

  switch (props.input.type) {
    case 'autocomplete':
      return <ExtractedAutocomplete {...props} />;
    default:
      return (
        <Suspense fallback={<Skeleton variant='rounded' width={200} height={52} />}>
          <ExtractedInput {...props} />
        </Suspense>
      );
  }
};

const Component: FC = () => {
  const { extractedInputs } = useRecoilValue(pluginConditionState)!;

  return (
    <>
      {extractedInputs.map((input, i) => (
        <ExtractedInputContainer key={i} index={i} input={input} />
      ))}
    </>
  );
};

export default Component;
