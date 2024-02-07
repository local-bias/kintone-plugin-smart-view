import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { PluginErrorBoundary } from '@/lib/components/error-boundary';

import { extractedSearchConditionsState, pluginConditionState } from './states/plugin';
import Initializer from './components/functional/initializer';
import AppPropertiesObserver from './components/functional/app-properties-observer';
import Layout from './components/model/layout';
import Header from './components/model/header';
import Table from './components/model/table';
import Footer from './components/model/footer';
import { paginationChunkState } from './states/pagination';
import { searchTextState } from './states/search-text';

type Props = Readonly<{
  condition: Plugin.Condition;
  initSearchText: string;
  extractedSearchCondition: Plugin.ExtractedSearchCondition[];
}>;

const Component: FC<Props> = ({ condition, initSearchText, extractedSearchCondition }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
      set(searchTextState, initSearchText);
      set(paginationChunkState, condition.paginationChunk || 100);
      set(extractedSearchConditionsState, extractedSearchCondition);
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
