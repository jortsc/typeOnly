(function( $ ) {
    $.fn.typeOnly = function(options) {
      return this.keypress(function(evt){
          var settings = $.extend( {
                'type'         : 'num',
                'digits'       : 8,
                'separator'    :'.'
              }, options);
          if(isNaN(settings.digits)){
               throw ("Error - the digits value provided '"+settings.separator+"' is not valid"); 
          }    
          switch(settings.type){
              case 'num':
                  if($(this).val().length > (settings.digits - 1) && evt.which != 8){
                        evt.preventDefault(); 
                    }
                  else{
                        if(evt.which < 48 || evt.which > 57){
                          if(evt.keyCode != 8){
                              evt.preventDefault();  
                          }
                        }
                    }
                  break;
              case 'dec':
                  var decSeparator = (settings.separator == '.' || settings.separator == ','  ? (settings.separator == '.' ? 46 : 44) : 0);
                  if(decSeparator == 0){
                      throw ("Error - the separator value provided '"+settings.separator+"' is not valid"); 
                  }
                  var value = $(this).val()+String.fromCharCode(evt.which);
                  var s = false;
                  if($(this).val().length > (settings.digits - 1) && evt.which != 8){
                      evt.preventDefault(); 
                  }
                  else{
                      for(var i = 0; i < value.length; i++){
                        if((value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57) || value.charCodeAt(i) == decSeparator || value.charCodeAt(i) == 8){
                            if(value.charCodeAt(i) == decSeparator && s){
                                evt.preventDefault(); 
                            }
                            if(value.charCodeAt(i) == decSeparator){
                                s = true;
                            }
                         }
                         else{
                               evt.preventDefault(); 
                         }
                      }
                  }
                  break;
              case 'alpha':
                    if($(this).val().length > (settings.digits - 1) && evt.which != 8){
                         evt.preventDefault(); 
                    }
                    else{
                        if(!(((evt.which >= 65 && evt.which <= 90) || (evt.which >= 97 && evt.which <= 122) || (evt.which >= 224 && evt.which <= 252)) || evt.which == 8 || evt.which == 199 || evt.which == 231 || evt.which == 199 || evt.which == 209 || evt.which == 241) ){
                            evt.preventDefault(); 
                        }
                     }
                  break;
              default:
                  throw ("Error - the type provided '"+settings.type+"' is not valid");
                  break;   
          }    
      });
    };
  })( jQuery );