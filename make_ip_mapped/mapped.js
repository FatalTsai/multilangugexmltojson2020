var fs = require('fs')
var lodash = require('lodash');

var en  = fs.readFileSync('en.json');
// https://www.convertjson.com/xml-to-json.htm
en = JSON.parse(en)
//console.log(en)
//console.log('en.settings = '+ typeof(en.settings))
//console.log('en.setting = '+ typeof(en.setting))
var clear  = fs.readFileSync('clear.json');
clear = JSON.parse(clear)
var English  = fs.readFileSync('English_28US29.json');
English = JSON.parse(English)
//console.log(English.LangDef.LangID)
English = English.LangDef.LangID


var showelementType = function(jsondata,depth){
    var space =''
    for(var i=0;i<depth;i++){
        space+='    '
    }
    Object.keys(jsondata).forEach(function(key) {

        console.log(space + `${key} = ${typeof(jsondata[key])}` )
        if(typeof(jsondata[key]) == 'object' )
        {
            showelementType(jsondata[key],depth+1)
        }
        
    });
}



var target_pos=[]
var searchelement = function(target,jsondata,depth,parent){
    var space =''
    for(var i=0;i<depth;i++){
        space+='    '
    }
    Object.keys(jsondata).forEach(function(key) {

        //console.log(space + `${key} = ${typeof(jsondata[key])}` )
        if(typeof(jsondata[key]) == 'object' )
        {
            var tmp = lodash.cloneDeep(parent)
            tmp.push(key)
            //console.log('tmp = '+tmp)
            var chlid_serchresult = searchelement(target,jsondata[key],depth+1,tmp)
            /*
            if(chlid_serchresult.length != 0){
                if(targetkey.length = 0)
                    targetkey = lodash.cloneDeep(chlid_serchresult)
                else{
                    targetkey.push(chlid_serchresult)
                    console.log('fuck')
                }
            }*/
        }
        else if(typeof(jsondata[key]) == 'string'){
           // console.log(space +jsondata[key])
            //console.log(jsondata[key]=='Software')
            //console.log(jsondata[key]== target)
            if(jsondata[key] == target )
            {   
                //console.log(jsondata[key])
                var tmp2 = lodash.cloneDeep(parent)
                tmp2.push(key)
                //targetkey.push(tmp2)
                //console.log(tmp2)
                target_pos.push(tmp2)
            }
        }
        
        
    });
}
//showelementType(en,0)
//console.log( searchelement('HMI Theme',en,0,[]) ) 
//console.log( JSON.stringify(searchelement('Software information',en,0,[]) ) )
//console.log( JSON.stringify( searchelement('Factory reset',en,0,[]) ))
//console.log( JSON.stringify( searchelement('OUTPUT',en,0,[]) ))
//console.log( JSON.stringify( searchelement('Screen off',en,0,[]) ))

//console.log(target_pos)


// make map their key to our key

var keytokeymap = function(){
   


    var keymap = {}


    //using English text to find en
    English.forEach(element => {
        target_pos=[]
        searchelement(element._Text,en,0,[])
        console.log(element._ID)
        console.log(target_pos)
        /*keymap.push({
            "theirkey":element._ID,
            "ourkey":target_pos
        })

    });*/
        keymap[element._ID] = target_pos

    })
    fs.writeFileSync('keymap.json',JSON.stringify(keymap))

}


var findindex = function(jsondata,depth){
    var space =''
    for(var i=0;i<depth;i++){
        space+='    '
    }
    Object.keys(jsondata).forEach(function(key) {

        //console.log(space + `${key} = ${typeof(jsondata[key])}` )
        if(typeof(jsondata[key]) == 'object' )
        {
            findindex(jsondata[key],depth+1)
        }
        if(typeof(jsondata[key]) == 'string' )
        {
            var  isfound = false
            console.log(key)
            English.forEach(element => {
                if(element._Text == jsondata[key])
                {
                    isfound = true
                    console.log(element)
                }

            });

            if(isfound == false)
            {
                jsondata[key] = 'null0'
            }

        }
    });
}


//this map replace the value that its key do not exist in client's key
var makeclearfile =function()
{

    findindex(en,0)

    fs.writeFileSync('clear.json',JSON.stringify(en))
}



//makeclearfile()
keytokeymap()


