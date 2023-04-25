import React, { FC, FCX } from 'react';
import { useRecoilValue } from 'recoil';

import { storageState } from '../../../states/plugin';
import Condition from './condition';
import { ConditionIndexProvider } from '../../condition-index-provider';
import { PluginContent } from '@konomi-app/kintone-utility-component';

type Props = Readonly<{
  conditionLength: number;
}>;

const Component: FCX<Props> = ({ conditionLength }) => (
  <PluginContent>
    {new Array(conditionLength).fill('').map((_, index) => (
      <ConditionIndexProvider key={index} conditionIndex={index}>
        <Condition key={index} />
      </ConditionIndexProvider>
    ))}
  </PluginContent>
);

const Container: FC = () => {
  const storage = useRecoilValue(storageState);

  const conditionLength = storage?.conditions?.length ?? 1;

  return <Component conditionLength={conditionLength} />;
};

export default Container;
