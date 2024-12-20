import { GUEST_SPACE_ID } from '@/lib/global';
import { getQuickSearchString } from '@/lib/kintone';
import { PluginCondition } from '@/lib/plugin';
import { store } from '@/lib/store';
import { getAllRecordsWithId, getQuery, getYuruChara } from '@konomi-app/kintone-utilities';
import { currentAppIdAtom } from './states/kintone';
import { errorAtom, loadingAtom } from './states/plugin';
import { allTableRowsAtom, areAllRecordsReadyAtom } from './states/records';
import { TableRow } from './static';

export const initializeRecords = async (condition: PluginCondition) => {
  try {
    store.set(loadingAtom, true);
    const app = store.get(currentAppIdAtom);

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
        const tableRows = records.map<TableRow>((record) => {
          const __quickSearch = getYuruChara(getQuickSearchString(record), {
            isCaseSensitive,
            isKatakanaSensitive,
            isHankakuKatakanaSensitive,
            isZenkakuEisujiSensitive,
          });

          return { record, __quickSearch };
        });
        store.set(allTableRowsAtom, tableRows);
      },
      guestSpaceId: GUEST_SPACE_ID,
      debug: process?.env?.NODE_ENV === 'development',
    });

    store.set(areAllRecordsReadyAtom, true);
  } catch (error: any) {
    if (error?.code === 'GAIA_TM12') {
      store.set(
        errorAtom,
        'ご利用中のドメインにおけるカーソルの作成数の上限に達しました。しばらく時間をおいてから再度お試しください。'
      );
    } else if (error instanceof Error) {
      store.set(errorAtom, error.message);
    } else {
      store.set(errorAtom, 'エラーが発生しました');
    }
    throw error;
  } finally {
    store.set(loadingAtom, false);
  }
};
