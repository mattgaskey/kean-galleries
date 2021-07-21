<?php

use Drupal\Core\Link;

/**
 * Implements theme_preprocess_menu().
 */
function galleries_preprocess_menu(&$variables) {

  $node = \Drupal::request()->attributes->get('node'); 
  if (!empty($node)) {
    $variables['node_title'] = $node->getTitle();
  }
  // Try to figure out the current parent for the menu.
  $items = $variables['items'];
  $menu_link = reset($items)['original_link'];
  if ($parent_id = $menu_link->getParent()) {
    $menu_link_manager = \Drupal::service('plugin.manager.menu.link');
    $parents = $menu_link_manager->getParentIds($parent_id);
    $parent = reset($parents);
    $parent_item = $menu_link_manager->createInstance($parent);

    $variables['parent'] = [
      'title' => $parent_item->getTitle(),
      'url' => $parent_item->getUrlObject()->toString(),
    ];
  }
}