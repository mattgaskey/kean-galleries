const mainNav = () => {
  if (!window.jQuery) return;

  jQuery(document).ready(() => {
    jQuery('.main-nav__link').on('mouseover', function() {
      jQuery(this).attr('data-dropdown-active', 'true');
    });
    jQuery('.main-nav__link').on('mouseout', function() {
      jQuery(this).attr('data-dropdown-active', 'false');
    });
    jQuery('.main-nav__mobile-dropdown-trigger').on('click', function() {
      const $parent = jQuery(this).parent();
      if ($parent.attr('data-dropdown-active') == 'true') {
        $parent.attr('data-dropdown-active', 'false');
      } else {
        $parent.attr('data-dropdown-active', 'true');
      }
    });
    jQuery('.main-nav__link > a').on('focus', function() {
      // Clear any open ones.
      jQuery(this).closest('.main-nav').find('.main-nav__link').attr('data-dropdown-active', 'false');
    });

    jQuery('.main-nav__mobile-dropdown-trigger').click((e) => {
      const $button = jQuery(e.currentTarget);
      const active = $button.data('dropdown-active') || false;
      // Close all the others.
      $button.closest('.main-nav').find('.main-nav__mobile-dropdown-trigger')
        .data('dropdown-active', false)
        .toggleClass('main-nav__mobile-dropdown-trigger--rotated', false)
        .next('.dropdown').toggleClass('dropdown--open', false);
      $button
        .data('dropdown-active', !active)
        .toggleClass('main-nav__mobile-dropdown-trigger--rotated', !active)
        .next('.dropdown').toggleClass('dropdown--open', !active);
    });

    document.querySelectorAll('.main-nav__link > a').forEach((link) => {
      link.addEventListener('keydown', function(e) {
        if (e.key === "ArrowRight") {
          jQuery(link).parent().next('li').find('a').first().focus();
        }
        if (e.key === "ArrowLeft") {
          jQuery(link).parent().prev('li').find('a').first().focus();
        }
        if (e.key == " ") {
          e.preventDefault();
          jQuery(link).parent().attr('data-dropdown-active', 'true').find('.dropdown a').first().focus();
        }
      });
    });
  });
};

if ( top === self ) mainNav();

export default mainNav;

