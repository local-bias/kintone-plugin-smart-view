import { GUEST_SPACE_ID } from '@/lib/global';
import { getAppId, getViews } from '@konomi-app/kintone-utilities';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { allAppViewsState } from '../states/kintone';
import { loadingState } from '../states/plugin';

export const useInitialize = () => {
  const setAllAppViews = useSetRecoilState(allAppViewsState);
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const app = getAppId();
        if (!app) {
          throw new Error('アプリのフィールド情報が取得できませんでした');
        }

        const { views } = await getViews({
          app,
          preview: true,
          guestSpaceId: GUEST_SPACE_ID,
          debug: process.env.NODE_ENV === 'development',
        });

        setAllAppViews(views);
      } finally {
        setLoading(false);
      }
    })();
  });

  return {};
};
