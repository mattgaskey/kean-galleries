<?php

namespace Drupal\newcity_customizations\Plugin\Filter;

use Drupal\filter\Plugin\FilterBase;
use Drupal\filter\FilterProcessResult;

/**
 * @Filter(
 *   id = "filter_blank_tags",
 *   title = @Translation("Remove blank tags"),
 *   description = @Translation("ckeditor can create a lot of e.g., <code>&lt;h2&gt;&amp;nbsp;&lt;/h2&gt;</code> tags; this removes headings and links without interior text"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 * )
 */
class FilterBlankTags extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $text = trim($text);
    // Ugh, unicode.
    $text = str_replace(chr(194) . chr(160), ' ', $text);
    $text = preg_replace('/<[h][2-6].*>(\s|&nbsp;)*<\/h[2-6]>/', '', $text);
    $text = preg_replace('/<a .*>(\s|&nbsp;)*<\/a>/', '', $text);
    return new FilterProcessResult($text);
  }

}
