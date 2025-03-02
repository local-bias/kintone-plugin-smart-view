import { GUEST_SPACE_ID, isProd } from '@/lib/global';
import { store } from '@/lib/store';
import { getAllApps, getSpace, withSpaceIdFallback } from '@konomi-app/kintone-utilities';
import { allKintoneAppsAtom, kintoneSpacesAtom } from './states/kintone';

(async () => {
  try {
    const apps = await getAllApps({
      guestSpaceId: GUEST_SPACE_ID,
      debug: !isProd,
    });
    store.set(allKintoneAppsAtom, apps);

    const spaceIds = new Set(
      apps.map((app) => app.spaceId).filter((spaceId): spaceId is string => !!spaceId)
    );
    for (const id of spaceIds) {
      try {
        const space = await withSpaceIdFallback({
          spaceId: id,
          func: getSpace,
          funcParams: { id, debug: true },
        });
        store.set(kintoneSpacesAtom, (current) => [...current, space]);
      } catch (error) {
        !isProd && console.error(error);
      }
    }
  } catch (error) {
    !isProd && console.error(error);
  }
})();
