import Twig from 'twig';
import url from 'url';
import twigDrupal from 'twig-drupal-filters';

twigDrupal(Twig);

Twig.extendFunction('children', () => {
  return [];
});

Twig.extendFunction('icon', (name) => {
  return '<img src="http://place-hold.it/18x18" alt="placeholder for ' + name + ' icon">';
});

// Check for a Drupal render array, never true in Storybook.
Twig.extendFunction('is_render_array', (build) => false);

// HACK: Whitelisting the fractal_link function used in Drupal
Twig.extendFunction('fractal_link', (build) => false);

/**
 * $components = parse_url($url);
 *   $host_pieces = explode('.', $components['host']);
 *   return $host_pieces[count($host_pieces) - 2];
 */
Twig.extendFilter('matchsocial', (str) => {
  if (str) {
    const u = url.parse(str, true)
    if (u.hostname) {
      const host_pieces = u.hostname.split('.')
      return host_pieces[host_pieces.length - 2];
    }
  }
  return false
});

/**
 * Mock https://twig-extensions.readthedocs.io/en/latest/intl.html#localizeddate
 */
Twig.extendFilter('localizeddate', (str) => {
  const d = new Date(str * 1000);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleString(undefined, options);
});