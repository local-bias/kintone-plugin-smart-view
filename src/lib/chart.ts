import { ResolvedTableColumnProps } from '@/desktop/states/plugin';
import { getFieldValueAsString, kintoneAPI } from '@konomi-app/kintone-utilities';

export const CHART_COLORS = [
  'var(--🐸chart-1)',
  'var(--🐸chart-2)',
  'var(--🐸chart-3)',
  'var(--🐸chart-4)',
  'var(--🐸chart-5)',
  'var(--🐸chart-6)',
  'var(--🐸chart-7)',
];

export function createChartData(params: {
  col: ResolvedTableColumnProps;
  field: kintoneAPI.field.Subtable;
}): {
  total: number;
  max: number;
  data: {
    label: string;
    value: number;
    color: string;
  }[];
} {
  const { col, field } = params;

  function getAmount(valueField?: kintoneAPI.Field): number {
    if (!valueField || !['NUMBER', 'CALC'].includes(valueField.type)) {
      return 0;
    }
    const amount = Number(valueField.value);
    return isNaN(amount) ? 0 : amount;
  }

  let total = 0;
  const data: Record<string, { value: number }> = {};
  field.value.forEach((row) => {
    const amount = getAmount(row.value[col.miniGraphValueFieldCode ?? '']);
    const labelField = row.value[col.miniGraphLabelFieldCode ?? ''];
    const labelPlaceholder = `No Label`;
    const label = labelField
      ? getFieldValueAsString(labelField) || labelPlaceholder
      : labelPlaceholder;
    total += amount;
    if (data[label]) {
      data[label].value += amount;
    } else {
      data[label] = { value: amount };
    }
  });

  // 配列に直し、大きい順にソート
  return {
    total,
    max: Math.max(...Object.values(data).map((item) => item.value), 0),
    data: Object.entries(data)
      .map(([label, { value }]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .map((item, i) => ({
        ...item,
        color: CHART_COLORS[i % CHART_COLORS.length],
      })),
  };
}
