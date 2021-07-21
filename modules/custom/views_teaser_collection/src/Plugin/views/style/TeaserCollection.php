<?php

namespace Drupal\views_teaser_collection\Plugin\views\style;

use Drupal\core\form\FormStateInterface;
use Drupal\views\Plugin\views\style\StylePluginBase;

/**
 * Style plugin to render a collection of teasers.
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "teaser_collection",
 *   title = @Translation("Teaser Collection"),
 *   help = @Translation("Render a collection of teasers."),
 *   theme = "views_view_teaser_collection",
 *   display_types = { "normal" }
 * )
 */
class TeaserCollection extends StylePluginBase {

  /**
   * Does this Style plugin allow Row plugins?
   *
   * @var bool
   */
  protected $usesRowPlugin = TRUE;

  /**
   * Does the Style plugin support grouping of rows?
   *
   * @var bool
   */
  protected $usesGrouping = FALSE;

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['fancy'] = ['default' => FALSE];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);

    // Path prefix for TARDIS links.
    $form['fancy'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Fancy style'),
      '#default_value' => $this->options['fancy'] ?? FALSE,
      '#description' => $this->t('Apply a fancy style to the collection for the given number of items.'),
    ];

  }

}
