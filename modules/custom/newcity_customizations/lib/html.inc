<?php

use Drupal\node\NodeInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Implements hook_preprocess_HOOK() for html.html.twig.
 */
function newcity_customizations_preprocess_html(array &$variables) {
  // Intercept some file wrappers and just put up the content.
  if ($media = \Drupal::request()->attributes->get('media')) {
    if ($media->bundle() == 'pdf') {
      // Anon gets file piped to browser; logged in a message.
      if (\Drupal::currentUser()->isAnonymous()) {
        $file_uri = FALSE;

        // If one file, put it up.
        $file_field = $media->field_media_document;
        if (count($file_field) == 1) {
          $file_uri = $file_field->entity->uri->value;
          $file = \Drupal::service('file_system')->realpath($file_uri);
          if (file_exists($file)) {
            $filename = basename($file);
            $mime = \Drupal::service('file.mime_type.guesser')->guess($file);
            header('Content-Type: ' . $mime);
            header('Content-Length: ' . filesize($file));
            if ($mime == 'application/pdf') {
              $disposition = \Drupal::request()->query->get('disposition');
              if ($disposition == 'inline' || $disposition == 'attachment') {
                header("Content-Disposition: $disposition; filename=$filename");
              }
            }
            @readfile($file);
            exit;
          }
          else {
            \Drupal::messenger()->addMessage(t('Unable to retrieve PDF.'), 'error');
          }
        }
      }
      else {
        \Drupal::messenger()->addMessage(t('For anonymous (not-logged-in) users this file is downloaded directly to the browser. When linking, use the browser URL above, not the direct URL to the file below.'), 'warning');
      }
    }

    if ($media->bundle() == 'image') {
      // Anon gets file piped to browser; logged in a message.
      if (\Drupal::currentUser()->isAnonymous()) {
        $file_uri = FALSE;

        // If one file, put it up.
        $file_field = $media->field_media_image;
        if (count($file_field) == 1) {
          $file_uri = $file_field->entity->uri->value;
          $file = \Drupal::service('file_system')->realpath($file_uri);
          if (file_exists($file)) {
            $filename = basename($file);
            $mime = \Drupal::service('file.mime_type.guesser')->guess($file);
            header('Content-Type: ' . $mime);
            header('Content-Length: ' . filesize($file));
            @readfile($file);
            exit;
          }
          else {
            \Drupal::messenger()->addMessage(t('Unable to retrieve image.'), 'error');
          }
        }
      }
      else {
        \Drupal::messenger()->addMessage(t('For anonymous (not-logged-in) users this file is downloaded directly to the browser. When linking, use the browser URL above, not the direct URL to the file below.'), 'warning');
      }
    }
  }

  // Intercept terms that should redirect.
  if ($term = \Drupal::request()->attributes->get('taxonomy_term')) {
    if ($term->bundle() == 'departments') {
      if (count($term->field_landing_page) && $term->field_landing_page->entity) {
        $url = $term->field_landing_page->entity->url();
        // Anon gets automatic redirect; logged in gets message.
        if (\Drupal::currentUser()->isAnonymous()) {
          header('Location: ' . $url);
          exit();
        }
        else {
          \Drupal::messenger()->addMessage(t('For anonymous (not-logged-in) users I redirect to @url', ['@url' => Link::fromTextAndUrl($url, Url::fromUri($url))->toString()]), 'warning');
        }
      }
    }
  }

  // Some policy articles redirect.
  if ($node = \Drupal::request()->attributes->get('node')) {
    if ($node instanceof NodeInterface) {
      if ($node->hasField('field_external_link')) {
        if ($url = $node->field_external_link->uri) {
          if (\Drupal::currentUser()->isAnonymous()) {
            header('Location: ' . $url);
            exit();
          }
          else {
            \Drupal::messenger()->addMessage(t('For anonymous (not-logged-in) users I redirect to @url', ['@url' => Link::fromTextAndUrl($url, Url::fromUri($url))->toString()]), 'warning');
          }
        }
      }
    }
  }

}
