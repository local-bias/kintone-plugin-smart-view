import { usePluginStorage } from '@/config/hooks/use-plugin-storage';
import { PluginConfigExportButton } from '@konomi-app/kintone-utilities-react';
import { FC, memo, useState } from 'react';

const Component: FC = () => {
  const [loading] = useState<boolean>(false);
  const { exportStorage } = usePluginStorage();

  return <PluginConfigExportButton loading={loading} onExportButtonClick={exportStorage} />;
};

export default memo(Component);
