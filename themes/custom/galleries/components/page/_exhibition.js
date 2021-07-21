import { header } from '../header/header.stories';
import { footer } from '../footer/footer.stories';
import { alert } from '../alert/alert.stories';
import { simple_page_header } from '../page-header/page-header.stories';
import { figure, picture } from '../media/media.stories';
import { media_grid } from '../masonry/masonry.stories';
import { featured_event_teaser } from '../teaser/teaser.stories';
import { quote_list } from '../quote-list/quote-list.stories';

import exhibition from './exhibition.twig';

export { exhibition };

const stockSrc = ({ width: w = 600, height: h = 450 }) => 'https://place-hold.it/' + w + 'x' + h;

exhibition.args = {
  header: header(header.args),
  alert: alert(alert.args),
  simple_page_header: simple_page_header({
    headline: 'Knowledge Bennett, <em>Pieces of a Man</em>',
    date: 'September 01 - December 17, 2021',
    location: `<span class="inline-block sm:pl-3 sm:before:content-empty sm:before:content-pipe sm:before:text-gray sm:before:pr-3 prose prose-lg text-lg font-medium"><a href="#">Burger Gallery</a></span>`
  }),
  banner: figure({
    media: picture({ width: 850, height: 595 }),
    caption: '6 Obama Cowboy (Miniature), 2017. Acrylic and Silkscreen on canvas',
    caption_classes: 'text-gray text-base'
  }),
  masonry: media_grid({
    in_sidebar: true,
    headline: 'Selected Works',
    gallery: [
      { width: 1200, height: 600, src: stockSrc({width: 1200, height: 600}), caption: 'A little thing I wrote', info: "<p><span class='italic'>Mao Trump</span>, 2016</p><p>Screenprint and acrylic on canvas</p><p>54 1/2 x 40 in</p><p>138.4 x 101.6 cm</p>", description: "<p class='mt-10 font-normal'>To maximize his political statement, Bennett combined an image of Chairman Mao Zedong originally silk-screened by Andy Warhol in 1972 with an image of then-American businessman Donald Trump who later announced his intention to run for public office. For Bennett, this controversial image illustrates the perils of power as it pertains to both Eastern and Western political, cultural, and economic systems.</p>" },
      { width: 1600, height: 900, src: stockSrc({width: 1600, height: 900}), caption: 'Something more than just a caption', info: '<p>Test</p>', description: '<p>More testing of captions</p>' },
      { width: 1600, height: 1200, src: stockSrc({width: 1600, height: 1200}), caption: 'Info you need to know abou this photo', info: '', description: '' },
      { width: 1200, height: 1600, src: stockSrc({width: 1200, height: 1600}), caption: 'Click me and I\'m gone', info: '', description: '' },
      { width: 600, height: 200, src: stockSrc({width: 600, height: 200}), caption: 'I show up here but not in the fancybox info section', info: '', description: '' },
      { width: 900, height: 600, src: stockSrc({width: 900, height: 600}), caption: 'Click to see a full screen modal with more info', info: '', description: '' },
      { width: 1420, height: 1792, src: stockSrc({width: 1420, height: 1792}), caption: 'A caption is a caption by another name', info: '', description: '' }
    ]
  }),
  featured_event_teaser: featured_event_teaser(featured_event_teaser.args),
  quote_list: quote_list(quote_list.args),
  footer: footer(footer.args),
};