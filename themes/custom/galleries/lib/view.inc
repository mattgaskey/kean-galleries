<?php

/**
 * Implements template_preprocess_input().
 */
function galleries_preprocess_input(&$variables) {
  // HTML5 date inputs.
  if (isset($variables['attributes']['name'])) {
    if (strpos($variables['attributes']['name'], '_date') !== FALSE) {
      $variables['attributes']['type'] = 'date';
    }
  }
}

/**
 * Implements TEMPLATE_preprocess_views_view().
 */
function galleries_preprocess_views_view(&$variables) {
  $view = $variables['view'];
  $display = $view->getDisplay()->getPluginId();
  $id = $view->id();
  

  if ($display == 'page') {
    // Page region injection.
    $allowed_regions = ['sidebar', 'breadcrumbs'];
    $variables['regions'] = \Drupal::service('newcity_customizations.theme')->addRegionsToBuild($allowed_regions);
  }
}
