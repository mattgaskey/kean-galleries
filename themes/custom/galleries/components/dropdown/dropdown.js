const dropdownNav = () => {
  if (!window.jQuery) return;

  jQuery(document).ready(() => {
    const $menu = jQuery('.dropdown-nav__target');
    const $background = jQuery('.dropdown-nav');
    const $button = jQuery('.dropdown-nav__trigger');
    $button.click((e) => {
      jQuery(e.currentTarget).toggleClass('dropdown-nav__trigger--rotated');
      $menu.toggleClass('dropdown-nav__target--open');
      $background.toggleClass('bg-black text-white pb-5');
    });
  });
};

if ( top === self ) dropdownNav();

export default dropdownNav;