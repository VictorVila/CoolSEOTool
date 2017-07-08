/*  ---------------------------------------
|   BFG-10000
|   ---------------------------------------
|   For the young ones, Big Fucking Gun 10K
|   was the biggest gun in the original Doom
|
*/

var bfg =
{
  tagA : 'a',
  tagBr : "<br>",
  tagH1 : 'h1',
  tagHn : "h1, h2, h3, h4, h5, h6",
  tagHtml : 'html',
  tagLink : 'link',
  tagMeta : 'meta',
  tagTitle : 'title',
  attrCanonical : 'canonical',
  attrContent : 'content',
  attrDesc : 'description',
  attrHref : 'href',
  attrName : "name",
  attrRel : 'rel',
  attrRobots : 'robots',
  nada : '-',
  valeiro : "",

    /*  ---------------------------------------
    |   getCanonical
    |   ---------------------------------------
    |   @param : doc. An HTML document
    |   @return: link canonical if exist
    |
    */
    getCanonical : function ( doc )
    {
        var l = doc.getElementsByTagName(this.link);
        if (l.length === 0) return nada;
        var out = this.valeiro;
        for ( let i = 0 ; i < l.length ; i++ )
        {
            if (l[i].getAttribute( attrRel ) == this.attrCanonical )
            {
                if ( i > 0 ) out += tagBr;
                out += l[i].getAttribute(this.attrHref);
            }
        }
        return out || nada;
    },



    /*  ---------------------------------------
    |   getHn
    |   ---------------------------------------
    |   @return: stats of Hn tags
    |
    */
    getHn : function ()
    {
        return document.querySelectorAll(tagHn);
    },

    /*  ---------------------------------------
    |   getMeta
    |   ---------------------------------------
    |   @param : doc. An HTML document
    |   @param : name. meta name atribute
    |   @return: meta data of selected element
    |
    */
    getMeta : function (doc, name)
    {
    	var out = "";
    	var metas = doc.getElementsByTagName( tagMeta );
    	var nMeta = 0;
    	if ( metas.length === 0 ) return " - ";

      for ( let i = 0; i < metas.length; i ++ )
    	{
    	    if (metas[i].getAttribute( attrName ) === name )
    	    {
    		    nMeta++;
    		    if (metas[i].getAttribute( attrContent )) return metas[i].getAttribute( attrContent );
    		}
    	}
    	return " - ";
    },

  /* ---------------------------
    |  i18n
    | ---------------------------
    | Utility function to populate i18n messages
    | into elements having the same id as the key of the message
  */
    i18n : function (id)
    {
      document.getElementById(id).innerText = chrome.i18n.getMessage(id);
    },

    idEvent : function ( id )
    {
      document.getElementById(id).addEventListener('click', id);
      console.log('click ' , id)
    },

    /*  ---------------------------------------
    |   Log
    |   ---------------------------------------
    |   Logs to console only if debug is true
    */
    log : function ( msg )
    {
        if (debug) console.log(msg);
    },

    /*  ---------------------------------------
    |   ResolveRelative
    |   ---------------------------------------
    |   returns the absolute version of a link
    |   https://jsfiddle.net/n11rg255/
    |   @param: base. Url where the path was found
    |   @param: path. href attribute
    |   @return: absolute url
    |
    */
    resolveRelative : function ( base, path )
    {
      try
      {
        // Absolute URL
        if (path.match(/^[a-z]*:\/\//)) return path;

        // Protocol relative URL
        if (path.startsWith("//")) return base.replace(/\/\/.*/, path)

        // Upper directory
        if (path.startsWith("../"))
        {
            return resolveRelative(path.slice(3), base.replace(/\/[^\/]*$/, ''));
        }

        // Relative to the root
        if (path.startsWith('/'))
        {
        	var match = base.match(/(\w*:\/\/)?[^\/]*\//) || [base];
        	return match[0] + path.slice(1);
        }

        //relative to the current directory
        return base.replace(/\/[^\/]*$/, "") + '/' + path.replace(/^\.\//, '');
      }
      catch (e)
      {
        return null;
      }
    },



};
