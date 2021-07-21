<?php

namespace Drupal\newcity_customizations;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Theme\ThemeManagerInterface;

/**
 * Theme utility functions.
 */
class Theme {
  /**
   * Theme manager service.
   *
   * @var \Drupal\Core\Theme\ThemeManagerInterface
   */
  protected $themeManager;

  /**
   * Type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, ThemeManagerInterface $theme_manager) {
    $this->entityTypeManager = $entity_type_manager;
    $this->themeManager = $theme_manager;
  }

  /**
   * Inject page regions into build array.
   */
  public function addRegionsToBuild(array $regions) {
    $output = [];
    $theme = $this->themeManager->getActiveTheme()->getName();

    // Retrieve theme regions.
    $available_regions = system_region_list($theme, 'REGIONS_ALL');

    // Validate allowed regions with available regions.
    $regions = array_intersect(array_keys($available_regions), $regions);

    foreach ($regions as $region) {
      // Load region blocks.
      $blocks = $this->entityTypeManager
        ->getStorage('block')
        ->loadByProperties(['theme' => $theme, 'region' => $region]);
      // Sort ‘em.
      uasort($blocks, 'Drupal\block\Entity\Block::sort');

      // Capture viewable blocks and their settings to $build.
      $blockStorage = $this->entityTypeManager->getStorage('block');
      $build = [];
      foreach ($blocks as $key => $block) {
        if ($block->access('view')) {
          $block = $blockStorage->load($key);
          $block_content = $this->entityTypeManager
            ->getViewBuilder('block')
            ->view($block);
          $build[$key] = $block_content;
        }
      }

      $output[$region] = $build;
    }

    return $output;
  }

  /**
   * Try to determine theming (i.e., background color) of the last paragraph.
   */
  public function getLastParagraphTheme($field) {
    if (empty($field) || !is_iterable($field)) {
      return NULL;
    }
    $last = array_pop(iterator_to_array($field));
    $paragraph = $last->entity;
    if ($paragraph && $paragraph->hasField('field_theme')) {
      if ($paragraph->field_theme->entity) {
        return $paragraph->field_theme->entity->name->value;
      }
    }
    return NULL;
  }

  /**
   * Return a list of anchor links + titles for h2s in markup.
   */
  public function getHeadingLinks($html) {
    $dom = new \DOMDocument();

    // Load HTML but suppress warnings.
    $libxml_previous_state = libxml_use_internal_errors(TRUE);
    $dom->loadHTML($html);
    libxml_clear_errors();
    libxml_use_internal_errors($libxml_previous_state);

    $finder = new \DomXPath($dom);
    $elements = $finder->query("//h2");
    $links = [];
    foreach ($elements as $el) {
      if ($el->hasAttribute('id')) {
        $links[] = [
          'title' => $el->textContent,
          'url' => '#' . $el->getAttribute('id'),
        ];
      }
    }
    return $links;
  }

}
