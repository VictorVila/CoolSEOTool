/* --------------------------------------------
|   onOffJS
|  --------------------------------------------
|   Removes external CSS ans CSS inside style tags
|   Based on https://github.com/aanand/chrome-disable-css
|   TODO : remove CSS in attributes
*/
 console.log('onOff/onOffJS.js')
 console.log("chromeContentSettings.javascript %o" + chrome.contentSettings.javascript );
/*
(function()
{
  var attr   = 'onOffJS';
  var scripts  = [].slice.call( document.querySelectorAll( 'script' ) );
  var inline = [].slice.call( document.querySelectorAll( 'style' ) );

  scripts.forEach( ( el ) =>
  {
   if ( el.hasAttribute( 'src') )
   {
      el.removeAttribute( 'src' );
   }



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
   */
/*
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
  }); */
//})();
