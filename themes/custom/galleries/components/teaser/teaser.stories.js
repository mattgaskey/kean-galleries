export default { title: 'Molecule/Teaser' };

import { picture } from '../media/media.stories';

import simple_teaser_template from './simple.twig';
export const simple_teaser = args => simple_teaser_template({
  ...args,
});
simple_teaser.args = {
  picture: picture({ width: 1000, height: 600 }),
  link: { url: '#', title: 'Kean Galleries Launches 18-month Accelerated BSN Program' },
  intro: 'The Kean Galleries Saints proudly compete through 15 NCAA Division II athletic teams in the East Coast Conference'
};
simple_teaser.decorators = [story => /* html */ `<div class="max-w-2xl">${story()}</div>`];

import event_teaser_template from './event.twig';
export const event_teaser = args => event_teaser_template({
  ...args,
});
event_teaser.args = {
  date: 'Sunday, January 11',
  time: '1:00pm-3:00pm',
  link: { url: '#', title: 'The Longer Title of an Upcoming Event' },
  intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus sodales diam eget tincidunt.',
  location: 'Burger Gallery',
  list: false
}

import featured_event_teaser_template from './featured-event.twig';
export const featured_event_teaser = args => featured_event_teaser_template({
  ...args,
});
featured_event_teaser.args = {
  picture: picture({ width: 400, height: 300 }),
  date: 'Sunday, January 11',
  time: '1:00pm-3:00pm',
  link: { url: '#', title: 'The Longer Title of an Upcoming Event' },
  intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus sodales diam eget tincidunt.'
};

import featured_teaser_template from './featured.twig';
export const featured_teaser = args => featured_teaser_template({
  ...args,
});
featured_teaser.args = {
  flipped: false,
  picture: picture({ width: 2000, height: 1200 }),
  link: { url: '#', title: 'Kean Galleries Launches Innovative Online Pharmacy Program', large: true },
  intro: 'Kean Galleries continues its mission of providing groundbreaking healthcare education with its new three-year online pathway towards the Doctor of Pharmacy degree (PharmD) program, launching this fall.'
}

import list_teaser_template from './list-teaser.twig';
export const list_teaser = args => list_teaser_template({
  ...args,
});
list_teaser.args = {
  date: 'Sunday, January 11',
  time: '1:00pm-3:00pm',
  link: { url: '#', title: 'The Longer Title of an Upcoming Event' },
  intro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus sodales diam eget tincidunt.',
  location: 'Burger Gallery',
  picture: picture({ width: 400, height: 300 })
}