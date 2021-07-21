<?php

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_TYPE_alter().
 */
function newcity_customizations_form_entity_embed_dialog_alter(array &$form, FormStateInterface $form_state) {
  // Hide caption for quotes embed.
  if ($form['attributes']['data-entity-type']['#value'] == 'embeds') {
    $form['#title'] = t('Insert embedded content');
    $form['attributes']['data-caption']['#access'] = FALSE;
  }
}

/**
 * Implements hook_field_widget_form_alter().
 */
function newcity_customizations_field_widget_form_alter(&$element, FormStateInterface $form_state, $context) {

  if ($context['widget']->getPluginId() == 'text_with_title_widget') {
    // Hide the format selection.
    $element['#after_build'][] = '_remove_text_with_title_format_box';
  }
}

/**
 * After build callback for text_with_title_widget.
 */
function _remove_text_with_title_format_box($form_element, FormStateInterface $form_state) {
  $form_element['text']['format']['format']['#access'] = FALSE;
  unset($form_element['text']['format']['help']);
  unset($form_element['text']['format']['guidelines']);
  return $form_element;
}
