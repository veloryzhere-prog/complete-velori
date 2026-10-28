/* VELORI download center interactions. No analytics, remote scripts or libraries. */
(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const currentPath = location.pathname.replace(/\/?$/, '/') || '/';
  $$('.desktop-nav a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPath) a.classList.add('active');
  });
  const menu = $('#menuToggle');
  const mobile = $('#mobileNav');
  function closeMenu(){ mobile?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }
  menu?.addEventListener('click',() => {
    const expanded=menu.getAttribute('aria-expanded')==='true';
    menu.setAttribute('aria-expanded',String(!expanded));
    mobile?.classList.toggle('open',!expanded);
  });
  $$('a',mobile||document.createElement('div')).forEach(a=>a.addEventListener('click', closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

  const storedTheme=(()=>{try{return localStorage.getItem('velori-theme');}catch{return null;}})();
  if(storedTheme==='dark')document.documentElement.classList.add('theme-dark');
  $('#themeToggle')?.addEventListener('click',()=>{
    const dark=document.documentElement.classList.toggle('theme-dark');
    try{localStorage.setItem('velori-theme',dark?'dark':'light');}catch{}
    $('#themeToggle').setAttribute('aria-label', dark?'Switch to light theme':'Switch to dark theme');
  });

  const revealed=$$('.reveal');
  if('IntersectionObserver' in window && !reducedMotion){
    const observer=new IntersectionObserver((entries,ob)=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target);}});
    },{threshold:.08,rootMargin:'0px 0px -24px 0px'});
    revealed.forEach(n=>observer.observe(n));
  }else{revealed.forEach(n=>n.classList.add('visible'));}

  const bar=$('#readingProgress');
  let scrollQueued=false;
  window.addEventListener('scroll',()=>{
    if(scrollQueued)return;
    scrollQueued=true;
    requestAnimationFrame(()=>{
      if(bar){const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';}
      scrollQueued=false;
    });
  },{passive:true});

  const modal=$('#guideDialog'), video=$('#guideVideo');
  const openers=$$('[data-video-open]');
  let restoreFocus=null;
  function openGuide(event){
    if(!modal)return;
    event?.preventDefault();
    restoreFocus=document.activeElement;
    closeMenu();
    if(typeof modal.showModal==='function'){ if(!modal.open) modal.showModal(); }
    else modal.setAttribute('open','');
    document.body.classList.add('modal-open');
    $('#guideNudge')?.setAttribute('hidden','');
    // User-triggered playback only. Browsers may require tapping play on video controls.
    const result=video?.play();
    if(result && typeof result.catch==='function')result.catch(()=>{});
  }
  function closeGuide(){
    video?.pause();
    if(modal?.open){ if(typeof modal.close==='function')modal.close(); else modal.removeAttribute('open'); }
    document.body.classList.remove('modal-open');
    restoreFocus?.focus?.();
  }
  openers.forEach(b=>b.addEventListener('click',openGuide));
  $$('[data-video-close]').forEach(b=>b.addEventListener('click',closeGuide));
  modal?.addEventListener('click',e=>{
    if(e.target===modal)closeGuide();
  });
  modal?.addEventListener('close',()=>{video?.pause();document.body.classList.remove('modal-open');});

  // The page uses a small optional suggestion, not an automatically playing video.
  const nudge=$('#guideNudge');
  let dismissed=false;
  try{dismissed=localStorage.getItem('velori-guide-dismissed')==='1';}catch{}
  if(nudge && currentPath==='/' && !dismissed){
    setTimeout(()=>{if(!modal?.open && !document.hidden)nudge.hidden=false;},5500);
  }
  $$('[data-nudge-close]').forEach(b=>b.addEventListener('click',()=>{
    if(nudge)nudge.hidden=true;
    try{localStorage.setItem('velori-guide-dismissed','1');}catch{}
  }));

  const cookie=$('#cookieNote');
  let cookieDismissed=false;
  try{cookieDismissed=localStorage.getItem('velori-cookie-notice')==='1';}catch{}
  // No optional tracking cookies are installed by this static site, so the
  // notice remains opt-in/informational rather than interrupting visitors.
  // Future tracking integrations would require a real consent design.
  if(cookie)cookie.hidden=true;
  $('#cookieAccept')?.addEventListener('click',()=>{
    if(cookie)cookie.hidden=true;
    try{localStorage.setItem('velori-cookie-notice','1');}catch{}
  });

  $$('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    const val=button.dataset.copy;
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(val);
      const old=button.textContent;button.textContent='Copied ✓';
      setTimeout(()=>{button.textContent=old;},2000);
    }catch{
      window.prompt('Copy this SHA-256 checksum:',val);
    }
  }));
  $('#faqSearch')?.addEventListener('input',event=>{
    const q=event.target.value.toLocaleLowerCase().trim();let count=0;
    $$('.cms-faq .cms-entry').forEach(section=>{
      const match=section.textContent.toLocaleLowerCase().includes(q);
      section.hidden=!match;if(match)count++;
    });
    const msg=$('#faqSearchEmpty');if(msg)msg.hidden=count!==0;
  });
})();
