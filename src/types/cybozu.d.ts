declare namespace cybozu {
  namespace data {
    const IS_MOBILE_DEVICE: boolean;
    namespace page {
      const SCHEMA_DATA: Schema;
      const FORM_DATA: {
        schema: Schema;
      };
      const QUERY_STRING: string;
    }
  }

  type PropBase = {
    id: string;
    var: string;
    label: string;
  };

  type Field = PropBase & {
    type: string;
    properties: {
      defaultValue: string;
      expression: string;
      hideExpression: 'true' | 'false';
      isLookup: boolean;
      lookup?: any;
      max: any;
      min: any;
      noLabel: 'true' | 'false';
      required: 'true' | 'false';
      unique: 'true' | 'false';
    };
  };

  type Table = PropBase & {
    fieldList: Record<string, Field>;
    properties: { noLabel: 'true' | 'false' };
    type: 'TABLE';
  };

  type Schema = {
    groups: any[];
    revision: string;
    subTable: Record<string, Table>;
    table: Table;
  };
}
