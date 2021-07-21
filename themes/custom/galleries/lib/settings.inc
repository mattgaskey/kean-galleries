<?php

use Drupal\Core\Form\FormStateInterface;

/**
 * Implments hook_form_system_theme_settings_alter().
 */
function galleries_form_system_theme_settings_alter(&$form, FormStateInterface &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue 943212.
  if (isset($form_id)) {
    return;
  }
}
