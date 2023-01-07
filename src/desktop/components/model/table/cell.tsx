import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { sanitize } from 'dompurify';
import { useRecoilValue } from 'recoil';
import { appPropertiesState } from '../../../states/kintone';
import { kx } from '../../../../types/kintone.api';
import { SubtableDetails } from '../../ui/subtable-details';

type Props = DeepReadonly<{ code: string; field: kx.Field }>;

const Component: FC<Props> = ({ code, field }) => {
  const properties = useRecoilValue(appPropertiesState);
  const found = Object.entries(properties).find(([key]) => code === key);

  switch (field.type) {
    case 'CREATOR':
    case 'MODIFIER':
      return <>{field.value.name}</>;
    case 'CHECK_BOX':
    case 'MULTI_SELECT':
    case 'CATEGORY':
      return (
        <>
          {field.value.map((value, i) => (
            <div key={i}>{value}</div>
          ))}
        </>
      );
    case 'MULTI_LINE_TEXT':
      return (
        <>
          {field.value.split(/\r?\n/g).map((text, i) => (
            <div key={i}>{text}</div>
          ))}
        </>
      );
    case 'USER_SELECT':
    case 'ORGANIZATION_SELECT':
    case 'GROUP_SELECT':
    case 'STATUS_ASSIGNEE':
      return (
        <>
          {field.value.map((value, i) => (
            <div key={i}>{value.name}</div>
          ))}
        </>
      );
    case 'FILE':
      return (
        <>
          {field.value.map((value, i) => (
            <div key={i}>{value.name}</div>
          ))}
        </>
      );
    case 'RICH_TEXT':
      const __html = sanitize(field.value);
      return <div dangerouslySetInnerHTML={{ __html }} />;
    case 'NUMBER':
    case 'CALC':
      if (!found || ['', undefined, null].includes(field.value) || isNaN(Number(field.value))) {
        return <>{field.value}</>;
      }
      const property: any = found[1];

      const casted = Number(field.value);
      const scaled = property?.displayScale
        ? Math.round(casted * Math.pow(10, Number(property.displayScale))) /
          Math.pow(10, Number(property.displayScale))
        : casted;
      const separated = property?.digit ? Number(scaled).toLocaleString() : scaled;

      if (property?.unit) {
        if (property.unitPosition === 'BEFORE') {
          return <>{`${property.unit}${separated}`}</>;
        } else {
          return <>{`${separated}${property.unit}`}</>;
        }
      }

      return <>{separated}</>;

    case 'DATE':
      return <>{field.value ? new Date(field.value).toLocaleDateString() : ''}</>;

    case 'DATETIME':
    case 'CREATED_TIME':
    case 'UPDATED_TIME':
      return <>{field.value ? new Date(field.value).toLocaleString() : ''}</>;

    default:
      return <>{field.value}</>;
  }
};

const Subtable: FC<DeepReadonly<{ code: string; field: kx.field.Subtable }>> = (props) => {
  const properties = useRecoilValue(appPropertiesState);
  const found = Object.entries(properties).find(([key]) => props.code === key);
  if (!found) {
    return null;
  }
  const property = found[1] as kx.property.Subtable;
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
                  <Component code={props.code} field={value[property.code]} />
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
  if (!props.field) {
    return null;
  }

  if (props.field.type === 'SUBTABLE') {
    return <Subtable code={props.code} field={props.field} />;
  }

  return <Component {...props} />;
};

export default Container;
