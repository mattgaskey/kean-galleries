(function($) {
  var map = {
    'Articles & Op-Eds': 'Articles & Testimony',
    'Congressional Testimony': 'Articles & Testimony',
    'Policy Alert': 'Brief Analysis',
    'Policy Focus': 'In-Depth Reports',
    'Policy Notes': 'In-Depth Reports',
    'PolicyWatch': 'Brief Analysis',
    'Research Notes': 'In-Depth Reports',
    'Strategic Reports': 'In-Depth Reports',
    'Conference Reports': 'In-Depth Reports',
    'Counterterrorism Lectures': 'In-Depth Reports',
    'Fikra Forum': 'Brief Analysis',
    'Interviews & Presentations': 'Articles & Testimony',
    'Military Research Papers': 'In-Depth Reports',
    'Monographs': 'In-Depth Reports',
    'PeaceWatch': 'Brief Analysis',
    'Policy Forum': 'Brief Analysis',
    'Policy Papers': 'In-Depth Reports',
    'Presidential Study Group Reports': 'In-Depth Reports',
    'Special Events': 'Brief Analysis',
    'Events': 'Brief Analysis',
  };

  $('[name="field_publication_type"]').on('change', function() {
    var val = $(this).parent().find('label').text();
    var target = 'Brief Analysis'
    if (val in map) {
      target = map[val];
    }
    $('.form-item--field-article-length').each(function() {
      var $label = $(this).find('label');
      if ($label.text() == target) {
        $(this).find('input').attr('checked', true);
      }
    });
  });
})(jQuery);