<?php

function galleries_preprocess_paragraph(&$variables) {
  $paragraph = $variables['paragraph'];
  $type = $paragraph->bundle();
  $parent = $paragraph->getParentEntity();
  $variables['type'] = $type;

  // Check if media-grid is on an exhibition page
  if ($type == 'media_grid' && $parent->bundle() == 'exhibition') {
    $variables['in_sidebar'] = TRUE;
  }

  if ($type == 'media_item') {
    $variables['host'] = \Drupal::request()->getSchemeAndHttpHost();
  }
}
