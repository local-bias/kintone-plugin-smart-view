import { useEffect, FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getAppId, getQuery } from '@lb-ribbit/kintone-xapp';
import { getAllRecords } from '@common/kintone-rest-api';

import { allViewRecordsState, isFetchCompleteState } from '../../states/records';
import { errorState, loadingState } from '../../states/plugin';
import { pluginConditionState } from '../../states/plugin';
import type { ViewRecord } from '../../static';
import {
  convertHankakuKatakanaToZenkaku,
  convertKatakanaToHiragana,
  convertZenkakuEisujiToHankaku,
} from '@common/utilities';
import { getQuickSearchString } from '@common/kintone';
import { getAllRecordsWithId, kintoneAPI } from '@konomi-app/kintone-utilities';

const Container: FC = () => {
  const setAllRecords = useSetRecoilState(allViewRecordsState);
  const setLoading = useSetRecoilState(loadingState);
  const condition = useRecoilValue(pluginConditionState);
  const setError = useSetRecoilState(errorState);
  const setFetchComplete = useSetRecoilState(isFetchCompleteState);

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

        const {
          viewDisplayingFields,
          ignoresLetterCase = true,
          ignoresKatakana = true,
          ignoresHankakuKatakana = true,
          ignoresZenkakuEisuji = true,
          disableCursorAPI = false,
        } = condition;

        const query = (getQuery() || '').replace(/limit [0-9]+/g, '').replace(/offset [0-9]+/g, '');

        const targetFields = viewDisplayingFields.filter((field) => !!field);
        const fields = ['$id', ...targetFields];

        const onStep = (records: kintoneAPI.RecordData[]) => {
          const viewRecords = records.map<ViewRecord>((record) => {
            let __quickSearch = getQuickSearchString(record);

            if (ignoresZenkakuEisuji) {
              __quickSearch = convertZenkakuEisujiToHankaku(__quickSearch);
            }

            if (ignoresLetterCase) {
              __quickSearch = __quickSearch.toLowerCase();
            }

            if (ignoresHankakuKatakana) {
              __quickSearch = convertHankakuKatakanaToZenkaku(__quickSearch);
            }

            if (ignoresKatakana) {
              __quickSearch = convertKatakanaToHiragana(__quickSearch);
            }

            return { record, __quickSearch };
          });
          setAllRecords(viewRecords);
        };

        if (disableCursorAPI) {
          console.info('IDを使って全レコードを取得するAPIを使用します。');
          await getAllRecordsWithId({ app, condition: query, fields, onStep });
        } else {
          console.info('カーソルを使って全レコードを取得するAPIを使用します。');
          await getAllRecords({ app, query, fields, onStep });
        }

        setFetchComplete(true);
      } catch (error: any) {
        if (error?.code === 'GAIA_TM12') {
          setError(
            'ご利用中のドメインにおけるカーソルの作成数の上限に達しました。しばらく時間をおいてから再度お試しください。'
          );
        }
        throw error;
      } finally {
        setLoading(false);
      }
    })();
  }, [condition]);

  return null;
};

export default Container;
