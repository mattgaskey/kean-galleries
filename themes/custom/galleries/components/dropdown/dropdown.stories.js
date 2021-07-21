
import dropdown_nav from './dropdown.twig';

export { dropdown_nav };

dropdown_nav.args = {
  items: [
    'About the Exhibition',
    'Selected Works',
    'About the Artist',
    'Exhibition News & Events',
    'In the Press',
    'Educational Materials'
  ].map(title => ({ title, url: '#' }))
};