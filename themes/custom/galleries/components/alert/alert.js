const setUpAlert = () => {
  jQuery(document).ready(() => {
    const $alert = jQuery('#alert');
    const isClosed = localStorage.getItem('alert_closed') == 'true';
    if ($alert && !isClosed && Date.now() - localStorage.getItem('alert_closed_time') > ( 24 * 60 * 60 * 1000 )) {
      $alert.removeClass('hidden');
      jQuery('#close_alert').on('click', function(e) {
        $alert.hide();
        localStorage.setItem('alert_closed_time', Date.now());
        localStorage.setItem('alert_closed', 'true');
      });
    }
  });
};

if (top === self) setUpAlert();

export default setUpAlert;