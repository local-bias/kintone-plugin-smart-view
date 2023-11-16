import styled from '@emotion/styled';

const StyledComponent = styled.div`
  background-color: #fff;
  display: grid;
  gap: 16px;
  padding: 16px 0;

  .custom-scrollbar {
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
      @media (min-width: 800px) {
        width: 6px;
        height: 6px;
      }
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
`;

export default StyledComponent;
