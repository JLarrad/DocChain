var respuesta;
var chainMode;
var host;
var destApp;
var destAppID;
var appSheet;
var appFilters;
var URLname;
var defURL;


define( [
  'qlik',
  'jquery',
  'https://rawgit.com/mindspank/qsocks/master/qsocks.bundle.js'
],
function (qlik) {
  
  	var app = qlik.currApp();
  
  	var URLSearch = decodeURI(window.location.search);
  
  	if(URLSearch!=null && URLSearch.length>0)
    {

      var arrayFilters = URLSearch.slice(1).split('&');
      
      
      for (var i=0; i<arrayFilters.length; i++)
      {
        if(arrayFilters[i]!=null && arrayFilters[i].length>0)
    	{
            var filter = arrayFilters[i].split('=');
            var values = filter[1].split(',');
            
            var arrayValues = [];
            
            for(var x=0; x<values.length; x++)
            {
              if(!isNaN(values[x])) //es numero
                arrayValues.push(Number(values[x]));
              else{
                var formatValue = values[x].replace('~', ',');
                arrayValues.push(formatValue);   
              }
            }
          
          	console.log('Loop: '+i+': '+filter[0]+' '+arrayValues);
          
            app.field(filter[0]).selectValues(arrayValues,false);  
    	}
      }
    }  

	return {
      
        definition: {
            type: "items",
            component: "accordion",
            items: {
               settings: {
                    uses: "settings",
                            items: {
                                Listbox: {
                                    type: "items",
                                    label: "Configuracion",
                                    items: {
        
                                        ChainMode:{
                                            ref: "ChainMode",
                                            type: "string",
                                            defaultValue: "Emisor",
                                            component: "dropdown",
                                            options: [ {
                                                    value: "Emisor",
                                                    label: "Emisor-Receptor"
                                                }, {
                                                    value: "Receptor",
                                                    label: "Solo Receptor"
                                                }]
                                        },
                                      
                                        host:{
                                          ref: "host",
                                          label: "Servidor (IP o URL)",
                                          expression: "optional",
                                          type: "string"
                                          //component: "string"
                                      	},

                                      	application:{
                                          ref: "application",
                                          label: 'Nombre Aplicación',
                                          expression: "optional",
                                          type: "string"
                                          //component: "string"
                                      	},

                                      	sheet:{
                                          ref: "sheet",
                                          label: "Pestaña (ID)",
                                          expression: "optional",
                                          type: "string"
                                          //component: "string"
                                      	},

                                      	filters:{
                                          ref: "filters",
                                          label: "Cadena de Filtros (Separar valores por , y campos por &)",
                                          expression: "optional",
                                          type: "string"
                                          //component: "string"
                                      	},
                                      
                                      	URLname:{
                                          ref: "URLname",
                                          label: "Nombre Enlace",
                                          expression: "optional",
                                          type: "string"
                                          //component: "string"
                                      	}
                                    } //fin items
                                }//fin listbox
                            }//fin items
            
                }
            }
        }, 
	      
      
		paint: function ($element, layout) {
          
          respuesta = $element;
          
          chainMode = layout.ChainMode;
          host = layout.host;
          destApp = '"'+layout.application+'"';
          appSheet = layout.sheet;
          appFilters = layout.filters;
          URLname = layout.URLname;
          defURL = '';
          
          if(URLname == null || URLname.length == 0)
            	URLname = destApp;
                    
          if(chainMode == 'Emisor')
          {                    
              var config = {
                host: host,
                isSecure: true
              };
            
              destAppID = null;
    
              var qsocks = require('https://rawgit.com/mindspank/qsocks/master/qsocks.bundle.js');
              
              qsocks.Connect(config).then(function(global) {
                
                global.getDocList().then(function(reply) {
                
                for (var i = 0; i<reply.length; i++)
                {
                  var arrayApp = JSON.stringify(reply[i]).split(',');
                  
                  var appName = arrayApp[0].split(':')[1];
                  var appID = arrayApp[4].split(':')[1];
                  
                  if(appName == destApp)
                  {
                    console.log('appID: '+appID);
                    destAppID = appID.replace('"','').replace('"','');
                    break;
                  }
                }
                  
                
                //montamos la url destino con parametros  
                  
                if(host!=null && URLname!=null && destAppID!=null)
                {
                  defURL = '<A HREF=https://' + host+'/sense/app/'+destAppID;
                  
                  if(appSheet!=null)
                  {
                    defURL = defURL + '/sheet/'+appSheet+'/state/analysis';
                    
                    if(appFilters!=null)
                      defURL = defURL + '?'+appFilters;
                  }
                  
                  defURL = defURL + '>'+URLname+'</A>';
                
                }
                
                else
                  defURL = 'Mínima configuración: Host y App Destino';
                                   
                  
                respuesta.html(defURL);
                  
                })
              });
          }//fin if EMISOR
          
          else
            respuesta.html('');
            
          
		} //fin paint
      
	}; //fin return

} ); //fin function(qlik)

