import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { conditionsState, tabIndexState } from '../../../states/plugin';
import ConditionTab from './condition-tab';
import { PluginConditionTabs } from '@konomi-app/kintone-utility-component';

const Component: FC = () => {
  const tabIndex = useRecoilValue(tabIndexState);
  const conditions = useRecoilValue(conditionsState);

  const onTabChange = useRecoilCallback(
    ({ set }) =>
      (_: any, index: number) => {
        set(tabIndexState, index);
      },
    []
  );

  return (
    <PluginConditionTabs value={tabIndex} onChange={onTabChange}>
      {conditions.map((condition, i) => (
        <ConditionTab key={i} index={i} />
      ))}
    </PluginConditionTabs>
  );
};

export default Component;
