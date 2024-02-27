import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { PluginErrorBoundary } from '@/lib/components/error-boundary';

import { extractedSearchConditionsState, pluginConditionState } from './states/plugin';
import Layout from './components/model/layout';
import Header from './components/model/header';
import Table from './components/model/table';
import Footer from './components/model/footer';
import { paginationChunkState } from './states/pagination';
import { searchTextState } from './states/search-text';
import { getSortFromQuery } from '@konomi-app/kintone-utilities';
import { useSortObserver } from './hooks/use-sort-observer';
import { useInitialize } from './hooks/use-initialize';
import { useInitializeAppProperties } from './hooks/use-initialize-app-properties';
import { DocumentIconSymbol } from './components/ui/document-icon';

type Props = Readonly<{
  condition: Plugin.Condition;
  sortCondition: ReturnType<typeof getSortFromQuery>;
  initSearchText: string;
  extractedSearchCondition: Plugin.ExtractedSearchCondition[];
}>;

const Component: FC<Pick<Props, 'sortCondition'>> = ({ sortCondition }) => {
  useInitialize();
  useInitializeAppProperties();
  useSortObserver(sortCondition);

  return (
    <>
      <Layout>
        <Header />
        <Table />
        <Footer />
      </Layout>
    </>
  );
};

const Container: FC<Props> = ({
  condition,
  sortCondition,
  initSearchText,
  extractedSearchCondition,
}) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
      set(searchTextState, initSearchText);
      set(paginationChunkState, condition.paginationChunk || 100);
      extractedSearchCondition.forEach((con, index) => {
        set(extractedSearchConditionsState(index), con);
      });
    }}
  >
    <DocumentIconSymbol />
    <SnackbarProvider maxSnack={1}>
      <PluginErrorBoundary>
        <Component sortCondition={sortCondition} />
      </PluginErrorBoundary>
    </SnackbarProvider>
  </RecoilRoot>
);

export default Container;
