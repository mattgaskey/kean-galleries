<?php

namespace Drupal\gcse\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * An example controller.
 */
class SearchController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function search() {
    $config = \Drupal::config('gcse.settings');
    $api_key = $config->get('api_key');
    $markup = <<<EOF
  <script>
    (function() {
      var cx = '$api_key';
      var gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
          '//cse.google.com/cse.js?cx=' + cx;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
    })();
  </script>
  <div class="gcse-searchresults-only"></div>
EOF;

    $build = [
      '#type' => 'processed_text',
      '#text' => $markup,
      '#format' => 'full_html',
    ];
    return $build;
  }

}
