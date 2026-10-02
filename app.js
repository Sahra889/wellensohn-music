'use strict';
(() => {
  const tracks = window.WELLENSOHN_TRACKS;
  const grid = document.querySelector('#tracks');
  const dialog = document.querySelector('#track-dialog');
  const search = document.querySelector('#search');
  let year = 'all', current = 0, lastFocus = null;
  const date = new Intl.DateTimeFormat('de-DE', {day:'2-digit', month:'2-digit', year:'numeric', timeZone:'UTC'});
  const duration = ms => `${Math.floor(ms/60000)}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}`;
  function el(tag, cls, text) { const node=document.createElement(tag); if(cls)node.className=cls; if(text!==undefined)node.textContent=text; return node; }
  function buttonFor(t, cls) { const b=el('button',cls); b.type='button'; b.dataset.track=t.permalink; return b; }
  function render() {
    const q=search.value.trim().toLocaleLowerCase('de');
    const filtered=tracks.filter(t=>(year==='all'||t.date.startsWith(year))&&[t.title,t.artist,t.description,t.teaser,...t.tags].join(' ').toLocaleLowerCase('de').includes(q));
    grid.replaceChildren();
    for(const t of filtered) {
      const card=el('article','track-card');
      const cover=buttonFor(t,'cover-button'); cover.setAttribute('aria-label',`${t.title}: Cover und Begleittext öffnen`);
      const img=el('img'); Object.assign(img,{src:t.artwork,alt:t.alt,loading:'lazy',width:500,height:500});
      const number=el('span','card-index',String(tracks.indexOf(t)+1).padStart(2,'0'));
      const plus=el('span','card-open','＋');plus.setAttribute('aria-hidden','true');cover.append(img,number,plus);
      const info=el('div','track-info'), top=el('div','track-top');top.append(el('span','',t.artist),el('span','',`${t.date.slice(0,4)} · ${duration(t.duration)}`));
      const heading=el('h3'),title=buttonFor(t,'title-button');title.textContent=t.title;heading.append(title);
      info.append(top,heading,el('p','track-teaser',t.teaser));card.append(cover,info);grid.append(card);
    }
    document.querySelector('#count').textContent=`${filtered.length} von ${tracks.length} Veröffentlichungen`;
    document.querySelector('#empty').hidden=filtered.length>0;
    document.querySelector('#result-status').textContent=`${filtered.length} Tracks angezeigt`;
  }
  function clearPlayer(t) {
    const area=document.querySelector('#player-area');area.replaceChildren();
    const load=el('button','button light','▶ Auf dieser Seite anhören');load.id='load-player';load.type='button';
    const note=el('p','player-note','Lädt den SoundCloud-Player. Dabei wird eine Verbindung zu SoundCloud hergestellt.');
    load.addEventListener('click',()=>{
      const frame=el('iframe');frame.title=`SoundCloud-Player: ${t.title}`;frame.allow='autoplay';
      const params=new URLSearchParams({url:t.permalink_url,color:'#b9d4f1',auto_play:'false',hide_related:'true',show_comments:'false',show_user:'true',show_reposts:'false',visual:'false'});
      frame.src='https://w.soundcloud.com/player/?'+params;
      area.replaceChildren(frame,el('p','player-note','Falls der Player nicht lädt, öffne den Track über den SoundCloud-Link darunter.'));
    });
    area.append(load,note);
  }
  function openTrack(slug, remember=true) {
    const index=tracks.findIndex(t=>t.permalink===slug);if(index<0)return;
    current=index;const t=tracks[index];
    if(!dialog.open&&remember)lastFocus=document.activeElement;
    const art=document.querySelector('#detail-art');art.src=t.artwork;art.alt=t.alt;
    document.querySelector('.dialog-inner').style.setProperty('--art',`url("${t.artwork}")`);
    document.querySelector('#detail-meta').textContent=`${t.artist} / ${date.format(new Date(t.date))} / ${duration(t.duration)}`;
    document.querySelector('#detail-title').textContent=t.title;
    document.querySelector('#detail-story').textContent=t.story;
    const tagbox=document.querySelector('#detail-tags');tagbox.replaceChildren(...t.tags.map(tag=>el('span','',tag)));tagbox.hidden=t.tags.length===0;
    document.querySelector('.story-label').title='Grundlage: '+t.story_basis;
    const original=document.querySelector('#original');original.open=false;original.hidden=!t.description;
    document.querySelector('#detail-description').textContent=t.description;
    document.querySelector('#detail-link').href=t.permalink_url;
    document.querySelector('#detail-position').textContent=`${index+1} / ${tracks.length}`;
    clearPlayer(t);
    if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');}
    dialog.scrollTop=0;
    history.replaceState(null,'','#track-'+t.permalink);
  }
  document.addEventListener('click',event=>{const target=event.target.closest('[data-track]');if(target)openTrack(target.dataset.track);});
  document.querySelectorAll('[data-year]').forEach(b=>b.addEventListener('click',()=>{
    year=b.dataset.year;document.querySelectorAll('[data-year]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});render();
  }));
  search.addEventListener('input',render);
  document.querySelector('.close-button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');document.querySelector('#player-area').replaceChildren();history.replaceState(null,'','#musik');if(lastFocus&&lastFocus.isConnected)lastFocus.focus({preventScroll:true});});
  document.querySelector('#previous').addEventListener('click',()=>openTrack(tracks[(current-1+tracks.length)%tracks.length].permalink,false));
  document.querySelector('#next').addEventListener('click',()=>openTrack(tracks[(current+1)%tracks.length].permalink,false));
  render();
  if(location.hash.startsWith('#track-'))openTrack(location.hash.slice(7));
})();
