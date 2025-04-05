import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';
import type { DeepReadonly } from 'utility-types';

type Props = DeepReadonly<{ field: kintoneAPI.field.Date }>;

const DateFieldValue: FC<Props> = ({ field }) => {
  return <>{field.value ? new Date(field.value).toLocaleDateString() : ''}</>;
};

export default DateFieldValue;
