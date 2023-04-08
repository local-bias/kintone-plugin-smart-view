import { getAppId } from '@lb-ribbit/kintone-xapp';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

const END_POINT = '/k/v1/records';

const LIMIT_GET = 500;

type OnStep = (records: kintoneAPI.RecordData[]) => void;

type GetProps = Readonly<
  Partial<{
    app: number;
    fields: string[];
    totalCount: boolean;
    query: string;
    onGetTotal: (total: number) => void;
    onStep: OnStep;
  }>
>;

type GetMethod = (props?: GetProps) => Promise<kintoneAPI.RecordData[]>;

interface CursorProps {
  id: string;
  onStep: OnStep | null;
  loadedData?: kintoneAPI.RecordData[];
}

export const getAllRecords: GetMethod = async (props = {}) => {
  const { app = getAppId(), fields = [], query = '', onGetTotal = null, onStep = null } = props;

  const param = { app, fields, size: LIMIT_GET, query };

  const cursor = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'POST', param);

  if (onGetTotal) {
    onGetTotal(cursor.totalCount);
  }

  return getRecordsByCursorId({ id: cursor.id, onStep });
};

const getRecordsByCursorId = async ({
  id,
  onStep,
  loadedData = [],
}: CursorProps): Promise<kintoneAPI.RecordData[]> => {
  const response = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'GET', { id });

  const newRecords: kintoneAPI.RecordData[] = [
    ...loadedData,
    ...(response.records as kintoneAPI.RecordData[]),
  ];

  if (onStep) {
    onStep(newRecords);
  }

  return response.next ? getRecordsByCursorId({ id, onStep, loadedData: newRecords }) : newRecords;
};
