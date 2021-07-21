export default { title: 'Molecule/Quote' };

import { picture } from '../media/media.stories';
import quote_template from './quote.twig';

export const quote = args => quote_template({
  ...args,
  picture: args.picture || (args.with_picture && picture({ src: 'https://place-hold.it/800x800' }))
});

quote.args = {
  with_picture: false,
  quotation: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn before you can converse with the experts. This is certainly true in astronomy both in terms of terms that refer to the cosmos and terms that describe the tools of the trade, the most prevalent.',
  attribution: 'First Name, Last Name, <a href="#">Source that might be a link</a>'
};