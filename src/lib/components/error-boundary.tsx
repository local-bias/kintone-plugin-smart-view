import styled from '@emotion/styled';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { Alert, AlertTitle, Button } from '@mui/material';
import config from 'plugin.config.mjs';
import { PropsWithChildren, useState } from 'react';
import { FallbackProps, ErrorBoundary as PrimitiveErrorBoundary } from 'react-error-boundary';
import { t } from '../i18n';
import { URL_INQUIRY } from '../statics';

type FallbackComponentProps = FallbackProps & {
  className?: string;
};

function ErrorFallbackComponent(props: FallbackComponentProps) {
  const { error, resetErrorBoundary, className } = props;
  const [loading, setLoading] = useState(false);

  const onRetry = () => {
    setLoading(true);
    setTimeout(() => {
      resetErrorBoundary();
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return <LoaderWithLabel label={t('common.loading.retry')} />;
  }

  return (
    <div className={className}>
      <Alert severity='error'>
        <AlertTitle title={error.message}>{t('common.error.occurred')}</AlertTitle>
        <h2>{t('common.error.hints')}</h2>
        <ol>
          <li>
            <h3>{t('common.error.retry.title')}</h3>
            <p>{t('common.error.retry.description')}</p>
            <Button variant='contained' color='error' onClick={onRetry}>
              {t('common.error.retry.button')}
            </Button>
          </li>
          {!!config.pluginReleasePageUrl && (
            <li>
              <h3>{t('common.error.latestVersion.title')}</h3>
              <p>
                {t('common.error.latestVersion.description1')}
                <br />
                {t('common.error.latestVersion.description2')}
              </p>
              <Button
                variant='contained'
                color='error'
                onClick={() => window.open(config.pluginReleasePageUrl, '_blank')}
              >
                {t('common.error.latestVersion.button')}
              </Button>
            </li>
          )}
          <li>
            <h3>{t('common.error.updateSettings.title')}</h3>
            <p>
              {t('common.error.updateSettings.description')}
              <ul>
                <li>{t('common.error.updateSettings.steps.1')}</li>
                <li>{t('common.error.updateSettings.steps.2')}</li>
                <li>{t('common.error.updateSettings.steps.3')}</li>
                <li>{t('common.error.updateSettings.steps.4')}</li>
                <li>{t('common.error.updateSettings.steps.5')}</li>
                <li>{t('common.error.updateSettings.steps.6')}</li>
                <li>{t('common.error.updateSettings.steps.7')}</li>
                <li>{t('common.error.updateSettings.steps.8')}</li>
                <li>{t('common.error.updateSettings.steps.9')}</li>
              </ul>
            </p>
          </li>
          <li>
            <h3>{t('common.error.inquiry.title')}</h3>
            <p>{t('common.error.inquiry.description')}</p>
            <pre>
              <code>
                {JSON.stringify(
                  {
                    [t('common.error.pluginId')]: config.id,
                    [t('common.error.pluginName')]: config.manifest.base.name.ja,
                    [t('common.error.version')]: config.manifest.base.version,
                    [t('common.error.errorMessage')]:
                      error?.message ?? t('common.error.unknownError'),
                    [t('common.error.errorStack')]: error?.stack,
                    [t('common.error.errorDetails')]: error,
                  },
                  null,
                  2
                )}
              </code>
            </pre>
            <Button
              variant='contained'
              color='error'
              onClick={() => window.open(URL_INQUIRY, '_blank')}
            >
              {t('common.error.inquiry.button')}
            </Button>
          </li>
        </ol>
      </Alert>
    </div>
  );
}

const StyledErrorFallback = styled(ErrorFallbackComponent)`
  margin: 8px;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;
    font-weight: bold;
  }
  h3 {
    font-size: 18px;
    margin: 0 0 6px;
    font-weight: bold;
  }
  p {
    margin: 0 0 8px;
  }

  ol {
    list-style: decimal;
    display: grid;
    gap: 32px;
    padding-inline-start: 16px;
  }

  ul {
    padding: 8px 0;
    list-style: disc;
    display: grid;
    gap: 8px;
    padding-inline-start: 16px;
  }

  pre {
    display: grid;
    background-color: rgb(31 41 55);
    color: rgb(243 244 246);
    padding: 16px;
    margin-bottom: 8px;
    max-width: 400px;
  }

  code {
    width: 100%;
    overflow-x: auto;
  }
`;

export function PluginErrorBoundary(props: PropsWithChildren<{}>) {
  const { children } = props;
  return (
    <PrimitiveErrorBoundary fallbackRender={(props) => <StyledErrorFallback {...props} />}>
      {children}
    </PrimitiveErrorBoundary>
  );
}
