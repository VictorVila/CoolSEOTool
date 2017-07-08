/*  ---------------------------------------
|   Utis xerais
|   ---------------------------------------
|   @author: Victor Vila Sendon
|   victor@tirop.com
|   2017-01-22 
|
*/
 

/*  ---------------------------------------
|   Analytics
|   ---------------------------------------
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
|   Creates a node with tag & id
|   ---------------------------------------
*/
var crea = function (tag, id)
{
   var el = d.createElement(tag);
   el.setAttribute('id', id);
   return el;
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
|   openAccordion
|   ---------------------------------------
*/
var openAccordion = function (el, n)
{
    var accordions = document.getElementById(el).getElementsByClassName('accordion');
    accordions[n].className = 'accordion aberto';
};



/*  ---------------------------------------
|   Closes the onPage tab
|   ---------------------------------------
*/
var remove = function (parent, childnode)
{
   parent.removeChild(childnode);
};



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

 

