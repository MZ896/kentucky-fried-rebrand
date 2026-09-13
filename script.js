document.querySelectorAll('a[href="#menu"]').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    window.setTimeout(() => menu.focus({ preventScroll: true }), 100);
  });
});

// Follow the reader through the timeline without intercepting native scrolling.
const chapters = [...document.querySelectorAll('.era')];
const chapterLinks = [...document.querySelectorAll('.era-nav a')];
if (chapters.length) {
  let scheduled = false;
  function updateChapter() {
    const focusLine = window.innerHeight * 0.45;
    let active = chapters[0];
    for (const chapter of chapters) {
      if (chapter.getBoundingClientRect().top <= focusLine) active = chapter;
    }
    chapterLinks.forEach(link => {
      if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  function scheduleUpdate() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateChapter); }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateChapter();
}
