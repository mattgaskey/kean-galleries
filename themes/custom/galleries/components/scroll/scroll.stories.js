export default { title: 'Organism/Scroll' }

import scroll from './scroll.twig';
export { scroll };

scroll.decorators = [story => /* html */ `<div class="mt-20">${story()}</div>`];