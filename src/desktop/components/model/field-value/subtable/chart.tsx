import { ResolvedTableColumnProps } from '@/desktop/states/plugin';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import PieChart from './chart-pie';
import StackedBarChart from './chart-stacked-bar';

export default function SubtableChart(props: {
  col: ResolvedTableColumnProps;
  field: kintoneAPI.field.Subtable;
  property: kintoneAPI.property.Subtable;
}) {
  const { col, field } = props;
  switch (col.miniGraphType) {
    case 'stackedBar':
      return <StackedBarChart col={col} field={field} />;
    case 'pie':
      return <PieChart col={col} field={field} />;
    default:
      return <div>Minigraph Placeholder</div>;
  }
}
