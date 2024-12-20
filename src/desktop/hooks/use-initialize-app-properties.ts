import { appPropertiesAtom, propertiesReadyAtom } from '@/desktop/states/kintone';
import { GUEST_SPACE_ID } from '@/lib/global';
import { getFieldsWithoutIgnores } from '@/lib/kintone';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const useInitializeAppProperties = () => {
  const setReady = useSetAtom(propertiesReadyAtom);
  const setAppProperties = useSetAtom(appPropertiesAtom);

  useEffect(() => {
    (async () => {
      setAppProperties(await getFieldsWithoutIgnores({ guestSpaceId: GUEST_SPACE_ID }));
      setReady(true);
    })();
  }, []);

  return null;
};
