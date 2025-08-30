import { appFormPropertyAtom } from '@/desktop/states/kintone';
import { type kintoneAPI } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

type Props = {
  field: kintoneAPI.field.Link;
  code: string;
  appId: string;
};

const LinkFieldValue: FC<Props> = ({ field, code, appId }) => {
  const property = useAtomValue(
    appFormPropertyAtom({ appId, fieldCode: code })
  ) as kintoneAPI.property.Link | null;

  if (!property || ['', undefined, null].includes(field.value)) {
    return <>{field.value}</>;
  }

  switch (property.protocol) {
    case 'WEB':
      return (
        <a href={field.value} target='_blank' rel='noopener noreferrer'>
          {field.value}
        </a>
      );
    case 'CALL':
      return <a href={`tel:${field.value}`}>{field.value}</a>;
    case 'MAIL':
      return <a href={`mailto:${field.value}`}>{field.value}</a>;
    default:
      return <>{field.value}</>;
  }
};

export default LinkFieldValue;
