function VisualDialog() {

  let avd_state = {
    left: null,
    right: null,
    scriptPointer: null,
    script: null,
    fileroot: ""
  }
  let avd_elements;
  let avd_container = document.createElement("div");
  avd_container.id = "avd_container";
  this.init = function(){
    console.log(`init()`);
    for (let [e,v] in avd_elements){
      v.parentNode.removeChild(v);
    }
    avd_elements = {
      avdContainer: document.createElement("div"),
      avatarLeft: document.createElement("img"),
      avatarRight: document.createElement("img"),
      titleLeft: document.createElement("div"),
      titleRight: document.createElement("div"),
      dialogContainer: document.createElement("div")
    };
    avd_setup();
  };
  function avd_setup(){
    for (let e in avd_elements){
      avd_elements[e].id = e
      avd_container.appendChild(avd_elements[e]);
    }
    avd_elements.dialog = document.createElement("div");
    avd_elements.dialog.id = "dialog";
    avd_elements.dialogContainer.appendChild(avd_elements.dialog);
    document.body.appendChild(avd_container);
  }
  this.loadScript = function( txt ){
    avd_state.script = Tools.tokenizeScript( txt );
    avd_state.scriptPointer = -1;
    showDialog();
  }
  this.step = function(){
    console.log(avd_state.scriptPointer);
    if(!avd_state.script || avd_state.scriptPointer >= avd_state.script.length-1 ){
      return;
    }
    let line = avd_state.script[++avd_state.scriptPointer];
    readLine(line);
    if(line.type == "fileroot" || line.type == "alias"){
      console.log("jump")
      this.step();
    }
    
  };
  this.unstep = function(){
    console.log(avd_state.scriptPointer);
    if(!avd_state.script || avd_state.scriptPointer <= 0 ){
      return;
    }
    let line = avd_state.script[--avd_state.scriptPointer]
    if( line.type =="speech" || line.type == "narration" ){
      readLine(line);
    } else {
      this.unstep()
    }
  };
  function readLine(line){
    console.log(line)
    var handlers = {
      "enter": function(line){
        enterCharacter(line.name, line.side, line.file, line.alias); 
      },
      "exit": function(line){
        exitCharacter(line.name); 
      },
      "fileroot": function(line){
        avd_state.fileroot = line.path;
      },
      "alias": function(line){
        console.log("ALIAS");
        console.log(avd_state.left);
        console.log(avd_state.right);
        console.log(line);
        if( avd_state.left && avd_state.left.name == line.name ){
          avd_state.left.alias = line.alias;
        }
        else if( avd_state.right && avd_state.right.name == line.name ){
          avd_state.right.alias = line.alias;
        }
      },
      "narration": function(line){
          sayDialog( "narrator", line.line );
      },
      "speech": function( line ){
        if( avd_state.left && avd_state.left.alias == line.name ){
          sayDialog( "left", line.line );
        }
        else if( avd_state.right && avd_state.right.alias == line.name ){
          sayDialog( "right", line.line );
        }
        
      }
    }
    handlers[line.type](line);
    function findCharacter(name){
      console.log(name)
      console.log("left- "+avd_state?.left?.name);
      console.log("right- "+avd_state?.right?.name);
      if( avd_state.left && avd_state.left.name == name ){
        return avd_state.left
      }
      else if( avd_state.right && avd_state.right.name == name ){
        return avd_state.right
      }
      return null
    }
  }
  
  
  function enterCharacter( characterName, side, characterImage, alias ){
    console.log(`showCharacter() ${characterName}, ${side}, ${characterImage}`);


    avd_state[side] = {
      name:characterName, 
      alias:alias?alias:characterName, 
    };
    let enterAvatar = (side=="left") ? avd_elements.avatarLeft: avd_elements.avatarRight;
    let enterTitle = (side=="left") ? avd_elements.titleLeft: avd_elements.titleRight;
    
    enterTitle.innerHTML = characterName;
    enterAvatar.src = avd_state.fileroot + `${characterImage}`;
    let anim = (side=="left") ? avd_animations["avatarLeft"].show : avd_animations["avatarRight"].show;
    enterAvatar.animate(anim.a, anim.t) 
    anim = (side=="left") ? avd_animations["titleLeft"].show : avd_animations["titleRight"].show;
    enterTitle.animate(anim.a, anim.t) 
    
  }
  function showDialog(){
    let anim = avd_animations.textBox.show;
    avd_elements.dialogContainer.animate(anim.a, anim.t);
  }
  function sayDialog( side, dialogText ){
    console.log("say: "+dialogText);
    if(side=="left"){
      avd_elements.dialog.style.textAlign = "left";
      avd_elements.dialog.style.fontStyle = "normal";
    }
    if(side=="right"){
      avd_elements.dialog.style.textAlign = "right";
      avd_elements.dialog.style.fontStyle = "normal";
    }
    if(side=="narrator"){
      avd_elements.dialog.style.textAlign = "center";
      avd_elements.dialog.style.fontStyle = "italic";
    }
    anim = avd_animations.dialog.show;
    avd_elements.dialog.innerHTML = dialogText;
    avd_elements.dialog.animate(anim.a, anim.t);
  }
  function exitCharacter( name ){
    if(avd_state.left && name == avd_state.left.alias){
      avd_elements.avatarLeft.style.opacity = 0;
      avd_elements.titleLeft.style.opacity = 0;
    } else if(avd_state.right && name == avd_state.right.alias) {
      avd_elements.avatarRight.style.opacity = 0;
      avd_elements.titleRight.style.opacity = 0;
    }    
  };
}
