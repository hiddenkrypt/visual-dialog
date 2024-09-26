let Tools = {  
  tokenizeScript: function(txt){ 
    txt = txt.replace(/\n+/g, '\n')
    txt = txt.split('\n')
    return txt.map(parseLine);
    function parseLine(str){
      var parsers = {
        "*": e=>{ return {type:"narration", line: e.replace(/\* ?/, "").trim()} },
        "#exit": e=>{ return {type:"exit", name: e.replace(/#exit: ?/, "").trim()} },
        "#enter": e=>{ 
          let data = e.replace(/#enter: ?/, "").split(/, ?/);
          let token = {type:"enter", name: data[0].trim(), side: data[1].trim(), file:data[2].trim()}
          if( data[3] ){
            token.alias = data[3].trim();
          }
          return token
        },
        "#fileroot": e=>{ return {type:"fileroot", str: e.replace(/#fileroot: ?/, "").trim()} },
        "#alias": e=>{ 
          let data = e.replace(/#alias: ?/, "").split(/, ?/);
          return {type:"alias", name: data[0].trim(), alias: data[1].trim()} 
        }
      }
    
      for( let key in parsers ){
        if(str.startsWith(key)){
          return parsers[key](str);
        }
      }
      return {type:"speech", speaker: str.split(/: ?/)[0].trim(), line:str.split(/: ?/)[1].trim()} 
    }
  }
}
// let lines= `#fileroot: /adaIGF/dialog/
// #enter: Kraken,left,kraken.png

// Kraken:Hey Kat!

// #enter: Kat Tastro Phe,right, kat.png, Kat

// Kat: Oh, hey.
// Kat:Have you seen Calamity? 
// * Calamity Havok stalks up from behind *
// Kraken: Noooo...
// *Calamity pounces on Kat from behind, wrapping her in a hug and dragging her to the ground*
// *Kraken gives Cal a thumbs up, their mission accomplished*

// #exit: Kraken
// #enter: Calamity Havok,left,calamity.png
// #alias: Calamity Havok, Cal
// Cal: Hey~`;
// console.log(tokenizeScript(lines));