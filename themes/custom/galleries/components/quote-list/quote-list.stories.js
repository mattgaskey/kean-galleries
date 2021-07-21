export default { title: 'Organism/Quote List' };

import { quote } from '../quote/quote.stories';

import quote_list_template from './quote-list.twig';

export const quote_list = args => quote_list_template({
  ...args,
  quote: args.quote || quote({
    ...quote.args
  })
});

quote_list.args = {
  headline: 'In the Press',
  quotes: [
    { quotation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam lectus, elementum sit amet convallis et, dignissim non nisi. Proin luctus velit vitae massa pulvinar interdum. Vestibulum lacinia libero facilisis condimentum suscipit. Phasellus vitae mattis orci. Suspendisse vehicula, nunc quis commodo maximus, sem arcu hendrerit diam, id placerat dui elit sed enim.', attribution: 'First Name Last Name, Source' },
    { quotation: 'Vestibulum lacinia libero facilisis condimentum suscipit. Phasellus vitae mattis orci. Suspendisse vehicula, nunc quis commodo maximus, sem arcu hendrerit diam, id placerat dui elit sed enim.', attribution: 'First Name Last Name, Source' },
    { quotation: 'Suspendisse vehicula, nunc quis commodo maximus, sem arcu hendrerit diam, id placerat dui elit sed enim.', attribution: 'First Name Last Name, Source' }
  ]
};