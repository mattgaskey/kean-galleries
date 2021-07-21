<?php

/**
 * Implements theme_preprocess_page.
 */
function galleries_preprocess_page(&$variables) {
  $variables['#attached']['library'][] = 'galleries/container-query';
  $variables['#attached']['library'][] = 'galleries/linkify';
  $variables['#attached']['library'][] = 'galleries/header';
}
