function VisualDialog() {
  let avd_state = {
    left: null,
    right: null,
    scriptPointer: null,
    script: null,
    fileroot: "",
    last: null
  }
  let avd_elements;
  let avd_container = document.createElement("div");
  avd_container.id = "avd_container";
  this.init = function(){
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
  var step = this.step = function(){
    console.log(avd_state.scriptPointer);
    if(avd_state.scriptPointer >= avd_state.script.length-1 ){
      endDialog()
      return;
    }
    if( !avd_state.script ){
      return;
    }
    let line = avd_state.script[++avd_state.scriptPointer];
    readLine(line);
    if(line.type == "fileroot" || line.type == "alias"){
      step();
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
      },
      "end": endDialog
    }
    handlers[line.type](line);
    function findCharacter(name){
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
    avd_state[side] = {
      name:characterName, 
      alias:alias?alias:characterName, 
      side:side,
      state: "enter"
    };
    let enterAvatar = (side=="left") ? avd_elements.avatarLeft: avd_elements.avatarRight;
    let enterTitle = (side=="left") ? avd_elements.titleLeft: avd_elements.titleRight;
    
    enterTitle.innerHTML = characterName;
    enterAvatar.src = avd_state.fileroot + `${characterImage}`;
    let leftAvatarAnimations = avd_animations.avatarLeft;
    let rightAvatarAnimations = avd_animations.avatarRight;
    let leftTitleAnimations = avd_animations.avatarLeft;
    let rightTitleAnimations = avd_animations.titleRight;
    
    let anim = null;
    if( side == "left" ){
      anim = leftAvatarAnimations.show
    } else if( side == "right" ) {
      anim = rightAvatarAnimations.show;
    }
    enterAvatar.animate(anim.a, anim.t) 
    if(side=="left"){
      anim = leftTitleAnimations.show
    } else if( side == "right" ) {
      anim = rightTitleAnimations.show;
    }
    enterTitle.animate(anim.a, anim.t) 
    step()
  }
  function showDialog(){
    let anim = avd_animations.textBox.show;
    avd_elements.dialogContainer.animate(anim.a, anim.t);
  }
  function sayDialog( side, dialogText ){
    let wrapL='“'
    let wrapR='”'
    if(side=="left"){
      avd_elements.dialog.style.backgroundcolor = "rgba(0,0,0,.6)";
      avd_elements.dialog.style.fontSize = "1.9vw";
      avd_elements.dialog.style.textAlign = "left";
      avd_elements.dialog.style.fontStyle = "normal";
      let anim = avd_animations.avatarRight.gray;
      avd_elements.avatarRight.animate(anim.a, anim.t)
      anim = avd_animations.avatarLeft.degray;
      avd_elements.avatarLeft.animate(anim.a, anim.t)
      anim = avd_animations.textBox.left;
      avd_elements.dialogContainer.animate(anim.a, anim.t);
      anim = avd_animations.textBox.right;
      avd_elements.dialog.animate(anim.a, anim.t);
    }
    if(side=="right"){
      avd_elements.dialog.style.backgroundcolor = "rgba(0,0,0,.6)";
      avd_elements.dialog.style.fontSize = "1.9vw";
      avd_elements.dialog.style.textAlign = "right";
      avd_elements.dialog.style.fontStyle = "normal";
      let anim = avd_animations.avatarLeft.gray;
      avd_elements.avatarLeft.animate(anim.a, anim.t)
      anim = avd_animations.avatarRight.degray;
      avd_elements.avatarRight.animate(anim.a, anim.t)
      anim = avd_animations.textBox.right;
      avd_elements.dialogContainer.animate(anim.a, anim.t);
      anim = avd_animations.textBox.left;
      avd_elements.dialog.animate(anim.a, anim.t);
    }
    if(side=="narrator"){
      avd_elements.dialog.style.backgroundcolor = "rgba(0,0,0,.9)";
      avd_elements.dialog.style.fontSize = "1.6vw";
      avd_elements.dialog.style.textAlign = "center";
      avd_elements.dialog.style.fontStyle = "italic";
      let anim = avd_animations.avatarLeft.gray;
      avd_elements.avatarLeft.animate(anim.a, anim.t)
      anim = avd_animations.avatarRight.gray;
      avd_elements.avatarRight.animate(anim.a, anim.t)
      wrapR = "";
      wrapL = "";
      anim = avd_animations.textBox.center;
      avd_elements.dialogContainer.animate(anim.a, anim.t);
      avd_elements.dialog.animate(anim.a, anim.t);
    }
    
    let anim = avd_animations.dialog.show;
    avd_elements.dialog.animate(anim.a, anim.t);
    avd_elements.dialog.innerHTML = `${wrapL}${dialogText}${wrapR}`;
  }
  function exitCharacter( name ){
    if(avd_state.left && name == avd_state.left.alias){
      let anim = avd_animations.avatarLeft.exit;
      avd_elements.avatarLeft.animate(anim.a, anim.t);
      anim = avd_animations.titleLeft.exit;
      avd_elements.titleLeft.animate(anim.a, anim.t);
    } else if(avd_state.right && name == avd_state.right.alias) {
      let anim = avd_animations.avatarRight.exit;
      avd_elements.avatarRight.animate(anim.a, anim.t);
      anim = vd_animations.titleRight.exit;
      avd_elements.titleRight.animate(anim.a, anim.t);
    }       
    step()
  };
  function endDialog(){
    let anim = avd_animations.avatarLeft.exit;
    avd_elements.avatarLeft.animate(anim.a, anim.t);
    anim = avd_animations.titleLeft.exit;
    avd_elements.titleLeft.animate(anim.a, anim.t);
    anim = avd_animations.avatarRight.exit;
    avd_elements.avatarRight.animate(anim.a, anim.t);
    anim = avd_animations.titleRight.exit;
    avd_elements.titleRight.animate(anim.a, anim.t);
    anim = avd_animations.dialog.exit;
    avd_elements.dialog.animate(anim.a, anim.t);
    anim = avd_animations.textBox.exit;
    avd_elements.dialogContainer.animate(anim.a, anim.t);
  }
}
