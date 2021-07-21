<?php

/**
 * @file
 * Contains \Drupal\gcse\Routing\GcseRouteSubscriber.
 */

namespace Drupal\gcse\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

/**
 * Defines dynamic routes.
 */
class GcseRouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  public function alterRoutes(RouteCollection $collection) {
    $config = \Drupal::config('gcse.settings');

    $route = new Route(
      // Path to attach this route to:
      $config->get('search_page'),
      // Route defaults:
      [
        '_controller' => '\Drupal\gcse\Controller\SearchController::search',
        '_title' => 'Search',
      ],
      // Route requirements:
      [
        '_permission'  => 'access content',
      ]
    );
    $collection->add('gcse.search', $route);
  }

}
