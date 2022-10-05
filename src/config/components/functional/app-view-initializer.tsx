import { kintoneClient } from '@common/kintone';
import { getAppId } from '@lb-ribbit/kintone-xapp';
import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { allAppViewsState } from '../../states/app-views';

const Component: FC = () => {
  const setAllViews = useSetRecoilState(allAppViewsState);
  useEffect(() => {
    (async () => {
      const app = getAppId();

      if (!app) {
        throw new Error('アプリのフィールド情報が取得できませんでした');
      }

      const { views } = await kintoneClient.app.getViews({ app, preview: true });

      setAllViews(views);
    })();
  }, []);

  return null;
};

export const AppViewInitializer = Component;
