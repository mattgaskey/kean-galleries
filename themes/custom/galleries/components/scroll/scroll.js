const initScroll = () => {
  if (!window.jQuery) return;

  // basic throttle that also always executes fn at very start and very end,
  // based on https://remysharp.com/2010/07/21/throttling-function-calls
  const throttle = (fn, threshhold) => {
    let last, deferTimer;

    return () => {
      const now = Number(new Date());
      const execute = () => {
        last = now;
        fn();
      };

      if (last && (now < last + threshhold)) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(execute, threshhold);
      } else {
        execute();
      }
    };
  };

  jQuery(document).ready(() => {
    const $headings = jQuery('h2:not(.visually-hidden)');
    const $scrollHeadings = jQuery('.scroll-nav--list');
    const $dropdownHeadings = jQuery('.dropdown-nav__target');
    $headings.each(function(key, val) {
      jQuery(this).attr('id', 'anchor' + key);

      const $listItem = jQuery('<li>');
      $listItem.attr('class', 'relative pl-6 py-4 flex items-center before:content-empty before:block before:absolute before:left-0 before:w-3-px before:h-full before:bg-yellow before:transition-colors before:!duration-1000');
      
      const $listLink = jQuery('<a>');
      $listLink.attr('href', '#anchor' + key);
      $listLink.text(jQuery(this).text());

      $listItem.append($listLink);
      $scrollHeadings.append($listItem);

      const $dropdownItem = jQuery('<li>');
      const $dropdownLink = jQuery('<a>');
      $dropdownLink.attr('href', '#anchor' + key);
      $dropdownLink.attr('class', 'dropdown-nav__link');
      $dropdownLink.text(jQuery(this).text());

      $dropdownItem.append($dropdownLink);
      $dropdownHeadings.append($dropdownItem);
      });
      
      jQuery('.dropdown-nav__link').click((e) => {
        const $menu = jQuery('.dropdown-nav__target');
        const $background = jQuery('.dropdown-nav');
        const $button = jQuery('.dropdown-nav__trigger');
        $button.toggleClass('dropdown-nav__trigger--rotated');
        $menu.toggleClass('dropdown-nav__target--open');
        $background.toggleClass('bg-black text-white pb-5');
    });

    window.addEventListener('scroll', throttle(() => {
      const scrollTop = jQuery(window).scrollTop() + 20;

      $headings.each(function(key) {
        const li = $scrollHeadings[0].children[key];

        if (jQuery(this).offset().top < scrollTop || jQuery(window).scrollTop() == jQuery(document).height() - jQuery(window).height()) {
          li.classList.add('before:!bg-black');
        } else {
          li.classList.remove('before:!bg-black');
        }
      });
    }, 150));
    
  });
};

if (top === self) initScroll();

export default initScroll;