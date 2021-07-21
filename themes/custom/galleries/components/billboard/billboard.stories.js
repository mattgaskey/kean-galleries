export default { title: 'Organism/Billboard' };

import billboard from './billboard.twig';

export { billboard };

billboard.args = {
  background: false,
  headline: 'Artist Submissions are a thing that some artists do but not all artists especially ones who\'ve got insanely long titles',
  wysiwyg: /* html */ `
    <p>This element could be used to feature non-exhibition content. A few examples might include reaching out to artists to submit their work, requesting more info about the galleries, signing up for a newsletter, etc.</p>
  `,
  links: [
    { url: '#', title: 'Contact Us' },
    { url: '#', title: 'Sign Up for Email' }
  ]
};