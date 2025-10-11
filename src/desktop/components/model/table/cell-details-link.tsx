import { pluginConditionAtom } from '@/desktop/states/plugin';
import { getQueryString } from '@/lib/cybozu';
import { isMobile } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { type FC } from 'react';
import { DocumentIcon } from '../../ui/document-icon';

type Props = Readonly<{ recordId: string }>;

const DetailsLinkCell: FC<Props> = ({ recordId }) => {
  const condition = useAtomValue(pluginConditionAtom)!;

  return (
    <a
      href={`${location.pathname}show${isMobile() ? '?' : '#'}record=${recordId}&l.view=${
        condition.viewId
      }&l.q${getQueryString() ? `=${getQueryString()}` : ''}`}
      {...(condition.isOpenInNewTab ? { target: '_blank' } : {})}
    >
      <DocumentIcon />
    </a>
  );
};

// React 19: Component will be automatically optimized by React Compiler
export default DetailsLinkCell;
