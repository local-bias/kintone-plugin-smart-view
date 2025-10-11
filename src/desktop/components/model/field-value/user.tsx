import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = Readonly<{ field: kintoneAPI.field.Creator | kintoneAPI.field.Modifier }>;

export default function UserFieldValue({ field }: Props) {
  return <>{field.value.name}</>;
}
