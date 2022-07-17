import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { CircularProgress, TextField, Autocomplete } from '@mui/material';

import { appFieldsState } from '../../../states/app-fields';
import { kx } from '../../../../types/kintone.api';

type ContainerProps = {
  value: string;
  onChange: (code: string) => void;
};

type Props = ContainerProps & {
  fields: kx.FieldProperty[];
};

const Component: FC<Props> = ({ fields, value, onChange }) => (
  <>
    {!fields && <CircularProgress />}
    {!!fields && (
      <Autocomplete
        value={fields.find((field) => field.code === value)}
        sx={{ width: '350px' }}
        options={fields}
        onChange={(_, option) => onChange(option?.code || '')}
        renderInput={(params) => (
          <TextField {...params} label='対象フィールド' variant='outlined' color='primary' />
        )}
      />
    )}
  </>
);

const Container: FC<ContainerProps> = (props) => {
  const fields = useRecoilValue(appFieldsState);

  return <Component {...{ ...props, fields }} />;
};

export default Container;
