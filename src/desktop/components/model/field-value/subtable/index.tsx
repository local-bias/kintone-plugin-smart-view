import { SubtableDetails } from '@/desktop/components/ui/subtable-details';
import { appFormLayoutAtom, currentAppFieldPropertiesAtom } from '@/desktop/states/kintone';
import { ResolvedTableColumnProps } from '@/desktop/states/plugin';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { FieldValue } from '..';
import { Subtable as MySubtable, MyTableBody, MyTableHead } from '../../table/layout';
import SubtableChart from './chart';

function minigraphEnabled(
  col: ResolvedTableColumnProps | undefined
): col is ResolvedTableColumnProps {
  return col?.isMiniGraphEnabled ?? false;
}

export default function FieldValueSubtable(
  props: Readonly<{
    col?: ResolvedTableColumnProps;
    code: string;
    field: kintoneAPI.field.Subtable;
  }>
) {
  const properties = useAtomValue(currentAppFieldPropertiesAtom);
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

  if (minigraphEnabled(props.col)) {
    return <SubtableChart col={props.col} property={property} field={props.field} />;
  }

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
}
