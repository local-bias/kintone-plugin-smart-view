import { getQuickSearchString } from '@/lib/kintone';
import {
  convertHankakuKatakanaToZenkaku,
  convertKatakanaToHiragana,
  convertZenkakuEisujiToHankaku,
} from '@/lib/utilities';
import { getAllRecords, getAllRecordsWithId, kintoneAPI } from '@konomi-app/kintone-utilities';
import { getAppId, getQuery } from '@lb-ribbit/kintone-xapp';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { errorState, loadingState, pluginConditionState } from '../../states/plugin';
import { allViewRecordsState, isFetchCompleteState } from '../../states/records';
import type { ViewRecord } from '../../static';
import { GUEST_SPACE_ID } from '@/lib/global';

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

        const onStep = (params: { records: kintoneAPI.RecordData[] }) => {
          const { records } = params;
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
          await getAllRecordsWithId({
            app,
            condition: query,
            fields,
            onStep,
            guestSpaceId: GUEST_SPACE_ID,
            debug: process?.env?.NODE_ENV === 'development',
          });
        } else {
          try {
            await getAllRecords({
              app,
              query,
              fields,
              onStep,
              guestSpaceId: GUEST_SPACE_ID,
              debug: process?.env?.NODE_ENV === 'development',
            });
          } catch (error: any) {
            if (error?.code === 'GAIA_TM12') {
              console.warn('カーソルAPIの上限に達したため、IDを使用したAPIで取得します。');
              await getAllRecordsWithId({
                app,
                condition: query,
                fields,
                onStep,
                debug: process?.env?.NODE_ENV === 'development',
              });
            } else {
              throw error;
            }
          }
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
