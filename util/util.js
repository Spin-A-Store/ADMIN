var config=require('../config/config.js');
var shortid = require('shortid')

function Util(){



}

Util.prototype.apiURL = function(modulename,route) {

if(!modulename && !route){

return "Please provide module name and route";
}
 return "http://"+config.apihost+":"+config.apihostport+"/"+modulename+"/"+route+"/";
};

Util.prototype.varientEmptyCheck = function(body) {
   var  attrs=[];

   if(body.var1.length !== 0){
    attrs.push({name:body.var1,values:body.val1.split(",")})
   }
   if(body.var2.length !== 0){
    attrs.push({name:body.var2,values:body.val2.split(",")})
   }
   if(body.var3.length !== 0){
    attrs.push({name:body.var3,values:body.val3.split(",")})
   }

  return attrs;
};


Util.prototype.varientAttributes = function(body) {
   var  attrs=[];
   var  attrstemp=Object.keys(body);
   for (i = 0; i < attrstemp.length; i++) {
    if(attrstemp[i]!=="pid" && attrstemp[i]!=="sku" && attrstemp[i]!=="varientName"){
      var temp={};
      temp[attrstemp[i]]=body[attrstemp[i]];
      attrs.push(temp);

    }

   }


  return attrs;
};

Util.prototype.categoryRequestData = function(data) {
   var reqData={};
if(!data) return "data insufficient";



 var tempData=data.trim().substr(1, data.length);
 
 reqData['name']=tempData.split("/").pop().trim();
 
 var reg=new RegExp(tempData.split("/").pop()+"$","i");
  
 reqData['parent']=tempData.replace(reg, "").trim();




  return reqData;
};


Util.prototype.getShortId=function(){

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
return shortid.generate();
}





module.exports=new Util();
