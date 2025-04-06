import { GUEST_SPACE_ID, isProd } from '@/lib/global';
import { t } from '@/lib/i18n';
import { getQuickSearchString } from '@/lib/kintone';
import { store } from '@/lib/store';
import { PluginCondition } from '@/schema/plugin-config';
import {
  getAllRecordsWithId,
  getQuery,
  getYuruChara,
  kintoneAPI,
} from '@konomi-app/kintone-utilities';
import { currentAppIdAtom } from './states/kintone';
import { errorAtom } from './states/plugin';
import { allTableRowsAtom, areAllRecordsReadyAtom } from './states/records';
import { loadingEndAtom, loadingStartAtom } from './states/ui';
import { TableRow } from './static';

export const initializeRecords = async (condition: PluginCondition) => {
  try {
    store.set(loadingStartAtom);
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

    const getTableRow = (record: kintoneAPI.RecordData): TableRow => {
      const __quickSearch = getYuruChara(getQuickSearchString(record), {
        isCaseSensitive,
        isKatakanaSensitive,
        isHankakuKatakanaSensitive,
        isZenkakuEisujiSensitive,
      });

      return { record, __quickSearch };
    };

    await getAllRecordsWithId({
      app,
      condition: query,
      fields,
      onStep: ({ incremental }) => {
        const tableRows = incremental.map<TableRow>(getTableRow);
        store.set(allTableRowsAtom, (prev) => [...prev, ...tableRows]);
      },
      guestSpaceId: GUEST_SPACE_ID,
      debug: !isProd,
    });

    store.set(areAllRecordsReadyAtom(app), true);
  } catch (error: any) {
    if (error?.code === 'GAIA_TM12') {
      store.set(errorAtom, t('desktop.error.domainCursorCreationLimitReachedError'));
    } else if (error instanceof Error) {
      store.set(errorAtom, error.message);
    } else {
      store.set(errorAtom, t('desktop.error.unknownError'));
    }
    throw error;
  } finally {
    store.set(loadingEndAtom);
  }
};
