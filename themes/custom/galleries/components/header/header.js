const setUpHeader = () => {
  const siteHeader = document.querySelector('#site-header');
  const menu = document.querySelector('#main-menu');
  const openButton = document.querySelector('#menu-opener');
  const closeButton = document.querySelector('#menu-closer');
  if (![siteHeader, menu, openButton, closeButton].every(Boolean)) return;

  const focusTargetAncestor = menu.querySelector('#focus-target-ancestor');
  if (!focusTargetAncestor) return;

  // basic debouncer from https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
  const debounce = (func, delay) => {
    let inDebounce;
    return function() {
      const context = this;
      const args = arguments;
      window.clearTimeout(inDebounce);
      inDebounce = window.setTimeout(() => func.apply(context, args), delay);
    };
  };

  // for available options, see https://micromodal.now.sh/#configuration
  // note: the `onShow` and `onClose` methods run just when their respective fade-animations BEGIN,
  // so we'll also use `animationend` handlers later for other tasks
  const showModal = () => MicroModal.show('main-menu', {
    onShow: () => menu.scrollTo(0, 0),
    onClose: () => siteHeader.classList.remove('invisible'),
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: true, /* because we don't necessarily want to focus on FIRST tabbable element (controlled below) */
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  });

  const scrollToTop = ('scrollBehavior' in document.documentElement.style)
    ? () => window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    : () => window.scroll(0, 0);

  const isNotAtTop = () => !!window.pageYOffset;

  // if needed, we'll scroll to the top and open the modal through this `scroll` handler
  // (otherwise the 'site-header' in the modal won't be right on top of the real site-header)
  const showModalWhenAtTop = debounce(() => {
    if (isNotAtTop()) return;
    window.removeEventListener('scroll', showModalWhenAtTop);
    showModal();
  }, 100);


  /**
   * MicroModal allows escape-key to close modal. We do want this behavior,
   * but A) we need to disable it during the fade-in animation,
   * and B) we need it to call our custom closing-function:
   */

  // A) this `keydown` handler will be in effect during fade-in animation
  const disableEscapeKey = event => {
    if (event.key === 'Escape') event.stopImmediatePropagation();
  };

  // B) this one will be in effect between when fade-in animation ends and when fade-out animation starts
  const closeOnEscape = event => {
    if (event.key === 'Escape') {
      closeButton.click();
      event.stopImmediatePropagation();
    }
  };

  // custom modal-open behavior
  openButton.addEventListener('click', () => {
    // prevent interrupting open-animation
    openButton.disabled = true;
    document.addEventListener('keydown', disableEscapeKey);

    /*
      When open-animation ends:
      1. enable the closing-mechanisms (closeButton and escape-key);
      2. set the main site-header to `invisible` (to avoid presence of duplicate markup/landmark-roles/ids);
      3. focus on the first focusable element in the appropriate area (TreeWalker finds it on the spot)
    */
    menu.addEventListener('animationend', function openCleanup({ currentTarget, target }) {
      if (target !== currentTarget) return;

      menu.removeEventListener('animationend', openCleanup);
      document.removeEventListener('keydown', disableEscapeKey);
      document.addEventListener('keydown', closeOnEscape);
      closeButton.disabled = false;

      siteHeader.classList.add('invisible');

      const focusTarget = document.createTreeWalker(focusTargetAncestor, NodeFilter.SHOW_ELEMENT, {
        acceptNode: node => {
          const styles = window.getComputedStyle(node);
          if (styles.display === 'none' || styles.visibility === 'hidden') {
            return NodeFilter.FILTER_REJECT;
          }
          return (node.tabIndex >= 0) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
      }).nextNode();

      if (focusTarget) focusTarget.focus();
    });

    // open the modal (there's a fade-in animation), scrolling to the top first if necessary
    if (isNotAtTop()) {
      window.addEventListener('scroll', showModalWhenAtTop);
      scrollToTop();
    } else {
      showModal();
    }
  });

  // custom modal-close behavior
  closeButton.addEventListener('click', ({ detail: clickCount }) => {
    // prevent interrupting close-animation
    closeButton.disabled = true;

    // when close-animation ends, we'll enable the open-button and give it focus if the user used the keyboard
    menu.addEventListener('animationend', function closeCleanup({ currentTarget, target }) {
      if (target !== currentTarget) return;

      menu.removeEventListener('animationend', closeCleanup);
      document.removeEventListener('keydown', closeOnEscape);
      openButton.disabled = false;

      if (!clickCount) openButton.focus();
    });

    // close the modal (there's a fade-out animation)
    MicroModal.close('main-menu');
  });
};

if (top === self) setUpHeader();

export default setUpHeader;