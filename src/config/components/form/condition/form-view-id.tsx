import React, { ChangeEventHandler, FC, FCX, Suspense } from 'react';
import styled from '@emotion/styled';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { viewIdState } from '../../../states/plugin';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { customViewsState } from '../../../states/kintone';
import { useConditionIndex } from '../../condition-index-provider';

const Component: FCX = ({ className }) => {
  const conditionIndex = useConditionIndex();
  const views = useRecoilValue(customViewsState);
  const viewId = useRecoilValue(viewIdState(conditionIndex));

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (e) => {
        set(viewIdState(conditionIndex), e.target.value);
      },
    [conditionIndex]
  );

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

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton width={250} height={56} />}>
      <StyledComponent />
    </Suspense>
  );
};

export default Container;
