/*  ---------------------------------------
|   onPage
|   ---------------------------------------
|   @author: Victor Vila Sendon
|   victor@tirop.com
|   2016-11-11
|   Injected in a webpage, this script extracts
|   useful on page data related to SEO
|
*/

/*  ---------------------------------------
|   Localization
|   ---------------------------------------
*/
var msg_char     = chrome.i18n.getMessage("characters");
var msg_items    = chrome.i18n.getMessage("items");
var msg_text     = chrome.i18n.getMessage("text");
var msg_total    = chrome.i18n.getMessage("total");

var msg_onPageTitle    = chrome.i18n.getMessage("onPageTitle");
var msg_contentTitle   = chrome.i18n.getMessage("contentTitle");
var msg_assetsTitle    = chrome.i18n.getMessage("assetsTitle");

var msg_assets    = chrome.i18n.getMessage("assets");
var msg_images    = chrome.i18n.getMessage("images");
var msg_speed     = chrome.i18n.getMessage("speed");
var msg_links     = chrome.i18n.getMessage("links");
var msg_compression    = chrome.i18n.getMessage("compression");
var msg_totalLinks     = chrome.i18n.getMessage("totalLinks");
var msg_internal    = chrome.i18n.getMessage("internal");
var msg_external    = chrome.i18n.getMessage("external");
var msg_nofollow    = chrome.i18n.getMessage("nofollow");
var msg_internalNofollow    = chrome.i18n.getMessage("internalNoFollow");
var msg_externalNoFollow    = chrome.i18n.getMessage("externalNoFollow");

var msg_foundArticle    = chrome.i18n.getMessage("foundArticle");
var msg_words           = chrome.i18n.getMessage("words");
var msg_textCode        = chrome.i18n.getMessage("textCode");

var msg_download = chrome.i18n.getMessage("download"); 


/*  ---------------------------------------
|   Const
|   ---------------------------------------
*/
var d = document;
var de = d.documentElement;
var b = d.getElementsByTagName('body')[0];



/*  ---------------------------------------
|   Analytics
|   ---------------------------------------
*/
try
{
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-87366902-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}
catch (e) {console.log('fail analytics');}

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


/*  ---------------------------------------
|   openAccordion
|   ---------------------------------------
*/
var openAccordion = function (el, n)
{
    var accordions = document.getElementById(el).getElementsByClassName('accordion');
    accordions[n].className = 'accordion aberto';
};


/*  ---------------------------------------
|   toggleAccordion
|   ---------------------------------------
*/
var toggleAccordion = function ()
{
   var accordionClass = this.parentNode.className;

   var accordeons = document.getElementsByClassName('accordion');

   for (i = 0; i < accordeons.length; i++)
   {
      accordeons[i].className = 'accordion pechado';
   }

   if (accordionClass == 'accordion pechado')
   {
      this.parentNode.className = 'accordion aberto';
   }
};

/*  ---------------------------------------
|   contains
|   ---------------------------------------
|   Use includes instead
|   @param: pallar e fio
|   @return: boolean
|
*/
var contains = function (a, b)
{
	return a.indexOf(b) !== -1;
};


/*  ---------------------------------------
|   getAbsoluteUrl
|   ---------------------------------------
|   @param: relative or absolute url
|   @return: absolute url
|
*/
var getAbsoluteUrl = function(url)
{
	var a = document.createElement('a');
		a.href = url;
    return a.href;
};


/*  ---------------------------------------
|   getCanonical
|   ---------------------------------------
|   @return: link canonical if exist
|
*/
var getCanonical = function ()
{
    var l = document.getElementsByTagName('link');
    if (l.length === 0) return '-';

    for (var i = 0 ; i < l.length ; i++)
    {
        if (l[i].getAttribute('rel') == 'canonical') return l[i].getAttribute('href');
    }
   return '-'
};
var getNCanonical = function ()
{
    var l = document.getElementsByTagName('link');
    var out = 0;
    if (l.length === 0) return '-';

    for (var i = 0 ; i < l.length ; i++)
    {
        if (l[i].getAttribute('rel') == 'canonical') out++;
    }
    return out;
};


/*  ---------------------------------------
|   getDomain
|   ---------------------------------------
|   Use document.domain instead
|   @param: url
|   @return: domain
|
*/
var getDomain = function(url)
{
	try
	{
		var u = new URL(url);
		return u.host;
	}
	catch (e)
	{
		return "";
	}
};


/*  ---------------------------------------
|   getHn
|   ---------------------------------------
|   @return: stats of Hn tags
|
*/
var getHn = function ()
{
    var hnTags = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    var out = "<ul id='hnUl'>";

    for (var i = 0 ; i < hnTags.length ; i++)
    {
		var hnTag = hnTags[i].nodeName.toLowerCase();
        out += "<li class='opBFG" + hnTag + "'><b>" + hnTag + "</b>"
        + hnTags[i].innerText + "</li>";
    }
	if (hnTags.length === 0) out += "<li>Hn : -</li>";

	out += "</ul>";
	//console.log(out)
    return out;
};


/*
var getIpInfo = function (ip)
{
    var api = 'http://ip-api.com/json/' + ip;
    var data = $.getJSON(api);
    console.log(data)
};
*/


/*  ---------------------------------------
|   getLinks
|   ---------------------------------------
|   @return: links stats
|
*/
var getLinksStats = function ()
{
	var domain = document.domain;
	var internal = 0,
		  external = 0,
		  nofollow = 0,
		  internalNofollow = 0,
		  externalNofollow = 0;

	for (var i = 0 ; i < document.links.length ; i++)
	{
	    var interno = true;

	    // relatif
	    if (!document.links[i].getAttribute('href').includes('http://') &&
	        !document.links[i].getAttribute('href').includes('https://'))
	    {
	        internal++;
	    }
	    else
	    {
    	    // absolute internal
	        if (document.links[i].getAttribute('href').includes(document.domain))
		    {
		        internal++;
		    }
		    else // absolute externalNofollow
		    {
		        external++;
		        interno = false;
		    }
	    }


		if (document.links[i].getAttribute('rel'))
		{
		    if (document.links[i].getAttribute('rel').toLowerCase() == 'nofollow' )
		    {
		        document.links[i].insertAdjacentHTML('afterbegin', '<q class="nofollow"><i>noFollow</i></q>');
		        nofollow++;
		        if (interno) internalNofollow++;
		        else externalNofollow++;
		    }
		}
	}

	var out =
      {
        'total' : document.links.length,
        'internal' : internal,
        'external' : external,
        'nofollow' : nofollow,
        'internalNofollow' : internalNofollow,
        'externalNofollow' : externalNofollow
      };
      return out;
};


/*  ---------------------------------------
|   getMeta
|   ---------------------------------------
|   @return: meta data of selected element
|
*/
var getMeta = function (name)
{
	var out = "";
	var metas = document.getElementsByTagName('meta');
	var nMeta = 0;
	if (metas.length === 0) return " - ";

   for (var i = 0; i < metas.length; i ++)
	{
	    if (metas[i].getAttribute("name") === name)
	    {
		    nMeta++;
		    if (metas[i].getAttribute("content")) return metas[i].getAttribute("content");
		}
	}
	return " - ";
};

var getNMeta = function (name)
{
	var metas = document.getElementsByTagName('meta');
	var nMeta = 0;
	if (metas.length === 0) return 0;

    for (var i = 0; i < metas.length; i ++)
	{
	    if (metas[i].getAttribute("name") === name) nMeta++;
	}
	return nMeta;
};


/*  ---------------------------------------
|   getWords
|   ---------------------------------------
|   @param: simpler number of words count
|
*/
var getNWords = function (el)
{
  if (!el) return 0;
  return el.innerText.split(' ').length;
};


/*  ---------------------------------------
|   getSpeed
|   ---------------------------------------
|   @return : API performance stats
|
*/
var getSpeed = function ()
{
    try
    {
        var ttfb = ((performance.timing.responseStart - performance.timing.requestStart) / 1000).toFixed(3);
        var domComplete = ((performance.timing.domComplete - performance.timing.requestStart) / 1000).toFixed(3);
        var total = ((performance.timing.loadEventEnd - performance.timing.connectStart
) / 1000).toFixed(2);
        var ttfbClass;

        var out = 'TTFB: ' + ttfb + ''
		        + 's, DOM: ' + domComplete
		        + 's, Total: ' + total;

        return out;
    }
    catch(e)
    {
        console.warn('getspeed: ' + e);
        return "-";
    }
};

var getSpeedObject = function ()
{
    try
    {
        var ttfb = ((performance.timing.responseStart - performance.timing.requestStart) / 1000).toFixed(3);
        var domComplete = ((performance.timing.domComplete - performance.timing.requestStart) / 1000).toFixed(3);
        var total = ((performance.timing.loadEventEnd - performance.timing.connectStart
) / 1000).toFixed(2);
        var out =
        {
            'ttfb' : ttfb,
            'domComplete' : domComplete,
            msg_total : total
        };
        return out;
    }
    catch(e)
    {
        console.warn('getspeed: ' + e);
        var out =
        {
            'ttfb' : '-',
            'domComplete' : '-',
            msg_total : '-'
        };
        return out;
    }
};


/*  ---------------------------------------
|   getTextStats
|   ---------------------------------------
|   @return : text stats
|
*/
var getTextStats = function ()
{
    var textLength = document.documentElement.innerText.length;
    var codeLength = document.documentElement.innerHTML.length;
    var articleLength;

    try { articleLength = getNWords(document.getElementsByTagName('article')[0]);}
    catch (e) { articleLength = 0; }
    var out = '<p><span>' + getNWords(document.documentElement) + '</span> ' + msg_words + '</p>';
    out += '<p><span>' + ((textLength * 100 ) / codeLength).toFixed(1) + '%</span> ' + msg_textCode + '</p>';
	if (articleLength > 0) out += '<p>' + msg_foundArticle + ' <span>' + articleLength + '</span> ' + msg_words + '.</p>';
    return out;
};


/*  ---------------------------------------
|   getTools
|   ---------------------------------------
|   @return : useful links
|
*/
var getTools = function ()
{
    var out = '<p><a href="https://www.google.com/webmasters/tools/dashboard?hl=fr&siteUrl='
		+ getDomain(document.location.href)
		+ '">Search Console</a><p>';
		out += '<p><a href="https://www.google.fr/webhp?#q=site%3Ahttp%3A%2F%2F'
		+ getDomain(document.location.href)
		+ '">site:</a><p>';
	return out;
};


/*  ---------------------------------------
|   getRessources
|   ---------------------------------------
|   @return: img, CSS, JS usage stats
|
*/
var getRessources = function ()
{
  return  document.styleSheets.length 	+ " CSS, "
        + document.scripts.length 		+ " JS, "
        + document.images.length 		+ " Images";
};

var getNRessources = function ()
{
  return  document.styleSheets.length + document.scripts.length + document.images.length;
};



/*  ---------------------------------------
|   getTitle
|   ---------------------------------------
|   @return: title
|
*/
var getTitle = function ()
{
	var t = document.getElementsByTagName('title');
    if (t.length > 0) return t[0].innerHTML;
    else return "";
};


/*  ---------------------------------------
|   getTitleNStats
|   ---------------------------------------
|   @return: title stats
|
*/
var getTitleNStats = function ()
{
	// evitalos <title> dos SVG
	var t = document.getElementsByTagName('head')[0].getElementsByTagName('title');

	var out = '';
	if (t.length === 0)
    {
        out += "<p> - </p>";
    }
    else
    {
	    for (var i = 0; i < t.length; i ++)
	    {
		    out += "<p><i>#" + (i+1)
		    + " [" + t[i].innerHTML.length + " carac.]</i> "
		    + t[i].innerHTML + "</p>";
	    }
	}
	return out;
};


var getTextWidth = function (text, font) 
{
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width.tofixed(0);
}

/*  ---------------------------------------
|   ucfirst
|   ---------------------------------------
|   @param: String
|   @return: string with upper cas first letter
|
*/
var ucfirst = function (string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};



/*  ---------------------------------------
|   Creates a node with tag & id
|   ---------------------------------------
*/
var crea = function (tag, id)
{
   var el = d.createElement(tag);
   el.setAttribute('id', id);
   return el;
}


/*  ---------------------------------------
|   Closes the onPage tab
|   ---------------------------------------
*/
var remove = function (parent, childnode)
{
   parent.removeChild(childnode);
}


/*  ---------------------------------------
|   Setting text into elements
|   ---------------------------------------
*/
var setText = function (id, value)
{
   try
   {
       d.getElementById(id).innerText = value;
   }
   catch (e)
   {
      console.warn('Problema setText (' + id + ', ' + value +')');
   }
};


/*  ---------------------------------------
|   Setting HTML into elements
|   ---------------------------------------
*/
var setHTML = function (id, value)
{
    d.getElementById(id).innerHTML = value;
};



/*  ---------------------------------------
|   Append Warning if n° els > 1
|   ---------------------------------------
*/
var appendN = function (id, n)
{
    if (n<2) return;
    var b = d.createElement('b');
    b.innerText = n + i;
    d.getElementById(id).parentElement.getElementsByTagName('dt')[0].appendChild(b);
}


/*  ---------------------------------------
|   Font-size
|   ---------------------------------------
|   Setting an uniform basis for text size
|
*/

document.getElementsByTagName('html')[0].setAttribute('style','font-size:100%');



/*  ---------------------------------------
|   onPageBFG
|   ---------------------------------------
|   extension's container in the webpage
|
*/

var op = crea('div', 'onPageBFG');
b.appendChild(op);
op.setAttribute('style', 'font-size:100%');

var template = "<a id='pechar'>X</a>";
template += "<div id='metaAcc' class='accordion aberto'><q><i class='fa fa-sitemap'></i>" + msg_onPageTitle + "</q><dl> <dt>Title <i id='titleL'></i> <b id='titleW'></b></dt> <dd id='title'></dd>  <dt>Meta desc <i id='descL'></i> <b id='titleW'></b></dt> <dd id='desc'></dd> <dt>Canonical <i id='canonicalL'></i></dt> <dd id='canonical'></dd> <dt>Headers</dt> <dd> <p><span id='status'></span> <i id='domain'></i> <span id='url'></span> <a id='expandHeaders'>+</a></p><p id='headersText' class='dNone'></p></dd> </dl></div>";
template += "<div id='robotsAcc' class='accordion pechado'><q>Robots</q><dl><dt>Meta robots</dt> <dd id='robots'></dd> <dt>X-robots-tag</dt> <dd id='xRobots'></dd> <dt>Robots.txt</dt> <dd> <p><span id='robotsStatus'></span> <a id='expandRobots'>+</a></p><p id='robotsText' class='dNone'></p></dd> </dl></div>";
template += "<div id='contAcc' class='accordion pechado'><q>" + msg_contentTitle + "</q><dl>  <dt>Text</dt> <dd id='text'></dd> <dt>Hn <i id='hnL'></i></dt> <dd id='hn'></dd></dl></div>";
template += "<div id='ressAcc' class='accordion pechado'><q>" + msg_assetsTitle + "</q><dl><dt>" + msg_assets + " <i id='ressourcesL'></i></dt> <dd id='ressources'><ul><li><span id='rCss'></span> CSS</li><li><span id='rJs'></span> JS</li><li><span id='rImg'></span> " + msg_images + "</li></ul></dd> <dt>" + msg_speed + "</dt> <dd id='speed'><ul><li>TTFB: <span id='ttfb'></span></li><li>DOMComplete: <span id='domComplete'></span></li><li>" + msg_total + ": <span id='total'></span></li></dd> <dt>" + msg_compression + ":</dt><dd id='compresion'></dd> <dt>" + msg_links + "</dt> <dd id='links'><ul><li>" + msg_totalLinks + ": <span id='linksTotal'></span></li><li>" + msg_internal + ": <span id='internal'></span></li><li>" + msg_external + ": <span id='external'></span></li><li>" + msg_nofollow + ": <span id='nofollow'></span></li><li>" + msg_internalNofollow + ": <span id='internalNoFollow'></span></li><li>" + msg_externalNoFollow + ": <span id='externalNoFollow'></span></li></ul><p id='exportLinks'></p></dd> </dl></div>";

op.innerHTML = template;



/* ---------------------
|  Accordion
|  ---------------------
*/
var accsTitles = op.getElementsByTagName('q');
for (var i = 0; i < accsTitles.length; i++)
{
   accsTitles[i].addEventListener('click', toggleAccordion, false);
}


/*  ---------------------------------------
|   setLinks
|   ---------------------------------------
|   @return: creates download button for links
|
*/
var setLinksDataCSV = function ()
{
    var start = '"';
    var end = '"\n';
    var sep = '","';
    var links = document.links;
    var csv = '"href", "anchor", "rel"\n';

	for (var i = 0 ; i < links.length ; i++)
	{
	    var rel = links[i].getAttribute('rel') || '-';
	    csv +=  start +
	            links[i].getAttribute('href') + sep +
	            links[i].innerText + sep +
	            rel +
	            end;
	}

    if (csv == null) return;
    var uri         = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv);
    var link        = document.createElement("a");
    link.download   = document.domain + '_links.csv';
    link.href       = uri;
    link.innerText  = msg_download;
    document.getElementById('exportLinks').appendChild(link);

};

/*  ---------------------------------------
|   Listeners
|   ---------------------------------------
|   expandHeaders
|   expandRobots
|   pechar
|
*/

d.getElementById('expandHeaders')
    .addEventListener('click', function(){amosa("headersText");});

d.getElementById('expandRobots')
    .addEventListener('click', function(){amosa("robotsText");});

d.getElementById('pechar')
    .addEventListener('click', function(){remove(b, op);} );




/*  ---------------------------------------
|   Setting it up
|   ---------------------------------------
*/


setText('title',    d.title);
setText('titleL',   d.title.length + msg_char);
var titleN = d.getElementsByTagName('title').length;
if (titleN > 1) setText('titleE', titleN + msg_items);
//setText('titleW',   getTextWidth(d.title, "normal 18px arial"));

var desc = getMeta('description');
setText('desc',         desc );
setText('descL',        desc.length + msg_char);
appendN('descN',        getNMeta('description') );

setText('robots',       getMeta('robots') );

setText('canonical',    getCanonical() );
var nCanonical = getNCanonical();
if (nCanonical > 1 ) setText('canonicalL',   getNCanonical() );

//setText('speed',        getSpeed() );

setHTML('text',         getTextStats() );
//setText('ressources',   getRessources() );
setText('rCss',         d.styleSheets.length);
setText('rJs',          d.scripts.length);
setText('rImg',         d.images.length);

var s = getSpeedObject();
setText('ttfb',         s.ttfb);
setText('domComplete',  s.domComplete);
setText('total',        s.total);

setText('ressourcesL',  getNRessources() + msg_items);

setHTML('hn',           getHn() );
setText('hnL',          d.querySelectorAll("h1, h2, h3, h4, h5, h6").length + msg_items);

var linkStats = getLinksStats();
setText('totalLinks',   linkStats.total);
setText('internal',     linkStats.internal);
setText('external',     linkStats.external);
setText('nofollow',     linkStats.nofollow);
setText('internalNoFollow',     linkStats.internalNofollow);
setText('externalNoFollow',     linkStats.externalNofollow);

setLinksDataCSV();


/*  ---------------------------------------
|   getHeaders
|   ---------------------------------------
|
|   @param: url
|   @return:
|
*/

(function getHeaders (url)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4)
        {
            var xRobots = '-';
            if (xhr.getResponseHeader('X-Robots-Tag') != null)
            {
                xRobots = xhr.getResponseHeader('X-Robots-Tag');
            }
            console.log(xRobots)
            setText('xRobots', xRobots);
            setText('headersText', xhr.getAllResponseHeaders());

            var compresion = '-';
            if (xhr.getAllResponseHeaders().toLowerCase().includes('gzip'))
            {
                compresion = 'gzip';
            }
            setText('compresion', compresion);

        }
    };
    xhr.send(null);
})(document.location.href);



/*  ---------------------------------------
|   getRobotsTxt
|   ---------------------------------------
|   Looks for robots.txt
|   @param: base url
|   @return: boolean
|   @return: robots.txt content
|
*/

(function getRobotsTxt (u)
{
    var urlBase = u.slice(0, u.indexOf('/',9))
    urlBase += '/robots.txt';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', urlBase, true);

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4)
        {
            var robotsStatus = '-';
            if (xhr.status == 200)
            robotsStatus = '200 OK';
            setHTML('robotsStatus', robotsStatus);
            setText('robotsText', xhr.responseText);
        }
    };
    xhr.send(null);
})(document.location.href);





/*  ---------------------------------------
|   Settings to see SEO tags
|   ---------------------------------------
*/
var hnTags = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

for (var i = 0 ; i < hnTags.length ; i++)
{
    var hnTag = hnTags[i].nodeName.toLowerCase();
    // Evitar engadir duas veces
    if (hnTags[i].hasAttribute('seodata')) continue;
    hnTags[i].insertAdjacentHTML('afterbegin', '<q><i>' +  hnTag + '</i></q>');
    hnTags[i].setAttribute('seodata', '1');
}


var imgs = document.getElementsByTagName('img');
for (var i = 0 ; i < imgs.length ; i++)
{
    if (! imgs[i].hasAttribute( 'alt' )) continue;
    if (imgs[i].hasAttribute('seodata')) continue;
    var alt = imgs[i].getAttribute('alt');
    if (alt == '') alt = '[ALT]: (vide)';
    imgs[i].insertAdjacentHTML('afterend', '<span class="extraAlt">[ALT]: ' +  alt + '</span>');
    imgs[i].setAttribute('seodata', '1');
}




