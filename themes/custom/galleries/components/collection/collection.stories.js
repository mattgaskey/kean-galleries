export default { title: 'Organism/Collection' };

import { picture } from '../media/media.stories';
import { event_teaser, simple_teaser } from '../teaser/teaser.stories';

import simple_teaser_collection_template from './simple-teaser-collection.twig';
export const simple_teaser_collection = args => simple_teaser_collection_template({
  items: args.items || Array.from(
    { length: Math.max(1, args.item_count || 3) },
    () => simple_teaser({
      ...simple_teaser.args,
      prose_white: args.prose_white
    })
  )
});
simple_teaser_collection.args = {
  item_count: 3,
  prose_white: false /* needed if against dark background */
};
simple_teaser_collection.argTypes = {
  prose_white: {
    table: {
      disable: true
    }
  }
};

export const event_teaser_collection = args => simple_teaser_collection_template({
  items: args.items || Array.from(
    { length: Math.max(1, args.item_count || 3) },
    () => event_teaser(event_teaser.args)
  )
});
event_teaser_collection.args = {
  item_count: 3
};