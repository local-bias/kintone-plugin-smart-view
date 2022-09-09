import { getAppViews } from '@common/kintone';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { allAppViewsState } from '../../states/app-views';

const Component: FC = () => {
  const setAllViews = useSetRecoilState(allAppViewsState);
  useEffect(() => {
    (async () => {
      const allViews = await getAppViews();
      setAllViews(allViews);
    })();
  }, []);

  return null;
};

export const AppViewInitializer = Component;
