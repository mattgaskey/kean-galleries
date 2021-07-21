export default { title: 'Organism/Feature' };

import { picture, video } from '../media/media.stories';
import { normal_button_list } from '../link-list/link-list.stories';


import simple_feature_template from './simple.twig';

export const simple_feature = args => simple_feature_template({
  ...args,
});

simple_feature.args = {
  flipped: false,
  picture: picture({
    src: 'https://place-hold.it/800x450'
  }),
  headline: 'Virtual Tour: Newest Americans',
  wysiwyg: /* html */ `
    <div>
      <p>This element could be used to feature non-exhibition content. A few examples include featuring virtual tours, a call-to-action for artists to submit work, or a way to showcase artists in residence.</p>
    </div>
  `,
  /* can use other types of link-lists here (doesn't have to be the fancy button-links) */
  link_list: normal_button_list({
    links: [{ url: '#', title: 'explore more tours' }]
  })
};

simple_feature.decorators = [story => /* html */ `<div class="mt-20">${story()}</div>`];

import fancy_feature_template from './fancy.twig';
export const fancy_feature = args => fancy_feature_template({
  ...args,
});

fancy_feature.args = {
  flipped: false,
  picture: picture({
    src: 'https://place-hold.it/800x440'
  }),
  headline: 'Artist in Residence: Knowledge Bennet',
  wysiwyg: /* html */ `
    <div>
      <p>This element could be used to feature non-exhibition content. A few examples include featuring virtual tours, a call-to-action for artists to submit work, or a way to showcase artists in residence.</p>
    </div>
  `,
  /* can use other types of link-lists here (doesn't have to be the fancy button-links) */
  link_list: normal_button_list({
    links: [{ url: '#', title: 'Meet Knowledge' }],
    variant: 'yellow'
  })
};

fancy_feature.decorators = [story => /* html */ `<div class="mt-20">${story()}</div>`];