import { getQuickSearchString } from '@/lib/kintone';
import {
  getAllRecords,
  getAllRecordsWithId,
  getSortFromQuery,
  getYuruChara,
  kintoneAPI,
  sortField,
} from '@konomi-app/kintone-utilities';
import { getAppId, getQuery } from '@lb-ribbit/kintone-xapp';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { errorState, loadingState, pluginConditionState } from '../../states/plugin';
import { allViewRecordsState, areAllRecordsReadyState } from '../../states/records';
import type { ViewRecord } from '../../static';
import { GUEST_SPACE_ID } from '@/lib/global';

const Container: FC = () => {
  const setAllRecords = useSetRecoilState(allViewRecordsState);
  const setLoading = useSetRecoilState(loadingState);
  const condition = useRecoilValue(pluginConditionState);
  const setError = useSetRecoilState(errorState);
  const setReady = useSetRecoilState(areAllRecordsReadyState);

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
          viewFields,
          isCaseSensitive,
          isKatakanaSensitive,
          isHankakuKatakanaSensitive,
          isZenkakuEisujiSensitive,
          isCursorAPIEnabled,
        } = condition;

        const query = (getQuery() || '').replace(/limit [0-9]+/g, '').replace(/offset [0-9]+/g, '');
        const sort = getSortFromQuery(getQuery() || '');

        const targetFields = viewFields
          .filter(({ fieldCode }) => !!fieldCode)
          .map(({ fieldCode }) => fieldCode);
        const fields = ['$id', ...targetFields];

        const onStep = (params: { records: kintoneAPI.RecordData[] }) => {
          const { records } = params;
          const viewRecords = records.map<ViewRecord>((record) => {
            let __quickSearch = getYuruChara(getQuickSearchString(record), {
              isCaseSensitive,
              isKatakanaSensitive,
              isHankakuKatakanaSensitive,
              isZenkakuEisujiSensitive,
            });

            return { record, __quickSearch };
          });
          setAllRecords(viewRecords);
        };

        if (!isCursorAPIEnabled) {
          await getAllRecordsWithId({
            app,
            condition: query,
            fields,
            onStep: (params) => {
              const { records } = params;
              const viewRecords = records.map<ViewRecord>((record) => {
                let __quickSearch = getYuruChara(getQuickSearchString(record), {
                  isCaseSensitive,
                  isKatakanaSensitive,
                  isHankakuKatakanaSensitive,
                  isZenkakuEisujiSensitive,
                });

                return { record, __quickSearch };
              });
              const sorted = viewRecords.sort((a, b) => {
                for (const { field, order } of sort) {
                  const aValue = a.record[field];
                  const bValue = b.record[field];
                  if (!aValue || !bValue || aValue.value === bValue.value) {
                    continue;
                  }
                  const compared = sortField(aValue, bValue);
                  if (order === 'asc') {
                    return compared;
                  } else {
                    return compared * -1;
                  }
                }
                return 0;
              });
              setAllRecords(sorted);
            },
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
                guestSpaceId: GUEST_SPACE_ID,
                debug: process?.env?.NODE_ENV === 'development',
              });
            } else {
              throw error;
            }
          }
        }

        setReady(true);
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
