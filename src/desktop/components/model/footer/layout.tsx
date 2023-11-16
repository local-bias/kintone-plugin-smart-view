import styled from '@emotion/styled';

const StyledComponent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: sticky;
  left: 0;

  padding: 0 2vw;
  max-width: 96vw;
  @media screen and (min-width: 800px) {
    padding: 0 16px;
    max-width: calc(100vw - 48px);
  }

  @media screen and (max-width: 1000px) {
    .ribbit-pagination {
      display: none;
    }
  }
`;

export default StyledComponent;
