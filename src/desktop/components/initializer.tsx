import { useEffect, FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getAppId, getQuery } from '@lb-ribbit/kintone-xapp';
import { getAllRecords } from '@common/kintone-rest-api';

import { allViewRecordsState } from '../states/records';
import { loadingState } from '../states/plugin';
import { pluginConditionState } from '../states/plugin';
import { ViewRecord } from '../static';
import { katakana2hiragana } from '@common/utilities';
import { getQuickSearchString } from '@common/kintone';

const Container: FC = () => {
  const setAllRecords = useSetRecoilState(allViewRecordsState);
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

        const query = (getQuery() || '').replace(/limit [0-9]+/g, '').replace(/offset [0-9]+/g, '');

        const targetFields = condition.viewDisplayingFields.filter((field) => !!field);
        const fields = ['$id', ...targetFields];

        await getAllRecords({
          app,
          query,
          fields,
          onAdvance: (records) => {
            const viewRecords = records.map<ViewRecord>((record) => {
              let __quickSearch = getQuickSearchString(record);

              if (condition.ignoresLetterCase) {
                __quickSearch = __quickSearch.toLowerCase();
              }

              if (condition.ignoresKatakana) {
                __quickSearch = katakana2hiragana(__quickSearch);
              }

              return { record, __quickSearch };
            });
            setAllRecords(viewRecords);
          },
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [condition]);

  return null;
};

export default Container;
