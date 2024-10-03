export var Tools = {  
  tokenizeScript: function(txt){ 
    txt = txt.replace(/\n+/g, '\n')
    txt = txt.split('\n')
    return txt.map(parseLine);
    function parseLine(str){
      console.log("line: "+str);
      var parsers = {
        "*": e=>{ return {type:"narration", line: e.replace(/\* ?/g, "").trim()} },
        "#exit": e=>{ return {type:"exit", name: e.replace(/#exit: ?/, "").trim()} },
        "#enter": e=>{ 
          let data = e.replace(/#enter: ?/, "").split(/, ?/);
          let token = {type:"enter", name: data[0].trim(), side: side(data[1]), file:data[2].trim()}
          if( data[3] ){
            token.alias = data[3].trim();
          }
          return token
        },
        "#fileroot": e=>{ return {type:"fileroot", path: e.replace(/#fileroot: ?/, "").trim()} },
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
