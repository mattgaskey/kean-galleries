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
 *   id = "stacked_teaser_collection",
 *   title = @Translation("Stacked Collection"),
 *   help = @Translation("Render a collection of stacked teasers."),
 *   theme = "views_view_stacked_teaser_collection",
 *   display_types = { "normal" }
 * )
 */
class StackedCollection extends StylePluginBase {

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

}
