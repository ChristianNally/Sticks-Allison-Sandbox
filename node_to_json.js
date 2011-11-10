// $Id$
Drupal.behaviors.node_to_json = function (context) {
  $('a.project-link:not(.project-link-processed)', context).click(function () {
    // This function will get exceuted after the ajax request is completed successfully
    var updateProject = function(data) {
      // The data parameter is a JSON object. The “nodejson” property is themed output returned from the server response to the ajax request.
      $('#dynamic-project').html(data.nodejson);
      displayProject();
    }
    $.ajax({
      type: 'POST',
      url: this.href, // Which url should be handle the ajax request. This is the url defined in the <a> html tag
      success: updateProject, // The js function that will be called upon success request
      dataType: 'json', //define the type of data that is going to get back from the server
      data: 'js=1' //Pass a key/value pair
    });
    return false;  // return false so the navigation stops here and not continue to the page in the link
}).addClass('project-link-processed');
}
