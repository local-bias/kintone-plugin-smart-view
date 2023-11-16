import styled from '@emotion/styled';

export const MyTable = styled.table<{
  columns: { width: number }[];
  isDetailCellHidden?: boolean;
}>`
  background-color: #fff;
  font-size: 88%;

  display: grid;
  grid-template-columns: ${({ isDetailCellHidden = false }) => (isDetailCellHidden ? '' : 'auto')} ${({
      columns,
    }) => {
      return columns
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
    &:not(:first-of-type) {
      padding: 8px 15px;
    }
    &:first-of-type {
      padding: 8px 10px;
      width: 24px;
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
`;

export const MyTableHead = styled.thead<{ sticky?: number }>`
  tr {
    th {
      background-color: #fff;
      border-bottom: 1px solid #0002;
      border-top: 1px solid #0002;
      height: 24px;
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
    line-height: 30px;

    td {
      background-color: #fff;
      transition: filter 0.1s ease;

      &.right {
        text-align: right;
      }

      &:nth-of-type(1) {
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            font-size: 18px;
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
