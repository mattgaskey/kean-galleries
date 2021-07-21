export default { title: 'Wrapper/Header' };

import header from './header.twig';

export { header };

header.args = {
  action_links: ['Kean.edu'].map(title => ({ title, url: '#' })),
  main_nav_links: [
    { url: '#', title: 'Exhibitions', below: [
      { url: '#', title: 'Some Exhibitions' },
      { url: '#', title: 'Some Other Exhibitions' },
      { url: '#', title: 'These Exhibitions' },
      { url: '#', title: 'Those Exhibitions' },
      { url: '#', title: 'Esas Exhibiciones' }
    ] },
    { url: '#', title: 'Visit', below: [
      { url: '#', title: 'Come and See' },
      { url: '#', title: 'Gift Shop' },
      { url: '#', title: 'Map' }
    ] },
    { url: '#', title: 'Learn' },
    { url: '#', title: 'About', below: [
      { url: '#', title: 'Mission Statement' },
      { url: '#', title: 'Letter from the President' },
      { url: '#', title: 'Curation' },
      { url: '#', title: 'Artists' },
      { url: '#', title: 'Contact Us' },
      { url: '#', title: 'Endow Us' }
    ] }
  ],
  search_form_action: '#',
};

header.decorators = [story => story() + '<div class="pt-5 bg-gray" style="height: 1000px"><div class="container">[content below header]</div></div>'];