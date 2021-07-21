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
 *   id = "featured_exhibition_collection",
 *   title = @Translation("Featured Exhibition Collection"),
 *   help = @Translation("Render a collection of featured exhibition teasers."),
 *   theme = "views_view_featured_exhibition_collection",
 *   display_types = { "normal" }
 * )
 */
class FeaturedExhibitionCollection extends StylePluginBase {

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
