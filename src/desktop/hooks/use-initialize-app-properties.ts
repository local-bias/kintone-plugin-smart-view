import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { propertiesReadyState } from '@/desktop/states/kintone';

import { getFieldsWithoutIgnores } from '@/lib/kintone';
import { appPropertiesState } from '@/desktop/states/kintone';
import { GUEST_SPACE_ID } from '@/lib/global';

export const useInitializeAppProperties = () => {
  const setReady = useSetRecoilState(propertiesReadyState);
  const setAppProperties = useSetRecoilState(appPropertiesState);

  useEffect(() => {
    (async () => {
      setAppProperties(await getFieldsWithoutIgnores({ guestSpaceId: GUEST_SPACE_ID }));
      setReady(true);
    })();
  }, []);

  return null;
};
