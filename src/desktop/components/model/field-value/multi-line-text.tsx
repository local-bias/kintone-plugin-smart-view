import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = { field: kintoneAPI.field.MultiLineText };

export default function MultiLineTextFieldValue({ field }: Props) {
  return (
    <>
      {field.value.split(/\r?\n/g).map((text, i) => (
        <div key={i}>{text}</div>
      ))}
    </>
  );
}
