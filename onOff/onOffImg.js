/* --------------------------------------------
|   onOffImg
|  --------------------------------------------
|   Removes images.
|   Based on https://github.com/aanand/chrome-disable-css 
*/

(function() 
{
  var attr   = 'onOffImg';
  var imgs  = [].slice.call( document.querySelectorAll( 'img' ) ); 

  imgs.forEach( ( el ) => 
  {
    if ( el.hasAttribute( attr ) ) 
    {
        el.setAttribute( 'src', el.getAttribute( attr ) ); 
        el.removeAttribute( attr );
    } 
    else if ( ! el.hasAttribute( attr ) ) 
    { 
        el.setAttribute( attr, el.src ); 
        el.removeAttribute( 'src' );
    }
   }); 
})();
