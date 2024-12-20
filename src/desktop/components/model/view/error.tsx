import { WindIcon } from '@/lib/components/wind';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FCX } from 'react';
import { errorAtom } from '../../../states/plugin';

const Component: FCX = ({ className }) => {
  const error = useAtomValue(errorAtom);

  return (
    <div {...{ className }}>
      <WindIcon />
      <h2>エラーが発生しました。</h2>
      <div>
        <p>{error}</p>
      </div>
      <Button variant='contained' color='primary' size='large' onClick={() => location.reload()}>
        リロード
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #0007;
    padding: 0;
    margin: 0;
  }
  p {
    margin: 0;
    color: #0005;
  }
  svg {
    opacity: 0.4;
    filter: drop-shadow(2px 2px 3px #0002);
    width: 200px;
    height: 200px;
  }
`;

export default StyledComponent;
