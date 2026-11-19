// Click-to-expand for project figures (any img inside .project-visual).
(function () {
  const images = document.querySelectorAll('.project-visual img');
  if (!images.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Expanded image');
  dialog.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">' +
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    '</button>' +
    '<img class="lightbox-image" alt="">';
  document.body.appendChild(dialog);

  const big = dialog.querySelector('.lightbox-image');

  // Clicking anywhere except the image itself (backdrop or close button) closes.
  dialog.addEventListener('click', (e) => {
    if (e.target !== big) dialog.close();
  });

  // When the dialog closes, the browser returns focus to the image that opened
  // it, which matches :focus-visible and leaves the yellow glow stuck on. For
  // mouse/touch opens, drop that focus; keyboard users keep the focus ring.
  let opener = null;
  let openedByKeyboard = false;

  dialog.addEventListener('close', () => {
    if (opener && !openedByKeyboard) opener.blur();
    opener = null;
  });

  function open(img, viaKeyboard) {
    opener = img;
    openedByKeyboard = viaKeyboard;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    dialog.showModal();
  }

  images.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Expand image: ' + img.alt);
    img.addEventListener('click', () => open(img, false));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img, true);
      }
    });
  });
})();
