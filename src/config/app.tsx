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
import { FC, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jaJP } from '@mui/material/locale';
import config from '../../plugin.config.mjs';
import { useInitialize } from './hooks/use-initialize';

const Component: FC = () => {
  useInitialize();
  return (
    <>
      <Sidebar />
      <PluginContent>
        <PluginErrorBoundary>
          <Form />
        </PluginErrorBoundary>
      </PluginContent>
      <PluginBanner url='https://promotion.konomi.app/kintone-plugin/sidebar' />
      <Footer />
    </>
  );
};

const Container: FC = () => (
  <Suspense fallback={<LoaderWithLabel label='画面の描画を待機しています' />}>
    <ThemeProvider theme={createTheme({}, jaJP)}>
      <RecoilRoot>
        <PluginErrorBoundary>
          <PluginConfigProvider config={config}>
            <Notification />
            <SnackbarProvider maxSnack={1}>
              <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています...' />}>
                <PluginLayout>
                  <Component />
                </PluginLayout>
              </Suspense>
            </SnackbarProvider>
          </PluginConfigProvider>
        </PluginErrorBoundary>
      </RecoilRoot>
    </ThemeProvider>
    <iframe title='promotion' loading='lazy' src={URL_PROMOTION} className='border-0 w-full h-16' />
  </Suspense>
);

export default Container;
