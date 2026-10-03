'use strict';
(() => {
  const section = document.querySelector('[data-comment-issue]');
  const button = document.querySelector('#load-comments');
  const status = document.querySelector('#comments-status');
  const host = document.querySelector('#comments-embed');
  if (!section || !button || !status || !host) return;
  const issue = section.dataset.commentIssue;
  if (!/^[1-9]\d*$/.test(issue || '')) return;
  let timer;
  let loading = false;
  const showRetry = (message) => {
    clearTimeout(timer);
    loading = false;
    host.setAttribute('aria-busy', 'false');
    status.textContent = message;
    button.textContent = 'Kommentarfeld erneut laden';
    button.disabled = false;
    button.hidden = false;
  };
  window.addEventListener('message', (event) => {
    const frame = host.querySelector('iframe.utterances-frame');
    if (event.origin !== 'https://utteranc.es' || !frame ||
        event.source !== frame.contentWindow || event.data?.type !== 'resize' ||
        typeof event.data.height !== 'number' || event.data.height <= 0) return;
    clearTimeout(timer);
    loading = false;
    frame.title = 'Kommentare zu diesem Artwork';
    host.setAttribute('aria-busy', 'false');
    status.textContent = '';
    button.hidden = true;
  });
  const load = () => {
    if (loading) return;
    loading = true;
    button.disabled = true;
    host.setAttribute('aria-busy', 'true');
    status.textContent = 'Kommentarfeld wird geladen …';
    host.replaceChildren();
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'WellenSohn-PackMan/wellensohn-music');
    script.setAttribute('issue-number', issue);
    script.setAttribute('theme', 'dark-blue');
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onerror = () => showRetry('Das Kommentarfeld konnte nicht geladen werden. Du kannst das Gespräch über den GitHub-Link öffnen.');
    timer = setTimeout(() => showRetry('Das Laden dauert länger als erwartet. Du kannst es erneut versuchen oder das Gespräch auf GitHub öffnen.'), 15000);
    host.append(script);
  };
  button.hidden = false;
  button.addEventListener('click', load);
  // Complete only a visitor-initiated OAuth sign-in on return from GitHub.
  if (new URLSearchParams(window.location.search).has('utterances')) load();
})();
