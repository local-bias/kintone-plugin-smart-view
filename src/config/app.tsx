import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@common/plugin';
import { PluginErrorBoundary } from '@common/components/error-boundary';
import { Loading } from '@common/components/loading';
import { PluginLayout, PluginBanner } from '@konomi-app/kintone-utility-component';

import { pluginIdState, storageState } from './states/plugin';
import Sidebar from './components/model/sidebar';
import Footer from './components/model/footer';
import Form from './components/model/form';
import { URL_PROMOTION } from '@common/statics';

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
          <PluginLayout>
            <Suspense fallback={<Loading label='設定情報を取得しています...' />}>
              <Sidebar />
              <Form />
              <PluginBanner url='https://promotion.konomi.app/kintone-plugin/sidebar' />
              <Footer />
            </Suspense>
          </PluginLayout>
        </SnackbarProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
    <iframe
      title='promotion'
      loading='lazy'
      src={URL_PROMOTION}
      style={{ border: '0', width: '100%', height: '64px' }}
    />
  </>
);

export default Component;
