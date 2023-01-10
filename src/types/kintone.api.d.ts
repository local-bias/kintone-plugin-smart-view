import {
  App as DefaultApp,
  Layout as DefaultLayout,
  Record as DefaultRecord,
  ViewForParameter,
  ViewForResponse,
} from '@kintone/rest-api-client/lib/client/types';
import {
  Calc as FieldCalc,
  Category as FieldCategory,
  CheckBox as FieldCheckBox,
  CreatedTime as FieldCreatedTime,
  Creator as FieldCreator,
  Date as FieldDate,
  InSubtable as FieldInSubtable,
  Modifier as FieldModifier,
  MultiLineText as FieldMultiLineText,
  MultiSelect as FieldMultiSelect,
  OneOf as OneOfField,
  SingleLineText as FieldSingleLineText,
  Subtable as FieldSubtable,
  UserSelect as FieldUserSelect,
} from '@kintone/rest-api-client/lib/KintoneFields/types/field';
import {
  Label as DefaultLayoutLabel,
  OneOf as DefaultLayoutField,
} from '@kintone/rest-api-client/lib/KintoneFields/types/fieldLayout';
import {
  Group as DefaultGroup,
  Row as DefaultRow,
} from '@kintone/rest-api-client/lib/KintoneFields/types/layout';
import {
  Calc as PropertyCalc,
  Category as PropertyCategory,
  CheckBox as PropertyCheckBox,
  CreatedTime as PropertyCreatedTime,
  Creator as PropertyCreator,
  Date as PropertyDate,
  InSubtable as PropertyInSubtable,
  Modifier as PropertyModifier,
  MultiLineText as PropertyMultiLineText,
  MultiSelect as PropertyMultiSelect,
  OneOf as OneOfProperty,
  SingleLineText as PropertySingleLineText,
  Subtable as PropertySubtable,
  UserSelect as PropertyUserSelect,
} from '@kintone/rest-api-client/lib/KintoneFields/types/property';

declare namespace kx {
  type App = DefaultApp;

  type FieldProperties = Record<string, FieldProperty>;
  type FieldEntry = [string, FieldProperty];

  type RecordData = DefaultRecord;

  type Layout = DefaultLayout;
  type LayoutField = DefaultLayoutField;

  namespace view {
    type Response = ViewForResponse;
    type Parameter = ViewForParameter;
  }

  type Field = OneOfField;
  /** JavaScript APIやREST APIから取得できるレコードの各フィールド情報 */
  namespace field {
    type Calc = FieldCalc;
    type Category = FieldCategory;
    type CheckBox = FieldCheckBox;
    type CreatedTime = FieldCreatedTime;
    type Creator = FieldCreator;
    type Date = FieldDate;
    type Modifier = FieldModifier;
    type MultiLineText = FieldMultiLineText;
    type MultiSelect = FieldMultiSelect;
    type SingleLineText = FieldSingleLineText;
    type InSubtable = FieldInSubtable;
    type Subtable<T extends Record<string, InSubtable> = Record<string, InSubtable>> =
      FieldSubtable<T>;
    type UserSelect = FieldUserSelect;
    type UserEntity = Creator['value'];
  }

  type FieldProperty = OneOfProperty;
  type FieldPropertyType = FieldProperty['type'];
  /** REST APIから取得できるアプリの各フィールド情報 */
  namespace property {
    type Calc = PropertyCalc;
    type Category = PropertyCategory;
    type CheckBox = PropertyCheckBox;
    type CreatedTime = PropertyCreatedTime;
    type Creator = PropertyCreator;
    type Date = PropertyDate;
    type Modifier = PropertyModifier;
    type MultiLineText = PropertyMultiLineText;
    type MultiSelect = PropertyMultiSelect;
    type SingleLineText = PropertySingleLineText;
    type InSubtable = PropertyInSubtable;
    type Subtable<T extends Record<string, InSubtable> = Record<string, InSubtable>> =
      PropertySubtable<T>;
    type UserSelect = PropertyUserSelect;
  }

  namespace layout {
    type Label = DefaultLayoutLabel;
    type Row = DefaultRow<LayoutField[]>;
    type Group = DefaultGroup<Row[]>;
  }

  namespace response {
    type App = { readonly app?: DefaultApp; readonly fields?: FieldProperties };
  }
}
