<?php

namespace Drupal\newcity_customizations\Plugin\Filter;

use Drupal\filter\Plugin\FilterBase;
use Drupal\filter\FilterProcessResult;
use Drupal\Component\Utility\Html;

/**
 * @Filter(
 *   id = "heading_ids",
 *   title = @Translation("Add IDs (for anchors) to headings"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 * )
 */
class HeadingIds extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $dom = new \DOMDocument();

    // Load HTML but suppress warnings.
    $libxml_previous_state = libxml_use_internal_errors(TRUE);
    $dom->loadHTML($text);
    libxml_clear_errors();
    libxml_use_internal_errors($libxml_previous_state);

    $finder = new \DomXPath($dom);
    $elements = $finder->query("//h2");
    foreach ($elements as $el) {
      $id = Html::getId($el->textContent);
      $old = $dom->saveXml($el);
      $el->setAttribute('id', $id);
      $new = $dom->saveXml($el);
      $text = str_replace($old, $new, $text);
    }

    return new FilterProcessResult($text);
  }

}
