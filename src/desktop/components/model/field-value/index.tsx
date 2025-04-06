import { getAppId, getFieldValueAsString, kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';
import Calc from './calc';
import Category from './category';
import Checkbox from './checkbox';
import Date from './date';
import DateTime from './date-time';
import Entity from './entity';
import File from './file';
import Link from './link';
import MultiLineText from './multi-line-text';
import MultiSelect from './multi-select';
import Number from './number';
import RichText from './rich-text';
import SingleLineText from './single-line-text';
import User from './user';

type Props = { code: string; field: kintoneAPI.Field; appId?: string };

export const FieldValue: FC<Props> = (props) => {
  const { field, code, appId = String(getAppId()) } = props;
  if (!field) {
    return null;
  }

  switch (field.type) {
    case 'CALC':
      return <Calc code={code} field={field} appId={appId} />;
    case 'CATEGORY':
      return <Category field={field} />;
    case 'CHECK_BOX':
      return <Checkbox field={field} />;
    case 'CREATOR':
    case 'MODIFIER':
      return <User field={field} />;
    case 'SINGLE_LINE_TEXT':
      return <SingleLineText field={field} />;
    case 'MULTI_LINE_TEXT':
      return <MultiLineText field={field} />;
    case 'MULTI_SELECT':
      return <MultiSelect field={field} />;
    case 'NUMBER':
      return <Number code={code} field={field} appId={appId} />;
    case 'RICH_TEXT':
      return <RichText field={field} />;
    case 'DATE':
      return <Date field={field} />;
    case 'DATETIME':
    case 'CREATED_TIME':
    case 'UPDATED_TIME':
      return <DateTime field={field} />;
    case 'USER_SELECT':
    case 'ORGANIZATION_SELECT':
    case 'GROUP_SELECT':
    case 'STATUS_ASSIGNEE':
      return <Entity field={field} />;
    case 'FILE':
      return <File field={field} />;
    case 'LINK':
      return <Link code={code} field={field} />;
    default:
      return <>{getFieldValueAsString(field)}</>;
  }
};
