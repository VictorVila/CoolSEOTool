/*  ---------------------------------------
|   Text & Lists tools
|   ---------------------------------------
|   @author: Victor Vila Sendon
|   twitter@tirop.com
|   2017-01-29
|   Generic functions to work with lists
| 
*/


/*  ---------------------------------------
|   Localization
|   ---------------------------------------
*/ 

document.getElementById('listPageTitle').innerText      = chrome.i18n.getMessage("listPageTitle");
document.getElementById('listIntro').innerText    = chrome.i18n.getMessage("listIntro");
document.getElementById('blank').innerText          = chrome.i18n.getMessage("blank");
document.getElementById('dedup').innerText          = chrome.i18n.getMessage("dedup");
document.getElementById('lower').innerText          = chrome.i18n.getMessage("lower");
document.getElementById('trim').innerText           = chrome.i18n.getMessage("trim");
document.getElementById('upper').innerText          = chrome.i18n.getMessage("upper");
document.getElementById('helpTextFunc').innerText          = chrome.i18n.getMessage("helpTextFunc");
document.getElementById('resultList').innerText          = chrome.i18n.getMessage("resultList");


var i              = 0;
var totalLines     = 0;
var totalWords     = 0;
var totalChars     = 0;
var listACount     = 0;
var listBCount     = 0;
var listOutCount   = 0;
var lastTA         = null; 



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
|   AZ
|   ---------------------------------------
|   Sorts textarea elements in natural order
|   @param:  array of strings
|   @return: sorted array of strings
|
*/
var az = function ()
{ 
    var list = getSelectedElementArray(); 
    updateCurrentTA( list.sort().join("\n") );
    updateStats();
};



/*  ---------------------------------------
|   blank
|   ---------------------------------------
|   Removes blank lines
|   @param:  array of strings
|   @return: sorted array of strings
|
*/
var blank = function ()
{ 
    var list = getSelectedElementArray(); 
    updateCurrentTA( _.without( list, '' ).join("\n") );
    updateStats();
};



/*  ---------------------------------------
|   Dedup
|   ---------------------------------------
|   Deduplicates lines
|   @param:  array of strings
|   @return: deduplicated array of strings
|   See : http://www.jstips.co/en/deduplicate-an-array/
|
*/
var dedup = function ()
{ 
    var list = getSelectedElementArray(); 
    updateCurrentTA( _.uniq( list ).join("\n") );
    updateStats();
}; 



/*  ---------------------------------------
|   Difference
|   ---------------------------------------
|   Difference of list A & B
|   @param:  array of strings
|   @return: Difference array of strings
|
*/
var difference = function ()
{
    var a = getTAArray( "listA" );
    var b = getTAArray( "listB" );
    var result = _.difference( a, b ); 
    updateListUI( result.join("\n") );
    updateStats();
};


/*  ---------------------------------------
|   getTAArray
|   ---------------------------------------
|   Returns an array of the value of the element
|   which ID is passed as parameter
|   @param:  ID of DOM element
|   @return: value of the element in array format
|
*/
var getTAArray = function ( id )
{
    try
    {
        var ta = document.getElementById( id ).value.split(/\r|\r\n|\n/);
        return ta.filter( function (val) { return val != ''; } );

    }
    catch ( e ) { console.log('error : ' + id + ' ' + e);return []; }

};



/*  ---------------------------------------
|   getELArray
|   ---------------------------------------
|   Returns an array of the value of the element
|   passed as parameter
|   @param:  DOM element
|   @return: value of the element in array format
|
*/
var getELArray = function ( el )
{
    try
    {
        var ta = el.value.split(/\r|\r\n|\n/);
        return ta.filter( function (val) { return val != ''; } );
    }
    catch ( e ) { console.log('error : ' + el + ' ' + e);return []; }

};



/*  ---------------------------------------
|   getSelectedElementArray
|   ---------------------------------------
|   Returns an array of the value of the current
|   textarea
|   @return: value of the selected textarea in
|   array format
|
*/
var getSelectedElementArray = function ()
{
    try
    {
        var ta = lastTA.value.split(/\r|\r\n|\n/);
        return ta.filter( function (val) { return val != ''; } );
    }
    catch ( e ) { console.log('error : ' + e);return []; }

};


/*  ---------------------------------------
|   Intersection
|   ---------------------------------------
|   Intersection of list A & B
|   @param:  array of strings
|   @return: Intersection array of strings
|
*/
var intersection = function ()
{
    var a = getTAArray( "listA" );
    var b = getTAArray( "listB" );
    var result = _.intersection( a, b ); 
    updateListUI( result.join("\n") );
    updateStats();
};



/*  ---------------------------------------
|   Lower
|   ---------------------------------------
|   Lowerizes all strings in the array
|   @param:  array of strings
|   @return: lowerize array of strings
|
*/
var lower = function ()
{ 
    var list = getSelectedElementArray();  
    var out = [];
    for ( var k = 0 ; k < list.length ; k++ , totalLines++ )
    { 
        out.push( list[k].toLowerCase() ); 
    }  
    updateCurrentTA( out.join("\n") );
    updateStats();
};


/*  ---------------------------------------
|   Randomize
|   ---------------------------------------
|   Sorts textarea elements by random order
|   @param:  array of strings
|   @return: sorted array of strings
|
*/
var randomize = function ()
{ 
    var list = getSelectedElementArray(); 
    updateCurrentTA( _.shuffle( list ).join("\n") );
    updateStats();
};



/*  ---------------------------------------
|   setLastTA
|   ---------------------------------------
|   Keep track of las selected textarea
|   @return: void 
|
*/
var setLastTA = function ()
{
    lastTA = document.activeElement;
    console.log('lastTa ' + lastTA.value);
};



/*  ---------------------------------------
|   TrimAll
|   ---------------------------------------
|   Simple trim
|   @param:  array of strings
|   @return: trimmd array of strings
|
*/
var trim = function ()
{ 
    var list = getSelectedElementArray();  
    var out = [];
    for ( var k = 0 ; k < list.length ; k++ , totalLines++ )
    { 
        out.push( list[k].trim() ); 
    }  
    updateCurrentTA( out.join("\n") );
    updateStats();
};




/*  ---------------------------------------
|   updateListUI
|   ---------------------------------------
|   Updates the output textarea with the parameter string
|
|   @params: the string to be shown
|   @return: void 
|
*/
var updateListUI = function ( out )
{
    document.getElementById('listOut').value = out;
    document.getElementById('listOut').focus();
};



/*  ---------------------------------------
|   setLastTA
|   ---------------------------------------
|   Keep track of las selected textarea
|
*/
var updateCurrentTA = function ( out )
{
    lastTA.value = out;
    lastTA.focus();
};

/*  ---------------------------------------
|   Upper
|   ---------------------------------------
|   Lowerizes all strings in the array
|   @param:  array of strings
|   @return: lowerize array of strings
|
*/
var upper = function ()
{ 
    var list = getSelectedElementArray();  
    var out = [];
    for ( var k = 0 ; k < list.length ; k++ , totalLines++ )
    { 
        out.push( list[k].toUpperCase() ); 
    }  
    updateCurrentTA( out.join("\n") );
    updateStats();
};
 

/*  ---------------------------------------
|   Union
|   ---------------------------------------
|   Adds list A to List B and removes duplicates
|   @param:  array of strings
|   @return: union array of strings
|
*/
var union = function ()
{
    var a = _.uniq( getTAArray( "listA" ) );
    var b = _.uniq( getTAArray( "listB" ) );
    var result =  _.uniq( _.union( a, b ) ); 
    updateListUI( result.join("\n") );
    updateStats();
}; 


/*  ---------------------------------------
|   updateUI
|   ---------------------------------------
|   Adds data from an URL to the UI
|   @param: url
|   @return: void
|
*/

var updateUI = function ( out )
{
    console.log('updateUI');
    console.log("out : %o", out)
    document.getElementById('listTA').value = out;
};


var updateStats = function ()
{
   console.log('updateStats');
   listACount = getTAArray('listA').length;
   console.log(listACount);
    document.getElementById('listACount').innerText = getTAArray('listA').length;
    document.getElementById('listBCount').innerText = getTAArray('listB').length;
    document.getElementById('listOutCount').innerText = getTAArray('listOut').length;
};

 

/*  ---------------------------------------
|   ZA
|   ---------------------------------------
|   Sorts textarea elements in reverse natural order
|   @param:  array of strings
|   @return: sorted array of strings
|
*/
var za = function ()
{ 
    var list = getSelectedElementArray(); 
    updateCurrentTA( list.reverse().join("\n") );
    updateStats(); 
};



/*  ---------------------------------------
|   Listeners
|   ---------------------------------------
|
*/
 
window.onload = function ()
{
   var listA       = getTAArray( "listA" );
   var listB       = getTAArray( "listB" );
    document.getElementById('az')             .addEventListener('click', az);
    document.getElementById('za')             .addEventListener('click', za);
    document.getElementById('blank')          .addEventListener('click', blank);
    document.getElementById('dedup')          .addEventListener('click', dedup);
    document.getElementById('lower')          .addEventListener('click', lower);
    document.getElementById('random')         .addEventListener('click', randomize);
    document.getElementById('trim')           .addEventListener('click', trim);
    document.getElementById('upper')          .addEventListener('click', upper); 
    document.getElementById('union')          .addEventListener('click', union); 
    document.getElementById('intersection')   .addEventListener('click', intersection);
    document.getElementById('difference')     .addEventListener('click', difference);
    document.getElementById('listA')          .addEventListener('click', setLastTA);
    document.getElementById('listB')          .addEventListener('click', setLastTA);
    document.getElementById('listOut')          .addEventListener('click', setLastTA);  
}; 
