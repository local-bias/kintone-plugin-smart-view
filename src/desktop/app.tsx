import React, { VFC } from 'react';
import { RecoilRoot } from 'recoil';

import { pluginConditionState } from './states/plugin-condition';

import { ErrorBoundary } from '@common/components/error-boundary';
import Initializer from './components/initializer';
import Layout from './components/layout';
import Header from './components/header';
import Table from './components/table';
import Footer from './components/footer';

type Props = Readonly<{ condition: kintone.plugin.Condition }>;

const Component: VFC<Props> = ({ condition }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
    }}
  >
    <ErrorBoundary>
      <Initializer />
      <Layout>
        <Header />
        <Table />
        <Footer />
      </Layout>
    </ErrorBoundary>
  </RecoilRoot>
);

export default Component;
