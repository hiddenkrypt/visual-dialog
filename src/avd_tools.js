export function avd_tools() {
  return { 
    tokenizeScript: tokenizeScript
  }
  function tokenizeScript( txt ){ 
    txt = txt.replace( /^\n+$/g, '' );
    txt = txt.split( '\n' );
    var currentRoot = "";
    return txt.map(parseLine).filter(e=> e.type!= "skip");
    function parseLine(str){
      str = str.trim()
      if(str == ""){
        return {type:"skip"}
      }
      var parsers = {
        "*": e=>{ return {type:"narration", line: e.replace(/\* ?/g, "").trim()} },
        "#exit": e=>{ return {type:"exit", name: e.replace(/#exit: ?/, "").trim()} },
        "##": e=>{ return {type:"skip"} },
        "#pause": e=>{ return {type:"pause"} },
        "#fontname": e=>{ 
          let data = e.replace(/#fontname ?/, "").split(':');
          let token = {type:"fontname", name: data[0].trim(), font: data[1].trim()}
          return token;
        },
        "#fontspeech": e=>{ 
          let data = e.replace(/#fontspeech ?/, "").split(':');
          let token = {type:"fontspeech", name: data[0].trim(), font: data[1].trim()}
          return token;
        },
        "#enter": e=>{ 
          let data = e.replace(/#enter: ?/, "").split(/, ?/);
          let token = {type:"enter", name: data[0].trim(), side: side(data[1]), file:currentRoot+data[2].trim()}
          if( data[3] ){
            token.alias = data[3].trim();
          }
          return token
        },
        "#fileroot": e => { 
          currentRoot = e.replace(/#fileroot: ?/, "").trim();
          return { type:"skip" } 
        },
        "#alias": e=> { 
          let data = e.replace(/#alias: ?/, "").split(/, ?/);
          return {type:"alias", name: data[0].trim(), alias: data[1].trim()} 
        }
      }
    
      for( let key in parsers ){
      //  console.log(`\t${key}-${str.startsWith(key)}`);
        if(str.startsWith(key)){
          return parsers[key](str);
        }
      }
      return {type:"speech", name: str.split(/: ?/)[0].trim(), line:str.split(/: ?/)[1].trim()} 
    }
    function side(txt){
      if( txt.trim().match(/left/i) ){
        return "left"
      } else if ( txt.trim().match(/right/i) ){
        return "right"
      }
    }
  }
}
