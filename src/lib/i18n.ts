import { LANGUAGE } from './global';

export const ui = {
  ja: {
    'common.close': '閉じる',
    'common.autocomplete.options.appName': 'アプリ: {0}',
    'common.autocomplete.options.fieldCode': 'コード: {0}',

    'common.loading.retry': '再試行中',
    'common.error.occurred': 'エラーが発生しました',
    'common.error.hints': 'エラー解決のヒント',
    'common.error.retry.title': '処理をリトライ',
    'common.error.retry.description':
      '以下の「リトライ」ボタンをクリックして、処理を再実行してください。',
    'common.error.retry.button': 'リトライ',
    'common.error.latestVersion.title': '最新版のプラグインをインストール',
    'common.error.latestVersion.description1':
      'プラグインの最新版をインストールすることで、問題が解決する可能性があります。',
    'common.error.latestVersion.description2':
      '以下のリンクから最新版のプラグインをダウンロードし、再度インストールしてください。',
    'common.error.latestVersion.button': '最新版をダウンロード',
    'common.error.updateSettings.title': 'プラグイン設定を更新',
    'common.error.updateSettings.description':
      '保存されているプラグイン設定情報が古くなっている可能性があります。以下の手順でプラグイン設定を更新してください。',
    'common.error.updateSettings.steps.1': 'プラグイン設定画面を開く',
    'common.error.updateSettings.steps.2': '設定を変更せず、「保存」 ボタンをクリック',
    'common.error.updateSettings.steps.3': 'アプリを更新',
    'common.error.updateSettings.steps.4': '動作が改善されているか確認',
    'common.error.updateSettings.steps.5': '-- 動作が改善されない場合は加えて以下の手順 --',
    'common.error.updateSettings.steps.6':
      '再度プラグイン設定画面を開き、設定画面右下のリセットボタンをクリック',
    'common.error.updateSettings.steps.7': '必要な設定を行い、「保存」 ボタンをクリック',
    'common.error.updateSettings.steps.8': 'アプリを更新',
    'common.error.updateSettings.steps.9': '動作が改善されているか確認',
    'common.error.inquiry.title': 'お問い合わせ',
    'common.error.inquiry.description':
      '上記全てを試しても解決しない場合、下記のエラー内容を添えて開発者までお問い合わせください。',
    'common.error.inquiry.button': 'お問い合わせ',
    'common.error.pluginId': 'プラグインID',
    'common.error.pluginName': 'プラグイン名',
    'common.error.version': 'バージョン',
    'common.error.errorMessage': 'エラーメッセージ',
    'common.error.unknownError': '不明なエラー',
    'common.error.errorStack': 'エラースタック',
    'common.error.errorDetails': 'エラー詳細',

    'common.config.resetButton.tooltip': 'プラグインの設定をリセット',
    'common.config.resetDialog.title': '設定のリセット',
    'common.config.resetDialog.message':
      'このプラグインの設定を初期状態に戻します。よろしいですか？',
    'common.config.resetDialog.execute': '実行',
    'common.config.resetDialog.cancel': 'キャンセル',
    'common.config.resetSuccess': '設定をリセットしました',

    'common.userType.user': 'ユーザー',
    'common.userType.group': 'グループ',
    'common.userType.organization': '組織',
    'common.userType.userName': 'ユーザー名',
    'common.userType.groupName': 'グループ名',
    'common.userType.organizationName': '組織名',

    'common.tooltip.recordDetail': 'レコード詳細',
    'common.tooltip.recordEdit': 'レコード編集',
    'common.tooltip.recordDelete': 'レコード削除',
    'common.tooltip.lookupCopyField':
      'このフィールドはルックアップフィールドのコピー先に設定されているため、編集できません',
    'common.tooltip.noEditPermission': '編集権限がありません',
    'common.tooltip.add': '追加',
    'common.tooltip.delete': '削除',

    'common.cache.inProgress':
      'キャッシュは進行中です。まだ条件に一致するレコードが存在する可能性があります。',
    'common.rows': '{0}行',
    'common.reload': 'リロード',

    'config.app.root.loading': '画面の描画を待機しています',
    'config.app.config.loading': '設定情報を取得しています',
    'config.app.form.view-id.title': 'テーブルを表示する一覧の設定',
    'config.app.form.view-id.description.1':
      '検索機能を実装する一覧を選択してください。選択できる一覧は表示形式「カスタマイズ」のみです。この設定を変更するには、システム管理権限が必要です。',
    'config.app.form.view-id.label': '一覧の名前',
    'config.app.form.view-id.error.title':
      '一覧の取得に失敗しました。kintoneの設定をご確認ください。',
    'config.app.form.view-fields.title': 'テーブルに表示するフィールドの設定',
    'config.app.form.view-fields.description.1':
      '一覧に表示するフィールドを設定します。検索フォームに入力された値が検索対象とするのは、この設定で選択したフィールドのみです。',
    'config.app.form.view-fields.description.2':
      'ヘッダーの文字幅を下回る表示幅を指定した場合、表示が見切れてしまう可能性があります。表示幅を0に設定した場合、幅は内容に合わせて自動調整されます。',
    'config.app.form.view-fields.fieldCode.label': '対象フィールド',
    'config.app.form.view-fields.width.label': '表示幅',
    'config.app.form.view-fields.tooltip.showDetail': 'このフィールドの詳細設定を開く',
    'config.app.form.view-fields.tooltip.addField': '表示フィールドを追加する',
    'config.app.form.view-fields.tooltip.deleteField': 'この表示フィールドを削除する',
    'config.app.form.view-fields.detailSetting.title': '{0} の詳細設定',
    'config.app.form.view-fields.isEditable.title': '編集画面での表示',
    'config.app.form.view-fields.isEditable.description':
      'スイッチをオフにした場合、編集画面には表示されません。',
    'config.app.form.view-fields.isEditable.label': '編集画面に表示',
    'config.app.form.view-fields.displayName.title': '表示名',
    'config.app.form.view-fields.displayName.description':
      '値を設定した場合、標準のフィールド名ではなく、こちらの値が表示されます。',
    'config.app.form.view-fields.displayName.label': '表示名',
    'config.app.form.view-fields.nowrap.title': '折り返しの設定',
    'config.app.form.view-fields.nowrap.description':
      'フィールドの幅を設定している場合にのみ有効になります。スイッチをオフにした場合、既定の幅に収まらないテキストは折り返されます。スイッチをオンにした場合、テキストは折り返されず、既定の幅に収まらない場合はスクロールバーが表示されます。',
    'config.app.form.view-fields.nowrap.label': 'セル内のテキストを折り返さない',
    'config.app.form.view-fields.minigraph.title': 'ミニグラフ',
    'config.app.form.view-fields.minigraph.description':
      'サブテーブルをテーブルとしてではなく、簡易的なグラフとして表示します。',
    'config.app.form.view-fields.minigraph.label': 'ミニグラフを表示する',
    'config.app.form.view-fields.minigraph.graphType.label': 'グラフの種類',
    'config.app.form.view-fields.minigraph.valueField.label': '値として使用するフィールド',
    'config.app.form.view-fields.minigraph.labelField.label': 'ラベルとして使用するフィールド',
    'config.app.form.view-fields.minigraph.graphType.bar': '棒グラフ',
    'config.app.form.view-fields.minigraph.graphType.stackedBar': '積み上げ棒グラフ(横)',
    'config.app.form.view-fields.minigraph.graphType.pie': '円グラフ',
    'config.app.form.view-type.title': '表示タイプの設定',
    'config.app.form.view-type.description.1':
      'レコードをどのような形式で表示するかを設定します。カードタイプを選択した場合、表示するフィールドの中から最初の添付ファイルフィールドが画像用に参照されます。',
    'config.app.form.view-type.label': '表示タイプ',
    'config.app.form.view-type.table': '表形式',
    'config.app.form.view-type.card': 'カード形式',
    'config.app.form.isViewTypeControlEnabled.description':
      'この設定を有効にした場合、一覧の表示タイプを変更することのできるフォームが表示されます。',
    'config.app.form.isViewTypeControlEnabled.label': '一覧から表示タイプを変更可能にする',
    'config.app.form.paginationChunk.label': '1ページあたりの表示件数',
    'config.app.form.isPaginationChunkControlShown.description':
      'この設定を有効にした場合、1ページあたりの表示レコード数を変更することのできるフォームが表示されます。',
    'config.app.form.isPaginationChunkControlShown.label': '一覧から表示件数を変更可能にする',
    'config.app.form.pagination.title': 'ページネーションの設定',
    'config.app.form.pagination.description.1':
      '1ページあたりの表示レコード数を変更することができます。スペックの低い環境では、表示レコード数を減らすことで動作が軽くなる場合があります。',
    'config.app.form.sortCriteria.title': '一覧のソート条件の設定',
    'config.app.form.isViewSortConditionEnabled.description':
      '対象の一覧に設定したソート条件を、プラグインの一覧にも適用するかを設定します。この設定を無効にした場合、プラグインの一覧は必ず新しいレコードから表示されます。',
    'config.app.form.isViewSortConditionEnabled.label': '一覧のソート条件を有効にする',
    'config.app.form.isSortable.title': '項目の並び替えの設定',
    'config.app.form.isSortable.description':
      'この設定を有効にした場合、一覧のヘッダーをクリックすることで、レコードを昇順・降順にソートすることができます。フィールドタイプによって並び替えができない場合があります。',
    'config.app.form.isSortable.label': '項目の並び替えを有効にする',
    'config.app.form.csvExport.title': 'CSVエクスポートの設定',
    'config.app.form.csvExport.description':
      'この設定を有効にした場合、一覧にCSVエクスポートボタンが表示されます。エクスポートされる一覧は、検索フォームに入力された値によって絞り込まれます。kintone標準のCSVエクスポート機能と互換性がない点に注意してください。',
    'config.app.form.isCsvDownloadButtonHidden.label': 'CSVエクスポート機能を無効にする',
    'config.app.form.editFeatures.title': '編集機能の設定',
    'config.app.form.isEditable.description':
      '一部のフィールドを除き、一覧からレコードの各フィールドを編集できるようになります。編集できるのは、レコードに対して編集権限を持つユーザーのみです。',
    'config.app.form.isEditable.label': '一覧での編集を有効にする',
    'config.app.form.isEditorControlEnabled.title': '編集機能の制限',
    'config.app.form.isEditorControlEnabled.description':
      'アプリ標準の権限設定に加えて、プラグイン独自の編集権限を設定することができます。この設定を有効にすると、指定したユーザー以外はプラグインの編集機能を利用できなくなります。kintone標準の詳細画面での編集には影響ありません。',
    'config.app.form.isEditorControlEnabled.label': '編集できるユーザーを制限する',
    'config.app.form.editors.title': '編集可能なユーザー',
    'config.app.form.editors.description':
      '編集できるユーザーを設定します。指定されたユーザー・グループ・組織のみがプラグインの編集機能を利用できます。kintone標準のレコード編集機能には影響しません。',
    'config.form.user.type.user': 'ユーザー',
    'config.form.user.type.group': 'グループ',
    'config.form.user.type.organization': '組織',
    'config.form.user.label.user': 'ユーザー名',
    'config.form.user.label.group': 'グループ名',
    'config.form.user.label.organization': '組織名',
    'config.form.permission.scope': '許可の範囲',
    'config.app.form.deleteFeatures.title': '削除機能の設定',
    'config.app.form.isDeletable.description':
      '一覧からレコードを削除できるようになります。削除できるのは、レコードに対して削除権限を持つユーザーのみです。',
    'config.app.form.isDeletable.label': '一覧での削除を有効にする',
    'config.app.form.isDeleterControlEnabled.title': '削除機能の制限',
    'config.app.form.isDeleterControlEnabled.description':
      'アプリ標準の権限設定に加えて、プラグイン独自の削除権限を設定することができます。この設定を有効にすると、指定したユーザー以外はプラグインの削除機能を利用できなくなります。kintone標準の削除機能には影響ありません。',
    'config.app.form.isDeleterControlEnabled.label': '削除できるユーザーを制限する',
    'config.app.form.deleters.title': '削除可能なユーザー',
    'config.app.form.deleters.description':
      '削除できるユーザーを設定します。指定されたユーザー・グループ・組織のみがプラグインの削除機能を利用できます。kintone標準のレコード削除機能には影響しません。',
    'config.app.form.extractedInputs.title': '追加の検索フォーム',
    'config.app.form.extractedInputs.description':
      'プラグイン標準の全フィールドを対象とした検索フォームに加えて、特定のフィールドのみを対象とする検索フォームを追加できます。追加した検索フォームは、全フィールドを対象とする検索フォームと併用できます。',
    'config.app.form.extractedInputs.type.label': '検索タイプ',
    'config.app.form.extractedInputs.type.text': 'テキスト',
    'config.app.form.extractedInputs.type.dropdown': 'ドロップダウン',
    'config.app.form.extractedInputs.type.date': '日付',
    'config.app.form.extractedInputs.type.month': '月',
    'config.app.form.extractedInputs.type.year': '年',
    'config.app.form.extractedInputs.fieldCode.label': '対象フィールド',
    'config.app.form.extractedInputs.tooltip.addField': '表示フィールドを追加する',
    'config.app.form.extractedInputs.tooltip.deleteField': 'この表示フィールドを削除する',
    'config.app.form.advancedSettings.title': '高度なオプション',
    'config.app.form.fuzzySearch.title': 'あいまい検索の設定',
    'config.app.form.isCaseSensitive.label':
      '絞り込みの際、アルファベットの大文字と小文字を区別する',
    'config.app.form.isKatakanaSensitive.label': '絞り込みの際、カタカナとひらがなを区別する',
    'config.app.form.isHankakuKatakanaSensitive.label':
      '絞り込みの際、半角カナと全角カナを区別する',
    'config.app.form.isZenkakuEisujiSensitive.label':
      '絞り込みの際、全角英数字と半角英数字を区別する',
    'config.app.form.pageTransition.title': 'ページ遷移の設定',
    'config.app.form.isOpenInNewTab.label': 'レコードの詳細画面を新しいタブで開く',
    'config.app.form.joinConditions.title': 'JOIN - 他アプリのレコードを参照・更新する',
    'config.app.form.joinConditions.description':
      '特定のキーを基準に、他のアプリのレコードを参照・更新することができます。結合設定を追加にすると、「テーブルに表示するフィールドの設定」で結合したアプリのフィールドを追加することができます。現在のバージョンでは、各レコードについてキー情報に一致した最初のレコードが参照されます。',

    'config.app.form.createViewButton.label': '新しい一覧を作成',
    'config.app.toast.createView': '一覧を作成しました',
    'config.app.toast.createViewFailed': '一覧の作成に失敗しました',
    'config.app.form.importViewFieldsButton.label': 'kintone標準の一覧からインポート',
    'config.app.form.importViewFields.dialog.title': 'フィールド情報をインポートする一覧を選択',

    'config.error.appInfoRetrievalFailedError': 'アプリ情報の取得に失敗しました',
    'config.error.appViewsRetrievalFailedError': 'アプリの一覧情報の取得に失敗しました',
    'config.error.root-not-found': `プラグインのHTMLに、ルート要素が存在しません。プラグイン設定をレンダリングするためには、id="settings"の要素が必要です。`,
    'config.app.sidebar.append-button.label': '新しい設定',
    'config.app.sidebar.label.heading': '設定',
    'config.app.sidebar.label.default': '未設定',
    'config.app.sidebar.toast.delete': '設定情報を削除しました',
    'config.app.sidebar.toast.copy': '設定情報をコピーしました',
    'config.app.sidebar.toast.paste': '設定情報を貼り付けました',
    'config.app.sidebar.toast.paste.failure': '設定情報の形式が正しくありません',
    'config.app.sidebar.toast.paste.error.validation': '設定情報の形式が正しくありません',

    'config.toast.save': '設定を保存しました',
    'config.toast.reset': '設定をリセットしました',
    'config.toast.import': '設定情報をインポートしました',
    'config.toast.export': 'プラグインの設定情報をエクスポートしました',
    'config.error.import':
      '設定情報のインポートに失敗しました、ファイルに誤りがないか確認してください',
    'config.error.export':
      'プラグインの設定情報のエクスポートに失敗しました。プラグイン開発者にお問い合わせください。',

    'desktop.app.empty.title': '条件に一致するレコードが見つかりませんでした。',
    'desktop.app.empty.description.1':
      '入力されている検索条件の他、一覧の絞り込み条件も適用されています。',
    'desktop.app.empty.description.2':
      'お探しのレコードが見つからない場合は、絞り込み条件をご確認ください。',
    'desktop.app.editor.title': 'レコードを編集',
    'desktop.app.editor.save': '保存',
    'desktop.app.editor.cancel': 'キャンセル',
    'desktop.app.editor.lookup.success': '参照先からデータが取得されました',
    'desktop.app.toast.recordUpdated': 'レコードを更新しました',
    'desktop.app.toast.partialRecordUpdated':
      'レコードの更新しましたが、{0}件のレコードは更新できませんでした({1})',
    'desktop.app.toast.recordUpdateFailed': 'レコードの更新に失敗しました',
    'desktop.app.toast.recordUpdateFailedWithMessage': 'レコードの更新に失敗しました({0})',
    'desktop.app.toast.recordDeleted': 'レコードを削除しました',
    'desktop.app.toast.recordDeleteFailed': 'レコードの削除に失敗しました',
    'desktop.app.toast.csvExport': 'CSVを出力しました',
    'desktop.app.toast.csvExportFailed': 'CSVの出力に失敗しました',
    'desktop.app.toast.pluginConditionRetrievalError': 'プラグインの設定情報の取得に失敗しました',
    'desktop.app.toast.recordNotFound': '対象レコードが存在しないため、CSVを出力できませんでした。',
    'desktop.app.tooltip.csvExport': '現在の検索条件でCSVファイルを出力します',
    'desktop.error.domainCursorCreationLimitReachedError':
      'ご利用中のドメインにおけるカーソルの作成数の上限に達しました。しばらく時間をおいてから再度お試しください。',
    'desktop.error.appInfoRetrievalFailedError': 'アプリ情報の取得に失敗しました',
    'desktop.error.unknownError':
      'エラーが発生しました。しばらく時間をおいてから再度お試しください。',

    'common.auth.serverError': 'サーバーエラーが発生しました。管理者へお問い合わせください。',
    'common.auth.licenseExpired': 'ライセンスの有効期限が切れています。',
    'common.auth.licenseInvalid': 'ライセンスが無効です',
  },
  en: {
    'common.close': 'Close',
    'common.autocomplete.options.appName': 'App: {0}',
    'common.autocomplete.options.fieldCode': 'Code: {0}',

    'common.loading.retry': 'Retrying',
    'common.error.occurred': 'An error occurred',
    'common.error.hints': 'Troubleshooting hints',
    'common.error.retry.title': 'Retry the process',
    'common.error.retry.description': 'Click the "Retry" button below to re-execute the process.',
    'common.error.retry.button': 'Retry',
    'common.error.latestVersion.title': 'Install the latest version of the plugin',
    'common.error.latestVersion.description1':
      'Installing the latest version of the plugin may resolve the issue.',
    'common.error.latestVersion.description2':
      'Download the latest version from the link below and reinstall it.',
    'common.error.latestVersion.button': 'Download Latest Version',
    'common.error.updateSettings.title': 'Update plugin settings',
    'common.error.updateSettings.description':
      'The saved plugin settings may be outdated. Please update the plugin settings using the following steps.',
    'common.error.updateSettings.steps.1': 'Open the plugin settings screen',
    'common.error.updateSettings.steps.2': 'Click the "Save" button without changing settings',
    'common.error.updateSettings.steps.3': 'Update the app',
    'common.error.updateSettings.steps.4': 'Check if the operation has improved',
    'common.error.updateSettings.steps.5':
      '-- If the operation has not improved, follow these additional steps --',
    'common.error.updateSettings.steps.6':
      'Open the plugin settings screen again and click the reset button at the bottom right of the settings screen',
    'common.error.updateSettings.steps.7': 'Make necessary settings and click the "Save" button',
    'common.error.updateSettings.steps.8': 'Update the app',
    'common.error.updateSettings.steps.9': 'Check if the operation has improved',
    'common.error.inquiry.title': 'Contact',
    'common.error.inquiry.description':
      'If the problem persists after trying all of the above, please contact the developer with the error details below.',
    'common.error.inquiry.button': 'Contact',
    'common.error.pluginId': 'Plugin ID',
    'common.error.pluginName': 'Plugin Name',
    'common.error.version': 'Version',
    'common.error.errorMessage': 'Error Message',
    'common.error.unknownError': 'Unknown Error',
    'common.error.errorStack': 'Error Stack',
    'common.error.errorDetails': 'Error Details',

    'common.config.resetButton.tooltip': 'Reset plugin settings',
    'common.config.resetDialog.title': 'Reset Settings',
    'common.config.resetDialog.message':
      'This will reset the plugin settings to their initial state. Are you sure?',
    'common.config.resetDialog.execute': 'Execute',
    'common.config.resetDialog.cancel': 'Cancel',
    'common.config.resetSuccess': 'Settings reset successfully',

    'common.userType.user': 'User',
    'common.userType.group': 'Group',
    'common.userType.organization': 'Organization',
    'common.userType.userName': 'Username',
    'common.userType.groupName': 'Group Name',
    'common.userType.organizationName': 'Organization Name',

    'common.tooltip.recordDetail': 'Record Details',
    'common.tooltip.recordEdit': 'Edit Record',
    'common.tooltip.recordDelete': 'Delete Record',
    'common.tooltip.lookupCopyField':
      'This field cannot be edited because it is set as a lookup field copy destination',
    'common.tooltip.noEditPermission': 'No edit permission',
    'common.tooltip.add': 'Add',
    'common.tooltip.delete': 'Delete',

    'common.cache.inProgress':
      'Cache is in progress. There may still be records that match the criteria.',
    'common.rows': '{0} rows',
    'common.reload': 'Reload',

    'config.app.root.loading': 'Waiting for screen rendering',
    'config.app.config.loading': 'Retrieving configuration information',
    'config.app.form.view-id.title': 'Settings for the list to display the table',
    'config.app.form.view-id.description.1':
      'Please select the list to implement the search function. Only lists with the display format "Customize" can be selected. System administrator privileges are required to change this setting.',
    'config.app.form.view-id.label': 'List name',
    'config.app.form.view-id.error.title':
      'Failed to retrieve the list. Please check your kintone settings.',
    'config.app.form.view-fields.title': 'Settings for fields displayed in the table',
    'config.app.form.view-fields.description.1':
      'Set the fields to be displayed in the list. Only the fields selected in this setting will be the target of the search values entered in the search form.',
    'config.app.form.view-fields.description.2':
      'If you specify a display width that is less than the character width of the header, the display may be cut off. If you set the display width to 0, the width will be automatically adjusted to fit the content.',
    'config.app.form.view-fields.fieldCode.label': 'Target field',
    'config.app.form.view-fields.width.label': 'Display width',
    'config.app.form.view-fields.tooltip.showDetail': 'Open detailed settings for this field',
    'config.app.form.view-fields.tooltip.addField': 'Add display field',
    'config.app.form.view-fields.tooltip.deleteField': 'Delete this display field',
    'config.app.form.view-fields.detailSetting.title': 'Detailed settings for {0}',
    'config.app.form.view-fields.isEditable.title': 'Display in edit screen',
    'config.app.form.view-fields.isEditable.description':
      'If the switch is turned off, it will not be displayed on the edit screen.',
    'config.app.form.view-fields.isEditable.label': 'Display on edit screen',
    'config.app.form.view-fields.displayName.title': 'Display name',
    'config.app.form.view-fields.displayName.description':
      'If a value is set, this value will be displayed instead of the standard field name.',
    'config.app.form.view-fields.displayName.label': 'Display name',
    'config.app.form.view-fields.nowrap.title': 'Text wrapping settings',
    'config.app.form.view-fields.nowrap.description':
      'This is only effective if the width of the field is set. If the switch is turned off, text that does not fit within the default width will wrap. If the switch is turned on, the text will not wrap, and a scrollbar will be displayed if the text does not fit within the default width.',
    'config.app.form.view-fields.nowrap.label': 'Do not wrap text in cell',
    'config.app.form.view-type.title': 'Display type settings',
    'config.app.form.view-type.description.1':
      'Set how to display the records. If you select the card type, the first attachment field among the displayed fields will be referenced for the image.',
    'config.app.form.view-type.label': 'Display type',
    'config.app.form.view-type.table': 'Table format',
    'config.app.form.view-type.card': 'Card format',
    'config.app.form.isViewTypeControlEnabled.description':
      'If this setting is enabled, a form will be displayed that allows you to change the display type of the list.',
    'config.app.form.isViewTypeControlEnabled.label': 'Allow changing display type from list',
    'config.app.form.paginationChunk.label': 'Number of items displayed per page',
    'config.app.form.isPaginationChunkControlShown.description':
      'If this setting is enabled, a form will be displayed that allows you to change the number of records displayed per page.',
    'config.app.form.isPaginationChunkControlShown.label':
      'Allow changing number of items displayed from list',
    'config.app.form.pagination.title': 'Pagination settings',
    'config.app.form.pagination.description.1':
      'You can change the number of records displayed per page. In low-spec environments, reducing the number of displayed records may improve performance.',
    'config.app.form.sortCriteria.title': 'List sort criteria settings',
    'config.app.form.isViewSortConditionEnabled.description':
      'Set whether to apply the sort conditions set for the target list to the plugin list. If this setting is disabled, the plugin list will always display the newest records first.',
    'config.app.form.isViewSortConditionEnabled.label': 'Enable list sort conditions',
    'config.app.form.isSortable.title': 'Item sorting settings',
    'config.app.form.isSortable.description':
      'If this setting is enabled, you can sort records in ascending or descending order by clicking the list header. Some field types may not be sortable.',
    'config.app.form.isSortable.label': 'Enable item sorting',
    'config.app.form.csvExport.title': 'CSV export settings',
    'config.app.form.csvExport.description':
      'If this setting is enabled, a CSV export button will be displayed in the list. The exported list will be filtered by the values entered in the search form. Note that it is not compatible with the standard kintone CSV export function.',
    'config.app.form.isCsvDownloadButtonHidden.label': 'Disable CSV export function',
    'config.app.form.editFeatures.title': 'Edit feature settings',
    'config.app.form.isEditable.description':
      'With the exception of some fields, you can edit each field of the record from the list. Only users with edit permissions for the record can edit it.',
    'config.app.form.isEditable.label': 'Enable editing in list',
    'config.app.form.isEditorControlEnabled.title': 'Edit feature restrictions',
    'config.app.form.isEditorControlEnabled.description':
      "In addition to the standard app permissions, you can set unique edit permissions for the plugin. If this setting is enabled, only specified users can use the plugin's edit function. It does not affect editing in the standard kintone detail screen.",
    'config.app.form.isEditorControlEnabled.label': 'Restrict users who can edit',
    'config.app.form.editors.title': 'Users who can edit',
    'config.app.form.editors.description':
      "Set the users who can edit. Only the specified users, groups, and organizations can use the plugin's edit function. It does not affect the standard kintone record editing function.",
    'config.form.user.type.user': 'User',
    'config.form.user.type.group': 'Group',
    'config.form.user.type.organization': 'Organization',
    'config.form.user.label.user': 'User Name',
    'config.form.user.label.group': 'Group Name',
    'config.form.user.label.organization': 'Organization Name',
    'config.form.permission.scope': 'Permission Scope',
    'config.app.form.deleteFeatures.title': 'Delete feature settings',
    'config.app.form.isDeletable.description':
      'You can delete records from the list. Only users with delete permissions for the record can delete it.',
    'config.app.form.isDeletable.label': 'Enable deletion in list',
    'config.app.form.isDeleterControlEnabled.title': 'Delete feature restrictions',
    'config.app.form.isDeleterControlEnabled.description':
      "In addition to the standard app permissions, you can set unique delete permissions for the plugin. If this setting is enabled, only specified users can use the plugin's delete function. It does not affect the standard kintone delete function.",
    'config.app.form.isDeleterControlEnabled.label': 'Restrict users who can delete',
    'config.app.form.deleters.title': 'Users who can delete',
    'config.app.form.deleters.description':
      "Set the users who can delete. Only the specified users, groups, and organizations can use the plugin's delete function. It does not affect the standard kintone record delete function.",
    'config.app.form.extractedInputs.title': 'Additional search form',
    'config.app.form.extractedInputs.description':
      'In addition to the standard search form that targets all fields, you can add a search form that targets only specific fields. The added search form can be used in conjunction with the search form that targets all fields.',
    'config.app.form.extractedInputs.type.label': 'Search type',
    'config.app.form.extractedInputs.type.text': 'Text',
    'config.app.form.extractedInputs.type.dropdown': 'Dropdown',
    'config.app.form.extractedInputs.type.date': 'Date',
    'config.app.form.extractedInputs.type.month': 'Month',
    'config.app.form.extractedInputs.type.year': 'Year',
    'config.app.form.extractedInputs.fieldCode.label': 'Target field',
    'config.app.form.extractedInputs.tooltip.addField': 'Add display field',
    'config.app.form.extractedInputs.tooltip.deleteField': 'Delete this display field',
    'config.app.form.advancedSettings.title': 'Advanced options',
    'config.app.form.fuzzySearch.title': 'Fuzzy search settings',
    'config.app.form.isCaseSensitive.label':
      'Distinguish between uppercase and lowercase letters when filtering',
    'config.app.form.isKatakanaSensitive.label':
      'Distinguish between Katakana and Hiragana when filtering',
    'config.app.form.isHankakuKatakanaSensitive.label':
      'Distinguish between half-width and full-width Katakana when filtering',
    'config.app.form.isZenkakuEisujiSensitive.label':
      'Distinguish between full-width and half-width alphanumeric characters when filtering',
    'config.app.form.pageTransition.title': 'Page transition settings',
    'config.app.form.isOpenInNewTab.label': 'Open record detail screen in a new tab',
    'config.app.form.joinConditions.title': 'JOIN - Reference and update records from other apps',
    'config.app.form.joinConditions.description':
      'You can reference and update records from other apps based on specific keys. When you add a join setting, you can add fields from the joined app in the "Settings for fields displayed in the table". In the current version, the first record that matches the key information for each record is referenced.',

    'config.app.form.createViewButton.label': 'Create new list',
    'config.app.toast.createView': 'List created',
    'config.app.toast.createViewFailed': 'Failed to create list',
    'config.app.form.importViewFieldsButton.label': 'Import from standard kintone list',
    'config.app.form.importViewFields.dialog.title':
      'Select the list to import field information from',

    'config.error.appInfoRetrievalFailedError': 'Failed to retrieve app information',
    'config.error.appViewsRetrievalFailedError': 'Failed to retrieve app views information',
    'config.error.root-not-found': `The plugin's HTML does not contain a root element. An element with id="settings" is required to render the plugin settings.`,
    'config.app.sidebar.append-button.label': 'New settings',
    'config.app.sidebar.label.heading': 'Settings',
    'config.app.sidebar.label.default': 'Not set',
    'config.app.sidebar.toast.delete': 'Deleted settings information',
    'config.app.sidebar.toast.copy': 'Copied settings information',
    'config.app.sidebar.toast.paste': 'Pasted settings information',
    'config.app.sidebar.toast.paste.failure': 'The format of the settings information is incorrect',
    'config.app.sidebar.toast.paste.error.validation':
      'The format of the settings information is incorrect',

    'config.toast.save': 'Settings saved',
    'config.toast.reset': 'Settings reset',
    'config.toast.import': 'Settings information imported',
    'config.toast.export': 'Plugin settings information exported',
    'config.error.import':
      'Failed to import settings information, please check the file for errors',
    'config.error.export':
      'Failed to export plugin settings information. Please contact the plugin developer.',

    'desktop.app.empty.title': 'No records matching the conditions were found.',
    'desktop.app.empty.description.1':
      'In addition to the search conditions entered, the list filtering conditions are also applied.',
    'desktop.app.empty.description.2':
      'If you cannot find the record you are looking for, please check the filtering conditions.',
    'desktop.app.editor.title': 'Edit record',
    'desktop.app.editor.save': 'Save',
    'desktop.app.editor.cancel': 'Cancel',
    'desktop.app.editor.lookup.success': 'Data has been retrieved from the reference source',
    'desktop.app.toast.recordUpdated': 'Record updated',
    'desktop.app.toast.partialRecordUpdated':
      'Record updated, but {0} records could not be updated ({1})',
    'desktop.app.toast.recordUpdateFailed': 'Failed to update record',
    'desktop.app.toast.recordUpdateFailedWithMessage': 'Failed to update record ({0})',
    'desktop.app.toast.recordDeleted': 'Record deleted',
    'desktop.app.toast.recordDeleteFailed': 'Failed to delete record',
    'desktop.app.toast.csvExport': 'CSV exported',
    'desktop.app.toast.csvExportFailed': 'Failed to export CSV',
    'desktop.app.toast.pluginConditionRetrievalError':
      'Failed to retrieve plugin settings information',
    'desktop.app.toast.recordNotFound':
      'CSV could not be exported because the target record does not exist.',
    'desktop.app.tooltip.csvExport': 'Export CSV file with current search conditions',
    'desktop.error.domainCursorCreationLimitReachedError':
      'The limit for creating cursors in the domain you are using has been reached. Please try again after some time.',
    'desktop.error.appInfoRetrievalFailedError': 'Failed to retrieve app information',
    'desktop.error.unknownError': 'An error occurred. Please try again after some time.',

    'common.auth.serverError': 'A server error occurred. Please contact the administrator.',
    'common.auth.licenseExpired': 'The license has expired.',
    'common.auth.licenseInvalid': 'The license is invalid',
  },
  es: {
    'common.close': 'Cerrar',
    'common.autocomplete.options.appName': 'Aplicación: {0}',
    'common.autocomplete.options.fieldCode': 'Código: {0}',

    'common.loading.retry': 'Reintentando',
    'common.error.occurred': 'Ocurrió un error',
    'common.error.hints': 'Sugerencias para resolver errores',
    'common.error.retry.title': 'Reintentar el proceso',
    'common.error.retry.description':
      'Haga clic en el botón "Reintentar" a continuación para volver a ejecutar el proceso.',
    'common.error.retry.button': 'Reintentar',
    'common.error.latestVersion.title': 'Instalar la versión más reciente del plugin',
    'common.error.latestVersion.description1':
      'Instalar la versión más reciente del plugin puede resolver el problema.',
    'common.error.latestVersion.description2':
      'Descargue la versión más reciente desde el enlace a continuación y vuelva a instalarla.',
    'common.error.latestVersion.button': 'Descargar Versión Más Reciente',
    'common.error.updateSettings.title': 'Actualizar configuración del plugin',
    'common.error.updateSettings.description':
      'La configuración guardada del plugin puede estar desactualizada. Actualice la configuración del plugin siguiendo estos pasos.',
    'common.error.updateSettings.steps.1': 'Abrir la pantalla de configuración del plugin',
    'common.error.updateSettings.steps.2':
      'Hacer clic en el botón "Guardar" sin cambiar la configuración',
    'common.error.updateSettings.steps.3': 'Actualizar la aplicación',
    'common.error.updateSettings.steps.4': 'Verificar si la operación ha mejorado',
    'common.error.updateSettings.steps.5':
      '-- Si la operación no ha mejorado, siga estos pasos adicionales --',
    'common.error.updateSettings.steps.6':
      'Abrir nuevamente la pantalla de configuración del plugin y hacer clic en el botón de reset en la parte inferior derecha',
    'common.error.updateSettings.steps.7':
      'Realizar la configuración necesaria y hacer clic en el botón "Guardar"',
    'common.error.updateSettings.steps.8': 'Actualizar la aplicación',
    'common.error.updateSettings.steps.9': 'Verificar si la operación ha mejorado',
    'common.error.inquiry.title': 'Contacto',
    'common.error.inquiry.description':
      'Si el problema persiste después de intentar todo lo anterior, póngase en contacto con el desarrollador con los detalles del error a continuación.',
    'common.error.inquiry.button': 'Contactar',
    'common.error.pluginId': 'ID del Plugin',
    'common.error.pluginName': 'Nombre del Plugin',
    'common.error.version': 'Versión',
    'common.error.errorMessage': 'Mensaje de Error',
    'common.error.unknownError': 'Error Desconocido',
    'common.error.errorStack': 'Pila de Error',
    'common.error.errorDetails': 'Detalles del Error',

    'common.config.resetButton.tooltip': 'Restablecer configuración del plugin',
    'common.config.resetDialog.title': 'Restablecer Configuración',
    'common.config.resetDialog.message':
      'Esto restablecerá la configuración del plugin a su estado inicial. ¿Está seguro?',
    'common.config.resetDialog.execute': 'Ejecutar',
    'common.config.resetDialog.cancel': 'Cancelar',
    'common.config.resetSuccess': 'Configuración restablecida exitosamente',

    'common.userType.user': 'Usuario',
    'common.userType.group': 'Grupo',
    'common.userType.organization': 'Organización',
    'common.userType.userName': 'Nombre de Usuario',
    'common.userType.groupName': 'Nombre de Grupo',
    'common.userType.organizationName': 'Nombre de Organización',

    'common.tooltip.recordDetail': 'Detalles del Registro',
    'common.tooltip.recordEdit': 'Editar Registro',
    'common.tooltip.recordDelete': 'Eliminar Registro',
    'common.tooltip.lookupCopyField':
      'Este campo no se puede editar porque está configurado como destino de copia de campo de lookup',
    'common.tooltip.noEditPermission': 'Sin permisos de edición',
    'common.tooltip.add': 'Agregar',
    'common.tooltip.delete': 'Eliminar',

    'common.cache.inProgress':
      'El caché está en progreso. Puede que aún existan registros que coincidan con los criterios.',
    'common.rows': '{0} filas',
    'common.reload': 'Recargar',

    'config.app.root.loading': 'Esperando la renderización de la pantalla',
    'config.app.config.loading': 'Obteniendo información de configuración',
    'config.app.form.view-id.title': 'Configuración de la vista de la tabla',
    'config.app.form.view-id.description.1':
      'Seleccione la vista para implementar la función de búsqueda. Solo se pueden seleccionar vistas con el formato de visualización "Personalizado". Se requieren permisos de administrador del sistema para cambiar esta configuración.',
    'config.app.form.view-id.label': 'Nombre de la vista',
    'config.app.form.view-id.error.title':
      'Error al obtener la lista. Por favor, verifique la configuración de kintone.',
    'config.app.form.view-fields.title': 'Configuración de los campos a mostrar en la tabla',
    'config.app.form.view-fields.description.1':
      'Configure los campos a mostrar en la vista. Solo los campos seleccionados en esta configuración serán objeto de búsqueda con los valores ingresados en el formulario de búsqueda.',
    'config.app.form.view-fields.description.2':
      'Si especifica un ancho de visualización menor que el ancho del encabezado, es posible que la visualización se corte. Si establece el ancho en 0, el ancho se ajustará automáticamente al contenido.',
    'config.app.form.view-fields.fieldCode.label': 'Campo objetivo',
    'config.app.form.view-fields.width.label': 'Ancho de visualización',
    'config.app.form.view-fields.tooltip.showDetail': 'Abrir configuración detallada de este campo',
    'config.app.form.view-fields.tooltip.addField': 'Agregar campo de visualización',
    'config.app.form.view-fields.tooltip.deleteField': 'Eliminar este campo de visualización',
    'config.app.form.view-fields.detailSetting.title': 'Configuración detallada de {0}',
    'config.app.form.view-fields.isEditable.title': 'Visualización en la pantalla de edición',
    'config.app.form.view-fields.isEditable.description':
      'Si desactiva el interruptor, no se mostrará en la pantalla de edición.',
    'config.app.form.view-fields.isEditable.label': 'Mostrar en la pantalla de edición',
    'config.app.form.view-fields.displayName.title': 'Nombre de visualización',
    'config.app.form.view-fields.displayName.description':
      'Si se establece un valor, se mostrará este valor en lugar del nombre de campo estándar.',
    'config.app.form.view-fields.displayName.label': 'Nombre de visualización',
    'config.app.form.view-fields.nowrap.title': 'Configuración de ajuste de texto',
    'config.app.form.view-fields.nowrap.description':
      'Solo es efectivo si se ha configurado el ancho del campo. Si desactiva el interruptor, el texto que no cabe en el ancho predeterminado se ajustará. Si activa el interruptor, el texto no se ajustará y se mostrará una barra de desplazamiento si no cabe en el ancho predeterminado.',
    'config.app.form.view-fields.nowrap.label': 'No ajustar el texto dentro de la celda',
    'config.app.form.view-type.title': 'Configuración del tipo de visualización',
    'config.app.form.view-type.description.1':
      'Configure cómo se mostrarán los registros. Si selecciona el tipo de tarjeta, el primer campo de archivo adjunto de los campos a mostrar se referenciará como imagen.',
    'config.app.form.view-type.label': 'Tipo de visualización',
    'config.app.form.view-type.table': 'Formato de tabla',
    'config.app.form.view-type.card': 'Formato de tarjeta',
    'config.app.form.isViewTypeControlEnabled.description':
      'Si habilita esta configuración, se mostrará un formulario que permite cambiar el tipo de visualización de la vista.',
    'config.app.form.isViewTypeControlEnabled.label':
      'Permitir cambiar el tipo de visualización desde la vista',
    'config.app.form.paginationChunk.label': 'Número de registros por página',
    'config.app.form.isPaginationChunkControlShown.description':
      'Si habilita esta configuración, se mostrará un formulario que permite cambiar el número de registros por página.',
    'config.app.form.isPaginationChunkControlShown.label':
      'Permitir cambiar el número de registros por página desde la vista',
    'config.app.form.pagination.title': 'Configuración de paginación',
    'config.app.form.pagination.description.1':
      'Puede cambiar el número de registros mostrados por página. En entornos de baja especificación, reducir el número de registros mostrados puede mejorar el rendimiento.',
    'config.app.form.sortCriteria.title': 'Configuración de criterios de ordenación de la vista',
    'config.app.form.isViewSortConditionEnabled.description':
      'Configure si se aplicarán los criterios de ordenación establecidos en la vista objetivo también en la vista del plugin. Si desactiva esta configuración, la vista del plugin siempre mostrará los registros más recientes primero.',
    'config.app.form.isViewSortConditionEnabled.label':
      'Habilitar criterios de ordenación de la vista',
    'config.app.form.isSortable.title': 'Configuración de ordenación de elementos',
    'config.app.form.isSortable.description':
      'Si habilita esta configuración, podrá ordenar los registros en orden ascendente o descendente haciendo clic en el encabezado de la vista. Dependiendo del tipo de campo, es posible que no se pueda ordenar.',
    'config.app.form.isSortable.label': 'Habilitar ordenación de elementos',
    'config.app.form.csvExport.title': 'Configuración de exportación CSV',
    'config.app.form.csvExport.description':
      'Si habilita esta configuración, se mostrará un botón de exportación CSV en la vista. La vista exportada se filtrará según los valores ingresados en el formulario de búsqueda. Tenga en cuenta que no es compatible con la función de exportación CSV estándar de kintone.',
    'config.app.form.isCsvDownloadButtonHidden.label': 'Deshabilitar la función de exportación CSV',
    'config.app.form.editFeatures.title': 'Configuración de funciones de edición',
    'config.app.form.isEditable.description':
      'Excepto algunos campos, podrá editar cada campo del registro desde la vista. Solo los usuarios con permisos de edición sobre el registro podrán editar.',
    'config.app.form.isEditable.label': 'Habilitar edición en la vista',
    'config.app.form.isEditorControlEnabled.title': 'Restricción de funciones de edición',
    'config.app.form.isEditorControlEnabled.description':
      'Además de la configuración de permisos estándar de la aplicación, puede configurar permisos de edición específicos del plugin. Si habilita esta configuración, los usuarios no especificados no podrán utilizar las funciones de edición del plugin. No afecta a la edición en la pantalla de detalles estándar de kintone.',
    'config.app.form.isEditorControlEnabled.label': 'Restringir usuarios que pueden editar',
    'config.app.form.editors.title': 'Usuarios que pueden editar',
    'config.app.form.editors.description':
      'Configure los usuarios que pueden editar. Solo los usuarios, grupos y organizaciones especificados podrán utilizar las funciones de edición del plugin. No afecta a la función de edición de registros estándar de kintone.',
    'config.form.user.type.user': 'Usuario',
    'config.form.user.type.group': 'Grupo',
    'config.form.user.type.organization': 'Organización',
    'config.form.user.label.user': 'Nombre de Usuario',
    'config.form.user.label.group': 'Nombre de Grupo',
    'config.form.user.label.organization': 'Nombre de Organización',
    'config.form.permission.scope': 'Ámbito de Permisos',
    'config.app.form.deleteFeatures.title': 'Configuración de funciones de eliminación',
    'config.app.form.isDeletable.description':
      'Podrá eliminar registros desde la vista. Solo los usuarios con permisos de eliminación sobre el registro podrán eliminar.',
    'config.app.form.isDeletable.label': 'Habilitar eliminación en la vista',
    'config.app.form.isDeleterControlEnabled.title': 'Restricción de funciones de eliminación',
    'config.app.form.isDeleterControlEnabled.description':
      'Además de la configuración de permisos estándar de la aplicación, puede configurar permisos de eliminación específicos del plugin. Si habilita esta configuración, los usuarios no especificados no podrán utilizar las funciones de eliminación del plugin. No afecta a la función de eliminación estándar de kintone.',
    'config.app.form.isDeleterControlEnabled.label': 'Restringir usuarios que pueden eliminar',
    'config.app.form.deleters.title': 'Usuarios que pueden eliminar',
    'config.app.form.deleters.description':
      'Configure los usuarios que pueden eliminar. Solo los usuarios, grupos y organizaciones especificados podrán utilizar las funciones de eliminación del plugin. No afecta a la función de eliminación de registros estándar de kintone.',
    'config.app.form.extractedInputs.title': 'Formulario de búsqueda adicional',
    'config.app.form.extractedInputs.description':
      'Además del formulario de búsqueda estándar del plugin que abarca todos los campos, puede agregar formularios de búsqueda que solo abarquen campos específicos. Los formularios de búsqueda agregados se pueden usar junto con el formulario de búsqueda que abarca todos los campos.',
    'config.app.form.extractedInputs.type.label': 'Tipo de búsqueda',
    'config.app.form.extractedInputs.type.text': 'Texto',
    'config.app.form.extractedInputs.type.dropdown': 'Desplegable',
    'config.app.form.extractedInputs.type.date': 'Fecha',
    'config.app.form.extractedInputs.type.month': 'Mes',
    'config.app.form.extractedInputs.type.year': 'Año',
    'config.app.form.extractedInputs.fieldCode.label': 'Campo objetivo',
    'config.app.form.extractedInputs.tooltip.addField': 'Agregar campo de visualización',
    'config.app.form.extractedInputs.tooltip.deleteField': 'Eliminar este campo de visualización',
    'config.app.form.advancedSettings.title': 'Opciones avanzadas',
    'config.app.form.fuzzySearch.title': 'Configuración de búsqueda difusa',
    'config.app.form.isCaseSensitive.label': 'Distinguir entre mayúsculas y minúsculas al filtrar',
    'config.app.form.isKatakanaSensitive.label': 'Distinguir entre katakana y hiragana al filtrar',
    'config.app.form.isHankakuKatakanaSensitive.label':
      'Distinguir entre katakana de ancho medio y katakana de ancho completo al filtrar',
    'config.app.form.isZenkakuEisujiSensitive.label':
      'Distinguir entre caracteres alfanuméricos de ancho completo y de ancho medio al filtrar',
    'config.app.form.pageTransition.title': 'Configuración de transición de página',
    'config.app.form.isOpenInNewTab.label':
      'Abrir la pantalla de detalles del registro en una nueva pestaña',
    'config.app.form.joinConditions.title':
      'JOIN - Referenciar y actualizar registros de otras aplicaciones',
    'config.app.form.joinConditions.description':
      'Puede referenciar y actualizar registros de otras aplicaciones basándose en una clave específica. Al agregar una configuración de unión, podrá agregar campos de la aplicación unida en la "Configuración de los campos a mostrar en la tabla". En la versión actual, se referenciará el primer registro que coincida con la información de la clave para cada registro.',

    'config.app.form.createViewButton.label': 'Crear nueva vista',
    'config.app.toast.createView': 'Vista creada',
    'config.app.toast.createViewFailed': 'Error al crear la vista',
    'config.app.form.importViewFieldsButton.label': 'Importar desde la vista estándar de kintone',
    'config.app.form.importViewFields.dialog.title':
      'Seleccione la vista para importar la información del campo',

    'config.error.appInfoRetrievalFailedError': 'Error al obtener la información de la aplicación',
    'config.error.appViewsRetrievalFailedError':
      'Error al obtener la información de las vistas de la aplicación',
    'config.error.root-not-found': `No se encontró el elemento raíz en el HTML del plugin. Se requiere un elemento con id="settings" para renderizar la configuración del plugin.`,
    'config.app.sidebar.append-button.label': 'Nueva configuración',
    'config.app.sidebar.label.heading': 'Configuración',
    'config.app.sidebar.label.default': 'No configurado',
    'config.app.sidebar.toast.delete': 'Información de configuración eliminada',
    'config.app.sidebar.toast.copy': 'Información de configuración copiada',
    'config.app.sidebar.toast.paste': 'Información de configuración pegada',
    'config.app.sidebar.toast.paste.failure':
      'El formato de la información de configuración no es correcto',
    'config.app.sidebar.toast.paste.error.validation':
      'El formato de la información de configuración no es correcto',

    'config.toast.save': 'Configuración guardada',
    'config.toast.reset': 'Configuración restablecida',
    'config.toast.import': 'Información de configuración importada',
    'config.toast.export': 'Información de configuración del plugin exportada',
    'config.error.import':
      'Error al importar la información de configuración, verifique que el archivo no tenga errores',
    'config.error.export':
      'Error al exportar la información de configuración del plugin. Contacte al desarrollador del plugin.',

    'desktop.app.empty.title': 'No se encontraron registros que coincidan con los criterios.',
    'desktop.app.empty.description.1':
      'Además de las condiciones de búsqueda ingresadas, también se aplican las condiciones de filtrado de la vista.',
    'desktop.app.empty.description.2':
      'Si no encuentra el registro que busca, verifique las condiciones de filtrado.',
    'desktop.app.editor.title': 'Editar registro',
    'desktop.app.editor.save': 'Guardar',
    'desktop.app.editor.cancel': 'Cancelar',
    'desktop.app.editor.lookup.success': 'Se obtuvieron los datos de la fuente de referencia',
    'desktop.app.toast.recordUpdated': 'Registro actualizado',
    'desktop.app.toast.partialRecordUpdated':
      'Registro actualizado, pero {0} registros no pudieron ser actualizados ({1})',
    'desktop.app.toast.recordUpdateFailed': 'Error al actualizar el registro',
    'desktop.app.toast.recordUpdateFailedWithMessage': 'Error al actualizar el registro ({0})',
    'desktop.app.toast.recordDeleted': 'Registro eliminado',
    'desktop.app.toast.recordDeleteFailed': 'Error al eliminar el registro',
    'desktop.app.toast.csvExport': 'CSV exportado',
    'desktop.app.toast.csvExportFailed': 'Error al exportar el CSV',
    'desktop.app.toast.pluginConditionRetrievalError':
      'Error al obtener la información de configuración del plugin',
    'desktop.app.toast.recordNotFound':
      'No se pudo exportar el CSV porque no se encontró el registro objetivo.',
    'desktop.app.tooltip.csvExport':
      'Exportar archivo CSV con las condiciones de búsqueda actuales',
    'desktop.error.domainCursorCreationLimitReachedError':
      'Se ha alcanzado el límite de creación de cursores en el dominio que está utilizando. Inténtelo de nuevo más tarde.',
    'desktop.error.appInfoRetrievalFailedError': 'Error al obtener la información de la aplicación',
    'desktop.error.unknownError': 'Ocurrió un error. Inténtelo de nuevo más tarde.',

    'common.auth.serverError':
      'Ocurrió un error del servidor. Póngase en contacto con el administrador.',
    'common.auth.licenseExpired': 'La licencia ha expirado.',
    'common.auth.licenseInvalid': 'La licencia es inválida',
  },
  /** 中国語（簡体字） */
  zh: {
    'common.close': '关闭',
    'common.autocomplete.options.appName': '应用: {0}',
    'common.autocomplete.options.fieldCode': '代码: {0}',

    'common.loading.retry': '重试中',
    'common.error.occurred': '发生错误',
    'common.error.hints': '错误解决提示',
    'common.error.retry.title': '重试处理',
    'common.error.retry.description': '点击下方的"重试"按钮重新执行处理。',
    'common.error.retry.button': '重试',
    'common.error.latestVersion.title': '安装最新版本的插件',
    'common.error.latestVersion.description1': '安装最新版本的插件可能会解决问题。',
    'common.error.latestVersion.description2': '从下方链接下载最新版本并重新安装。',
    'common.error.latestVersion.button': '下载最新版本',
    'common.error.updateSettings.title': '更新插件设置',
    'common.error.updateSettings.description':
      '保存的插件设置可能已过时。请按照以下步骤更新插件设置。',
    'common.error.updateSettings.steps.1': '打开插件设置屏幕',
    'common.error.updateSettings.steps.2': '不更改设置，点击"保存"按钮',
    'common.error.updateSettings.steps.3': '更新应用',
    'common.error.updateSettings.steps.4': '检查操作是否有改善',
    'common.error.updateSettings.steps.5': '-- 如果操作没有改善，请执行以下附加步骤 --',
    'common.error.updateSettings.steps.6': '再次打开插件设置屏幕，点击设置屏幕右下角的重置按钮',
    'common.error.updateSettings.steps.7': '进行必要设置，点击"保存"按钮',
    'common.error.updateSettings.steps.8': '更新应用',
    'common.error.updateSettings.steps.9': '检查操作是否有改善',
    'common.error.inquiry.title': '联系我们',
    'common.error.inquiry.description':
      '如果尝试上述所有方法后问题仍然存在，请联系开发者并提供以下错误详情。',
    'common.error.inquiry.button': '联系',
    'common.error.pluginId': '插件ID',
    'common.error.pluginName': '插件名称',
    'common.error.version': '版本',
    'common.error.errorMessage': '错误消息',
    'common.error.unknownError': '未知错误',
    'common.error.errorStack': '错误堆栈',
    'common.error.errorDetails': '错误详情',

    'common.config.resetButton.tooltip': '重置插件设置',
    'common.config.resetDialog.title': '重置设置',
    'common.config.resetDialog.message': '这将把插件设置重置为初始状态。您确定吗？',
    'common.config.resetDialog.execute': '执行',
    'common.config.resetDialog.cancel': '取消',
    'common.config.resetSuccess': '设置重置成功',

    'common.userType.user': '用户',
    'common.userType.group': '组',
    'common.userType.organization': '组织',
    'common.userType.userName': '用户名',
    'common.userType.groupName': '组名',
    'common.userType.organizationName': '组织名',

    'common.tooltip.recordDetail': '记录详情',
    'common.tooltip.recordEdit': '编辑记录',
    'common.tooltip.recordDelete': '删除记录',
    'common.tooltip.lookupCopyField': '此字段无法编辑，因为它设置为查找字段的复制目标',
    'common.tooltip.noEditPermission': '无编辑权限',
    'common.tooltip.add': '添加',
    'common.tooltip.delete': '删除',

    'common.cache.inProgress': '缓存正在进行中。可能仍有符合条件的记录存在。',
    'common.rows': '{0}行',
    'common.reload': '重新加载',

    'config.app.root.loading': '正在等待页面渲染',
    'config.app.config.loading': '正在获取配置信息',
    'config.app.form.view-id.title': '显示表格的列表设置',
    'config.app.form.view-id.description.1':
      '请选择要实现搜索功能的列表。可选择的列表仅限于显示形式为"自定义"的列表。要更改此设置，需要系统管理权限。',
    'config.app.form.view-id.label': '列表名称',
    'config.app.form.view-id.error.title': '获取列表失败。请检查kintone的设置。',
    'config.app.form.view-fields.title': '表格中显示字段的设置',
    'config.app.form.view-fields.description.1':
      '设置在列表中显示的字段。搜索表单中输入的值仅会搜索此设置中选择的字段。',
    'config.app.form.view-fields.description.2':
      '如果指定的显示宽度低于标题的字符宽度，显示可能会被截断。如果将显示宽度设置为0，宽度将根据内容自动调整。',
    'config.app.form.view-fields.fieldCode.label': '目标字段',
    'config.app.form.view-fields.width.label': '显示宽度',
    'config.app.form.view-fields.tooltip.showDetail': '打开此字段的详细设置',
    'config.app.form.view-fields.tooltip.addField': '添加显示字段',
    'config.app.form.view-fields.tooltip.deleteField': '删除此显示字段',
    'config.app.form.view-fields.detailSetting.title': '{0} 的详细设置',
    'config.app.form.view-fields.isEditable.title': '编辑页面的显示',
    'config.app.form.view-fields.isEditable.description': '如果关闭开关，编辑页面将不会显示。',
    'config.app.form.view-fields.isEditable.label': '在编辑页面显示',
    'config.app.form.view-fields.displayName.title': '显示名称',
    'config.app.form.view-fields.displayName.description':
      '如果设置了值，将显示此值而不是标准字段名称。',
    'config.app.form.view-fields.displayName.label': '显示名称',
    'config.app.form.view-fields.nowrap.title': '换行设置',
    'config.app.form.view-fields.nowrap.description':
      '仅在设置了字段宽度时有效。如果关闭开关，文本将会换行显示。如果打开开关，文本将不会换行，超出宽度时将显示滚动条。',
    'config.app.form.view-fields.nowrap.label': '不换行显示单元格内的文本',
    'config.app.form.view-type.title': '显示类型设置',
    'config.app.form.view-type.description.1':
      '设置记录的显示形式。如果选择卡片类型，将从显示字段中引用第一个附件字段作为图片。',
    'config.app.form.view-type.label': '显示类型',
    'config.app.form.view-type.table': '表格形式',
    'config.app.form.view-type.card': '卡片形式',
    'config.app.form.isViewTypeControlEnabled.description':
      '如果启用此设置，将显示一个表单，可以更改列表的显示类型。',
    'config.app.form.isViewTypeControlEnabled.label': '允许从列表中更改显示类型',
    'config.app.form.paginationChunk.label': '每页显示记录数',
    'config.app.form.isPaginationChunkControlShown.description':
      '如果启用此设置，将显示一个表单，可以更改每页显示的记录数。',
    'config.app.form.isPaginationChunkControlShown.label': '允许从列表中更改显示记录数',
    'config.app.form.pagination.title': '分页设置',
    'config.app.form.pagination.description.1':
      '可以更改每页显示的记录数。在低规格环境中，通过减少显示记录数可以提高性能。',
    'config.app.form.sortCriteria.title': '列表排序条件设置',
    'config.app.form.isViewSortConditionEnabled.description':
      '设置是否将目标列表的排序条件应用于插件列表。如果禁用此设置，插件列表将始终从最新记录开始显示。',
    'config.app.form.isViewSortConditionEnabled.label': '启用列表排序条件',
    'config.app.form.isSortable.title': '项目排序设置',
    'config.app.form.isSortable.description':
      '如果启用此设置，可以通过点击列表标题对记录进行升序或降序排序。某些字段类型可能无法排序。',
    'config.app.form.isSortable.label': '启用项目排序',
    'config.app.form.csvExport.title': 'CSV导出设置',
    'config.app.form.csvExport.description':
      '如果启用此设置，列表中将显示CSV导出按钮。导出的列表将根据搜索表单中输入的值进行筛选。请注意，与kintone标准的CSV导出功能不兼容。',
    'config.app.form.isCsvDownloadButtonHidden.label': '禁用CSV导出功能',
    'config.app.form.editFeatures.title': '编辑功能设置',
    'config.app.form.isEditable.description':
      '除部分字段外，可以从列表中编辑记录的各个字段。只有对记录具有编辑权限的用户才能进行编辑。',
    'config.app.form.isEditable.label': '启用列表编辑',
    'config.app.form.isEditorControlEnabled.title': '编辑功能限制',
    'config.app.form.isEditorControlEnabled.description':
      '除了应用标准权限设置外，还可以设置插件独有的编辑权限。如果启用此设置，除指定用户外，其他用户将无法使用插件的编辑功能。不会影响kintone标准的详细页面编辑。',
    'config.app.form.isEditorControlEnabled.label': '限制可编辑用户',
    'config.app.form.editors.title': '可编辑用户',
    'config.app.form.editors.description':
      '设置可编辑的用户。只有指定的用户、组和组织才能使用插件的编辑功能。不会影响kintone标准的记录编辑功能。',
    'config.form.user.type.user': '用户',
    'config.form.user.type.group': '组',
    'config.form.user.type.organization': '组织',
    'config.form.user.label.user': '用户名',
    'config.form.user.label.group': '组名',
    'config.form.user.label.organization': '组织名',
    'config.form.permission.scope': '权限范围',
    'config.app.form.deleteFeatures.title': '删除功能设置',
    'config.app.form.isDeletable.description':
      '可以从列表中删除记录。只有对记录具有删除权限的用户才能进行删除。',
    'config.app.form.isDeletable.label': '启用列表删除',
    'config.app.form.isDeleterControlEnabled.title': '删除功能限制',
    'config.app.form.isDeleterControlEnabled.description':
      '除了应用标准权限设置外，还可以设置插件独有的删除权限。如果启用此设置，除指定用户外，其他用户将无法使用插件的删除功能。不会影响kintone标准的删除功能。',
    'config.app.form.isDeleterControlEnabled.label': '限制可删除用户',
    'config.app.form.deleters.title': '可删除用户',
    'config.app.form.deleters.description':
      '设置可删除的用户。只有指定的用户、组和组织才能使用插件的删除功能。不会影响kintone标准的记录删除功能。',
    'config.app.form.extractedInputs.title': '附加搜索表单',
    'config.app.form.extractedInputs.description':
      '除了插件标准的全字段搜索表单外，还可以添加仅针对特定字段的搜索表单。添加的搜索表单可以与全字段搜索表单一起使用。',
    'config.app.form.extractedInputs.type.label': '搜索类型',
    'config.app.form.extractedInputs.type.text': '文本',
    'config.app.form.extractedInputs.type.dropdown': '下拉菜单',
    'config.app.form.extractedInputs.type.date': '日期',
    'config.app.form.extractedInputs.type.month': '月份',
    'config.app.form.extractedInputs.type.year': '年份',
    'config.app.form.extractedInputs.fieldCode.label': '目标字段',
    'config.app.form.extractedInputs.tooltip.addField': '添加显示字段',
    'config.app.form.extractedInputs.tooltip.deleteField': '删除此显示字段',
    'config.app.form.advancedSettings.title': '高级选项',
    'config.app.form.fuzzySearch.title': '模糊搜索设置',
    'config.app.form.isCaseSensitive.label': '筛选时区分字母大小写',
    'config.app.form.isKatakanaSensitive.label': '筛选时区分片假名和平假名',
    'config.app.form.isHankakuKatakanaSensitive.label': '筛选时区分半角片假名和全角片假名',
    'config.app.form.isZenkakuEisujiSensitive.label': '筛选时区分全角英数字和半角英数字',
    'config.app.form.pageTransition.title': '页面跳转设置',
    'config.app.form.isOpenInNewTab.label': '在新标签页中打开记录详细页面',
    'config.app.form.joinConditions.title': 'JOIN - 与其他应用的连接条件设置',
    'config.app.form.joinConditions.description':
      '可以基于特定键引用其他应用的记录。启用连接设置后，可以在"表格中显示字段的设置"中添加连接应用的字段。在当前版本中，每个记录将引用与键信息匹配的第一个记录。',

    'config.app.form.createViewButton.label': '创建新列表',
    'config.app.toast.createView': '已创建列表',
    'config.app.toast.createViewFailed': '创建列表失败',
    'config.app.form.importViewFieldsButton.label': '从kintone标准列表导入',
    'config.app.form.importViewFields.dialog.title': '选择要导入字段信息的列表',

    'config.error.appInfoRetrievalFailedError': '获取应用信息失败',
    'config.error.root-not-found': `插件的HTML中不存在根元素。要渲染插件设置，需要一个id="settings"的元素。`,
    'config.app.sidebar.append-button.label': '新设置',
    'config.app.sidebar.label.heading': '设置',
    'config.app.sidebar.label.default': '未设置',
    'config.app.sidebar.toast.delete': '已删除设置信息',
    'config.app.sidebar.toast.copy': '已复制设置信息',
    'config.app.sidebar.toast.paste': '已粘贴设置信息',
    'config.app.sidebar.toast.paste.failure': '设置信息格式不正确',
    'config.app.sidebar.toast.paste.error.validation': '设置信息格式不正确',

    'config.toast.save': '已保存设置',
    'config.toast.reset': '已重置设置',
    'config.toast.import': '已导入设置信息',
    'config.toast.export': '已导出插件设置信息',
    'config.error.import': '导入设置信息失败，请检查文件是否有误',
    'config.error.export': '导出插件设置信息失败。请联系插件开发者。',

    'desktop.app.empty.title': '未找到符合条件的记录。',
    'desktop.app.empty.description.1': '除了输入的搜索条件，还应用了列表的筛选条件。',
    'desktop.app.empty.description.2': '如果找不到您要找的记录，请检查筛选条件。',
    'desktop.app.editor.title': '编辑记录',
    'desktop.app.editor.save': '保存',
    'desktop.app.editor.cancel': '取消',
    'desktop.app.editor.lookup.success': '已从引用源获取数据',
    'desktop.app.toast.recordUpdated': '记录已更新',
    'desktop.app.toast.partialRecordUpdated': '记录已更新，但{0}条记录无法更新（{1}）',
    'desktop.app.toast.recordUpdateFailed': '记录更新失败',
    'desktop.app.toast.recordUpdateFailedWithMessage': '记录更新失败（{0}）',
    'desktop.app.toast.recordDeleted': '记录已删除',
    'desktop.app.toast.recordDeleteFailed': '记录删除失败',
    'desktop.app.toast.csvExport': '已导出CSV',
    'desktop.app.toast.csvExportFailed': 'CSV导出失败',
    'desktop.app.toast.pluginConditionRetrievalError': '获取插件设置信息失败',
    'desktop.app.toast.recordNotFound': '由于目标记录不存在，无法导出CSV。',
    'desktop.app.tooltip.csvExport': '根据当前搜索条件导出CSV文件',
    'desktop.error.domainCursorCreationLimitReachedError':
      '已达到当前域的游标创建上限。请稍后再试。',
    'desktop.error.appInfoRetrievalFailedError': '获取应用信息失败',
    'desktop.error.unknownError': '发生错误。请稍后再试。',

    'common.auth.serverError': '发生服务器错误。请联系管理员。',
    'common.auth.licenseExpired': '许可证已过期。',
    'common.auth.licenseInvalid': '许可证无效',
  },
  /** 中国語（繁体字） */
  'zh-TW': {
    'common.close': '關閉',
    'common.autocomplete.options.appName': '應用: {0}',
    'common.autocomplete.options.fieldCode': '代碼: {0}',

    'common.loading.retry': '重試中',
    'common.error.occurred': '發生錯誤',
    'common.error.hints': '錯誤解決提示',
    'common.error.retry.title': '重試處理',
    'common.error.retry.description': '點擊下方的「重試」按鈕重新執行處理。',
    'common.error.retry.button': '重試',
    'common.error.latestVersion.title': '安裝最新版本的插件',
    'common.error.latestVersion.description1': '安裝最新版本的插件可能會解決問題。',
    'common.error.latestVersion.description2': '從下方連結下載最新版本並重新安裝。',
    'common.error.latestVersion.button': '下載最新版本',
    'common.error.updateSettings.title': '更新插件設定',
    'common.error.updateSettings.description':
      '保存的插件設定可能已過時。請按照以下步驟更新插件設定。',
    'common.error.updateSettings.steps.1': '打開插件設定畫面',
    'common.error.updateSettings.steps.2': '不更改設定，點擊「保存」按鈕',
    'common.error.updateSettings.steps.3': '更新應用',
    'common.error.updateSettings.steps.4': '檢查操作是否有改善',
    'common.error.updateSettings.steps.5': '-- 如果操作沒有改善，請執行以下附加步驟 --',
    'common.error.updateSettings.steps.6': '再次打開插件設定畫面，點擊設定畫面右下角的重置按鈕',
    'common.error.updateSettings.steps.7': '進行必要設定，點擊「保存」按鈕',
    'common.error.updateSettings.steps.8': '更新應用',
    'common.error.updateSettings.steps.9': '檢查操作是否有改善',
    'common.error.inquiry.title': '聯繫我們',
    'common.error.inquiry.description':
      '如果嘗試上述所有方法後問題仍然存在，請聯繫開發者並提供以下錯誤詳情。',
    'common.error.inquiry.button': '聯繫',
    'common.error.pluginId': '插件ID',
    'common.error.pluginName': '插件名稱',
    'common.error.version': '版本',
    'common.error.errorMessage': '錯誤訊息',
    'common.error.unknownError': '未知錯誤',
    'common.error.errorStack': '錯誤堆疊',
    'common.error.errorDetails': '錯誤詳情',

    'common.config.resetButton.tooltip': '重置插件設定',
    'common.config.resetDialog.title': '重置設定',
    'common.config.resetDialog.message': '這將把插件設定重置為初始狀態。您確定嗎？',
    'common.config.resetDialog.execute': '執行',
    'common.config.resetDialog.cancel': '取消',
    'common.config.resetSuccess': '設定重置成功',

    'common.userType.user': '用戶',
    'common.userType.group': '組',
    'common.userType.organization': '組織',
    'common.userType.userName': '用戶名',
    'common.userType.groupName': '組名',
    'common.userType.organizationName': '組織名',

    'common.tooltip.recordDetail': '記錄詳情',
    'common.tooltip.recordEdit': '編輯記錄',
    'common.tooltip.recordDelete': '刪除記錄',
    'common.tooltip.lookupCopyField': '此字段無法編輯，因為它設置為查找字段的複製目標',
    'common.tooltip.noEditPermission': '無編輯權限',
    'common.tooltip.add': '添加',
    'common.tooltip.delete': '刪除',

    'common.cache.inProgress': '緩存正在進行中。可能仍有符合條件的記錄存在。',
    'common.rows': '{0}行',
    'common.reload': '重新載入',

    'config.app.root.loading': '正在等待畫面渲染',
    'config.app.config.loading': '正在獲取設置信息',
    'config.app.form.view-id.title': '顯示表格的列表設置',
    'config.app.form.view-id.description.1':
      '請選擇要實現搜索功能的列表。可選擇的列表僅限於顯示形式為「自定義」的列表。要更改此設置，需要系統管理權限。',
    'config.app.form.view-id.label': '列表名稱',
    'config.app.form.view-fields.title': '設置表格中顯示的字段',
    'config.app.form.view-fields.description.1':
      '設置在列表中顯示的字段。搜索表單中輸入的值僅針對此設置中選擇的字段進行搜索。',
    'config.app.form.view-fields.description.2':
      '如果指定的顯示寬度低於標題的字寬，顯示可能會被截斷。如果將顯示寬度設置為0，寬度將根據內容自動調整。',
    'config.app.form.view-fields.fieldCode.label': '目標字段',
    'config.app.form.view-fields.width.label': '顯示寬度',
    'config.app.form.view-fields.tooltip.showDetail': '打開此字段的詳細設置',
    'config.app.form.view-fields.tooltip.addField': '添加顯示字段',
    'config.app.form.view-fields.tooltip.deleteField': '刪除此顯示字段',
    'config.app.form.view-fields.detailSetting.title': '{0} 的詳細設置',
    'config.app.form.view-fields.isEditable.title': '在編輯畫面中顯示',
    'config.app.form.view-fields.isEditable.description': '如果關閉開關，則不會在編輯畫面中顯示。',
    'config.app.form.view-fields.isEditable.label': '在編輯畫面中顯示',
    'config.app.form.view-fields.displayName.title': '顯示名稱',
    'config.app.form.view-fields.displayName.description':
      '如果設置了值，將顯示此值而不是標準字段名稱。',
    'config.app.form.view-fields.displayName.label': '顯示名稱',
    'config.app.form.view-fields.nowrap.title': '換行設置',
    'config.app.form.view-fields.nowrap.description':
      '僅在設置了字段寬度時有效。如果關閉開關，超出標準寬度的文本將換行。如果打開開關，文本將不換行，超出標準寬度時將顯示滾動條。',
    'config.app.form.view-fields.nowrap.label': '不換行顯示單元格內的文本',
    'config.app.form.view-type.title': '顯示類型設置',
    'config.app.form.view-type.description.1':
      '設置如何顯示記錄。如果選擇卡片類型，將從顯示字段中參考第一個附件字段作為圖像。',
    'config.app.form.view-type.label': '顯示類型',
    'config.app.form.view-type.table': '表格形式',
    'config.app.form.view-type.card': '卡片形式',
    'config.app.form.isViewTypeControlEnabled.description':
      '如果啟用此設置，將顯示一個表單來更改列表的顯示類型。',
    'config.app.form.isViewTypeControlEnabled.label': '允許從列表中更改顯示類型',
    'config.app.form.paginationChunk.label': '每頁顯示的記錄數',
    'config.app.form.isPaginationChunkControlShown.description':
      '如果啟用此設置，將顯示一個表單來更改每頁顯示的記錄數。',
    'config.app.form.isPaginationChunkControlShown.label': '允許從列表中更改顯示記錄數',
    'config.app.form.pagination.title': '分頁設置',
    'config.app.form.pagination.description.1':
      '可以更改每頁顯示的記錄數。在低規格環境中，減少顯示記錄數可能會提高性能。',
    'config.app.form.sortCriteria.title': '列表排序條件設置',
    'config.app.form.isViewSortConditionEnabled.description':
      '設置是否將目標列表中設置的排序條件應用於插件的列表。如果禁用此設置，插件的列表將始終從最新記錄開始顯示。',
    'config.app.form.isViewSortConditionEnabled.label': '啟用列表排序條件',
    'config.app.form.isSortable.title': '項目排序設置',
    'config.app.form.isSortable.description':
      '如果啟用此設置，可以通過點擊列表標題來按升序或降序排序記錄。某些字段類型可能無法排序。',
    'config.app.form.isSortable.label': '啟用項目排序',
    'config.app.form.csvExport.title': 'CSV導出設置',
    'config.app.form.csvExport.description':
      '如果啟用此設置，列表中將顯示CSV導出按鈕。導出的列表將根據搜索表單中輸入的值進行篩選。請注意，與kintone標準的CSV導出功能不兼容。',
    'config.app.form.isCsvDownloadButtonHidden.label': '禁用CSV導出功能',
    'config.app.form.editFeatures.title': '編輯功能設置',
    'config.app.form.isEditable.description':
      '除部分字段外，可以從列表中編輯記錄的各個字段。只有對記錄具有編輯權限的用戶才能進行編輯。',
    'config.app.form.isEditable.label': '啟用列表編輯',
    'config.app.form.isEditorControlEnabled.title': '編輯功能限制',
    'config.app.form.isEditorControlEnabled.description':
      '除了應用的標準權限設置外，還可以設置插件獨有的編輯權限。如果啟用此設置，未指定的用戶將無法使用插件的編輯功能。這不會影響kintone標準的詳細畫面編輯。',
    'config.app.form.isEditorControlEnabled.label': '限制可編輯的用戶',
    'config.app.form.editors.title': '可編輯的用戶',
    'config.app.form.editors.description':
      '設置可編輯的用戶。只有指定的用戶、組或組織才能使用插件的編輯功能。這不會影響kintone標準的記錄編輯功能。',
    'config.form.user.type.user': '用戶',
    'config.form.user.type.group': '組',
    'config.form.user.type.organization': '組織',
    'config.form.user.label.user': '用戶名',
    'config.form.user.label.group': '組名',
    'config.form.user.label.organization': '組織名',
    'config.form.permission.scope': '權限範圍',
    'config.app.form.deleteFeatures.title': '刪除功能設置',
    'config.app.form.isDeletable.description':
      '可以從列表中刪除記錄。只有對記錄具有刪除權限的用戶才能進行刪除。',
    'config.app.form.isDeletable.label': '啟用列表刪除',
    'config.app.form.isDeleterControlEnabled.title': '刪除功能限制',
    'config.app.form.isDeleterControlEnabled.description':
      '除了應用的標準權限設置外，還可以設置插件獨有的刪除權限。如果啟用此設置，未指定的用戶將無法使用插件的刪除功能。這不會影響kintone標準的刪除功能。',
    'config.app.form.isDeleterControlEnabled.label': '限制可刪除的用戶',
    'config.app.form.deleters.title': '可刪除的用戶',
    'config.app.form.deleters.description':
      '設置可刪除的用戶。只有指定的用戶、組或組織才能使用插件的刪除功能。這不會影響kintone標準的記錄刪除功能。',
    'config.app.form.extractedInputs.title': '附加搜索表單',
    'config.app.form.extractedInputs.description':
      '除了插件標準的全字段搜索表單外，還可以添加僅針對特定字段的搜索表單。添加的搜索表單可以與全字段搜索表單一起使用。',
    'config.app.form.extractedInputs.type.label': '搜索類型',
    'config.app.form.extractedInputs.type.text': '文本',
    'config.app.form.extractedInputs.type.dropdown': '下拉選單',
    'config.app.form.extractedInputs.type.date': '日期',
    'config.app.form.extractedInputs.type.month': '月份',
    'config.app.form.extractedInputs.type.year': '年份',
    'config.app.form.extractedInputs.fieldCode.label': '目標字段',
    'config.app.form.extractedInputs.tooltip.addField': '添加顯示字段',
    'config.app.form.extractedInputs.tooltip.deleteField': '刪除此顯示字段',
    'config.app.form.advancedSettings.title': '高級選項',
    'config.app.form.fuzzySearch.title': '模糊搜索設置',
    'config.app.form.isCaseSensitive.label': '篩選時區分字母大小寫',
    'config.app.form.isKatakanaSensitive.label': '篩選時區分片假名和平假名',
    'config.app.form.isHankakuKatakanaSensitive.label': '篩選時區分半角片假名和全角片假名',
    'config.app.form.isZenkakuEisujiSensitive.label': '篩選時區分全角英數字和半角英數字',
    'config.app.form.pageTransition.title': '頁面跳轉設置',
    'config.app.form.isOpenInNewTab.label': '在新標籤頁中打開記錄詳細畫面',
    'config.app.form.joinConditions.title': 'JOIN - 與其他應用的結合條件設置',
    'config.app.form.joinConditions.description':
      '可以基於特定鍵參考其他應用的記錄。啟用結合設置後，可以在「設置表格中顯示的字段」中添加結合應用的字段。在當前版本中，將參考每個記錄中鍵信息匹配的第一個記錄。',

    'config.app.form.createViewButton.label': '創建新列表',
    'config.app.toast.createView': '已創建列表',
    'config.app.toast.createViewFailed': '創建列表失敗',
    'config.app.form.importViewFieldsButton.label': '從kintone標準列表導入',
    'config.app.form.importViewFields.dialog.title': '選擇要導入字段信息的列表',

    'config.error.appInfoRetrievalFailedError': '獲取應用信息失敗',
    'config.error.root-not-found': `插件的HTML中不存在根元素。要渲染插件設置，需要一個id="settings"的元素。`,
    'config.app.sidebar.append-button.label': '新設置',
    'config.app.sidebar.label.heading': '設置',
    'config.app.sidebar.label.default': '未設置',
    'config.app.sidebar.toast.delete': '已刪除設置信息',
    'config.app.sidebar.toast.copy': '已複製設置信息',
    'config.app.sidebar.toast.paste': '已粘貼設置信息',
    'config.app.sidebar.toast.paste.failure': '設置信息格式不正確',
    'config.app.sidebar.toast.paste.error.validation': '設置信息格式不正確',

    'config.toast.save': '已保存設置',
    'config.toast.reset': '已重置設置',
    'config.toast.import': '已導入設置信息',
    'config.toast.export': '已導出插件設置信息',
    'config.error.import': '導入設置信息失敗，請檢查文件是否有誤',
    'config.error.export': '導出插件設置信息失敗。請聯繫插件開發者。',

    'desktop.app.empty.title': '未找到符合條件的記錄。',
    'desktop.app.empty.description.1': '除了輸入的搜索條件外，還應用了列表的篩選條件。',
    'desktop.app.empty.description.2': '如果找不到您要查找的記錄，請檢查篩選條件。',
    'desktop.app.editor.title': '編輯記錄',
    'desktop.app.editor.save': '保存',
    'desktop.app.editor.cancel': '取消',
    'desktop.app.toast.recordUpdated': '已更新記錄',
    'desktop.app.toast.recordUpdateFailed': '更新記錄失敗',
    'desktop.app.toast.csvExport': '已導出CSV',
    'desktop.app.toast.csvExportFailed': '導出CSV失敗',
    'desktop.app.toast.pluginConditionRetrievalError': '獲取插件設置信息失敗',
    'desktop.app.toast.recordNotFound': '由於不存在目標記錄，無法導出CSV。',
    'desktop.app.tooltip.csvExport': '根據當前搜索條件導出CSV文件',
    'desktop.error.domainCursorCreationLimitReachedError':
      '已達到當前域中光標創建數量的上限。請稍後再試。',
    'desktop.error.appInfoRetrievalFailedError': '獲取應用信息失敗',
    'desktop.error.unknownError': '發生錯誤。請稍後再試。',

    'common.auth.serverError': '發生伺服器錯誤。請聯繫管理員。',
    'common.auth.licenseExpired': '授權已過期。',
    'common.auth.licenseInvalid': '授權無效',
  },
  'pt-BR': {
    'common.close': 'Fechar',
    'common.autocomplete.options.appName': 'App: {0}',
    'common.autocomplete.options.fieldCode': 'Código: {0}',

    'common.loading.retry': 'Tentando novamente',
    'common.error.occurred': 'Ocorreu um erro',
    'common.error.hints': 'Dicas para resolução de erros',
    'common.error.retry.title': 'Tentar novamente o processo',
    'common.error.retry.description':
      'Clique no botão "Tentar novamente" abaixo para executar o processo novamente.',
    'common.error.retry.button': 'Tentar novamente',
    'common.error.latestVersion.title': 'Instalar a versão mais recente do plugin',
    'common.error.latestVersion.description1':
      'Instalar a versão mais recente do plugin pode resolver o problema.',
    'common.error.latestVersion.description2':
      'Baixe a versão mais recente do link abaixo e reinstale.',
    'common.error.latestVersion.button': 'Baixar Versão Mais Recente',
    'common.error.updateSettings.title': 'Atualizar configurações do plugin',
    'common.error.updateSettings.description':
      'As configurações salvas do plugin podem estar desatualizadas. Atualize as configurações do plugin seguindo estas etapas.',
    'common.error.updateSettings.steps.1': 'Abrir a tela de configurações do plugin',
    'common.error.updateSettings.steps.2': 'Clicar no botão "Salvar" sem alterar as configurações',
    'common.error.updateSettings.steps.3': 'Atualizar o app',
    'common.error.updateSettings.steps.4': 'Verificar se a operação melhorou',
    'common.error.updateSettings.steps.5':
      '-- Se a operação não melhorou, siga estas etapas adicionais --',
    'common.error.updateSettings.steps.6':
      'Abrir novamente a tela de configurações do plugin e clicar no botão de reset no canto inferior direito',
    'common.error.updateSettings.steps.7':
      'Fazer as configurações necessárias e clicar no botão "Salvar"',
    'common.error.updateSettings.steps.8': 'Atualizar o app',
    'common.error.updateSettings.steps.9': 'Verificar se a operação melhorou',
    'common.error.inquiry.title': 'Contato',
    'common.error.inquiry.description':
      'Se o problema persistir após tentar todas as opções acima, entre em contato com o desenvolvedor com os detalhes do erro abaixo.',
    'common.error.inquiry.button': 'Entrar em contato',
    'common.error.pluginId': 'ID do Plugin',
    'common.error.pluginName': 'Nome do Plugin',
    'common.error.version': 'Versão',
    'common.error.errorMessage': 'Mensagem de Erro',
    'common.error.unknownError': 'Erro Desconhecido',
    'common.error.errorStack': 'Stack de Erro',
    'common.error.errorDetails': 'Detalhes do Erro',

    'common.config.resetButton.tooltip': 'Redefinir configurações do plugin',
    'common.config.resetDialog.title': 'Redefinir Configurações',
    'common.config.resetDialog.message':
      'Isso redefinirá as configurações do plugin para o estado inicial. Tem certeza?',
    'common.config.resetDialog.execute': 'Executar',
    'common.config.resetDialog.cancel': 'Cancelar',
    'common.config.resetSuccess': 'Configurações redefinidas com sucesso',

    'common.userType.user': 'Usuário',
    'common.userType.group': 'Grupo',
    'common.userType.organization': 'Organização',
    'common.userType.userName': 'Nome de Usuário',
    'common.userType.groupName': 'Nome do Grupo',
    'common.userType.organizationName': 'Nome da Organização',

    'common.tooltip.recordDetail': 'Detalhes do Registro',
    'common.tooltip.recordEdit': 'Editar Registro',
    'common.tooltip.recordDelete': 'Excluir Registro',
    'common.tooltip.lookupCopyField':
      'Este campo não pode ser editado porque está configurado como destino de cópia de campo de lookup',
    'common.tooltip.noEditPermission': 'Sem permissão de edição',

    'common.cache.inProgress':
      'Cache em progresso. Ainda podem existir registros que correspondem aos critérios.',
    'common.rows': '{0} linhas',
    'common.reload': 'Recarregar',

    'config.app.root.loading': 'Aguardando a renderização da tela',
    'config.app.config.loading': 'Obtendo informações de configuração',
    'config.app.form.view-id.title': 'Configurações da lista para exibir a tabela',
    'config.app.form.view-id.description.1':
      'Por favor, selecione a lista para implementar a função de pesquisa. Apenas listas com formato de exibição "Personalizado" podem ser selecionadas. Privilégios de administrador do sistema são necessários para alterar esta configuração.',
    'config.app.form.view-id.label': 'Nome da lista',
    'config.app.form.view-id.error.title':
      'Falha ao obter a lista. Por favor, verifique as configurações do kintone.',
    'config.app.form.view-fields.title': 'Configurações de campos exibidos na tabela',
    'config.app.form.view-fields.description.1':
      'Configure os campos a serem exibidos na lista. Apenas os campos selecionados nesta configuração serão alvo dos valores de pesquisa inseridos no formulário de pesquisa.',
    'config.app.form.view-fields.description.2':
      'Se você especificar uma largura de exibição menor que a largura dos caracteres do cabeçalho, a exibição pode ser cortada. Se você definir a largura de exibição como 0, a largura será ajustada automaticamente para o conteúdo.',
    'config.app.form.view-fields.fieldCode.label': 'Campo alvo',
    'config.app.form.view-fields.width.label': 'Largura de exibição',
    'config.app.form.view-fields.tooltip.showDetail':
      'Abrir configurações detalhadas para este campo',
    'config.app.form.view-fields.tooltip.addField': 'Adicionar campo de exibição',
    'config.app.form.view-fields.tooltip.deleteField': 'Excluir este campo de exibição',
    'config.app.form.view-fields.detailSetting.title': 'Configurações detalhadas de {0}',
    'config.app.form.view-fields.isEditable.title': 'Exibição na tela de edição',
    'config.app.form.view-fields.isEditable.description':
      'Se o interruptor estiver desligado, não será exibido na tela de edição.',
    'config.app.form.view-fields.isEditable.label': 'Exibir na tela de edição',
    'config.app.form.view-fields.displayName.title': 'Nome de exibição',
    'config.app.form.view-fields.displayName.description':
      'Se um valor for definido, este valor será exibido em vez do nome do campo padrão.',
    'config.app.form.view-fields.displayName.label': 'Nome de exibição',
    'config.app.form.view-fields.nowrap.title': 'Configurações de quebra de linha',
    'config.app.form.view-fields.nowrap.description':
      'Só é efetivo se a largura do campo estiver definida. Se o interruptor estiver desligado, o texto que não couber na largura padrão será quebrado. Se o interruptor estiver ligado, o texto não será quebrado e uma barra de rolagem será exibida se não couber na largura padrão.',
    'config.app.form.view-fields.nowrap.label': 'Não quebrar texto na célula',
    'config.app.form.view-type.title': 'Configurações do tipo de exibição',
    'config.app.form.view-type.description.1':
      'Configure como os registros serão exibidos. Se você selecionar o tipo de cartão, o primeiro campo de anexo entre os campos exibidos será referenciado para imagem.',
    'config.app.form.view-type.label': 'Tipo de exibição',
    'config.app.form.view-type.table': 'Formato de tabela',
    'config.app.form.view-type.card': 'Formato de cartão',
    'config.app.form.isViewTypeControlEnabled.description':
      'Se esta configuração estiver habilitada, um formulário será exibido permitindo alterar o tipo de exibição da lista.',
    'config.app.form.isViewTypeControlEnabled.label': 'Permitir alterar tipo de exibição da lista',
    'config.app.form.paginationChunk.label': 'Número de registros exibidos por página',
    'config.app.form.isPaginationChunkControlShown.description':
      'Se esta configuração estiver habilitada, um formulário será exibido permitindo alterar o número de registros exibidos por página.',
    'config.app.form.isPaginationChunkControlShown.label':
      'Permitir alterar número de registros exibidos da lista',
    'config.app.form.pagination.title': 'Configurações de paginação',
    'config.app.form.pagination.description.1':
      'Você pode alterar o número de registros exibidos por página. Em ambientes de baixa especificação, reduzir o número de registros exibidos pode melhorar o desempenho.',
    'config.app.form.sortCriteria.title': 'Configurações de critérios de ordenação da lista',
    'config.app.form.isViewSortConditionEnabled.description':
      'Configure se os critérios de ordenação definidos na lista alvo também se aplicam à lista do plugin. Se esta configuração estiver desabilitada, a lista do plugin sempre exibirá os registros mais recentes primeiro.',
    'config.app.form.isViewSortConditionEnabled.label': 'Habilitar critérios de ordenação da lista',
    'config.app.form.isSortable.title': 'Configurações de ordenação de itens',
    'config.app.form.isSortable.description':
      'Se esta configuração estiver habilitada, você pode ordenar registros em ordem crescente ou decrescente clicando no cabeçalho da lista. Alguns tipos de campo podem não ser ordenáveis.',
    'config.app.form.isSortable.label': 'Habilitar ordenação de itens',
    'config.app.form.csvExport.title': 'Configurações de exportação CSV',
    'config.app.form.csvExport.description':
      'Se esta configuração estiver habilitada, um botão de exportação CSV será exibido na lista. A lista exportada será filtrada pelos valores inseridos no formulário de pesquisa. Note que não é compatível com a função de exportação CSV padrão do kintone.',
    'config.app.form.isCsvDownloadButtonHidden.label': 'Desabilitar função de exportação CSV',
    'config.app.form.editFeatures.title': 'Configurações de recursos de edição',
    'config.app.form.isEditable.description':
      'Exceto alguns campos, você pode editar cada campo do registro da lista. Apenas usuários com permissões de edição para o registro podem editar.',
    'config.app.form.isEditable.label': 'Habilitar edição na lista',
    'config.app.form.isEditorControlEnabled.title': 'Restrições de recursos de edição',
    'config.app.form.isEditorControlEnabled.description':
      'Além das configurações de permissão padrão do app, você pode definir permissões de edição exclusivas do plugin. Se esta configuração estiver habilitada, usuários não especificados não poderão usar os recursos de edição do plugin. Não afeta a edição na tela de detalhes padrão do kintone.',
    'config.app.form.isEditorControlEnabled.label': 'Restringir usuários que podem editar',
    'config.app.form.editors.title': 'Usuários que podem editar',
    'config.app.form.editors.description':
      'Configure os usuários que podem editar. Apenas os usuários, grupos e organizações especificados podem usar os recursos de edição do plugin. Não afeta a função de edição de registros padrão do kintone.',
    'config.form.user.type.user': 'Usuário',
    'config.form.user.type.group': 'Grupo',
    'config.form.user.type.organization': 'Organização',
    'config.form.user.label.user': 'Nome do Usuário',
    'config.form.user.label.group': 'Nome do Grupo',
    'config.form.user.label.organization': 'Nome da Organização',
    'config.form.permission.scope': 'Escopo de Permissão',
    'config.app.form.deleteFeatures.title': 'Configurações de recursos de exclusão',
    'config.app.form.isDeletable.description':
      'Você pode excluir registros da lista. Apenas usuários com permissões de exclusão para o registro podem excluir.',
    'config.app.form.isDeletable.label': 'Habilitar exclusão na lista',
    'config.app.form.isDeleterControlEnabled.title': 'Restrições de recursos de exclusão',
    'config.app.form.isDeleterControlEnabled.description':
      'Além das configurações de permissão padrão do app, você pode definir permissões de exclusão exclusivas do plugin. Se esta configuração estiver habilitada, usuários não especificados não poderão usar os recursos de exclusão do plugin. Não afeta a função de exclusão padrão do kintone.',
    'config.app.form.isDeleterControlEnabled.label': 'Restringir usuários que podem excluir',
    'config.app.form.deleters.title': 'Usuários que podem excluir',
    'config.app.form.deleters.description':
      'Configure os usuários que podem excluir. Apenas os usuários, grupos e organizações especificados podem usar os recursos de exclusão do plugin. Não afeta a função de exclusão de registros padrão do kintone.',
    'config.app.form.extractedInputs.title': 'Formulário de pesquisa adicional',
    'config.app.form.extractedInputs.description':
      'Além do formulário de pesquisa padrão do plugin que visa todos os campos, você pode adicionar formulários de pesquisa que visam apenas campos específicos. Os formulários de pesquisa adicionados podem ser usados em conjunto com o formulário de pesquisa que visa todos os campos.',
    'config.app.form.extractedInputs.type.label': 'Tipo de pesquisa',
    'config.app.form.extractedInputs.type.text': 'Texto',
    'config.app.form.extractedInputs.type.dropdown': 'Dropdown',
    'config.app.form.extractedInputs.type.date': 'Data',
    'config.app.form.extractedInputs.type.month': 'Mês',
    'config.app.form.extractedInputs.type.year': 'Ano',
    'config.app.form.extractedInputs.fieldCode.label': 'Campo alvo',
    'config.app.form.extractedInputs.tooltip.addField': 'Adicionar campo de exibição',
    'config.app.form.extractedInputs.tooltip.deleteField': 'Excluir este campo de exibição',
    'config.app.form.advancedSettings.title': 'Opções avançadas',
    'config.app.form.fuzzySearch.title': 'Configurações de pesquisa difusa',
    'config.app.form.isCaseSensitive.label': 'Distinguir entre maiúsculas e minúsculas ao filtrar',
    'config.app.form.isKatakanaSensitive.label': 'Distinguir entre Katakana e Hiragana ao filtrar',
    'config.app.form.isHankakuKatakanaSensitive.label':
      'Distinguir entre Katakana de meia largura e largura completa ao filtrar',
    'config.app.form.isZenkakuEisujiSensitive.label':
      'Distinguir entre caracteres alfanuméricos de largura completa e meia largura ao filtrar',
    'config.app.form.pageTransition.title': 'Configurações de transição de página',
    'config.app.form.isOpenInNewTab.label': 'Abrir tela de detalhes do registro em nova aba',
    'config.app.form.joinConditions.title':
      'JOIN - Referenciar e atualizar registros de outros apps',
    'config.app.form.joinConditions.description':
      'Você pode referenciar e atualizar registros de outros apps com base em chaves específicas. Ao adicionar uma configuração de junção, você pode adicionar campos do app unido nas "Configurações de campos exibidos na tabela". Na versão atual, o primeiro registro que corresponde às informações da chave para cada registro é referenciado.',

    'config.app.form.createViewButton.label': 'Criar nova lista',
    'config.app.toast.createView': 'Lista criada',
    'config.app.toast.createViewFailed': 'Falha ao criar lista',
    'config.app.form.importViewFieldsButton.label': 'Importar da lista padrão do kintone',
    'config.app.form.importViewFields.dialog.title':
      'Selecione a lista para importar informações de campo',

    'config.error.appInfoRetrievalFailedError': 'Falha ao obter informações do app',
    'config.error.appViewsRetrievalFailedError': 'Falha ao obter informações das listas do app',
    'config.error.root-not-found': `O HTML do plugin não contém um elemento raiz. Um elemento com id="settings" é necessário para renderizar as configurações do plugin.`,
    'config.app.sidebar.append-button.label': 'Nova configuração',
    'config.app.sidebar.label.heading': 'Configurações',
    'config.app.sidebar.label.default': 'Não configurado',
    'config.app.sidebar.toast.delete': 'Informações de configuração excluídas',
    'config.app.sidebar.toast.copy': 'Informações de configuração copiadas',
    'config.app.sidebar.toast.paste': 'Informações de configuração coladas',
    'config.app.sidebar.toast.paste.failure':
      'O formato das informações de configuração está incorreto',
    'config.app.sidebar.toast.paste.error.validation':
      'O formato das informações de configuração está incorreto',

    'config.toast.save': 'Configurações salvas',
    'config.toast.reset': 'Configurações redefinidas',
    'config.toast.import': 'Informações de configuração importadas',
    'config.toast.export': 'Informações de configuração do plugin exportadas',
    'config.error.import':
      'Falha ao importar informações de configuração, verifique se o arquivo está correto',
    'config.error.export':
      'Falha ao exportar informações de configuração do plugin. Entre em contato com o desenvolvedor do plugin.',

    'desktop.app.empty.title': 'Nenhum registro correspondente aos critérios foi encontrado.',
    'desktop.app.empty.description.1':
      'Além das condições de pesquisa inseridas, as condições de filtragem da lista também são aplicadas.',
    'desktop.app.empty.description.2':
      'Se você não conseguir encontrar o registro que procura, verifique as condições de filtragem.',
    'desktop.app.editor.title': 'Editar registro',
    'desktop.app.editor.save': 'Salvar',
    'desktop.app.editor.cancel': 'Cancelar',
    'desktop.app.editor.lookup.success': 'Dados foram obtidos da fonte de referência',
    'desktop.app.toast.recordUpdated': 'Registro atualizado',
    'desktop.app.toast.partialRecordUpdated':
      'Registro atualizado, mas {0} registros não puderam ser atualizados ({1})',
    'desktop.app.toast.recordUpdateFailed': 'Falha ao atualizar registro',
    'desktop.app.toast.recordUpdateFailedWithMessage': 'Falha ao atualizar registro ({0})',
    'desktop.app.toast.recordDeleted': 'Registro excluído',
    'desktop.app.toast.recordDeleteFailed': 'Falha ao excluir registro',
    'desktop.app.toast.csvExport': 'CSV exportado',
    'desktop.app.toast.csvExportFailed': 'Falha ao exportar CSV',
    'desktop.app.toast.pluginConditionRetrievalError':
      'Falha ao obter informações de configuração do plugin',
    'desktop.app.toast.recordNotFound':
      'CSV não pôde ser exportado porque o registro alvo não existe.',
    'desktop.app.tooltip.csvExport': 'Exportar arquivo CSV com condições de pesquisa atuais',
    'desktop.error.domainCursorCreationLimitReachedError':
      'O limite de criação de cursores no domínio que você está usando foi atingido. Tente novamente após algum tempo.',
    'desktop.error.appInfoRetrievalFailedError': 'Falha ao obter informações do app',
    'desktop.error.unknownError': 'Ocorreu um erro. Tente novamente após algum tempo.',

    'common.auth.serverError': 'Ocorreu um erro do servidor. Entre em contato com o administrador.',
    'common.auth.licenseExpired': 'A licença expirou.',
    'common.auth.licenseInvalid': 'A licença é inválida',
  },
  th: {
    'common.close': 'ปิด',
    'common.autocomplete.options.appName': 'แอป: {0}',
    'common.autocomplete.options.fieldCode': 'รหัส: {0}',

    'common.loading.retry': 'กำลังลองใหม่',
    'common.error.occurred': 'เกิดข้อผิดพลาด',
    'common.error.hints': 'คำแนะนำในการแก้ไขข้อผิดพลาด',
    'common.error.retry.title': 'ลองใหม่',
    'common.error.retry.description': 'คลิกปุ่ม "ลองใหม่" ด้านล่างเพื่อทำงานอีกครั้ง',
    'common.error.retry.button': 'ลองใหม่',
    'common.error.latestVersion.title': 'ติดตั้งปลั๊กอินเวอร์ชันล่าสุด',
    'common.error.latestVersion.description1':
      'การติดตั้งปลั๊กอินเวอร์ชันล่าสุดอาจช่วยแก้ไขปัญหาได้',
    'common.error.latestVersion.description2':
      'ดาวน์โหลดเวอร์ชันล่าสุดจากลิงก์ด้านล่างและติดตั้งใหม่',
    'common.error.latestVersion.button': 'ดาวน์โหลดเวอร์ชันล่าสุด',
    'common.error.updateSettings.title': 'อัปเดตการตั้งค่าปลั๊กอิน',
    'common.error.updateSettings.description':
      'การตั้งค่าปลั๊กอินที่บันทึกไว้อาจล้าสมัยแล้ว อัปเดตการตั้งค่าปลั๊กอินโดยทำตามขั้นตอนเหล่านี้',
    'common.error.updateSettings.steps.1': 'เปิดหน้าจอการตั้งค่าปลั๊กอิน',
    'common.error.updateSettings.steps.2': 'คลิกปุ่ม "บันทึก" โดยไม่เปลี่ยนการตั้งค่า',
    'common.error.updateSettings.steps.3': 'อัปเดตแอป',
    'common.error.updateSettings.steps.4': 'ตรวจสอบว่าการทำงานดีขึ้นหรือไม่',
    'common.error.updateSettings.steps.5':
      '-- หากการทำงานไม่ดีขึ้น ให้ทำตามขั้นตอนเพิ่มเติมเหล่านี้ --',
    'common.error.updateSettings.steps.6':
      'เปิดหน้าจอการตั้งค่าปลั๊กอินอีกครั้งและคลิกปุ่มรีเซ็ตที่มุมล่างขวา',
    'common.error.updateSettings.steps.7': 'ทำการตั้งค่าที่จำเป็นและคลิกปุ่ม "บันทึก"',
    'common.error.updateSettings.steps.8': 'อัปเดตแอป',
    'common.error.updateSettings.steps.9': 'ตรวจสอบว่าการทำงานดีขึ้นหรือไม่',
    'common.error.inquiry.title': 'ติดต่อสอบถาม',
    'common.error.inquiry.description':
      'หากปัญหายังคงเกิดขึ้นหลังจากลองทุกวิธีข้างต้นแล้ว โปรดติดต่อนักพัฒนาพร้อมรายละเอียดข้อผิดพลาดด้านล่าง',
    'common.error.inquiry.button': 'ติดต่อ',
    'common.error.pluginId': 'ID ปลั๊กอิน',
    'common.error.pluginName': 'ชื่อปลั๊กอิน',
    'common.error.version': 'เวอร์ชัน',
    'common.error.errorMessage': 'ข้อความแสดงข้อผิดพลาด',
    'common.error.unknownError': 'ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
    'common.error.errorStack': 'Error Stack',
    'common.error.errorDetails': 'รายละเอียดข้อผิดพลาด',

    'common.config.resetButton.tooltip': 'รีเซ็ตการตั้งค่าปลั๊กอิน',
    'common.config.resetDialog.title': 'รีเซ็ตการตั้งค่า',
    'common.config.resetDialog.message':
      'การดำเนินการนี้จะรีเซ็ตการตั้งค่าปลั๊กอินกลับสู่สถานะเริ่มต้น คุณแน่ใจหรือไม่?',
    'common.config.resetDialog.execute': 'ดำเนินการ',
    'common.config.resetDialog.cancel': 'ยกเลิก',
    'common.config.resetSuccess': 'รีเซ็ตการตั้งค่าสำเร็จ',

    'common.userType.user': 'ผู้ใช้',
    'common.userType.group': 'กลุ่ม',
    'common.userType.organization': 'องค์กร',
    'common.userType.userName': 'ชื่อผู้ใช้',
    'common.userType.groupName': 'ชื่อกลุ่ม',
    'common.userType.organizationName': 'ชื่อองค์กร',

    'common.tooltip.recordDetail': 'รายละเอียดเรคคอร์ด',
    'common.tooltip.recordEdit': 'แก้ไขเรคคอร์ด',
    'common.tooltip.recordDelete': 'ลบเรคคอร์ด',
    'common.tooltip.lookupCopyField':
      'ฟิลด์นี้ไม่สามารถแก้ไขได้เนื่องจากตั้งค่าเป็นปลายทางคัดลอกของฟิลด์ lookup',
    'common.tooltip.noEditPermission': 'ไม่มีสิทธิ์แก้ไข',

    'common.cache.inProgress': 'แคชกำลังดำเนินการ อาจยังมีเรคคอร์ดที่ตรงกับเงื่อนไขอยู่',
    'common.rows': '{0} แถว',
    'common.reload': 'โหลดใหม่',

    'config.app.root.loading': 'กำลังรอการเรนเดอร์หน้าจอ',
    'config.app.config.loading': 'กำลังดึงข้อมูลการกำหนดค่า',
    'config.app.form.view-id.title': 'การตั้งค่ารายการสำหรับแสดงตาราง',
    'config.app.form.view-id.description.1':
      'โปรดเลือกรายการเพื่อใช้งานฟังก์ชันการค้นหา สามารถเลือกได้เฉพาะรายการที่มีรูปแบบการแสดงผล "กำหนดเอง" เท่านั้น การเปลี่ยนแปลงการตั้งค่านี้ต้องใช้สิทธิ์ผู้ดูแลระบบ',
    'config.app.form.view-id.label': 'ชื่อรายการ',
    'config.app.form.view-id.error.title': 'ไม่สามารถดึงรายการได้ โปรดตรวจสอบการตั้งค่า kintone',
    'config.app.form.view-fields.title': 'การตั้งค่าฟิลด์ที่แสดงในตาราง',
    'config.app.form.view-fields.description.1':
      'ตั้งค่าฟิลด์ที่จะแสดงในรายการ ค่าที่ป้อนในแบบฟอร์มการค้นหาจะค้นหาเฉพาะฟิลด์ที่เลือกในการตั้งค่านี้เท่านั้น',
    'config.app.form.view-fields.description.2':
      'หากคุณระบุความกว้างการแสดงผลที่น้อยกว่าความกว้างของอักขระของหัวเรื่อง การแสดงผลอาจถูกตัดทอน หากคุณตั้งค่าความกว้างการแสดงผลเป็น 0 ความกว้างจะปรับอัตโนมัติตามเนื้อหา',
    'config.app.form.view-fields.fieldCode.label': 'ฟิลด์เป้าหมาย',
    'config.app.form.view-fields.width.label': 'ความกว้างการแสดงผล',
    'config.app.form.view-fields.tooltip.showDetail': 'เปิดการตั้งค่าละเอียดสำหรับฟิลด์นี้',
    'config.app.form.view-fields.tooltip.addField': 'เพิ่มฟิลด์การแสดงผล',
    'config.app.form.view-fields.tooltip.deleteField': 'ลบฟิลด์การแสดงผลนี้',
    'config.app.form.view-fields.detailSetting.title': 'การตั้งค่าละเอียดของ {0}',
    'config.app.form.view-fields.isEditable.title': 'การแสดงในหน้าจอแก้ไข',
    'config.app.form.view-fields.isEditable.description': 'หากปิดสวิตช์ จะไม่แสดงในหน้าจอแก้ไข',
    'config.app.form.view-fields.isEditable.label': 'แสดงในหน้าจอแก้ไข',
    'config.app.form.view-fields.displayName.title': 'ชื่อการแสดงผล',
    'config.app.form.view-fields.displayName.description':
      'หากตั้งค่าไว้ จะแสดงค่านี้แทนชื่อฟิลด์มาตรฐาน',
    'config.app.form.view-fields.displayName.label': 'ชื่อการแสดงผล',
    'config.app.form.view-fields.nowrap.title': 'การตั้งค่าการตัดบรรทัด',
    'config.app.form.view-fields.nowrap.description':
      'มีผลเฉพาะเมื่อตั้งค่าความกว้างของฟิลด์แล้วเท่านั้น หากปิดสวิตช์ ข้อความที่ไม่พอดีกับความกว้างเริ่มต้นจะถูกตัดบรรทัด หากเปิดสวิตช์ ข้อความจะไม่ถูกตัดบรรทัดและจะแสดงแถบเลื่อนหากไม่พอดีกับความกว้างเริ่มต้น',
    'config.app.form.view-fields.nowrap.label': 'ไม่ตัดบรรทัดข้อความในเซลล์',
    'config.app.form.view-type.title': 'การตั้งค่าประเภทการแสดงผล',
    'config.app.form.view-type.description.1':
      'ตั้งค่าวิธีการแสดงผลเรคคอร์ด หากคุณเลือกประเภทการ์ด ฟิลด์แนบไฟล์แรกจากฟิลด์ที่แสดงจะถูกอ้างอิงสำหรับรูปภาพ',
    'config.app.form.view-type.label': 'ประเภทการแสดงผล',
    'config.app.form.view-type.table': 'รูปแบบตาราง',
    'config.app.form.view-type.card': 'รูปแบบการ์ด',
    'config.app.form.isViewTypeControlEnabled.description':
      'หากเปิดใช้งานการตั้งค่านี้ จะแสดงแบบฟอร์มที่อนุญาตให้เปลี่ยนประเภทการแสดงผลของรายการ',
    'config.app.form.isViewTypeControlEnabled.label': 'อนุญาตให้เปลี่ยนประเภทการแสดงผลจากรายการ',
    'config.app.form.paginationChunk.label': 'จำนวนเรคคอร์ดที่แสดงต่อหน้า',
    'config.app.form.isPaginationChunkControlShown.description':
      'หากเปิดใช้งานการตั้งค่านี้ จะแสดงแบบฟอร์มที่อนุญาตให้เปลี่ยนจำนวนเรคคอร์ดที่แสดงต่อหน้า',
    'config.app.form.isPaginationChunkControlShown.label':
      'อนุญาตให้เปลี่ยนจำนวนการแสดงผลจากรายการ',
    'config.app.form.pagination.title': 'การตั้งค่าการแบ่งหน้า',
    'config.app.form.pagination.description.1':
      'คุณสามารถเปลี่ยนจำนวนเรคคอร์ดที่แสดงต่อหน้าได้ ในสภาพแวดล้อมที่มีสเปคต่ำ การลดจำนวนเรคคอร์ดที่แสดงอาจช่วยปรับปรุงประสิทธิภาพ',
    'config.app.form.sortCriteria.title': 'การตั้งค่าเกณฑ์การเรียงลำดับของรายการ',
    'config.app.form.isViewSortConditionEnabled.description':
      'ตั้งค่าว่าจะใช้เกณฑ์การเรียงลำดับที่ตั้งไว้ในรายการเป้าหมายกับรายการของปลั๊กอินหรือไม่ หากปิดใช้งานการตั้งค่านี้ รายการของปลั๊กอินจะแสดงเรคคอร์ดใหม่ล่าสุดเสมอ',
    'config.app.form.isViewSortConditionEnabled.label': 'เปิดใช้งานเกณฑ์การเรียงลำดับของรายการ',
    'config.app.form.isSortable.title': 'การตั้งค่าการเรียงลำดับรายการ',
    'config.app.form.isSortable.description':
      'หากเปิดใช้งานการตั้งค่านี้ คุณสามารถเรียงลำดับเรคคอร์ดจากน้อยไปมากหรือมากไปน้อยโดยคลิกที่หัวเรื่องของรายการ ฟิลด์บางประเภทอาจไม่สามารถเรียงลำดับได้',
    'config.app.form.isSortable.label': 'เปิดใช้งานการเรียงลำดับรายการ',
    'config.app.form.csvExport.title': 'การตั้งค่าการส่งออก CSV',
    'config.app.form.csvExport.description':
      'หากเปิดใช้งานการตั้งค่านี้ ปุ่มส่งออก CSV จะแสดงในรายการ รายการที่ส่งออกจะถูกกรองตามค่าที่ป้อนในแบบฟอร์มการค้นหา โปรดทราบว่าไม่เข้ากันกับฟังก์ชันการส่งออก CSV มาตรฐานของ kintone',
    'config.app.form.isCsvDownloadButtonHidden.label': 'ปิดใช้งานฟังก์ชันการส่งออก CSV',
    'config.app.form.editFeatures.title': 'การตั้งค่าฟีเจอร์การแก้ไข',
    'config.app.form.isEditable.description':
      'ยกเว้นฟิลด์บางประเภท คุณสามารถแก้ไขแต่ละฟิลด์ของเรคคอร์ดจากรายการได้ เฉพาะผู้ใช้ที่มีสิทธิ์แก้ไขเรคคอร์ดเท่านั้นที่สามารถแก้ไขได้',
    'config.app.form.isEditable.label': 'เปิดใช้งานการแก้ไขในรายการ',
    'config.app.form.isEditorControlEnabled.title': 'ข้อจำกัดฟีเจอร์การแก้ไข',
    'config.app.form.isEditorControlEnabled.description':
      'นอกเหนือจากการตั้งค่าสิทธิ์มาตรฐานของแอป คุณสามารถตั้งค่าสิทธิ์การแก้ไขเฉพาะของปลั๊กอินได้ หากเปิดใช้งานการตั้งค่านี้ ผู้ใช้ที่ไม่ได้ระบุจะไม่สามารถใช้ฟีเจอร์การแก้ไขของปลั๊กอินได้ ไม่มีผลต่อการแก้ไขในหน้าจอรายละเอียดมาตรฐานของ kintone',
    'config.app.form.isEditorControlEnabled.label': 'จำกัดผู้ใช้ที่สามารถแก้ไขได้',
    'config.app.form.editors.title': 'ผู้ใช้ที่สามารถแก้ไขได้',
    'config.app.form.editors.description':
      'ตั้งค่าผู้ใช้ที่สามารถแก้ไขได้ เฉพาะผู้ใช้ กลุ่ม และองค์กรที่ระบุเท่านั้นที่สามารถใช้ฟีเจอร์การแก้ไขของปลั๊กอินได้ ไม่มีผลต่อฟังก์ชันการแก้ไขเรคคอร์ดมาตรฐานของ kintone',
    'config.form.user.type.user': 'ผู้ใช้',
    'config.form.user.type.group': 'กลุ่ม',
    'config.form.user.type.organization': 'องค์กร',
    'config.form.user.label.user': 'ชื่อผู้ใช้',
    'config.form.user.label.group': 'ชื่อกลุ่ม',
    'config.form.user.label.organization': 'ชื่อองค์กร',
    'config.form.permission.scope': 'ขอบเขตสิทธิ์',
    'config.app.form.deleteFeatures.title': 'การตั้งค่าฟีเจอร์การลบ',
    'config.app.form.isDeletable.description':
      'คุณสามารถลบเรคคอร์ดจากรายการได้ เฉพาะผู้ใช้ที่มีสิทธิ์ลบเรคคอร์ดเท่านั้นที่สามารถลบได้',
    'config.app.form.isDeletable.label': 'เปิดใช้งานการลบในรายการ',
    'config.app.form.isDeleterControlEnabled.title': 'ข้อจำกัดฟีเจอร์การลบ',
    'config.app.form.isDeleterControlEnabled.description':
      'นอกเหนือจากการตั้งค่าสิทธิ์มาตรฐานของแอป คุณสามารถตั้งค่าสิทธิ์การลบเฉพาะของปลั๊กอินได้ หากเปิดใช้งานการตั้งค่านี้ ผู้ใช้ที่ไม่ได้ระบุจะไม่สามารถใช้ฟีเจอร์การลบของปลั๊กอินได้ ไม่มีผลต่อฟังก์ชันการลบมาตรฐานของ kintone',
    'config.app.form.isDeleterControlEnabled.label': 'จำกัดผู้ใช้ที่สามารถลบได้',
    'config.app.form.deleters.title': 'ผู้ใช้ที่สามารถลบได้',
    'config.app.form.deleters.description':
      'ตั้งค่าผู้ใช้ที่สามารถลบได้ เฉพาะผู้ใช้ กลุ่ม และองค์กรที่ระบุเท่านั้นที่สามารถใช้ฟีเจอร์การลบของปลั๊กอินได้ ไม่มีผลต่อฟังก์ชันการลบเรคคอร์ดมาตรฐานของ kintone',
    'config.app.form.extractedInputs.title': 'แบบฟอร์มการค้นหาเพิ่มเติม',
    'config.app.form.extractedInputs.description':
      'นอกเหนือจากแบบฟอร์มการค้นหามาตรฐานของปลั๊กอินที่เป้าหมายทุกฟิลด์ คุณสามารถเพิ่มแบบฟอร์มการค้นหาที่เป้าหมายเฉพาะฟิลด์ที่กำหนดได้ แบบฟอร์มการค้นหาที่เพิ่มสามารถใช้ร่วมกับแบบฟอร์มการค้นหาที่เป้าหมายทุกฟิลด์ได้',
    'config.app.form.extractedInputs.type.label': 'ประเภทการค้นหา',
    'config.app.form.extractedInputs.type.text': 'ข้อความ',
    'config.app.form.extractedInputs.type.dropdown': 'เมนูแบบเลื่อนลง',
    'config.app.form.extractedInputs.type.date': 'วันที่',
    'config.app.form.extractedInputs.type.month': 'เดือน',
    'config.app.form.extractedInputs.type.year': 'ปี',
    'config.app.form.extractedInputs.fieldCode.label': 'ฟิลด์เป้าหมาย',
    'config.app.form.extractedInputs.tooltip.addField': 'เพิ่มฟิลด์การแสดงผล',
    'config.app.form.extractedInputs.tooltip.deleteField': 'ลบฟิลด์การแสดงผลนี้',
    'config.app.form.advancedSettings.title': 'ตัวเลือกขั้นสูง',
    'config.app.form.fuzzySearch.title': 'การตั้งค่าการค้นหาแบบคลุมเครือ',
    'config.app.form.isCaseSensitive.label': 'แยกตัวพิมพ์ใหญ่และเล็กเมื่อกรอง',
    'config.app.form.isKatakanaSensitive.label': 'แยกคาตาคานะและฮิรางานะเมื่อกรอง',
    'config.app.form.isHankakuKatakanaSensitive.label':
      'แยกคาตาคานะครึ่งความกว้างและเต็มความกว้างเมื่อกรอง',
    'config.app.form.isZenkakuEisujiSensitive.label':
      'แยกตัวอักษรและตัวเลขเต็มความกว้างและครึ่งความกว้างเมื่อกรอง',
    'config.app.form.pageTransition.title': 'การตั้งค่าการเปลี่ยนหน้า',
    'config.app.form.isOpenInNewTab.label': 'เปิดหน้าจอรายละเอียดเรคคอร์ดในแท็บใหม่',
    'config.app.form.joinConditions.title': 'JOIN - อ้างอิงและอัปเดตเรคคอร์ดจากแอปอื่น',
    'config.app.form.joinConditions.description':
      'คุณสามารถอ้างอิงและอัปเดตเรคคอร์ดจากแอปอื่นโดยใช้คีย์เฉพาะ เมื่อเพิ่มการตั้งค่าการเชื่อม คุณสามารถเพิ่มฟิลด์จากแอปที่เชื่อมในการตั้งค่าฟิลด์ที่แสดงในตาราง ในเวอร์ชันปัจจุบัน เรคคอร์ดแรกที่ตรงกับข้อมูลคีย์สำหรับแต่ละเรคคอร์ดจะถูกอ้างอิง',

    'config.app.form.createViewButton.label': 'สร้างรายการใหม่',
    'config.app.toast.createView': 'สร้างรายการแล้ว',
    'config.app.toast.createViewFailed': 'ไม่สามารถสร้างรายการได้',
    'config.app.form.importViewFieldsButton.label': 'นำเข้าจากรายการมาตรฐาน kintone',
    'config.app.form.importViewFields.dialog.title': 'เลือกรายการเพื่อนำเข้าข้อมูลฟิลด์',

    'config.error.appInfoRetrievalFailedError': 'ไม่สามารถดึงข้อมูลแอปได้',
    'config.error.appViewsRetrievalFailedError': 'ไม่สามารถดึงข้อมูลรายการของแอปได้',
    'config.error.root-not-found': `HTML ของปลั๊กอินไม่มีองค์ประกอบราก จำเป็นต้องมีองค์ประกอบที่มี id="settings" เพื่อเรนเดอร์การตั้งค่าปลั๊กอิน`,
    'config.app.sidebar.append-button.label': 'การตั้งค่าใหม่',
    'config.app.sidebar.label.heading': 'การตั้งค่า',
    'config.app.sidebar.label.default': 'ไม่ได้ตั้งค่า',
    'config.app.sidebar.toast.delete': 'ลบข้อมูลการตั้งค่าแล้ว',
    'config.app.sidebar.toast.copy': 'คัดลอกข้อมูลการตั้งค่าแล้ว',
    'config.app.sidebar.toast.paste': 'วางข้อมูลการตั้งค่าแล้ว',
    'config.app.sidebar.toast.paste.failure': 'รูปแบบข้อมูลการตั้งค่าไม่ถูกต้อง',
    'config.app.sidebar.toast.paste.error.validation': 'รูปแบบข้อมูลการตั้งค่าไม่ถูกต้อง',

    'config.toast.save': 'บันทึกการตั้งค่าแล้ว',
    'config.toast.reset': 'รีเซ็ตการตั้งค่าแล้ว',
    'config.toast.import': 'นำเข้าข้อมูลการตั้งค่าแล้ว',
    'config.toast.export': 'ส่งออกข้อมูลการตั้งค่าปลั๊กอินแล้ว',
    'config.error.import':
      'ไม่สามารถนำเข้าข้อมูลการตั้งค่าได้ โปรดตรวจสอบไฟล์ว่ามีข้อผิดพลาดหรือไม่',
    'config.error.export': 'ไม่สามารถส่งออกข้อมูลการตั้งค่าปลั๊กอินได้ โปรดติดต่อนักพัฒนาปลั๊กอิน',

    'desktop.app.empty.title': 'ไม่พบเรคคอร์ดที่ตรงกับเงื่อนไข',
    'desktop.app.empty.description.1':
      'นอกจากเงื่อนไขการค้นหาที่ป้อน เงื่อนไขการกรองของรายการยังถูกใช้ด้วย',
    'desktop.app.empty.description.2': 'หากคุณไม่พบเรคคอร์ดที่ต้องการ โปรดตรวจสอบเงื่อนไขการกรอง',
    'desktop.app.editor.title': 'แก้ไขเรคคอร์ด',
    'desktop.app.editor.save': 'บันทึก',
    'desktop.app.editor.cancel': 'ยกเลิก',
    'desktop.app.editor.lookup.success': 'ดึงข้อมูลจากแหล่งอ้างอิงแล้ว',
    'desktop.app.toast.recordUpdated': 'อัปเดตเรคคอร์ดแล้ว',
    'desktop.app.toast.partialRecordUpdated':
      'อัปเดตเรคคอร์ดแล้ว แต่ไม่สามารถอัปเดต {0} เรคคอร์ดได้ ({1})',
    'desktop.app.toast.recordUpdateFailed': 'ไม่สามารถอัปเดตเรคคอร์ดได้',
    'desktop.app.toast.recordUpdateFailedWithMessage': 'ไม่สามารถอัปเดตเรคคอร์ดได้ ({0})',
    'desktop.app.toast.recordDeleted': 'ลบเรคคอร์ดแล้ว',
    'desktop.app.toast.recordDeleteFailed': 'ไม่สามารถลบเรคคอร์ดได้',
    'desktop.app.toast.csvExport': 'ส่งออก CSV แล้ว',
    'desktop.app.toast.csvExportFailed': 'ไม่สามารถส่งออก CSV ได้',
    'desktop.app.toast.pluginConditionRetrievalError': 'ไม่สามารถดึงข้อมูลการตั้งค่าปลั๊กอินได้',
    'desktop.app.toast.recordNotFound': 'ไม่สามารถส่งออก CSV ได้เนื่องจากไม่มีเรคคอร์ดเป้าหมาย',
    'desktop.app.tooltip.csvExport': 'ส่งออกไฟล์ CSV ด้วยเงื่อนไขการค้นหาปัจจุบัน',
    'desktop.error.domainCursorCreationLimitReachedError':
      'ถึงขีดจำกัดการสร้างเคอร์เซอร์ในโดเมนที่คุณใช้งานแล้ว โปรดลองอีกครั้งหลังจากผ่านไปสักพัก',
    'desktop.error.appInfoRetrievalFailedError': 'ไม่สามารถดึงข้อมูลแอปได้',
    'desktop.error.unknownError': 'เกิดข้อผิดพลาด โปรดลองอีกครั้งหลังจากผ่านไปสักพัก',

    'common.auth.serverError': 'เกิดข้อผิดพลาดของเซิร์ฟเวอร์ โปรดติดต่อผู้ดูแลระบบ',
    'common.auth.licenseExpired': 'ใบอนุญาตหมดอายุแล้ว',
    'common.auth.licenseInvalid': 'ใบอนุญาตไม่ถูกต้อง',
  },
} as const;

export type Language = keyof typeof ui;

export const defaultLang = 'ja' satisfies Language;

const isSupportedLang = (lang: string): lang is Language => lang in ui;

/**
 * 指定された言語に対応する翻訳関数を返します。
 * @param lang - 言語のキー
 * @returns 指定された言語に対応する翻訳関数
 */
export function useTranslations(lang: string = defaultLang) {
  const validLang = isSupportedLang(lang) ? lang : defaultLang;

  return function t(key: keyof (typeof ui)[typeof defaultLang], ...args: string[]): string {
    /* eslint @typescript-eslint/ban-ts-comment: 0 */
    // @ts-ignore デフォルト言語以外の設定が不十分な場合は、デフォルト言語の設定を使用します
    let translation: string = ui[validLang][key] ?? ui[defaultLang][key];

    args.forEach((arg, index) => {
      translation = translation.replace(`{${index}}`, arg);
    });

    return translation;
  };
}

export const t = useTranslations(LANGUAGE);
