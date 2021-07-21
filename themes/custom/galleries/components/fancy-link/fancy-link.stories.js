export default { title: 'Atom/Fancy Link' };

import fancy_link_template from './fancy-link.twig';
export const fancy_link = args => fancy_link_template({...args});
fancy_link.args = {
  large: false,
  small: false,
  link: { url: '#', title: 'Fancy link with long title to show wrapping behavior' }
};