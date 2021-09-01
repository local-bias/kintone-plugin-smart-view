import { Record } from '@kintone/rest-api-client/lib/client/types';
import { getAppId } from './kintone';

const END_POINT = '/k/v1/records';

const LIMIT_GET = 500;

type GetProps = Readonly<
  Partial<{
    app: number;
    fields: string[];
    totalCount: boolean;
    query: string;
    onGetTotal: (total: number) => void;
    onAdvance: (records: Record[]) => void;
  }>
>;

type GetMethod = (props?: GetProps) => Promise<Record[]>;

interface CursorProps {
  id: string;
  onAdvance: ((key?: any) => any) | null;
  loadedData?: Record[];
}

export const getAllRecords: GetMethod = async (props = {}) => {
  const { app = getAppId(), fields = [], query = '', onGetTotal = null, onAdvance = null } = props;

  const param = { app, fields, size: LIMIT_GET, query };

  const cursor = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'POST', param);

  if (onGetTotal) {
    onGetTotal(cursor.totalCount);
  }

  // 全レコードを返却します
  return getRecordsByCursorId({ id: cursor.id, onAdvance });
};

/**
 * カーソルIDからAPIを利用し、レコードを取得します
 * 一度の検索で取得しきれない場合は、再帰的に関数が呼ばれ
 * レコードを蓄積させていきます
 */
const getRecordsByCursorId = async ({
  id,
  onAdvance,
  loadedData = [],
}: CursorProps): Promise<Record[]> => {
  // 次のカーソルまでのレコードを取得します
  const response = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'GET', { id });

  // 既に取得済みのレコードに、今回取得したレコードを加えます
  const newRecords: Record[] = [...loadedData, ...(response.records as Record[])];

  // レコード取得をトリガーとする関数が設定されている場合は実行します
  if (onAdvance) {
    onAdvance(newRecords);
  }

  return response.next
    ? getRecordsByCursorId({ id, onAdvance, loadedData: newRecords })
    : newRecords;
};
