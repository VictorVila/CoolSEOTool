/* --------------------------------------------
|   onOffCSS
|  --------------------------------------------
|   Removes external CSS ans CSS inside style tags
|   Based on https://github.com/aanand/chrome-disable-css
|   TODO : remove CSS in attributes
*/

(function() 
{
  var attr   = 'onOffCSS';
  var links  = [].slice.call( document.querySelectorAll( 'link[rel=stylesheet]' ) );
  var inline = [].slice.call( document.querySelectorAll( 'style' ) );

  links.forEach( ( el ) => 
  {
    if ( el.hasAttribute( attr ) ) 
    {
        el.disabled = false;
        el.removeAttribute( attr );
    } 
    else if ( ! el.disabled ) 
    {
        el.disabled = true;
        el.setAttribute( attr, 'true' );
    }
   });

  inline.forEach( ( el ) => 
  {
    if ( el.hasAttribute( attr ) ) 
    {
        el.innerHTML = el.getAttribute( attr );
        el.removeAttribute( attr );
    } 
    else 
    {
        el.setAttribute( attr, el.innerHTML );
        el.innerHTML = '';
    }
  }); 
})();
