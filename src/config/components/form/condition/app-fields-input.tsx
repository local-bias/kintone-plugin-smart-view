import React, { VFC, VFCX } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { CircularProgress, TextField, MenuItem, TextFieldProps } from '@material-ui/core';

import { appFieldsState } from '../../../states';

type ContainerProps = TextFieldProps;

type Props = ContainerProps & {
  fields: Properties | null;
};

const Component: VFCX<Props> = ({ className, fields, ...others }) => (
  <>
    {!fields && <CircularProgress />}
    {!!fields && (
      <TextField {...others} select>
        {Object.values(fields).map(({ code, label }, i) => (
          <MenuItem key={i} value={code}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    )}
  </>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = (props) => {
  const fields = useRecoilValue(appFieldsState);

  return <StyledComponent {...{ ...props, fields }} />;
};

export default Container;
