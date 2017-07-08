/*  ---------------------------------------
|   serpExports
|   ---------------------------------------
|   @author: Victor Vila Sendon 
|   victor@tirop.com
|   2016-11-11
|   Injected in a serp's webpage, this script creates and
|   download a csv file containing info about
|   the links contained in the SERP : 
|   title, URL, description
|   This does not perform any position tracking activity
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
var getSerpDataCSV = function ()
{
    var start = '"';
    var end = '"\n';
    var sep = '","'; 
    var out = '"url", "title", "description"\n';

    var url = document.querySelectorAll('.r a');
    var desc = document.querySelectorAll('.st');
 
	for (var i = 0 ; i < url.length ; i++)
	{   
        var l = url[i].href || '-';
        var t = url[i].innerText || '-';
        try {var d = desc[i].innerText;} catch (e) {var d = '-';}
 
	    out +=  start + 
	            l + sep +
	            t + sep +
	            d +
	            end; 
	}
 
    return out;
};   

var csv         = getSerpDataCSV();  
if (csv == null) alert('No data'); 
var q           = document.getElementById('lst-ib').value || '-';
var uri         = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv);
var link        = document.createElement("a");
link.download   = q + '_serp.csv';
link.href       = uri;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
delete link;
