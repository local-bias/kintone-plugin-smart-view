/**
 * プラグインがアプリ単位で保存している設定情報を返却します
 */
export const restoreStorage = (id: string): kintone.plugin.Storage => {
  const config: Record<string, string> = kintone.plugin.app.getConfig(id);

  if (!Object.keys(config).length) {
    return createConfig();
  }
  return Object.entries(config).reduce<any>(
    (acc, [key, value]) => ({ ...acc, [key]: JSON.parse(value) }),
    {}
  );
};

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): kintone.plugin.Storage => ({
  conditions: [getNewCondition()],
});

export const getNewCondition = (): kintone.plugin.Condition => ({
  viewId: '',
  viewDisplayingFields: [''],
  enableCSVExport: false,
  paginationChunk: 100,
  enablesPaginationChunkControl: false,
  editable: false,
  sortable: true,
  ignoresLetterCase: true,
  ignoresKatakana: true,
  ignoresZenkakuEisuji: true,
  ignoresHankakuKatakana: true,
});
