import { ResolvedTableColumnProps } from '@/desktop/states/plugin';
import { createChartData } from '@/lib/chart';
import styled from '@emotion/styled';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { Fragment, ReactNode } from 'react';
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

const StyledBarChart = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  gap: 4px;
  width: 100%;
  overflow: hidden;

  .bar {
    border-radius: calc(infinity * 1px);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    height: 14px;
    position: relative;
  }

  .value-label {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    font-size: 11px;
    white-space: nowrap;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    &.right {
      left: 100%;
      transform: translateX(8px) translateY(-50%);
      color: rgb(156 163 175);
      text-shadow: none;
    }
  }
`;

export default function BarChart(props: {
  col: ResolvedTableColumnProps;
  field: kintoneAPI.field.Subtable;
}) {
  const { col, field } = props;

  const chartData = createChartData({ col, field });

  if (chartData.total === 0) {
    return (
      <ChartContainer>
        <StyledBarChart className='bg-gray-100 justify-center items-center text-gray-400'>
          No Data
        </StyledBarChart>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <StyledBarChart>
        {chartData.data.map((c) => {
          const per = (c.value / chartData.max) * 100;
          const additionalClass = per < 40 ? 'right' : '';
          return (
            <Fragment key={c.label}>
              <SubtableChartLabels className='truncate justify-self-end'>
                {c.label}
              </SubtableChartLabels>
              <div
                title={`${c.label}: ${c.value.toLocaleString()}`}
                className='bar'
                style={{
                  backgroundColor: c.color,
                  width: chartData.max ? `${(c.value / chartData.max) * 100}%` : '0%',
                }}
              >
                <div className={`value-label ${additionalClass}`}>{c.value.toLocaleString()}</div>
              </div>
            </Fragment>
          );
        })}
      </StyledBarChart>
    </ChartContainer>
  );
}
