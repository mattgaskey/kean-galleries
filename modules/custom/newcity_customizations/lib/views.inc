<?php

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements template_preprocess_views_view().
 */
function newcity_customizations_preprocess_views_view(&$variables) {
  $view = $variables['view'];
  $id = $view->id();

  if (strpos($id, 'icon') !== FALSE) {
    $variables['#attached']['library'][] = 'newcity_customizations/views';
  }

  $variables['display_title'] = $view->getTitle();
}

/**
 * Implments hook_form_views_exposed_form_alter().
 */
function newcity_customizations_form_views_exposed_form_alter(&$form, FormStateInterface $form_state) {
  $view = $form_state->getStorage('view')['view'];
}
