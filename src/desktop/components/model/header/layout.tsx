import styled from '@emotion/styled';

const StyledComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  left: 0;

  padding: 0 2vw;
  max-width: 96vw;
  @media screen and (min-width: 800px) {
    padding: 0 16px;
    max-width: calc(100vw - 48px);
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  @media screen and (max-width: 1000px) {
    .ribbit-pagination {
      position: fixed;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;

      padding: 8px 0;
      background: linear-gradient(135deg, #fff7 60%, #ddd7);
      backdrop-filter: blur(8px);
      box-shadow: 0px 3px 1px -2px #0003, 0px 2px 2px 0px #0002, 0px 1px 5px 0px #0002,
        inset 2px 2px 3px -1px #fffc;
      border-radius: 8px;
    }
  }
`;

export default StyledComponent;
