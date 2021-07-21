export default { title: 'Organism/Alert' };

import alert from './alert.twig';
export { alert };

alert.args = {
  closeable: true,
  headline: 'Alert Message',
  wysiwyg: /* html */ `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae lobortis neque, ac commodo metus. Cras semper dui et libero placerat, eget elementum ante efficitur. Duis id orci arcu. <a href="#">Quisque tortor nisi</a>, posuere nec est id, dictum facilisis lacus.</p>
  `,
  site_wide: true,
  alert_id: 'alert'
};