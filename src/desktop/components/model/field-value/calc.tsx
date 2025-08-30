import { getCalcFieldValueAsString, type kintoneAPI } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { appFormPropertyAtom } from '../../../states/kintone';

type Props = { field: kintoneAPI.field.Calc; code: string; appId: string };

const CalcFieldValue: FC<Props> = ({ field, code, appId }) => {
  const property = useAtomValue(
    appFormPropertyAtom({ appId, fieldCode: code })
  ) as kintoneAPI.property.Calc | null;

  if (!property || ['', undefined, null].includes(field.value)) {
    return <>{field.value}</>;
  }

  return <>{getCalcFieldValueAsString({ field, property })}</>;
};

export default CalcFieldValue;
