import React, { VFC } from 'react';
import { DeepReadonly } from 'utility-types';
import { OneOf } from '@kintone/rest-api-client/lib/KintoneFields/types/field';

type ContainerProps = DeepReadonly<{ field: OneOf }>;

const Container: VFC<ContainerProps> = ({ field }) => {
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
    case 'SUBTABLE':
      return <>{field.value.length}行</>;
    default:
      return <>{field.value}</>;
  }
};

export default Container;
