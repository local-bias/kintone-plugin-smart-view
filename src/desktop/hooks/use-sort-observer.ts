import { useSetRecoilState } from 'recoil';
import { defaultSortConditionState } from '../states/plugin';
import { getSortFromQuery } from '@konomi-app/kintone-utilities';
import { useEffect } from 'react';

export const useSortObserver = (condition: ReturnType<typeof getSortFromQuery>) => {
  const setDefaultSortCondition = useSetRecoilState(defaultSortConditionState);

  useEffect(() => {
    setDefaultSortCondition(condition);
  }, [condition]);

  return null;
};
