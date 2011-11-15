This module was originally based on this tutorial:
http://www.viziontech.co.il/tutorial1
by zion_zadik

It was then massaged and put into place by Autobox Media for their company portfolio at http://autoboxmedia.com

It was then generalized, refactored and standardized by Christian Nally http://sticksallison.co

The preprocess function
function node_to_json_preprocess(&$variables){
defines the variables available to the 
node_to_json.tpl.php template.

You are able to add additional preprocess functions as per
http://drupal.org/node/223430

For example... here is a function you can insert into the theme's template.php file:

function THEME_preprocess_node_to_json(&$variables){
  $items = '';
  
  $node = node_load($variables['nid']);
  $node = (object)$node; 
    
  if ($node->field_project_date[0]['value'] != null && $node->field_project_date[0]['value'] != ""){
    $raw_date = explode("-",$node->field_project_date[0]['value']);
    $variables['date_completed'] = date('F', mktime(0,0,0,$raw_date[1],1)) . ", " . $raw_date[0];
  }

  $taxonomy='';
  if ($node->taxonomy != null){
    $taxonomy = "<h1>Taxonomy</h1>";
    foreach ($node->taxonomy as $cat){
      if ($cat->vid == 3){
        if ($taxonomy != ""){
          $taxonomy .= ", ";
        }
        $taxonomy .= $cat->name;
      }
    }
  }
  $variables['taxonomy'] = $taxonomy;

  $project_link = '';
  if ($node->field_project_link != null){
    $project_link = "<h1>Project Link</h1>";
    $protocol = "http://";
    $protocol_ssl = "https://";
    $sub = "www.";
    $project_link_trimmed = $node->field_project_link[0]['url'];
    // remove the http
    if (startsWith($node->field_project_link[0]['url'], $protocol)){
      $project_link_trimmed = substr($node->field_project_link[0]['url'], strlen($protocol));
    }
    // remove the https
    if (startsWith($node->field_project_link[0]['url'], $protocol_ssl)){
      $project_link_trimmed = substr($node->field_project_link[0]['url'], strlen($protocol_ssl));
    }
    // remove the www
    if (startsWith($project_link_trimmed, $sub)){
      $project_link_trimmed = substr($project_link_trimmed, strlen($sub));
    }
    // remove the last slash
    if (endsWith($project_link_trimmed, "/")){
      $project_link_trimmed = substr($project_link_trimmed,0,strlen($project_link_trimmed)-1);
    }
    $project_link .= '<a href="'.$node->field_project_link[0]['url'].'" target="_blank">'.$project_link_trimmed.'</a>';
  }
  $variables['project_link'] = $project_link;
  
  $imgs = '<h3>IMGS</h3>';
  $firstimg = true;
  if (isset($node->field_project_images)){
  $imgs = "<h1>Images</h1>";
    foreach($node->field_project_images as $img) {
      if ($firstimg) {
        $firstimg = false;
        continue;
      };
      $imgs .= '<img src="/'.imagecache_create_path('project_thumb', $img['filepath']).'" />';
    }
  }
  $variables['imgs'] = $imgs;

}
