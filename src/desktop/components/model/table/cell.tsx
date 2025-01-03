import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { appPropertiesAtom } from '../../../states/kintone';
import { SubtableDetails } from '../../ui/subtable-details';
import { FieldValue } from '../field-value';
import { Subtable as MySubtable, MyTableBody, MyTableHead } from './layout';

type Props = Readonly<{ code: string; field: kintoneAPI.Field }>;

const Subtable: FC<Readonly<{ code: string; field: kintoneAPI.field.Subtable }>> = (props) => {
  const properties = useAtomValue(appPropertiesAtom);
  const found = Object.entries(properties).find(([key]) => props.code === key);
  if (!found) {
    return null;
  }
  const property = found[1] as kintoneAPI.property.Subtable;
  const fieldProperties = Object.values(property.fields);

  return (
    <SubtableDetails>
      <summary>{props.field.value.length}行</summary>
      <MySubtable>
        <MyTableHead sticky={0}>
          <tr>
            {fieldProperties.map((property) => (
              <th key={property.code}>{property.label}</th>
            ))}
          </tr>
        </MyTableHead>
        <MyTableBody>
          {props.field.value.map(({ value }, i) => (
            <tr key={i}>
              {fieldProperties.map((property) => (
                <td key={`${i}-${property.code}`}>
                  <FieldValue code={props.code} field={value[property.code]} />
                </td>
              ))}
            </tr>
          ))}
        </MyTableBody>
      </MySubtable>
    </SubtableDetails>
  );
};

const Container: FC<Props> = (props) => {
  const { field, code } = props;
  if (!field) {
    return null;
  }

  return field.type === 'SUBTABLE' ? (
    <Subtable code={code} field={field} />
  ) : (
    <FieldValue {...props} />
  );
};

export default Container;
