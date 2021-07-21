<?php

use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Implements hook_preprocess_taxonomy_term().
 */
function galleries_preprocess_taxonomy_term(array &$variables) {
  $term = $variables['term'];
  $vid = $term->bundle();
  $current_view_mode = $variables['view_mode'];
  $allowed_view_modes = ['full'];

  if (in_array($current_view_mode, $allowed_view_modes)) {
    // Landing page redirects.
    if ($term->hasField('field_landing_page')) {
      $node = $term->field_landing_page->entity;
      if ($node) {
        $response = new RedirectResponse($node->toUrl()->toString());
        $response->send();
        exit();
      }
    }
  }
}
