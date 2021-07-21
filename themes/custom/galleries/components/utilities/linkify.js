const setUpLinkify = () => {
  document.querySelectorAll('[data-linkify-url]').forEach(el => {
    el.classList.add('cursor-pointer');

    el.addEventListener('click', () => {
      // allow user to highlight text within area without navigating away
      if (window.getSelection().toString()) return;

      // otherwise, navigate to url
      window.location.assign(el.dataset.linkifyUrl);
    });

    // but clicking a link or button within el should not trigger el's click-listener
    el.querySelectorAll('a, button').forEach(linkOrButton => {
      linkOrButton.addEventListener('click', e => e.stopPropagation());
    });
  });
};

if (self === top) setUpLinkify();

export default setUpLinkify;