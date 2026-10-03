'use strict';
(() => {
  const button = document.querySelector('#share-artwork');
  if (!button) return;
  const status = document.querySelector('#share-status');
  const fallback = document.querySelector('#share-url');
  const url = document.querySelector('link[rel="canonical"]').href;
  button.hidden = false;
  button.addEventListener('click', async () => {
    status.textContent = '';
    fallback.hidden = true;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Was weiterklingt · WellenSohn', url });
        return;
      }
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      status.textContent = 'Link kopiert.';
    } catch (error) {
      if (error.name === 'AbortError') return;
      fallback.value = url;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      status.textContent = 'Diesen Link kannst du kopieren und teilen.';
    }
  });
})();
