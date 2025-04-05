import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';
import type { DeepReadonly } from 'utility-types';

type Props = DeepReadonly<{
  field: kintoneAPI.field.DateTime | kintoneAPI.field.CreatedTime | kintoneAPI.field.UpdatedTime;
}>;

const DatetimeFieldValue: FC<Props> = ({ field }) => {
  return <>{field.value ? new Date(field.value).toLocaleString() : ''}</>;
};

export default DatetimeFieldValue;
