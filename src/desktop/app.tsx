import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { PluginErrorBoundary } from '@/lib/components/error-boundary';

import { pluginConditionState } from './states/plugin';
import Initializer from './components/functional/initializer';
import AppPropertiesObserver from './components/functional/app-properties-observer';
import Layout from './components/model/layout';
import Header from './components/model/header';
import Table from './components/model/table';
import Footer from './components/model/footer';
import { paginationChunkState } from './states/pagination';

type Props = Readonly<{ condition: kintone.plugin.LatestCondition }>;

const Component: FC<Props> = ({ condition }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
      set(paginationChunkState, condition.paginationChunk || 100);
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
