export default {
  title: 'Atom/Button Link',
  decorators: [story => `<div class="m-8">${story()}</div>`]
};


import normal_button_link from './normal.twig';

export { normal_button_link };

normal_button_link.args = {
  link: { url: '#', title: 'Button' }
};