import { getAppId, getQueryCondition } from '@common/kintone';
import { getAllRecords } from '@common/kintone-rest-api';
import React, { memo, useEffect, VFC } from 'react';
import { useSetRecoilState } from 'recoil';

import { allReceivedRecordsState } from '../states/all-received-records';
import { loadingState } from '../states/loading';

const Container: VFC = memo(() => {
  const setAllRecords = useSetRecoilState(allReceivedRecordsState);
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const app = getAppId();

        if (!app) {
          throw new Error('アプリ情報が取得できませんでした');
        }

        const query = getQueryCondition() || '';
        await getAllRecords({ app, query, onAdvance: (records) => setAllRecords(records) });

        console.log('initialized');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return null;
});

export default Container;
