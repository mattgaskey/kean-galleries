<?php

/**
 * Implements hook_theme_suggestions_HOOK_alter() for form templates.
 */
function galleries_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  // Block suggestions for custom block bundles.
  if (isset($variables['elements']['content']['#block_content'])) {
    array_splice($suggestions, 1, 0, 'block__block_content__' . $variables['elements']['content']['#block_content']->bundle());
  }
}

/**
 * Implements hook_preprocess_block().
 */
function galleries_preprocess_block(&$variables) {
  // Make block object available.
  $block = $variables['content']['#block_content'] ?? NULL;
  $variables['block'] = $block;

  if ($block) {
    if ($block->hasField('field_is_light') && $block->field_is_light->value) {
      $variables['attributes']['class'][] = 'bg-white';
      $variables['attributes']['class'][] = 'p-40';
      $variables['attributes']['class'][] = 'mb-40';
    }

    if ($block->hasField('field_is_dark') && $block->field_is_dark->value) {
      $variables['attributes']['class'][] = 'bg-gray-100';
      $variables['attributes']['class'][] = 'p-40';
      $variables['attributes']['class'][] = 'mb-40';
    }

    $lang = $block->language();
    $langcode = $lang->getId();
    if ($langcode != "en") {
      $variables['attributes']['lang'] = $langcode;
    }
    $dir = $lang->getDirection();
    if ($dir != "ltr") {
      $variables['attributes']['dir'] = $dir;
    }
  }
}
