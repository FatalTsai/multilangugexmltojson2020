var fs = require('fs')
const { merge } = require('lodash')
var keymap = JSON.parse(fs.readFileSync('keymap.json'))
var clear = JSON.parse(fs.readFileSync('clear.json'))
var path = require('path')
//console.log(keymap)

var convert = function(filepath){
    var clientdata = JSON.parse(fs.readFileSync(filepath))
    var result = JSON.parse(fs.readFileSync('en.json'))

    //console.log(clientdata)

    Object.keys(clientdata).forEach(function(key, val){
        var pos = keymap[key]
        console.log(pos)
        if(pos.length == 0)
        {
            result[key] = clientdata[key]
        }
        else 
        {
            pos.forEach(element => {
                var core = clientdata[key]
                element = element.reverse()
                var tmp = ''
                //console.log('tmp = '+tmp)
                for(var i =0;i<element.length;i++){
                    tmp = JSON.stringify(core)
                    //console.log('tmp = '+tmp)
                    core = {}
                    core[element[i]] = JSON.parse(tmp)
                }
                console.log(core)
                merge(result,core)
    

            });
         

        }


    });
    
    console.log(result)
    return result
}

var parseclientJson = function(filepath)
{
    var English  = fs.readFileSync(filepath);
    English = JSON.parse(English)
    //console.log(English.LangDef.LangID)
    English = English.LangDef.LangID
    console.log(English)
    var result = {}

    English.forEach(element => {
        result[element._ID] = element._Text
    });
   // console.log(result)

    fs.writeFileSync('parsejson/'+path.parse(filepath).name+'.json',JSON.stringify(result))
    
}

//parseclientJson('English_28US29.json')
//console.log(clear[ 'setting', 'updateSubMenu', 'cancelDownload' ])
//onvert('English_28US29_2.json')

var rawjsonls = fs.readdirSync('../rawjson')
//console.log(fs.readdirSync('../rawjson'))
rawjsonls.forEach(element => {
    data = parseclientJson(path.join('../rawjson',element) )
    console.log(data)
});

var parsejsonls = fs.readdirSync('./parsejson')
console.log(parsejsonls)
parsejsonls.forEach(element => {
    data = convert(path.join('./parsejson',element) )
    fs.writeFileSync(path.join('./finish/')+path.parse(element).name+'.json',JSON.stringify(data))

});