export default {
  title: 'Molecule/Navigation',
  excludeStories: ['main_nav_context']
};

import pager_template from './pager.twig';

// note: the `t()` and `without()` filters aren't working; need Storybook Twig extensions?
const item = text => ({
  href: '#',
  attributes: null,
  ...(text ? { text } : {})
});

export const pager = ({ current, max, ...otherArgs }) => {
  const diff = max - current;
  if (diff < 0) return `current can't exceed max`;

  // number of items in `items.pages`
  let length = 3;
  if (max < 3) {
    length = max;
  } else if (diff < 2) {
    length = diff + 2;
  }

  return pager_template({
    heading_id: 'pager_heading_id',
    current,
    ellipses: {
      previous: (current > 3),
      next: (diff > 2) && (max > 4)
    },
    items: {
      previous: (current > 1) && item('Previous'),
      first: (current > 2) && item('First'),
      last: (diff > 1) && (max > 3) && item('Last'),
      next: diff && item('Next'),
      // array has empty slots until first needed key:
      pages: Array(current - 1 || 1).concat(Array.from({ length }, item))
    },
    ...otherArgs
  });
};

pager.args = { current: 6, max: 12 };

pager.argTypes = {
  max: {
    control: {
      type: 'range',
      min: 1,
    },
  },
  current: {
    control: {
      type: 'range',
      min: 1,
    },
  }
};

import scroll_nav from './scroll-nav.twig';

export { scroll_nav };

scroll_nav.args = {
  items: [
    'About the Exhibition',
    'Selected Works',
    'About the Artist',
    'Exhibition News & Events',
    'In the Press',
    'Educational Materials'
  ],
  ticket_link: {
    url: '#',
    title: 'Purchase tickets'
  }
};

scroll_nav.decorators = [
  story => /* html */ `
    <div class="m-6">
      ${story()}
    </div>
  `
];