import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FieldValue } from '../field-value';
import FieldValueSubtable from '../field-value/subtable';
import { ResolvedTableColumnProps } from '@/desktop/states/plugin';

type Props = Readonly<{
  col?: ResolvedTableColumnProps;
  code: string;
  field: kintoneAPI.Field;
  appId?: string;
}>;

export default function TableCell(props: Props) {
  const { field, code, col } = props;
  if (!field) {
    return null;
  }
  if (field.type === 'SUBTABLE') {
    return <FieldValueSubtable col={col} code={code} field={field} />;
  }
  return <FieldValue {...props} />;
}
