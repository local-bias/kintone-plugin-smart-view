import { useEffect, FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { propertiesReadyState } from '../../states/kintone';

import { getFieldsWithoutIgnores } from '@/lib/kintone';
import { appPropertiesState } from '../../states/kintone';
import { GUEST_SPACE_ID } from '@/lib/global';

const Container: FC = () => {
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

export default Container;
