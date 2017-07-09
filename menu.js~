/*  ---------------------------------------
|   menu.js
|   ---------------------------------------
|   @author: Victor Vila Sendon
|   victor@tirop.com
|   2016-11-11
|   Controls menu events
|
*/

/* Inject google analytics code tracking */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-87366902-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


/*
| -------------------------------
|   Menu
| ...............................
*/

chrome.tabs.onCreated.addListener(function(tab){ alert("new tab "+tab.id); });

// Events

window.addEventListener('load', function(evt)
{
    // Menu localization

    var terms = ['menuOnPageTitle', 'menuOnPageMsg1', 'menuLinkTitle', "menuLinkMsg1", "menuSerpTitle", "menuSerpMsg1", "menuSitemapTitle", "menuSitemapMsg1", "menuListTitle", "menuListMsg1"];

    for (i in terms) bfg.i18n(terms[i]);

    // Events

        document.getElementById('onPage')
        .addEventListener('click', onPage);

        document.getElementById('linksExport')
        .addEventListener('click', linksExport);

        document.getElementById('serpExport')
        .addEventListener('click', serpExport);

        document.getElementById('sitemapMenu')
        .addEventListener('click', sitemap);

        document.getElementById('onOffCSS')
        .addEventListener('click', onOffCSS);

        document.getElementById('onOffImg')
        .addEventListener('click', onOffImg);

        document.getElementById('listMenu')
        .addEventListener('click', list);

        document.getElementById('whois')
        .addEventListener('click', whois);

        document.getElementById('dns')
        .addEventListener('click', dns);
});

var onPage = function ()
{
    chrome.tabs.insertCSS({ file: "onPage/onPage.css" });
    chrome.tabs.executeScript({ file : "onPage/onPage.js" });
    window.close();
};

var linksExport = function ()
{
    chrome.tabs.executeScript({ file : "linksExport/linksExport.js" });
    window.close();
};

var serpExport = function ()
{
    chrome.tabs.executeScript({ file : "serpExport/serpExport.js" });
    window.close();
};

var sitemap = function ()
{
    chrome.tabs.create({ url: 'sitemap/sitemap.html' });
};

var onOffCSS = function ()
{
    chrome.tabs.executeScript({ file : "onOff/onOffCSS.js" });
    if ( document.getElementById( "onOffCSS" ).hasAttribute( "class" ) )
    {
        document.getElementById( "onOffCSS" ).removeAttribute( "class" );
    }
    else
    {
        document.getElementById( "onOffCSS" ).setAttribute( "class", "active" );
    }
};

var show = function ( data )
{
    console.log("data %o", data);
}

var onOffImg = function ()
{
    chrome.tabs.executeScript({ file : "onOff/onOffImg.js" });
    if ( document.getElementById( "onOffImg" ).hasAttribute( "class" ) )
    {
        document.getElementById( "onOffImg" ).removeAttribute( "class" );
    }
    else
    {
        document.getElementById( "onOffImg" ).setAttribute( "class", "active" );
    }
};

var list = function ()
{
    chrome.tabs.create({ url: 'list/list.html' });
};

var whois = function ()
{
   var url      = null;
   var query    = { active: true, currentWindow: true };
   function callback(tabs)
   {
     url        = tabs[0].url;
     var u      = new URL(url);
     url        = 'http://www.whois.com/whois/' + u.host;
     chrome.tabs.create({ url: url });
   }
   chrome.tabs.query(query, callback);
};

var dns = function ()
{
   var url = null;
   var query = { active: true, currentWindow: true };
   function callback ( tabs )
   {
      url    = tabs[0].url;
      var u  = new URL( url );
      var host = u.host.replace('www.', '');
      url    = "https://intodns.com/" + host;
     chrome.tabs.create({ url: url });
   }
   chrome.tabs.query(query, callback);
};
