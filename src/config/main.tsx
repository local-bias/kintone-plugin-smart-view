import { t } from '@/lib/i18n';
import { createRoot } from 'react-dom/client';
import App from './app';

const root = document.getElementById('settings');
if (!root) {
  throw new Error(t('config.error.root-not-found'));
}
createRoot(root).render(<App />);
