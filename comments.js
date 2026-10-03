'use strict';
(() => {
  const button = document.querySelector('#load-comments');
  if (!button) return;
  const status = document.querySelector('#comments-status');
  const list = document.querySelector('#comments-list');
  const endpoint = 'https://api.github.com/repos/WellenSohn-PackMan/wellensohn-music/issues/1/comments?per_page=30';
  const date = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' });
  const element = (tag, text) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; return node; };
  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    status.textContent = 'Kommentare werden geladen …';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(endpoint, { headers: { Accept: 'application/vnd.github+json' }, credentials: 'omit', referrerPolicy: 'no-referrer', signal: controller.signal });
      if (!response.ok) throw new Error('Comments unavailable');
      const comments = await response.json();
      if (!Array.isArray(comments)) throw new Error('Invalid response');
      const entries = [];
      for (const comment of comments) {
        if (comment.minimized || typeof comment.body !== 'string') continue;
        const article = element('article'); article.className = 'visitor-comment';
        const header = element('header');
        header.append(element('strong', comment.user?.login || 'Gast'));
        const created = new Date(comment.created_at);
        if (!Number.isNaN(created.getTime())) { const time = element('time', date.format(created)); time.dateTime = created.toISOString(); header.append(time); }
        // Visitor content stays plain text: never interpret HTML, links or scripts.
        article.append(header, element('p', comment.body));
        entries.push(article);
      }
      list.replaceChildren(...entries);
      status.textContent = entries.length ? `${entries.length} ${entries.length === 1 ? 'Kommentar' : 'Kommentare'} angezeigt.${comments.length === 30 ? ' Weitere Antworten findest du im gesamten Gespräch auf GitHub.' : ''}` : 'Noch keine sichtbaren Kommentare. Dein Gedanke kann der erste sein.';
      button.textContent = 'Kommentare aktualisieren';
    } catch (_) {
      status.textContent = 'Die Kommentare konnten gerade nicht geladen werden. Du kannst das Gespräch über den GitHub-Link öffnen.';
      button.textContent = 'Erneut versuchen';
    } finally {
      clearTimeout(timer);
      button.disabled = false;
    }
  });
})();
