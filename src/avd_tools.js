export function avd_tools() {
  return { 
    tokenizeScript: tokenizeScript,
    initialState: initialState,
    setup: setup
  }
  
  function setup(){
    let avd_container = document.getElementById("avd_container")
    if( avd_container ){
      avd_container.innerHTML = '';
    } else {
      avd_container = document.createElement("div");
      avd_container.id = "avd_container";    
    }
    
    let element_list = {
      avdContainer: document.createElement("div"),
      avatarLeft: document.createElement("img"),
      avatarRight: document.createElement("img"),
      titleLeft: document.createElement("div"),
      titleRight: document.createElement("div"),
      dialogContainer: document.createElement("div")
    };
    for (let e in element_list){
      element_list[e].id = e
      avd_container.appendChild(element_list[e]);
    }
    element_list.dialog = document.createElement("div");
    element_list.dialog.id = "dialog";
    element_list.dialogContainer.appendChild(element_list.dialog);
    function imageFallback() {
      console.error(`Visual Dialog: Image not found (${this.src})`);
      this.src = '/modules/visual-dialog/assets/missing_image.png';
      this.onerror = null;
    }
    element_list.avatarLeft.onerror = imageFallback;
    element_list.avatarRight.onerror = imageFallback;
    document.body.appendChild(avd_container);
    return element_list;
  }
  function initialState(){
    return {
      dialogDisplay: false,
      left: null,
      right: null,
      scriptPointer: null,
      script: null,
      last: null,
      narrator: {fontSpeech:"caviar_dreams, sans-serif"},
      find: function(name){
        if(this.left && (this.left.name == name || this.left.alias == name)){
          return this.left;
        }
        if(this.right && (this.right.name == name || this.right.alias == name)){
          return this.right;
        }
        if( name == 'narrator' ){
          return this.narrator;
        }
        return {error:true};
      },
      side: function(name){
        if(this.find(name) == this.left){
          return "left";
        } else if(this.find(name) == this.right){
          return "right";
        }
        return "none";
      }
    };
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
