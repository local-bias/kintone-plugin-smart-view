import React, { ChangeEventHandler, memo, FC, VFCX } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storageState } from '../../../states';
import produce from 'immer';
import { ViewForResponse } from '@kintone/rest-api-client/lib/client/types';
import { MenuItem, TextField } from '@mui/material';
import { customViewsState } from '../../../states/app-views';

type ContainerProps = Readonly<{ conditionIndex: number }>;
type Props = Readonly<{
  views: Record<string, ViewForResponse>;
  viewId: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}>;

const Component: VFCX<Props> = memo(({ className, views, viewId, onChange }) => (
  <div {...{ className }}>
    <TextField select label='一覧の名前' value={viewId} {...{ onChange }}>
      {Object.entries(views).map(([name, { id }], i) => (
        <MenuItem key={i} value={id}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  </div>
));

const StyledComponent = styled(Component)`
  & > div {
    width: 250px;
  }
`;

const Container: FC<ContainerProps> = ({ conditionIndex }) => {
  const [storage, setStorage] = useRecoilState(storageState);
  const views = useRecoilValue(customViewsState);

  const { viewId } = storage!.conditions[conditionIndex];

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[conditionIndex].viewId = e.target.value;
      })
    );
  };

  return <StyledComponent {...{ views, viewId, onChange }} />;
};

export default Container;
