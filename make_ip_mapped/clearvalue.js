var fs = require('fs')
var lodash = require('lodash');

var en  = fs.readFileSync('en.json');
// https://www.convertjson.com/xml-to-json.htm
en = JSON.parse(en)


var showelementType = function(jsondata,depth){
    var space =''
    for(var i=0;i<depth;i++){
        space+='    '
    }
    Object.keys(jsondata).forEach(function(key) {

       // console.log(space + `${key} = ${typeof(jsondata[key])}` )
        if(typeof(jsondata[key]) == 'object' )
        {
            showelementType(jsondata[key],depth+1)
        }
        if(typeof(jsondata[key]) == 'string' )
        {
            jsondata[key] = 'null0'
        }
        
    });
}

showelementType(en,0)
console.log(en)


fs.writeFileSync('clear.json',JSON.stringify(en))