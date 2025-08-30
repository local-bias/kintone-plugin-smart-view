import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = { field: kintoneAPI.field.Category };

export default function CategoryFieldValue({ field }: Props) {
  return (
    <>
      {field.value.map((value, i) => (
        <div key={i}>{value}</div>
      ))}
    </>
  );
}
