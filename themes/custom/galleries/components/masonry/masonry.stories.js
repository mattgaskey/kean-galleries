export default { title: 'Organism/Masonry' };

import { picture } from '../media/media.stories';
import { simple_teaser } from '../teaser/teaser.stories';

import media_grid_template from './media-grid.twig';
export const media_grid = args => media_grid_template({ ...args });

const stockSrc = ({ width: w = 600, height: h = 450 }) => 'https://place-hold.it/' + w + 'x' + h;

media_grid.args = {
  in_sidebar: false,
  headline: 'Selected Works',
  gallery: [
    { width: 1200, height: 600, src: stockSrc({width: 1200, height: 600}), info: "<p><span class='italic'>Mao Trump</span>, 2016</p><p>Screenprint and acrylic on canvas</p><p>54 1/2 x 40 in</p><p>138.4 x 101.6 cm</p>", description: "<p class='mt-10 font-normal'>To maximize his political statement, Bennett combined an image of Chairman Mao Zedong originally silk-screened by Andy Warhol in 1972 with an image of then-American businessman Donald Trump who later announced his intention to run for public office. For Bennett, this controversial image illustrates the perils of power as it pertains to both Eastern and Western political, cultural, and economic systems.</p>" },
    { width: 1600, height: 900, src: stockSrc({width: 1600, height: 900}), info: '<p>Test</p>', description: '<p>More testing of captions</p>' },
    { width: 1600, height: 1200, src: stockSrc({width: 1600, height: 1200}), info: '', description: '' },
    { width: 1200, height: 1600, src: stockSrc({width: 1200, height: 1600}), info: '', description: '' },
    { width: 600, height: 200, src: stockSrc({width: 600, height: 200}), info: '', description: '' },
    { width: 900, height: 600, src: stockSrc({width: 900, height: 600}), info: '', description: '' },
    { width: 1420, height: 1792, src: stockSrc({width: 1420, height: 1792}), info: '', description: '' }
  ]
};

import teaser_grid_template from './teaser-grid.twig';
export const teaser_grid = args => teaser_grid_template({ ...args, });

teaser_grid.args = {
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
  ].map(simple_teaser)
};