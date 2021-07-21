import { header } from '../header/header.stories';
import { footer } from '../footer/footer.stories';
import { featured_teaser, simple_teaser, event_teaser } from '../teaser/teaser.stories';
import { picture } from '../media/media.stories';
import { teaser_grid } from '../masonry/masonry.stories';
import { simple_feature, fancy_feature } from '../feature/feature.stories';
import { normal_button_list } from '../link-list/link-list.stories';
import { event_teaser_slab } from '../teaser-slab/teaser-slab.stories';
import { event_teaser_collection } from '../collection/collection.stories';

import home from './home.twig';

export { home };

home.args = {
  header: header(header.args),
  footer: footer(footer.args),
  featured_teaser_1: featured_teaser({
    flipped: true,
    picture: picture({ width: 850, height: 595 }),
    link: { url: '#', title: 'Knowledge Bennet, <em>Pieces of a Man</em>', large: true },
    intro: 'Represents photographic art that addresses the struggle and injustices experienced by Black Americans and people of color in New Jersey.'
  }),
  featured_teaser_2: featured_teaser({
    flipped: false,
    picture: picture({ width: 630, height: 646 }),
    link: { url: '#', title: 'Laura Petrovich Cheney: Reconstruction', large: true },
    intro: 'Exploring natural disasters and catastrophes through its aftermath, creating meaning and beauty from chaos.'
  }),
  teaser_grid: teaser_grid({
    headline: 'Exhibitions',
    link: { url: '#', title: 'See All Exhibitions' },
    teasers: [
      {
        link: { url: '#', title: 'Jerome China' },
        picture: picture({ height: 450 }),
        intro: '<p>A short desription about Jerome China\'s exhibition of mixed media sculpture</p>'
      },
      {
        link: { url: '#', title: 'Da Vinci - Inventions' },
        picture: picture({ height: 200 }),
        intro: '<p>This world-traveling interactive exhibit features reproductions of over 60 of da Vinci’s most important inventions.</p>'
      },
      {
        link: { url: '#', title: 'The Newest Americans: New Citizens Reflect on What America Means to Them' },
        picture: picture({ height: 600 }),
        intro: '<p>Immigration rhetorics are challenged in this nuanced look at America’s newest citizens.</p>'
      },
      {
        link: { url: '#', title: 'Patient No More: People with Disabilities Securing Civil Rights' },
        picture: picture({ height: 300 }),
        intro: '<p>On view will be a collection of photography, mixed-media abstract works on canvas, sculptures, installations and large-scale acrylic and silkscreen paintings.</p>'
      },
      {
        link: { url: '#', title: 'Art as Witness: Political Graphics 2016 - 2018' },
        picture: picture({ height: 500 }),
        intro: '<p>These artworks are an outcry to question, protect and demonstrate our civil rights, and ultimately our universal human rights.</p>'
      },
      {
        link: { url: '#', title: 'Come Together' },
        picture: picture({ height: 300 }),
        intro: '<p>Represents photographic art that addresses the struggle and injustices experienced by Black Americans and people of color in New Jersey.</p>'
      }
    ].map(simple_teaser),
  }),
  fancy_feature: fancy_feature({
    flipped: true,
    picture: picture({
      src: 'https://place-hold.it/800x550'
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
  }),
  event_teasers: event_teaser_slab(event_teaser_slab.args),
  simple_feature: simple_feature(simple_feature.args)
};