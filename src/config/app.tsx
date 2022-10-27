import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@common/plugin';
import { PluginErrorBoundary } from '@common/components/error-boundary';
import { Loading } from '@common/components/loading';

import { pluginIdState, storageState } from './states/plugin';
import Footer from './components/footer';
import Form from './components/form';
import Promotion from './components/ui/promotion';

const Component: FC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage(pluginId));
      }}
    >
      <PluginErrorBoundary>
        <SnackbarProvider maxSnack={3}>
          <Suspense fallback={<Loading label='設定情報を取得しています...' />}>
            <Form />
            <Footer />
          </Suspense>
        </SnackbarProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
    <Promotion />
  </>
);

export default Component;
