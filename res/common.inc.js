function include(script_filename) {
  document.write('<' + 'script');
  document.write(' language="javascript"');
  document.write(' type="text/javascript"');
  document.write(' src="' + script_filename + '">');
  document.write('</' + 'script' + '>');
}
/*
function include_dom(script_filename) {
  var html_doc = document.getElementsByTagName('head').item(0);
  var js = document.createElement('script');
  js.setAttribute('language', 'javascript');
  js.setAttribute('type', 'text/javascript');
  js.setAttribute('src', script_filename);
  html_doc.appendChild(js);
  return false;
}
*/
include('res/utils.js');
