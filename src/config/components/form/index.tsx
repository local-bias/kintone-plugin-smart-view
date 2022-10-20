import React, { FC, FCX } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

import { storageState } from '../../states/plugin';
import ConditionAdditionButton from './condition-addition-button';
import Condition from './condition';
import { ConditionIndexProvider } from '../condition-index-provider';

type Props = Readonly<{
  storage: kintone.plugin.Storage | null;
}>;

const Component: FCX<Props> = ({ className, storage }) => (
  <div {...{ className }}>
    {!storage && (
      <>
        <CircularProgress />
        <div>設定情報を取得しています</div>
      </>
    )}
    {!!storage && (
      <>
        {storage.conditions.map((condition, index) => (
          <ConditionIndexProvider key={index} conditionIndex={index}>
            <Condition key={index} {...{ condition, index }} />
          </ConditionIndexProvider>
        ))}
        <ConditionAdditionButton label='新しい設定' />
      </>
    )}
  </div>
);

const StyledComponent = styled(Component)`
  width: 100%;

  & > div {
    padding: 1em;
  }
`;

const Container: FC = () => {
  const storage = useRecoilValue(storageState);

  return <StyledComponent {...{ storage }} />;
};

export default Container;
