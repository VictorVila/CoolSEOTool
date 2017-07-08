/*  ---------------------------------------
|   linksExports
|   ---------------------------------------
|   @author: Victor Vila Sendon 
|   victor@tirop.com
|   2016-11-11
|   Injected in a webpage, this script creates and
|   download a csv file containing info about
|   the links contained in the document
|
*/
 
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-87366902-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


/*  ---------------------------------------
|   getAbsoluteUrl
|   ---------------------------------------
|   @param: url (relativa ou absoluta)
|   @return: url absoluta
|
*/
var getAbsoluteUrl = function(url)
{
	var a = document.createElement('a');
		a.href = url;
    return a.href;
};
 
 

/*  ---------------------------------------
|   getLinks
|   ---------------------------------------
|   @return: enlaces
|
*/
var getLinksDataCSV = function ()
{
    var start = '"';
    var end = '"\n';
    var sep = '","'; 
    var links = document.links;
    var out = '"href", "anchor", "rel"\n';

	for (var i = 0 ; i < links.length ; i++)
	{
	    var rel = links[i].getAttribute('rel') || '-';
	    out +=  start + 
	            links[i].getAttribute('href') + sep +
	            links[i].innerText + sep +
	            rel +
	            end; 
	}
 
    return out;
}; 

var getLinksCSV = function ()
{
    var start = '"';
    var end = '"\n';
    var sep = ";"; 
    var links = document.getElementsByTagName('a');
    var out = "";

	for (var i = 0 ; i < links.length ; i++)
	{
	    out += start + links[i] + end; 
	}
 
    return out;
}; 

var csv         = getLinksDataCSV();  
if (csv == null) alert('No data'); 
var filename    = 'links.csv';
var uri         = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv);
var link        = document.createElement("a");
link.download   = document.domain + '_links.csv';
link.href       = uri;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
delete link;
