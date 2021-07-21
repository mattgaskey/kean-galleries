<?php

namespace Drupal\newcity_customizations\Template\Loader;

use Drupal\components\Template\Loader\ComponentsLoader;

/**
 * Loads templates from the filesystem.
 *
 * This loader layers drupal/components' loader
 * and adds support for relative template includes.
 */
class NewcityLoader extends ComponentsLoader {

  /**
   * {@inheritdoc}
   */
  protected function findTemplate($name, $throw = TRUE) {

    // Handle relative includes.
    if (strpos($name, './') === 0 || strpos($name, '../') === 0) {
      $last_component_path = end(array_keys($this->cache));
      $name = dirname($last_component_path) . '/' . $name;
    }

    return parent::findTemplate($name, $throw);
  }

}
