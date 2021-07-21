export default { title: 'Molecule/Link List' };

import normal_link_list from './normal.twig';

export { normal_link_list };

normal_link_list.args = {
  inline: false,
  variant: 'violet',
  small: false,
  links: [
    { url: '#', title: 'A Link' },
    { url: '#', title: 'A Link With A Longer Title' },
    { url: '#', title: 'Another Link' }
  ]
};

normal_link_list.argTypes = {
  variant: {
    control: {
      type: 'select',
      options: ['yellow', 'violet', 'red']
    }
  }
};

import normal_button_list from './button.twig';

export { normal_button_list };

normal_button_list.args = {
  inline: true,
  variant: 'violet',
  small: true,
  links: [
    { url: '#', title: 'A Link' },
    { url: '#', title: 'A Link With A Longer Title' },
    { url: '#', title: 'Another Link' }
  ]
};

normal_button_list.argTypes = {
  variant: {
    control: {
      type: 'select',
      options: ['yellow', 'violet', 'red']
    }
  }
};