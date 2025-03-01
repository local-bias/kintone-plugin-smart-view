import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { appFormLayoutAtom, appPropertiesAtom } from '../../../states/kintone';
import { SubtableDetails } from '../../ui/subtable-details';
import { FieldValue } from '../field-value';
import { Subtable as MySubtable, MyTableBody, MyTableHead } from './layout';

type Props = Readonly<{ code: string; field: kintoneAPI.Field }>;

const Subtable: FC<Readonly<{ code: string; field: kintoneAPI.field.Subtable }>> = (props) => {
  const properties = useAtomValue(appPropertiesAtom);
  const formLayout = useAtomValue(appFormLayoutAtom);
  const found = Object.entries(properties).find(([key]) => props.code === key);
  if (!found) {
    return null;
  }
  const property = found[1] as kintoneAPI.property.Subtable;
  const layout = formLayout.find(
    (layout) => layout.type === 'SUBTABLE' && layout.code === props.code
  );

  const fieldCodeOrder =
    layout && 'fields' in layout && Array.isArray(layout.fields)
      ? layout.fields
          .filter(
            (field) => field.type !== 'LABEL' && field.type !== 'HR' && field.type !== 'SPACER'
          )
          .map<string>((field) => (field as any)?.code as string)
      : Object.keys(property.fields);

  return (
    <SubtableDetails>
      <summary>{props.field.value.length}行</summary>
      <MySubtable>
        <MyTableHead sticky={0}>
          <tr>
            {fieldCodeOrder.map((fieldCode) => (
              <th key={fieldCode}>{property.fields[fieldCode]?.label ?? fieldCode}</th>
            ))}
          </tr>
        </MyTableHead>
        <MyTableBody>
          {props.field.value.map(({ value }, i) => (
            <tr key={i}>
              {fieldCodeOrder.map((fieldCode) => (
                <td key={`${i}-${fieldCode}`}>
                  <FieldValue code={fieldCode} field={value[fieldCode]} />
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
