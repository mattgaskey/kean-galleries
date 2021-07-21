<?php

namespace Drupal\gcse\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class SettingsForm.
 *
 * @package Drupal\gcse\Form
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'gcse_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['gcse.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('gcse.settings');

    $form['control'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('GCSE Settings'),
    ];

    $form['control']['api_key'] = [
      '#type'  => 'textfield',
      '#title' => $this->t('GCSE API key'),
      '#description' => $this->t('Identifier for this search.'),
      '#default_value' => $config->get('api_key'),
    ];

    $form['control']['search_page'] = [
      '#type'  => 'textfield',
      '#title' => $this->t('Search page'),
      '#description' => $this->t('Relative URL for the search page.'),
      '#default_value' => $config->get('search_page'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('gcse.settings');
    $form_state->cleanValues();

    foreach ($form_state->getValues() as $key => $value) {
      $config->set($key, $value);
    }
    $config->save();

    parent::submitForm($form, $form_state);
  }

}
