<?php

/**
 * Implements hook_simple_sitemap_links_alter().
 */
function newcity_customizations_simple_sitemap_links_alter(array &$links, $sitemap_variant) {
  $node_storage = \Drupal::entityTypeManager()->getStorage('node');
  foreach ($links as $key => $link) {
    // If this has a redirect, remove from sitemap.
    if (isset($link['meta']['entity_info']['entity_type'])) {
      if ($link['meta']['entity_info']['entity_type'] == 'node') {
        $node = $node_storage->load($link['meta']['entity_info']['id']);
        if ($node->hasField('field_external_link')) {
          if (count($node->field_external_link)) {
            unset($links[$key]);
          }
        }
      }
    }
  }
}
