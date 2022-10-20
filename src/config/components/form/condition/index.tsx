import React, { Suspense, useState, FC, FCX, memo } from 'react';
import styled from '@emotion/styled';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';

import ConditionForm from './condition-form';
import ConditionDeletionButton from '../condition-deletion-button';
import ViewName from './view-name';
import { useConditionIndex } from '../../condition-index-provider';

type Props = {
  index: number;
  expanded: boolean;
  onChange: () => void;
};

const Component: FCX<Props> = ({ className, expanded, index, onChange }) => {
  return (
    <Accordion {...{ expanded, onChange, className }} variant='outlined' square>
      <AccordionSummary>
        設定{index + 1}
        <ViewName />
      </AccordionSummary>
      <AccordionDetails>
        <ConditionForm {...{ index }} />
      </AccordionDetails>
      <AccordionActions>
        <ConditionDeletionButton {...{ index }} />
      </AccordionActions>
    </Accordion>
  );
};

const StyledComponent = styled(Component)`
  .input {
    min-width: 250px;
  }
`;

const Container: FC = () => {
  const index = useConditionIndex();
  const [expanded, setExpanded] = useState<boolean>(index === 0);

  const onChange = () => setExpanded((_expanded) => !_expanded);

  return <StyledComponent {...{ index, expanded, onChange }} />;
};

export default memo(Container);
