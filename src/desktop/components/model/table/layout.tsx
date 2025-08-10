import { PluginCondition } from '@/schema/plugin-config';
import styled from '@emotion/styled';

export const MyTable = styled.table<{
  condition: PluginCondition | null;
  isDetailCellHidden?: boolean;
}>`
  background-color: #fff;
  font-size: 14px;
  line-height: 30px;

  display: grid;
  grid-template-columns: ${({ isDetailCellHidden = false }) =>
      isDetailCellHidden ? '' : 'auto'} ${({ condition }) => {
      const viewFields = condition?.viewFields ?? [];
      return viewFields
        .map(({ width }) => {
          if (width === 0) {
            return '1fr';
          }
          return `${width}px`;
        })
        .join(' ');
    }};
  justify-content: flex-start;

  th {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    font-weight: 400;
  }

  td {
    display: block;
    border-right: 1px solid #0002;

    ${({ condition }) => {
      const viewFields = condition?.viewFields ?? [];
      return viewFields
        .map(({ nowrap }, i) => {
          if (!nowrap) {
            return '';
          }
          return `&:nth-of-type(${i + 2}) {white-space: nowrap;overflow: auto;}`;
        })
        .filter((v) => v)
        .join('\n');
    }}

    &[data-right] {
      text-align: right;
    }

    &:not([data-custom-width]) {
      white-space: nowrap;
    }

    &[data-custom-width] {
      details {
        overflow: auto;
      }
    }
  }

  th,
  td {
    box-sizing: border-box;
    &:not(:first-of-type) {
      padding: 8px 15px;
    }
    &:first-of-type {
      padding: 8px 10px;
      border-left: 1px solid #0002;
    }
    &:last-of-type {
      border-right: 1px solid #0002;
    }
  }

  tr,
  tbody,
  thead,
  tfoot {
    display: contents;
  }

  padding: 0 2vw;
  @media screen and (min-width: 800px) {
    padding: 0 16px;
  }

  @media print {
    font-size: 100%;
  }

  *::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    @media screen and (min-width: 800px) {
      width: 4px;
      height: 4px;
    }
  }
  *::-webkit-scrollbar-thumb {
    background-color: #0002;
    border-radius: 400px;
  }
  *::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const MyTableHead = styled.thead<{ sticky?: number }>`
  tr {
    th {
      background-color: #fff;
      border-bottom: 1px solid #0002;
      border-top: 1px solid #0002;
      @media screen {
        ${({ sticky }) => sticky !== undefined && 'position: sticky;'}
        ${({ sticky }) => sticky !== undefined && `top: ${sticky}px;`}
        z-index: 1;
      }

      &.sortable {
        cursor: pointer;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;

        > svg {
          width: 1em;
          height: 1em;
        }
      }
    }
  }
`;

export const MyTableBody = styled.tbody`
  tr {
    td {
      background-color: #fff;
      transition: filter 0.1s ease;

      &.right {
        text-align: right;
      }

      &:nth-of-type(1) {
        a {
          vertical-align: middle;
          display: inline-flex;
          align-items: center;
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    &:nth-of-type(2n + 1) {
      td {
        background-color: #f5f5f5;
      }
    }

    &:last-of-type {
      td {
        border-bottom: 1px solid #0002;
      }
    }

    &:hover {
      td {
        filter: brightness(0.95);
      }
    }
  }
`;

export const Subtable = styled.table`
  tr {
    display: table-row !important;
  }

  thead,
  tbody,
  tfoot {
    display: table-header-group !important;
  }

  th,
  td {
    display: table-cell !important;
  }
`;
