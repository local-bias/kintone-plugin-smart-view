import styled from '@emotion/styled';

export const SubtableDetails = styled.details`
  padding: 4px 8px;
  cursor: pointer;
  summary {
    position: relative;
    padding-left: 24px;
    &:before {
      color: #1976d2;
      content: '▶';
      transition: all 150ms ease;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  &[open] {
    summary {
      &:before {
        transform: rotate(90deg);
      }
    }
  }
`;
