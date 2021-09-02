import React, { useEffect, VFC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getAppId, getQueryCondition } from '@common/kintone';
import { getAllRecords } from '@common/kintone-rest-api';

import { allReceivedRecordsState } from '../states/all-received-records';
import { loadingState } from '../states/loading';
import { pluginConditionState } from '../states/plugin-condition';

const Container: VFC = () => {
  const setAllRecords = useSetRecoilState(allReceivedRecordsState);
  const setLoading = useSetRecoilState(loadingState);
  const condition = useRecoilValue(pluginConditionState);

  useEffect(() => {
    (async () => {
      if (!condition) {
        return;
      }
      setLoading(true);
      try {
        const app = getAppId();

        if (!app) {
          throw new Error('アプリ情報が取得できませんでした');
        }

        const query = getQueryCondition() || '';
        const fields = ['$id', ...condition.viewDisplayingFields];

        await getAllRecords({ app, query, fields, onAdvance: (records) => setAllRecords(records) });
      } finally {
        setLoading(false);
      }
    })();
  }, [condition]);

  return null;
};

export default Container;
