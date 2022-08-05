import * as Sentry from '@sentry/react';
import { PLUGIN_NAME } from './statics';

Sentry.init({
  dsn: 'https://947849a62ea4438b9b3fc3a04e41d2ae@o1300660.ingest.sentry.io/6535495',
  integrations: [],
  tracesSampleRate: 0.3,
  initialScope: {
    tags: { 'plugin-name': PLUGIN_NAME, host: window?.location?.host },
  },
});
