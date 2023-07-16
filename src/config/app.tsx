import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { URL_PROMOTION } from '@/lib/statics';
import { PluginBanner, PluginContent, PluginLayout } from '@konomi-app/kintone-utility-component';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/model/sidebar';

const Component: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <RecoilRoot>
      <PluginErrorBoundary>
        <SnackbarProvider maxSnack={1}>
          <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています...' />}>
            <PluginLayout>
              <Sidebar />
              <PluginContent>
                <Form />
              </PluginContent>
              <PluginBanner url='https://promotion.konomi.app/kintone-plugin/sidebar' />
              <Footer />
            </PluginLayout>
          </Suspense>
        </SnackbarProvider>
      </PluginErrorBoundary>
    </RecoilRoot>
    <iframe
      title='promotion'
      loading='lazy'
      src={URL_PROMOTION}
      style={{ border: '0', width: '100%', height: '64px' }}
    />
  </Suspense>
);

export default Component;
