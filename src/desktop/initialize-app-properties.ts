import { GUEST_SPACE_ID, isProd } from '@/lib/global';
import { getFieldsWithoutIgnores } from '@/lib/kintone';
import { store } from '@/lib/store';
import { currentAppIdAtom, fieldPropertiesAtom, propertiesReadyAtom } from './states/kintone';
import { PLUGIN_NAME } from '@/lib/statics';

export const initializeAppProperties = async () => {
  try {
    const isReady = store.get(propertiesReadyAtom);
    if (isReady) {
      return;
    }

    const appId = store.get(currentAppIdAtom);
    const properties = await getFieldsWithoutIgnores({ guestSpaceId: GUEST_SPACE_ID });
    store.set(fieldPropertiesAtom(appId), properties);
    !isProd && console.log(`✨ App properties initialized:`, properties);
  } catch (error) {
    console.error(`[${PLUGIN_NAME}] Failed to initialize app properties:`, error);
  } finally {
    store.set(propertiesReadyAtom, true);
  }
};
