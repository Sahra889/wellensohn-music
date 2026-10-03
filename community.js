'use strict';
(() => {
  const button = document.querySelector('#copy-feed');
  if (!button) return;
  const status = document.querySelector('#feed-status');
  const input = document.querySelector('#feed-url');
  const url = new URL(document.querySelector('link[type="application/rss+xml"]').getAttribute('href'), document.baseURI).href;
  button.hidden = false;
  button.addEventListener('click', async () => {
    input.hidden = true;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      status.textContent = 'Feed-Link kopiert. Du kannst ihn in deinem Feedreader hinzufügen.';
    } catch (_) {
      input.value = url; input.hidden = false; input.focus(); input.select();
      status.textContent = 'Kopiere diese Adresse in deinen Feedreader.';
    }
  });
})();
