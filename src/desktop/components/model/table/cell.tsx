import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@lb-ribbit/kintone-utilities';
import { appPropertiesState } from '../../../states/kintone';
import { SubtableDetails } from '../../ui/subtable-details';

import CalcCell from './cell-calc';
import CategoryCell from './cell-category';
import MultiSelectCell from './cell-multi-select';
import CheckBoxCell from './cell-checkbox';
import DateCell from './cell-date';
import FileCell from './cell-file';
import MuiliLineTextCell from './cell-multi-line-text';
import NumberCell from './cell-number';
import RichTextCell from './cell-rich-text';
import SingleLineTextCell from './cell-single-line-text';
import UserCell from './cell-user';
import DateTimeCell from './cell-date-time';
import EntityCell from './cell-entity';

type Props = DeepReadonly<{ code: string; field: kintoneAPI.Field }>;

const FieldCell: FC<Props> = (props) => {
  const { field, code } = props;
  if (!field) {
    return null;
  }

  switch (field.type) {
    case 'CALC':
      return <CalcCell code={code} field={field} />;
    case 'CATEGORY':
      return <CategoryCell field={field} />;
    case 'CHECK_BOX':
      return <CheckBoxCell field={field} />;
    case 'CREATOR':
    case 'MODIFIER':
      return <UserCell field={field} />;
    case 'SINGLE_LINE_TEXT':
      return <SingleLineTextCell field={field} />;
    case 'MULTI_LINE_TEXT':
      return <MuiliLineTextCell field={field} />;
    case 'MULTI_SELECT':
      return <MultiSelectCell field={field} />;
    case 'NUMBER':
      return <NumberCell code={code} field={field} />;
    case 'RICH_TEXT':
      return <RichTextCell field={field} />;
    case 'DATE':
      return <DateCell field={field} />;
    case 'DATETIME':
    case 'CREATED_TIME':
    case 'UPDATED_TIME':
      return <DateTimeCell field={field} />;
    case 'USER_SELECT':
    case 'ORGANIZATION_SELECT':
    case 'GROUP_SELECT':
    case 'STATUS_ASSIGNEE':
      return <EntityCell field={field} />;
    case 'FILE':
      return <FileCell field={field} />;
    default:
      return <>{field.value}</>;
  }
};

const Subtable: FC<DeepReadonly<{ code: string; field: kintoneAPI.field.Subtable }>> = (props) => {
  const properties = useRecoilValue(appPropertiesState);
  const found = Object.entries(properties).find(([key]) => props.code === key);
  if (!found) {
    return null;
  }
  const property = found[1] as kintoneAPI.property.Subtable;
  const fieldProperties = Object.values(property.fields);

  return (
    <SubtableDetails>
      <summary>{props.field.value.length}行</summary>
      <table>
        <thead>
          {fieldProperties.map((property) => (
            <th key={property.code}>{property.label}</th>
          ))}
        </thead>
        <tbody>
          {props.field.value.map(({ value }, i) => (
            <tr key={i}>
              {fieldProperties.map((property) => (
                <td key={`${i}-${property.code}`}>
                  <FieldCell code={props.code} field={value[property.code]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
    <FieldCell {...props} />
  );
};

export default Container;
