import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';
import type { DeepReadonly } from 'utility-types';

type Props = DeepReadonly<{ field: kintoneAPI.field.Creator | kintoneAPI.field.Modifier }>;

const UserFieldValue: FC<Props> = ({ field }) => {
  return <>{field.value.name}</>;
};

export default UserFieldValue;
