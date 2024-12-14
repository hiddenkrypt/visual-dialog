import {avd_animations} from "./avd_animations.js";
import {avd_tools} from "./avd_tools.js";
Hooks.once('init', async function () {
  console.log('Visual Dialog | Initializing Visual Dialog');
  window.avd_VisualDialog = new VisualDialog();
  function initialState(){
    return {
      dialogDisplay: false,
      left: null,
      right: null,
      scriptPointer: null,
      script: null,
      last: null,
      narrator: {font:"caviar_dreams , sans-serif"},
      find: function(name){
        if(this.left.name == name || this.left.alias == name){
          return this.left;
        }
        if(this.right.name == name || this.right.alias == name){
          return this.right;
        }
        if( name == narrator ){
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
    } 
  }
  function VisualDialog() {
    let animations = avd_animations();
    let tools = avd_tools();
    let avd_state = initialState();
    let avd_elements;
    let avd_container = document.createElement("div");
    avd_container.id = "avd_container";
    avd_setup();
    
    function avd_setup(){
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
      for (let e in avd_elements){
        avd_elements[e].id = e
        avd_container.appendChild(avd_elements[e]);
      }
      avd_elements.dialog = document.createElement("div");
      avd_elements.dialog.id = "dialog";
      avd_elements.dialogContainer.appendChild(avd_elements.dialog);
      function imageFallback() {
        console.error(`Visual Dialog: Image not found (${this.src})`);
        this.src = '/modules/visual-dialog/assets/missing_image.png';
        this.onerror = null;
      }
      avd_elements.avatarLeft.onerror = imageFallback;
      avd_elements.avatarRight.onerror = imageFallback;
      document.body.appendChild(avd_container);
    }
    
    
    this.loadScript = function( txt ){
      avd_state.script = tools.tokenizeScript( txt );
      avd_state.scriptPointer = -1;
    }
    var step = this.step = function(){
      if( !avd_state.script ){
        return;
      }
      if(avd_state.scriptPointer >= avd_state.script.length-1 ){
        endDialog()
        return;
      }
      let line = avd_state.script[++avd_state.scriptPointer];
      readLine(line);
      
    };
    this.unstep = function(){
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
      var handlers = {
        "enter": function(line){
          enterCharacter(line.name, line.side, line.file, line.alias); 
          step();
        },
        "exit": function(line){
          exitCharacter(line.name); 
          step();
        },
        "fontname": function(line){
          console.log("set fontname: "+line.font);
          avd_state.find(line.name).fontname = line.font;
          setTitleFont(avd_state.side(line.name), line.font);
          step();
        },
        "fontspeech": function(line){
          avd_state.find(line.name).fontspeech = line.font;
        },
        "pause": ()=>{},
        "skip": ()=>{
          step()
        },
        "alias": function(line){
          avd_state.find(line.name).alias = line.alias;
          step()
        },
        "narration": function(line){
          sayDialog( "narrator", line.line );
        },
        "speech": function( line ){
          sayDialog( avd_state.side(line.name) , line.line );
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
    
    function setTitleFont(side, font){
      if(side=="left"){
        avd_elements.titleLeft.style.fontFamily = font;
      }
      if(side=="right"){
        avd_elements.titleRight.style.fontFamily = font;
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
      enterAvatar.src = characterImage;
      let leftAvatarAnimations = animations.avatarLeft;
      let rightAvatarAnimations = animations.avatarRight;
      let leftTitleAnimations = animations.avatarLeft;
      let rightTitleAnimations = animations.titleRight;
      
      let anim = null;
      if( side == "left" ){
        anim = leftAvatarAnimations.show
      } else if( side == "right" ) {
        anim = rightAvatarAnimations.show;
      }
      enterAvatar.animate(anim.a, anim.t);
      if(side=="left"){
        anim = leftTitleAnimations.show
      } else if( side == "right" ) {
        anim = rightTitleAnimations.show;
      }
      enterTitle.animate(anim.a, anim.t);
    }
    function showDialog(){
      avd_state.dialogDisplay = true;
      let anim = animations.textBox.show;
      avd_elements.dialogContainer.animate(anim.a, anim.t);
    }
    function sayDialog( side, dialogText ){
      console.log("say:-"+side);
      if( !avd_state.dialogDisplay ){
        showDialog();
      }
      let wrapL='“'
      let wrapR='”'
      if(side=="left"){
        if(avd_state.left.font){avd_elements.dialog.style.fontFamily = avd_state.left.font;}
        avd_elements.dialog.style.backgroundcolor = "rgba(0,0,0,.6)";
        avd_elements.dialog.style.fontSize = "1.9vw";
        avd_elements.dialog.style.textAlign = "left";
        avd_elements.dialog.style.fontStyle = "normal";
        let anim = animations.avatarRight.gray;
        avd_elements.avatarRight.animate(anim.a, anim.t)
        anim = animations.avatarLeft.degray;
        avd_elements.avatarLeft.animate(anim.a, anim.t)
        anim = animations.textBox.left;
        avd_elements.dialogContainer.animate(anim.a, anim.t);
        anim = animations.textBox.right;
        avd_elements.dialog.animate(anim.a, anim.t);
      }
      if(side=="right"){
        if(avd_state.right.font){avd_elements.dialog.style.fontFamily = avd_state.right.font;}
        avd_elements.dialog.style.backgroundcolor = "rgba(0,0,0,.6)";
        avd_elements.dialog.style.fontSize = "1.9vw";
        avd_elements.dialog.style.textAlign = "right";
        avd_elements.dialog.style.fontStyle = "normal";
        let anim = animations.avatarLeft.gray;
        avd_elements.avatarLeft.animate(anim.a, anim.t)
        anim = animations.avatarRight.degray;
        avd_elements.avatarRight.animate(anim.a, anim.t)
        anim = animations.textBox.right;
        avd_elements.dialogContainer.animate(anim.a, anim.t);
        anim = animations.textBox.left;
        avd_elements.dialog.animate(anim.a, anim.t);
      }
      if(side=="narrator"){
        if(avd_state.narrator.font){avd_elements.dialog.style.fontFamily = avd_state.narrator.font;}
        avd_elements.dialog.style.backgroundcolor = "rgba(0,0,0,.9)";
        avd_elements.dialog.style.fontSize = "1.6vw";
        avd_elements.dialog.style.textAlign = "center";
        avd_elements.dialog.style.fontStyle = "italic";
        let anim = animations.avatarLeft.gray;
        avd_elements.avatarLeft.animate(anim.a, anim.t)
        anim = animations.avatarRight.gray;
        avd_elements.avatarRight.animate(anim.a, anim.t)
        wrapR = "";
        wrapL = "";
        anim = animations.textBox.center;
        avd_elements.dialogContainer.animate(anim.a, anim.t);
        avd_elements.dialog.animate(anim.a, anim.t);
      }
      
      let anim = animations.dialog.show;
      avd_elements.dialog.animate(anim.a, anim.t);
      avd_elements.dialog.innerHTML = `${wrapL}${dialogText}${wrapR}`;
    }
    function exitCharacter( name ){
      if(avd_state.left && name == avd_state.left.alias){
        let anim = animations.avatarLeft.exit;
        avd_elements.avatarLeft.animate(anim.a, anim.t);
        anim = animations.titleLeft.exit;
        avd_elements.titleLeft.animate(anim.a, anim.t);
      } else if(avd_state.right && name == avd_state.right.alias) {
        let anim = animations.avatarRight.exit;
        avd_elements.avatarRight.animate(anim.a, anim.t);
        anim = vd_animations.titleRight.exit;
        avd_elements.titleRight.animate(anim.a, anim.t);
      }       
    };
    function endDialog(){
      if( avd_state.left ){
        let anim = animations.avatarLeft.exit;
        avd_elements.avatarLeft.animate(anim.a, anim.t);
        anim = animations.titleLeft.exit;
        avd_elements.titleLeft.animate(anim.a, anim.t);
      }
      if( avd_state.right ){
        let anim = animations.avatarRight.exit;
        avd_elements.avatarRight.animate(anim.a, anim.t);
        anim = animations.titleRight.exit;
        avd_elements.titleRight.animate(anim.a, anim.t);
      }
      if( avd_state.dialogDisplay ){
        let anim = animations.dialog.exit;
        avd_elements.dialog.animate(anim.a, anim.t);
        anim = animations.textBox.exit;
        avd_elements.dialogContainer.animate(anim.a, anim.t);
      }
      avd_state = initialState();
    }
  }

});