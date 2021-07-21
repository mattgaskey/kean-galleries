<?php

/**
 * Implements theme_preprocess_field.
 */
function galleries_preprocess_field(&$variables) {
  $element = $variables['element'];
  $type = $element['#field_type'];
  $name = $element['#field_name'];
  $bundle = $element['#bundle'];

  // Wrapper classes on body text.
  if ($type == 'text_with_summary') {
    if ($bundle == 'news') {
      $variables['attributes']['class'][] = 'prose';
    }
    $variables['#attached']['library'][] = 'galleries/table';
  }

  if ($type == 'text_long') {
    $variables['attributes']['class'][] = 'prose';
    $variables['#attached']['library'][] = 'galleries/table';
  }
}

/**
 * Implements THEME_suggestsions_field_alter().
 */
function galleries_theme_suggestions_field_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];
  // Inject view mode.
  if ($element['#entity_type'] == 'node') {
    $suggestions[] = 'field__node__' . $element['#bundle'] . '__' . $element['#view_mode'];
    $suggestions[] = 'field__node__' . $element['#field_name'] . '__' . $element['#bundle'] . '__' . $element['#view_mode'];
  }
}
