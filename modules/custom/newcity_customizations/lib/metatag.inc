<?php

/**
 * Alter the meta tags for any page prior to page attachment.
 *
 * @param array $metatag_attachments
 *   An array of metatag objects to be attached to the current page.
 */
function newcity_customizations_metatags_attachments_alter(array &$metatag_attachments) {
  // If no cover image, replace with a default.
  $image_found = FALSE;
  foreach ($metatag_attachments['#attached']['html_head'] as $attachment) {
    if ($attachment[1] == 'og_image_0' && !empty($attachment[0]['#attributes']['content'])) {
      $image_found = TRUE;
    }
  }
  if (!$image_found) {
    $default_image_url = \Drupal::request()->getSchemeAndHttpHost() . base_path() . drupal_get_path('module', 'newcity_customizations') . '/images/default-social.jpg';
    $metatag_attachments['#attached']['html_head'][] = [
      [
        '#tag' => 'meta',
        '#attributes' => [
          'property' => "og:image",
          'content' => $default_image_url,
        ],
      ],
      'og_image_0',
    ];
    $metatag_attachments['#attached']['html_head'][] = [
      [
        '#tag' => 'meta',
        '#attributes' => [
          'property' => "twitter:image",
          'content' => $default_image_url,
        ],
      ],
      'twitter:image',
    ];
  }
}
