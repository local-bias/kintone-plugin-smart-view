import { PluginErrorBoundary } from '@/common/components/error-boundary';
import { Loading } from '@/common/components/loading';
import { URL_PROMOTION } from '@/common/statics';
import { PluginBanner, PluginLayout } from '@konomi-app/kintone-utility-component';
import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/model/sidebar';

const Component: FC = () => (
  <>
    <RecoilRoot>
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
