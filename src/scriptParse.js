
export function tokenizeScript(txt){ 
  txt = txt.replace(/\n+/g, '\n')
  txt = txt.split('\n')
  return txt.map(parseLine);
  function parseLine(str){
    var parsers = {
      "*": (e)=>{ return {type:"narration", line: e.replace(/\* ?/, "").trim()} },
      "#exit": (e)=>{ return {type:"exit", name: e.replace(/#exit: ?/, "").trim()} },
      "#enter": (e)=>{ 
        let data = e.replace(/#enter: ?/, "").split(/, ?/);
        return {type:"enter", name: data[0].trim(), side: data[1].trim(), file:data[2].trim()} 
      },
      "#fileroot": (e)=>{ return {type:"fileroot", str: e.replace(/#fileroot: ?/, "").trim()} },
    }
    for( let key in parsers ){
      if(str.startsWith(key)){
        return parsers[key](str);
      }
    }
    return {type:"speech", speaker: str.split(/: ?/)[0].trim(), line:str.split(/: ?/)[1].trim()} 
  }
}

// let lines=`#fileroot: /ada_IGF/dialog/
// #enter: Kraken , left , kraken.png

// Kraken:Hey Kat!

// #enter:Kat,right, kat.png

// Kat: Oh, hey.
// Kat:Have you seen Calamity? 
// * Calamity Havok stalks up from behind *
// Kraken: Noooo...
// *Calamity pounces on Kat from behind, wrapping her in a hug and dragging her to the ground*
// *Kraken gives Cal a thumbs up, their mission accomplished*

// #exit:Kraken
// #enter: Calamity,left,calamity.png

// Calamity:Hey~`;
// console.log(parseScript(lines));