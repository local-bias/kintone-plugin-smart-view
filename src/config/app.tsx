import { PluginErrorBoundary } from '@/lib/components/error-boundary';
import { URL_PROMOTION } from '@/lib/statics';
import {
  PluginBanner,
  PluginContent,
  PluginLayout,
  PluginConfigProvider,
  Notification,
} from '@konomi-app/kintone-utilities-react';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { SnackbarProvider } from 'notistack';
import React, { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/model/sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jaJP } from '@mui/material/locale';
import config from '../../plugin.config.mjs';

const Component: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <ThemeProvider theme={createTheme({}, jaJP)}>
      <RecoilRoot>
        <PluginErrorBoundary>
          <PluginConfigProvider config={config}>
            <Notification />
            <SnackbarProvider maxSnack={1}>
              <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています...' />}>
                <PluginLayout>
                  <Sidebar />
                  <PluginContent>
                    <PluginErrorBoundary>
                      <Form />
                    </PluginErrorBoundary>
                  </PluginContent>
                  <PluginBanner url='https://promotion.konomi.app/kintone-plugin/paid' />
                  <Footer />
                </PluginLayout>
              </Suspense>
            </SnackbarProvider>
          </PluginConfigProvider>
        </PluginErrorBoundary>
      </RecoilRoot>
    </ThemeProvider>
    <iframe
      title='promotion'
      loading='lazy'
      src={URL_PROMOTION}
      style={{ border: '0', width: '100%', height: '64px' }}
    />
  </Suspense>
);

export default Component;
