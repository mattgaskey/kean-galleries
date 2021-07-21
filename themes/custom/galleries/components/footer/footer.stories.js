export default { title: 'Wrapper/Footer' };

import { social_links } from '../social-media/social-media.stories';

import footer from './footer.twig';

export { footer };

footer.args = {
  phone: '908-737-5349',
  email: 'galleries@kean.edu',
  column_links: [
    { url: '#', title: 'Artist Submissions' },
    { url: '#', title: 'Locations' },
    { url: '#', title: 'Upcoming Events' },
    { url: '#', title: 'Contact Us' }
  ],
  social_links: social_links({ ...social_links.args }),
  statement_links: [
    { url: '#', title: 'Accreditation & Assessment' },
    { url: '#', title: 'Site Policies' }
  ]
};