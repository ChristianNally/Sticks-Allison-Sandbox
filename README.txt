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
