<?php

namespace Drupal\newcity_customizations\Plugin\Field\FieldWidget;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\text\Plugin\Field\FieldWidget\TextareaWithSummaryWidget;

/**
 * Plugin implementation of the 'text_summary_only' widget.
 *
 * @FieldWidget(
 *   id = "text_summary_only",
 *   label = @Translation("Summary only"),
 *   field_types = {
 *     "text_with_summary"
 *   }
 * )
 */
class SummaryOnlyWidget extends TextareaWithSummaryWidget {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'summary_rows' => '3',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $element = [];
    $element['summary_rows'] = [
      '#type' => 'number',
      '#title' => t('Summary rows'),
      '#default_value' => $this->getSetting('summary_rows'),
      '#description' => $element['rows']['#description'],
      '#required' => TRUE,
      '#min' => 1,
    ];
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    $summary[] = t('Number of summary rows: @rows', ['@rows' => $this->getSetting('summary_rows')]);

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);
    // Not actually suppressing the underlying textarea, just hiding it.
    $element += [
      '#prefix' => '<div class="summary-only">',
      '#suffix' => '</div>',
    ];
    $element['#attached']['library'][] = 'newcity_customizations/summary-only';

    $element['summary'] = [
      '#type' => 'textarea',
      '#default_value' => $items[$delta]->summary,
      '#title' => t('Summary'),
      '#rows' => $this->getSetting('summary_rows'),
      '#description' => t('Leave blank to use trimmed value of full text as the summary.'),
      '#attributes' => ['class' => ['text-summary']],
    ];

    return $element;
  }

}
