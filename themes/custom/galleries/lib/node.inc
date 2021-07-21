<?php

/**
 * Implements hook_preprocess_node().
 */
function galleries_preprocess_node(&$variables) {
  $node = $variables['node'];
  // $variables['summary'] = $node->body->first()->summary;
  $type = $node->bundle();

  // Page region injection.
  // Allowed view modes:
  $current_view_mode = $variables['view_mode'];
  $allowed_view_modes = ['full'];
  $allowed_regions = ['sidebar', 'breadcrumbs'];

  if (in_array($current_view_mode, $allowed_view_modes)) {
    $variables['regions'] = \Drupal::service('newcity_customizations.theme')->addRegionsToBuild($allowed_regions);
  }
}
