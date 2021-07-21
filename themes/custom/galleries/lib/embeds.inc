<?php

/**
 * Implements template_preprocess_entity_embed_container().
 */
function galleries_preprocess_entity_embed_container(&$variables) {
  // Set floats.
  $attributes = $variables['attributes'];
  if (isset($attributes['class'])) {
    if (in_array('align-right', $attributes['class'])) {
      $variables['attributes']['class'] = array_diff($attributes['class'], ['align-right']);
      $variables['attributes']['class'] = array_merge(
        $variables['attributes']['class'],
        ['wysiwyg-float-right']
      );
      $variables['alignment'] = 'right';
    }
    elseif (in_array('align-left', $attributes['class'])) {
      $variables['attributes']['class'] = array_diff($attributes['class'], ['align-left']);
      $variables['attributes']['class'] = array_merge(
        $variables['attributes']['class'],
        ['wysiwyg-float-left']
      );
      $variables['alignment'] = 'left';
    }
  }
}
