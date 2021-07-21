export default { title: 'Organism/Page Header' };

import simple_page_header_template from './simple.twig';

export const simple_page_header = args => simple_page_header_template({ ...args });

simple_page_header.args = {
  headline: 'The Name of the Exhibition',
  date: 'September 01 - December 17, 2021',
  location: { url: '#', title: 'Burger Gallery' }
};