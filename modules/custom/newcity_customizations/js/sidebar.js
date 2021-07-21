(function($, drupalSettings) {
  // When changing sidebar state, adjust the list.
  $('#edit-field-has-sidebar-value').on('change', function() {
    var checked = $(this).is(':checked');
    $('[href="#edit-group-sidebar"]').parent('li').toggle(checked);
  });

  // On page load.
  var checked = $('#edit-field-has-sidebar-value').is(':checked');
  $('[href="#edit-group-sidebar"]').parent('li').toggle(checked);

})(jQuery, drupalSettings);