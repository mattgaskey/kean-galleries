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
 *   id = "gallery_collection",
 *   title = @Translation("Gallery of Teasers"),
 *   help = @Translation("Render a gallery of teasers in a masonry grid."),
 *   theme = "views_view_gallery_collection",
 *   display_types = { "normal" }
 * )
 */
class GalleryCollection extends StylePluginBase {

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
  protected $usesGrouping = TRUE;

}
