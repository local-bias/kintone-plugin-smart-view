import { getAppId } from '@lb-ribbit/kintone-xapp';
import type { kintoneAPI } from '@lb-ribbit/kintone-utilities';

const END_POINT = '/k/v1/records';

const LIMIT_GET = 500;

type GetProps = Readonly<
  Partial<{
    app: number;
    fields: string[];
    totalCount: boolean;
    query: string;
    onGetTotal: (total: number) => void;
    onAdvance: (records: kintoneAPI.RecordData[]) => void;
  }>
>;

type GetMethod = (props?: GetProps) => Promise<kintoneAPI.RecordData[]>;

interface CursorProps {
  id: string;
  onAdvance: ((key?: any) => any) | null;
  loadedData?: kintoneAPI.RecordData[];
}

export const getAllRecords: GetMethod = async (props = {}) => {
  const { app = getAppId(), fields = [], query = '', onGetTotal = null, onAdvance = null } = props;

  const param = { app, fields, size: LIMIT_GET, query };

  const cursor = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'POST', param);

  if (onGetTotal) {
    onGetTotal(cursor.totalCount);
  }

  return getRecordsByCursorId({ id: cursor.id, onAdvance });
};

const getRecordsByCursorId = async ({
  id,
  onAdvance,
  loadedData = [],
}: CursorProps): Promise<kintoneAPI.RecordData[]> => {
  const response = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'GET', { id });

  const newRecords: kintoneAPI.RecordData[] = [
    ...loadedData,
    ...(response.records as kintoneAPI.RecordData[]),
  ];

  if (onAdvance) {
    onAdvance(newRecords);
  }

  return response.next
    ? getRecordsByCursorId({ id, onAdvance, loadedData: newRecords })
    : newRecords;
};
