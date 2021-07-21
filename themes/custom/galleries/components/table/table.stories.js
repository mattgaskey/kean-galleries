export default { title: 'Table' };

import table_template from './table.twig';

/* export */ const table = args => table_template(args);
table.args = {
  caption: 'This is the table caption. It should be included, even if it is not visible, for accessibility purposes.',
  variant: 'table--content',
  responsive_strategy: '',
};
table.argTypes = {
  variant: {
    control: {
      type: 'inline-radio',
      options: ['table--content', 'table--striped']
    }
  },
  responsive_strategy: {
    control: {
      type: 'select',
      options: ['', 'table-wrapper--columnize', 'table-wrapper--overflow']
    }
  }
};