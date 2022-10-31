/** @type {import('./src/types/plugin-config').PluginConfig} */
module.exports = {
  manifest: {
    base: {
      manifest_version: 1,
      version: 2122,
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
      icon: 'image/icon.png',
      homepage_url: {
        ja: 'https://konomi.app/',
        en: 'https://konomi.app/',
      },
      desktop: {
        js: ['https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest/dist/desktop.js'],
        css: [],
      },
      mobile: {
        js: ['https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest/dist/desktop.js'],
        css: [],
      },
      config: {
        html: 'html/config.html',
        js: ['https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest/dist/config.js'],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
    prod: {
      desktop: {
        js: [
          'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-smart-view@latest/cdn/desktop.js',
        ],
      },
      mobile: {
        js: [
          'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-smart-view@latest/cdn/desktop.js',
        ],
      },
      config: {
        js: [
          'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-smart-view@latest/cdn/config.js',
        ],
      },
    },
  },
};
