import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { store } from '@/lib/store';
import { Provider, useAtom } from 'jotai';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';
import Footer from './components/model/footer';
import Header from './components/model/header';
import Layout from './components/model/layout';
import View from './components/model/view';
import { DocumentIconSymbol } from './components/ui/document-icon';
import { searchTextEffect } from './states/search-text';

const App: FC = () => {
  useAtom(searchTextEffect);

  return (
    <>
      <Layout className='🐸'>
        <Header />
        <View />
        <Footer />
      </Layout>
    </>
  );
};

const AppContainer: FC = () => (
  <Provider store={store}>
    <DocumentIconSymbol />
    <SnackbarProvider maxSnack={1}>
      <PluginErrorBoundary>
        <App />
      </PluginErrorBoundary>
    </SnackbarProvider>
  </Provider>
);

export default AppContainer;
