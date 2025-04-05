/**
 * 受け取ったエラーから、エラーメッセージを組み立てる
 */
export function getKintoneErrorMessage(error: unknown) {
  if (!error) {
    return '';
  }
  if (typeof error !== 'object') {
    return String(error);
  }
  if (!('message' in error) || typeof error.message !== 'string') {
    return String(error);
  }

  if (!('errors' in error) || !error.errors || typeof error.errors !== 'object') {
    return error.message;
  }

  const errorDetails = Object.entries(error.errors)
    .map(([key, value]: [string, unknown]) => {
      if (!value) {
        return null;
      }
      const keyValue = key.replace(/^record\./, '').replace(/\.value$/, '');

      if (typeof value !== 'object') {
        return `${keyValue}: ${String(value)}`;
      }
      if ('messages' in value && Array.isArray(value.messages)) {
        return `${keyValue}: ${value.messages.filter((m) => typeof m === 'string').join(', ')}`;
      }
      return `${keyValue}`;
    })
    .filter((v) => v !== null);

  return `${error.message} (${errorDetails.join(', ')})`;
}
