/*  ---------------------------------------
|   SitemapGenerator
|   ---------------------------------------
|   @author: Victor Vila Sendon
|   victor@tirop.com
|   2017-01-16
|   Generates a sitemap.xml from a list of URls
|
http://tirop.com
http://www.adifco.fr
    http://www.adifco.fr/v.html
    https://www.seo.fr/abc
*/


/*  ---------------------------------------
|   Localization
|   ---------------------------------------
*/
var msg_sitemapTitle    = chrome.i18n.getMessage("menuSitemapTitle");
var msg_sitemapLabel    = chrome.i18n.getMessage("sitemapLabel");
var msg_sitemapSend     = chrome.i18n.getMessage("sitemapSend");
var msg_errorList       = chrome.i18n.getMessage("errorsList");
var msg_check404Label   = chrome.i18n.getMessage("check404Label");

document.getElementById('sitemapTitle').innerText      = msg_sitemapTitle;
document.getElementById('urlListLabel').innerText      = msg_sitemapLabel;
document.getElementById('urlListSend').innerText       = msg_sitemapSend;
document.getElementById('check404Label').innerText       = msg_check404Label;




/*  ---------------------------------------
|   Params
|   ---------------------------------------
*/
var urlTA       = document.getElementById('urlListTextArea');
var urls        = urlTA.value.split("\n");
var changefreq  = '';
var priority    = '';
var sitemap     = '<?xml version="1.0" encoding="UTF-8"?>' + "\n";
sitemap        += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "\n";
var errors      = '';
var i           = 0;
var totalURLs   = 0;
var totalErrors = 0;
var progress    = 0;


var ini = function ()
{
   // reset vars

   console.log('ini : reset vars');
   i           = 0;
   sitemap     = '<?xml version="1.0" encoding="UTF-8"?>' + "\n";
   sitemap    += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "\n";
   errors      = '';
   totalURLs   = 0;
   totalErrors = 0;
   progress    = 0;
   urlTA       = document.getElementById('urlListTextArea');
   var tempUrls= urlTA.value.split("\n");
   urls        = new Array();

   // clean urls here, otherwise synchro problems in get()
   for ( var j = 0 ; j < tempUrls.length ; j++ )
   {
      if ( typeof tempUrls[j] == "undefined" )  continue;
      if ( tempUrls[j].trim() == null )         continue;
      if ( tempUrls[j].trim() == '' )           continue;
      if ( tempUrls[j].trim() == 'undefined' )  continue;
      urls.push( tempUrls[j].trim() );
   }
   if ( document.getElementById('errors').getAttribute('class') == 'dBlock' ) amosa('errors');
   document.getElementById('errors').innerHTML = '';
   document.getElementById('totalURLs').value = urls.length;

   changefreq  = document.getElementById( 'changefreq' ).value;
   priority    = document.getElementById( 'priority' ).value;
};



/*  ---------------------------------------
|   generateSitemap
|   ---------------------------------------
|   Bootstrapes the parsing of the textarea content.
|   If launches the simple generation or the 404 check version
|   @param:  void
|   @return: void
|
*/
var generateSitemap = function ()
{
    ini();
    if ( document.getElementById('check404Input').checked ) get( urls, i );
    else generate( urls );
};


/*  ---------------------------------------
|   generate
|   ---------------------------------------
|   Generates a xml sitemap with the selected parameters
|   There is no status code check performed
|   @param:  array of URLs
|   @return: void. Outputs to screen the sitemap
|
*/
var generate = function ( urls )
{
    totalURLs = 1;
    for ( var k = 0 ; k < urls.length ; k++ , totalURLs++ )
    {
        sitemap += "\t<url>\n";
        sitemap += "\t\t<loc>" + urls[k] + "</loc>\n";
        sitemap += "\t\t<changefreq>" + changefreq + "</changefreq>\n";
        sitemap += "\t\t<priority>" + priority + "</priority>\n";
        sitemap += "\t</url>\n";
        updateProgress();
    }
    finalize();
};

/*  ---------------------------------------
|   XHR
|   ---------------------------------------
|   GET to URL
|   @param: url
|   @return: xhr object
|
http://www.adifco.fr
https://www.seo.fr
https://www.seo.fr/abc
*/

var get = function ( urls, i )
{
   console.log ( 'i: '+ i + ", array: " + urls.length )

   var xhr = new XMLHttpRequest();
   xhr.open('GET', urls[i], true);

   xhr.onreadystatechange = function()
   {
       if (xhr.readyState == 4)
       {
           if ( xhr.status < 300 ) updateUI( urls[i] );
           else updateErrors( urls[i] );
       }
   };
   xhr.send(null);
};

var finalize = function ()
{
    console.log('finalize');
    sitemap     += "</urlset>";
    urlTA.value = sitemap;
    if (totalErrors > 0)
    {
        amosa('errors');
        document.getElementById('errors').innerHTML =
        '<h2>' + msg_errorList + '</h2>' + '<ul id="errorsList">' + errors + '</ul>';
    }
};

/*  ---------------------------------------
|   updateUI
|   ---------------------------------------
|   Adds data from an URL to the UI
|   @param: url
|   @return: void
|
*/

var updateUI = function ( u )
{
    console.log('updateUI');
    sitemap += "\t<url>\n";
    sitemap += "\t\t<loc>" + u + "</loc>\n";
    sitemap += "\t\t<changefreq>" + changefreq + "</changefreq>\n";
    sitemap += "\t\t<priority>" + priority + "</priority>\n";
    sitemap += "\t</url>\n";
    totalURLs++;
    updateProgress();
    iterate();
};


var updateErrors = function ( u )
{
    console.log('updateErrors');
    totalErrors++;
    errors += '<li>' + u + '</li>';
    updateProgress();
    iterate();
};

var updateProgress = function ()
{
    progress = ( ( totalURLs + totalErrors ) * 100 ) / urls.length;
    document.getElementById('totalURLs').innerText = totalURLs;
    document.getElementById('totalErrors').innerText = totalErrors;
    document.getElementById('progress').innerText = progress.toFixed( 0 );
};
var iterate = function ()
{
   i++;
   if ( i >= urls.length ) { finalize(); return ''; }
   get ( urls, i);
};



/*  ---------------------------------------
|   Listeners
|   ---------------------------------------
|
*/

window.onload = function ()
{
    document.getElementById('urlListSend').addEventListener('click', generateSitemap);
};

/*  ---------------------------------------
|   amosa
|   ---------------------------------------
|   @param: element to hide / show
|
*/
var amosa = function (el)
{
    var ah = document.getElementById(el);
    if (ah.getAttribute("class") == "dNone")
    {
        ah.setAttribute("class", "dBlock");
    }
    else
    {
        ah.setAttribute("class", "dNone");
    }
};
