import React, { VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { ErrorBoundary } from '@common/components/error-boundary';

import { pluginConditionState } from './states/plugin-condition';
import Initializer from './components/initializer';
import AppPropertiesObserver from './components/app-properties-observer';
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
    <SnackbarProvider maxSnack={1}>
      <ErrorBoundary>
        <Initializer />
        <AppPropertiesObserver />
        <Layout>
          <Header />
          <Table />
          <Footer />
        </Layout>
      </ErrorBoundary>
    </SnackbarProvider>
  </RecoilRoot>
);

export default Component;
