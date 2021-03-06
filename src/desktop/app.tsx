import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { PluginErrorBoundary } from '@common/components/error-boundary';

import { pluginConditionState } from './states/plugin-condition';
import Initializer from './components/initializer';
import AppPropertiesObserver from './components/app-properties-observer';
import Layout from './components/layout';
import Header from './components/header';
import Table from './components/table';
import Footer from './components/footer';

type Props = Readonly<{ condition: kintone.plugin.Condition }>;

const Component: FC<Props> = ({ condition }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
    }}
  >
    <SnackbarProvider maxSnack={1}>
      <PluginErrorBoundary>
        <Initializer />
        <AppPropertiesObserver />
        <Layout>
          <Header />
          <Table />
          <Footer />
        </Layout>
      </PluginErrorBoundary>
    </SnackbarProvider>
  </RecoilRoot>
);

export default Component;
