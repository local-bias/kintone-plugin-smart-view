import { usePluginStorage } from '@/config/hooks/use-plugin-storage';
import { PluginConfigImportButton } from '@konomi-app/kintone-utilities-react';
import { FC, memo } from 'react';

const Component: FC = () => {
  const { importStorage } = usePluginStorage();

  return <PluginConfigImportButton onImportButtonClick={importStorage} loading={false} />;
};

export default memo(Component);
