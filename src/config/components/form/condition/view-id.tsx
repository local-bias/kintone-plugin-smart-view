import React, { ChangeEventHandler, memo, FC, FCX, Suspense } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storageState } from '../../../states/plugin';
import produce from 'immer';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { customViewsState } from '../../../states/kintone';

type ContainerProps = Readonly<{ conditionIndex: number }>;
type Props = Readonly<{
  viewId: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}>;

const Component: FCX<Props> = ({ className, viewId, onChange }) => {
  const views = useRecoilValue(customViewsState);

  return (
    <div {...{ className }}>
      <TextField select label='一覧の名前' value={viewId} {...{ onChange }}>
        {Object.entries(views).map(([name, { id }], i) => (
          <MenuItem key={i} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const StyledComponent = styled(Component)`
  & > div {
    width: 250px;
  }
`;

const Container: FC<ContainerProps> = ({ conditionIndex }) => {
  const [storage, setStorage] = useRecoilState(storageState);

  const { viewId } = storage!.conditions[conditionIndex];

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[conditionIndex].viewId = e.target.value;
      })
    );
  };

  return (
    <Suspense fallback={<Skeleton width={250} height={56} />}>
      <StyledComponent {...{ viewId, onChange }} />
    </Suspense>
  );
};

export default Container;
