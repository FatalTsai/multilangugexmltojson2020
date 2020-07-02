var fs = require('fs')
var keymap = JSON.parse(fs.readFileSync('keymap.json'))
var clear = JSON.parse(fs.readFileSync('clear.json'))
//console.log(keymap)

var convert = function(filepath){
    var theirdata = fs.readFileSync(filepath)
    theirdata = JSON.parse(theirdata)
    theirdata = theirdata.LangDef.LangID
    //console.log(theirdata)
    theirdata.forEach(theirelement => {
        var pos=keymap[theirelement._ID]
        //console.log(element._ID)
        //console.log(pos)
        var modifyele = clear
        for(var i=0;i<pos.length;i++)
        {
            console.log(pos)
            var pos2 = pos[i]
            console.log(pos2)
            for(var j=0;j<pos2.length;j++)
            {
                modifyele = modifyele[pos2[j]]
                console.log(modifyele)
            }
        }
        //console.log(modifyele)

    });
    


}

//console.log(clear[ 'setting', 'updateSubMenu', 'cancelDownload' ])
//convert('English_28US29.json')

var filepath ='English_28US29.json'

var theirdata = fs.readFileSync(filepath)
theirdata = JSON.parse(theirdata)
theirdata = theirdata.LangDef.LangID


var pos=keymap['Software_Legals_Headline']
console.log(pos[0]) //[ 'setting', 'updateSubMenu', 'legalInformation' ]
var pos2 = pos[0].reverse() 


var core= theirdata['Software_Legals_Headline']
for(var i =0;i<pos2.length;i++){
    tmp = JSON.stringify(core)
    core = {}
    core[pos2[i]] = JSON.parse(tmp)
}

console.log(core)