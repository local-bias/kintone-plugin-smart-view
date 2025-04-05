import { LANGUAGE } from './global';

export const ui = {
  ja: {
    'common.close': '閉じる',
    'common.autocomplete.options.appName': 'アプリ: {0}',
    'common.autocomplete.options.fieldCode': 'コード: {0}',

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
    'desktop.app.toast.recordUpdated': 'レコードを更新しました',
    'desktop.app.toast.partialRecordUpdated':
      'レコードの更新しましたが、{0}件のレコードは更新できませんでした({1})',
    'desktop.app.toast.recordUpdateFailed': 'レコードの更新に失敗しました',
    'desktop.app.toast.recordUpdateFailedWithMessage': 'レコードの更新に失敗しました({0})',
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
  },
  en: {
    'common.close': 'Close',
    'common.autocomplete.options.appName': 'App: {0}',
    'common.autocomplete.options.fieldCode': 'Code: {0}',

    'config.app.root.loading': 'Waiting for screen rendering',
    'config.app.config.loading': 'Retrieving configuration information',
    'config.app.form.view-id.title': 'Settings for displaying the table',
    'config.app.form.view-id.description.1':
      'Please select the list to implement the search function. Only lists with the display format "Customize" can be selected. System administrator privileges are required to change this setting.',
    'config.app.form.view-id.label': 'List name',
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
    'config.app.form.view-fields.nowrap.title': 'Wrap settings',
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
    'config.app.form.joinConditions.title': 'JOIN - Settings for joining with other apps',
    'config.app.form.joinConditions.description':
      'You can refer to records from other apps based on specific keys. When the join setting is enabled, you can add fields from the joined app in the "Settings for fields displayed in the table". In the current version, the first record that matches the key information for each record is referenced.',

    'config.app.form.createViewButton.label': 'Create new list',
    'config.app.toast.createView': 'List created',
    'config.app.toast.createViewFailed': 'Failed to create list',
    'config.app.form.importViewFieldsButton.label': 'Import from standard kintone list',
    'config.app.form.importViewFields.dialog.title':
      'Select the list to import field information from',

    'config.error.appInfoRetrievalFailedError': 'Failed to retrieve app information',
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
    'desktop.app.toast.recordUpdated': 'Record updated',
    'desktop.app.toast.recordUpdateFailed': 'Failed to update record',
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
  },
  es: {
    'common.close': 'Cerrar',
    'common.autocomplete.options.appName': 'Aplicación: {0}',
    'common.autocomplete.options.fieldCode': 'Código: {0}',

    'config.app.root.loading': 'Esperando la renderización de la pantalla',
    'config.app.config.loading': 'Obteniendo información de configuración',
    'config.app.form.view-id.title': 'Configuración de la vista de la tabla',
    'config.app.form.view-id.description.1':
      'Seleccione la vista para implementar la función de búsqueda. Solo se pueden seleccionar vistas con el formato de visualización "Personalizado". Se requieren permisos de administrador del sistema para cambiar esta configuración.',
    'config.app.form.view-id.label': 'Nombre de la vista',
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
      'Configuración de condiciones de unión con otras aplicaciones',
    'config.app.form.joinConditions.description':
      'Puede referenciar registros de otras aplicaciones basándose en una clave específica. Si habilita la configuración de unión, podrá agregar campos de la aplicación unida en la "Configuración de los campos a mostrar en la tabla". En la versión actual, se referenciará el primer registro que coincida con la información de la clave para cada registro.',

    'config.app.form.createViewButton.label': 'Crear nueva vista',
    'config.app.toast.createView': 'Vista creada',
    'config.app.toast.createViewFailed': 'Error al crear la vista',
    'config.app.form.importViewFieldsButton.label': 'Importar desde la vista estándar de kintone',
    'config.app.form.importViewFields.dialog.title':
      'Seleccione la vista para importar la información del campo',

    'config.error.appInfoRetrievalFailedError': 'Error al obtener la información de la aplicación',
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
    'desktop.app.toast.recordUpdated': 'Registro actualizado',
    'desktop.app.toast.recordUpdateFailed': 'Error al actualizar el registro',
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
  },
  /** 中国語（簡体字） */
  zh: {
    'common.close': '关闭',
    'common.autocomplete.options.appName': '应用: {0}',
    'common.autocomplete.options.fieldCode': '代码: {0}',

    'config.app.root.loading': '正在等待页面渲染',
    'config.app.config.loading': '正在获取配置信息',
    'config.app.form.view-id.title': '显示表格的列表设置',
    'config.app.form.view-id.description.1':
      '请选择要实现搜索功能的列表。可选择的列表仅限于显示形式为“自定义”的列表。要更改此设置，需要系统管理权限。',
    'config.app.form.view-id.label': '列表名称',
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
      '可以基于特定键引用其他应用的记录。启用连接设置后，可以在“表格中显示字段的设置”中添加连接应用的字段。在当前版本中，每个记录将引用与键信息匹配的第一个记录。',

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
    'desktop.app.toast.recordUpdated': '记录已更新',
    'desktop.app.toast.recordUpdateFailed': '记录更新失败',
    'desktop.app.toast.csvExport': '已导出CSV',
    'desktop.app.toast.csvExportFailed': 'CSV导出失败',
    'desktop.app.toast.pluginConditionRetrievalError': '获取插件设置信息失败',
    'desktop.app.toast.recordNotFound': '由于目标记录不存在，无法导出CSV。',
    'desktop.app.tooltip.csvExport': '根据当前搜索条件导出CSV文件',
    'desktop.error.domainCursorCreationLimitReachedError':
      '已达到当前域的游标创建上限。请稍后再试。',
    'desktop.error.appInfoRetrievalFailedError': '获取应用信息失败',
    'desktop.error.unknownError': '发生错误。请稍后再试。',
  },
  /** 中国語（繁体字） */
  'zh-TW': {
    'common.close': '關閉',
    'common.autocomplete.options.appName': '應用: {0}',
    'common.autocomplete.options.fieldCode': '代碼: {0}',

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
