import { errorState, loadingState, pluginConditionState } from '@/desktop/states/plugin';
import { allViewRecordsState, areAllRecordsReadyState } from '@/desktop/states/records';
import type { TableRow } from '@/desktop/static';
import { GUEST_SPACE_ID } from '@/lib/global';
import { getQuickSearchString } from '@/lib/kintone';
import {
  getAllRecordsWithId,
  getAppId,
  getQuery,
  getYuruChara,
} from '@konomi-app/kintone-utilities';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const useInitialize = () => {
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
        } = condition;

        const query = (getQuery() || '').replace(/limit [0-9]+/g, '').replace(/offset [0-9]+/g, '');

        const targetFields = viewFields
          .filter(({ fieldCode }) => !!fieldCode)
          .map(({ fieldCode }) => fieldCode);
        const fields = ['$id', ...targetFields];

        await getAllRecordsWithId({
          app,
          condition: query,
          fields,
          onStep: (params) => {
            const { records } = params;
            const viewRecords = records.map<TableRow>((record) => {
              const __quickSearch = getYuruChara(getQuickSearchString(record), {
                isCaseSensitive,
                isKatakanaSensitive,
                isHankakuKatakanaSensitive,
                isZenkakuEisujiSensitive,
              });

              return { record, __quickSearch };
            });
            setAllRecords(viewRecords);
          },
          guestSpaceId: GUEST_SPACE_ID,
          debug: process?.env?.NODE_ENV === 'development',
        });

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
