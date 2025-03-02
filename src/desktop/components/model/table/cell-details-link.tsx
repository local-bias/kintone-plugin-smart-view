import { getQueryString } from '@/lib/cybozu';
import { isMobile } from '@konomi-app/kintone-utilities';
import { memo, type FC } from 'react';
import { DocumentIcon } from '../../ui/document-icon';
import { useAtomValue } from 'jotai';
import { pluginConditionAtom } from '@/desktop/states/plugin';

type Props = Readonly<{ recordId: string }>;

const DetailsLinkCell: FC<Props> = ({ recordId }) => {
  const condition = useAtomValue(pluginConditionAtom)!;

  return (
    <a
      href={`${location.pathname}show${isMobile() ? '?' : '#'}record=${
        recordId
      }&l.view=${condition.viewId}&l.q${getQueryString() ? `=${getQueryString()}` : ''}`}
      {...(condition.isOpenInNewTab ? { target: '_blank' } : {})}
    >
      <DocumentIcon />
    </a>
  );
};

export default memo(DetailsLinkCell);
