import { ResolvedTableColumnProps } from '@/desktop/states/plugin';
import { createChartData } from '@/lib/chart';
import styled from '@emotion/styled';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { ReactNode } from 'react';
import { SubtableChartLabels } from './chart-labels';
import { ChartContainer } from './chart-container';

const Total = styled.div`
  border-radius: calc(infinity * 1px);
  width: 60%;
  height: 60%;
  background-color: #fff;
  box-shadow: inset 0 4px 6px -1px rgb(0 0 0 / 0.1), inset 0 2px 4px -2px rgb(0 0 0 / 0.1);
  display: grid;
  place-items: center;
  font-size: 11px;
`;

const StyledPieChart = styled.div`
  justify-self: center;
  width: 100px;
  height: 100px;
  border-radius: calc(infinity * 1px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 8px;
  display: grid;
  place-items: center;
`;

export default function PieChart(props: {
  col: ResolvedTableColumnProps;
  field: kintoneAPI.field.Subtable;
}) {
  const { col, field } = props;

  const chartData = createChartData({ col, field });

  if (chartData.total === 0) {
    return (
      <ChartContainer>
        <StyledPieChart style={{ backgroundImage: 'conic-gradient(#ddd)' }}>
          <Total className='text-gray-400'>No Data</Total>
        </StyledPieChart>
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
    <ChartContainer>
      <StyledPieChart style={{ backgroundImage: `conic-gradient(${gradients.join(',')})` }}>
        <Total>{chartData.total.toLocaleString()}</Total>
      </StyledPieChart>
      <SubtableChartLabels>{labels}</SubtableChartLabels>
    </ChartContainer>
  );
}
