import { useEffect, FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { propertiesReadyState } from '../../states/kintone';

import { getFieldsWithoutIgnores } from '@common/kintone';
import { appPropertiesState } from '../../states/kintone';

const Container: FC = () => {
  const setReady = useSetRecoilState(propertiesReadyState);
  const setAppProperties = useSetRecoilState(appPropertiesState);

  useEffect(() => {
    (async () => {
      setAppProperties(await getFieldsWithoutIgnores());
      setReady(true);
    })();
  }, []);

  return null;
};

export default Container;
