// @ts-check
const HP = 'https://konomi.app';
const cdn = 'https://kintone-plugin.konomi.app';
const key = 'smart-view';

/** @satisfies { Plugin.Meta.Config } */
export default /** @type { const } */ ({
  version: 1,
  id: `ribbit-kintone-plugin-${key}`,
  pluginReleasePageUrl: 'https://ribbit.konomi.app/kintone-plugin/',
  server: {
    port: 4689,
  },
  lint: {
    build: false,
  },
  tailwind: {
    css: 'src/styles/global.css',
    config: {
      desktop: 'tailwind.config.desktop.mjs',
      config: 'tailwind.config.config.mjs',
    },
  },
  manifest: {
    base: {
      manifest_version: 1,
      version: '4.2.1',
      type: 'APP',
      name: {
        en: 'faster search plugin',
        ja: '一覧高速検索＆絞り込みプラグイン',
        zh: '更快的搜索插件',
      },
      description: {
        en: 'This plugin replaces the default view with a customized view and enables faster searches',
        ja: '指定した一覧を独自のテーブルに置き換え、高速な検索と絞り込みを実現します。',
        zh: '此插件用自定义视图替换默认视图并实现更快的搜索',
      },
      icon: 'icon.png',
      homepage_url: { ja: HP, en: HP },
      desktop: { js: [`${cdn}/common/desktop.js`], css: [`${cdn}/common/desktop.css`] },
      mobile: { js: [`${cdn}/common/desktop.js`], css: [`${cdn}/common/desktop.css`] },
      config: {
        html: 'config.html',
        js: [`${cdn}/common/config.js`],
        css: [`${cdn}/common/config.css`],
        required_params: [],
      },
    },
    prod: {
      desktop: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      mobile: { js: [`${cdn}/${key}/desktop.js`], css: [`${cdn}/${key}/desktop.css`] },
      config: { js: [`${cdn}/${key}/config.js`], css: [`${cdn}/${key}/config.css`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
  },
});
