import styled from '@emotion/styled';

const StyledComponent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 1000px) {
    .ribbit-pagination {
      display: none;
    }
  }
`;

export default StyledComponent;
