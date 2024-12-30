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
import Footer from './components/model/footer';
import Form from './components/model/form';
import Sidebar from './components/sidebar';
import config from '../../plugin.config.mjs';
import { ThemeProvider } from '@/lib/components/theme-provider';
import { t } from '@/lib/i18n';

const Component: FC = () => {
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
  <Suspense fallback={<LoaderWithLabel label={t('config.app.root.loading')} />}>
    <ThemeProvider>
      <PluginErrorBoundary>
        <PluginConfigProvider config={config}>
          <Notification />
          <SnackbarProvider maxSnack={1}>
            <Suspense fallback={<LoaderWithLabel label={t('config.app.config.loading')} />}>
              <PluginLayout>
                <Component />
              </PluginLayout>
            </Suspense>
          </SnackbarProvider>
        </PluginConfigProvider>
      </PluginErrorBoundary>
    </ThemeProvider>
    <iframe title='promotion' loading='lazy' src={URL_PROMOTION} className='border-0 w-full h-16' />
  </Suspense>
);

export default Container;
