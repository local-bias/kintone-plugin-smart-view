import { css } from '@emotion/css';

export const showNotification = (options: { title: string; body: string }) => {
  const { title, body } = options;
  const div = document.createElement('div');

  div.classList.add(css`
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 100;

    display: flex;
    align-items: center;
    gap: 16px;

    padding: 16px 24px 16px 12px;
    background-color: #fffa;
    backdrop-filter: blur(16px);
    border-left: 3px solid #e74c3c;
    border-radius: 4px;
    overflow: hidden;
    font-family: 'Yu Gothic', 'メイリオ', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
    box-shadow: 0 4px 12px -3px #0004;

    .title {
      color: #333;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .body {
      font-size: 14px;
      color: #666;
    }
  `);

  div.innerHTML = `
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  </div>
  <div style="flex: 1;">
    <div class="title">${title}</div>
    <div class="body">${body}</div>
  </div>`
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ');

  document.body.append(div);
};
