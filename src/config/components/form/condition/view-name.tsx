import React, { VFC } from 'react';
import { DeepReadonly } from 'utility-types';
import { useRecoilValue } from 'recoil';
import { customViewsState } from '../../../states/app-views';

type ContainerProps = DeepReadonly<{ id: string }>;

const Container: VFC<ContainerProps> = (props) => {
  const views = useRecoilValue(customViewsState);

  const found = Object.values(views).find((view) => view.id === props.id);

  if (!found) {
    return null;
  }

  return <> ({found.name})</>;
};

export default Container;
