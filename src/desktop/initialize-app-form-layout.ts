import { GUEST_SPACE_ID, isProd } from '@/lib/global';
import { PLUGIN_NAME } from '@/lib/statics';
import { store } from '@/lib/store';
import { getFormLayout } from '@konomi-app/kintone-utilities';
import { appFormLayoutAtom, currentAppIdAtom, formLayoutReadyAtom } from './states/kintone';

export const initializeAppFormLayout = async () => {
  try {
    const isReady = store.get(formLayoutReadyAtom);
    if (isReady) {
      return;
    }

    const app = store.get(currentAppIdAtom);
    const { layout } = await getFormLayout({ app, guestSpaceId: GUEST_SPACE_ID });
    store.set(appFormLayoutAtom, layout);
    !isProd && console.log(`✨ App Form Layout initialized:`, layout);
  } catch (error) {
    console.error(`[${PLUGIN_NAME}] Error initializing app form layout:`, error);
  } finally {
    store.set(formLayoutReadyAtom, true);
  }
};
