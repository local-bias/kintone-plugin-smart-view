import React, { FC } from 'react';

import AdditionButton from './condition-addition-button';
import Tabs from './condition-tabs';
import { PluginSidebar } from '@konomi-app/kintone-utility-component';

const Component: FC = () => (
  <PluginSidebar>
    <AdditionButton />
    <Tabs />
  </PluginSidebar>
);

export default Component;
