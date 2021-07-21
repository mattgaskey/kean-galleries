<?php

use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Link;

/**
 * Implements hook_system_breadcrumb_alter().
 */
function newcity_customizations_system_breadcrumb_alter(Breadcrumb &$breadcrumb, $route_match, array $context) {
  // Append the current page title to the breadcrumb for news detail pages.
  if ($breadcrumb && !\Drupal::service('router.admin_context')->isAdminRoute()) {
    if ($node = \Drupal::request()->attributes->get('node')) {
      if ($node->getType() == 'news') {
        $title = \Drupal::service('title_resolver')->getTitle(\Drupal::request(), $route_match->getRouteObject());
        if (!empty($title)) {
          $breadcrumb->addLink(Link::createFromRoute($title, '<none>'));
        }
      }
    }
  }
}
