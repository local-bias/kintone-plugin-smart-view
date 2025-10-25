import { t } from '@/lib/i18n';
import { createRoot } from 'react-dom/client';
import invariant from 'tiny-invariant';
import App from './app';

const root = document.getElementById('settings');
invariant(root, t('config.error.root-not-found'));
createRoot(root).render(<App />);
