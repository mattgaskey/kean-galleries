export default { title: 'Organism/Teaser Slab' };

import {
  event_teaser_collection,
  simple_teaser_collection
} from '../collection/collection.stories';

import simple_teaser_slab_template from './simple.twig';

export const simple_teaser_slab = args => simple_teaser_slab_template({
  ...args,
  simple_teaser_collection: args.simple_teaser_collection || simple_teaser_collection({
    ...simple_teaser_collection.args,
    item_count: args.item_count
  }),
  headline: 'headline' in args ? args.headline : /* html */ `Living on Campus`
});

simple_teaser_slab.args = {
  background: null,
  item_count: 4,
  intro: 'Residential living is the best way to fully experience college life while creating memories, making new (and lifelong) friends, and living steps away from the main campus.',
};

import event_teaser_slab_template from './event.twig';
export const event_teaser_slab = args => event_teaser_slab_template({ ...args });
event_teaser_slab.args = {
  gray: false,
  intro: '',
  headline: 'Upcoming Events',
  link: { url: '#', title: 'See the Calendar' },
  teaser_collection: event_teaser_collection(event_teaser_collection.args)
};