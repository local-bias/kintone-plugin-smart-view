import { LANGUAGE } from '@/lib/global';
import { getNumberFieldValueAsString, type kintoneAPI } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { appFormPropertyAtom } from '../../../states/kintone';

type Props = { field: kintoneAPI.field.Number; code: string; appId: string };

const NumberFieldValue: FC<Props> = ({ field, code, appId }) => {
  const property = useAtomValue(
    appFormPropertyAtom({ appId, fieldCode: code })
  ) as kintoneAPI.property.Number | null;

  if (!property || ['', undefined, null].includes(field.value)) {
    return <>{field.value}</>;
  }

  return <>{getNumberFieldValueAsString({ field, property, locales: LANGUAGE })}</>;
};

export default NumberFieldValue;
