import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { FCX } from 'react';
import { displayingTableRowsAtom } from '../../../states/records';
import Card from './card';

const CardList: FCX = ({ className }) => {
  const records = useAtomValue(displayingTableRowsAtom);

  return (
    <div className={className}>
      {records.map((record, i) => {
        return (
          <div key={i}>
            <Card record={record} />
          </div>
        );
      })}
    </div>
  );
};
CardList.displayName = 'OriginalCardList';

const StyledCardList = styled(CardList)`
  padding: 16px 8px;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1624px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 2048px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 2472px) {
    grid-template-columns: repeat(5, minmax(0, 400px));
  }
  place-content: center;
`;

export default StyledCardList;
