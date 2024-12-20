import { appPropertiesAtom } from '@/desktop/states/kintone';
import { extractedSearchConditionsAtom, pluginConditionAtom } from '@/desktop/states/plugin';
import { autocompleteValuesAtom } from '@/desktop/states/records';
import { Autocomplete, Skeleton, TextField, Tooltip } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { ChangeEventHandler, FC, Suspense, useCallback } from 'react';

type Props = { input: Plugin.ExtractedInput; index: number };

const ExtractedAutocomplete: FC<Props> = ({ input, index }) => {
  const appFields = useAtomValue(appPropertiesAtom);
  const searchCondition = useAtomValue(extractedSearchConditionsAtom(index))!;
  const suggests = useAtomValue(autocompleteValuesAtom(input.fieldCode));

  const onChange = useAtomCallback(
    useCallback(
      (get, set, value: string | null) => {
        set(extractedSearchConditionsAtom(index), (_c, c = _c!) => ({ ...c, value: value ?? '' }));
      },
      [index]
    )
  );

  const field = Object.values(appFields).find((field) => field.code === input.fieldCode);

  if (Object.keys(appFields).length && !field) {
    return (
      <Tooltip title='フィールドが存在しないか、フィールドの設定が不正です'>
        <TextField
          sx={{ width: '250px' }}
          disabled
          label={input.fieldCode}
          variant='outlined'
          color='primary'
        />
      </Tooltip>
    );
  }

  const label = field?.label ?? input.fieldCode;

  return (
    <Autocomplete
      value={searchCondition.value || null}
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
  const appFields = useAtomValue(appPropertiesAtom);
  const searchCondition = useAtomValue(extractedSearchConditionsAtom(index))!;

  const onChange: ChangeEventHandler<HTMLInputElement> = useAtomCallback(
    useCallback(
      (get, set, event) => {
        set(extractedSearchConditionsAtom(index), (_c, c = _c!) => ({
          ...c,
          value: event.target.value,
        }));
      },
      [index]
    )
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
        <Suspense fallback={<Skeleton variant='rounded' width={250} height={52} />}>
          <ExtractedInput {...props} />
        </Suspense>
      );
  }
};

const Component: FC = () => {
  const { extractedInputs } = useAtomValue(pluginConditionAtom)!;

  return (
    <>
      {extractedInputs.slice(0, 1).map((input, i) => (
        <ExtractedInputContainer key={i} index={i} input={input} />
      ))}
    </>
  );
};

export default Component;
