import React, { Suspense, useState, FC, FCX, memo } from 'react';
import styled from '@emotion/styled';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';

import ConditionForm from './condition-form';
import ConditionDeletionButton from '../condition-deletion-button';
import ViewName from './view-name';

type ContainerProps = Readonly<{ index: number }>;
type Props = ContainerProps & {
  expanded: boolean;
  onChange: () => void;
};

const Component: FCX<Props> = ({ className, index, expanded, onChange }) => (
  <Accordion {...{ expanded, onChange, className }} variant='outlined' square>
    <AccordionSummary>
      設定{index + 1}
      <Suspense fallback={null}>
        <ViewName conditionIndex={index} />
      </Suspense>
    </AccordionSummary>
    <AccordionDetails>
      <ConditionForm {...{ index }} />
    </AccordionDetails>
    <AccordionActions>
      <ConditionDeletionButton {...{ index }} />
    </AccordionActions>
  </Accordion>
);

const StyledComponent = styled(Component)`
  .input {
    min-width: 250px;
  }
`;

const Container: FC<ContainerProps> = ({ index }) => {
  const [expanded, setExpanded] = useState<boolean>(index === 0);

  const onChange = () => setExpanded((_expanded) => !_expanded);

  return <StyledComponent {...{ index, expanded, onChange }} />;
};

export default memo(Container);
