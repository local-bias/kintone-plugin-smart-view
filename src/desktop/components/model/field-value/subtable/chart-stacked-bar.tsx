import { ResolvedTableColumnProps } from '@/desktop/states/plugin';
import { createChartData } from '@/lib/chart';
import styled from '@emotion/styled';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { ReactNode } from 'react';
import { SubtableChartLabels } from './chart-labels';
import { ChartContainer } from './chart-container';

const Total = styled.div`
  position: relative;
  width: 100%;
  font-size: 11px;
  line-height: 1.1;
  margin-bottom: 4px;
  display: grid;
  place-items: center;

  > div {
    padding: 0 8px;
    z-index: 1;
  }
`;

const StyledStackedBarChart = styled.div`
  display: flex;
  width: 100%;
  height: 16px;
  border-radius: calc(infinity * 1px);
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-bottom: 12px;
`;

export default function StackedBarChart(props: {
  col: ResolvedTableColumnProps;
  field: kintoneAPI.field.Subtable;
}) {
  const { col, field } = props;

  const chartData = createChartData({ col, field });

  if (chartData.total === 0) {
    return (
      <ChartContainer>
        <StyledStackedBarChart className='bg-gray-100 justify-center items-center text-gray-400'>
          No Data
        </StyledStackedBarChart>
      </ChartContainer>
    );
  }

  let ratioTotal = 0;
  let gradients: string[] = [];
  let labels: ReactNode[] = [];
  chartData.data.forEach((data, i) => {
    const { label, value, color } = data;
    const per = (value / chartData.total) * 100;
    gradients.push(`${color} ${ratioTotal + 0.2}%, ${color} ${ratioTotal + per}%`);
    ratioTotal += per;
    labels.push(
      <div key={i}>
        <div className='sample' style={{ backgroundColor: color }} />
        <div>{label}</div>
      </div>
    );
  });

  return (
    <div>
      <Total>
        <div>{chartData.total.toLocaleString()}</div>
      </Total>
      <StyledStackedBarChart>
        {chartData.data.map((c) => (
          <div
            key={c.label}
            title={`${c.label}: ${c.value.toLocaleString()}`}
            style={{ backgroundColor: c.color, flex: c.value }}
          />
        ))}
      </StyledStackedBarChart>
      <SubtableChartLabels>{labels}</SubtableChartLabels>
    </div>
  );
}
