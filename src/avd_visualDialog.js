import {avd_animations} from "./avd_animations.js";
import {avd_tools} from "./avd_tools.js";
Hooks.once('init', async function () {
  console.log('Visual Dialog | Initializing Visual Dialog');
  window.VisualDialog = new VisualDialog();

  function VisualDialog() {
    let animations = avd_animations();
    let tools = avd_tools();
    let avd_state = tools.initialState();
    let elements = tools.setup();
    let script = "";
    let scriptPointer = 1;
    
    this.loadScript = function( txt ){
      script = tools.tokenizeScript( txt );
      scriptPointer = -1;
    }
    var step = this.step = function(){
      if( !script ){
        return;
      }
      if(scriptPointer >= script.length-1 ){
        endDialog()
        return;
      }
      let line = script[++scriptPointer];
      readLine(line);
      
    };
    this.unstep = function(){
      if(!script || scriptPointer <= 0 ){
        return;
      }
      let line = script[--scriptPointer]
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
          avd_state.find(line.name).fontName = line.font;
          setTitleFont(avd_state.side(line.name), line.font);
          step();
        },
        "fontspeech": function(line){
          avd_state.find(line.name).fontSpeech = line.font;
          step();
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
        elements.titleLeft.style.fontFamily = font;
      }
      if(side=="right"){
        elements.titleRight.style.fontFamily = font;
      }
    }
    
    function enterCharacter( characterName, side, characterImage, alias ){
      avd_state[side] = {
        name:characterName, 
        alias:alias?alias:characterName, 
        side:side,
        state: "enter"
      };
      let enterAvatar = (side=="left") ? elements.avatarLeft: elements.avatarRight;
      let enterTitle = (side=="left") ? elements.titleLeft: elements.titleRight;
      
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
      elements.dialogContainer.animate(anim.a, anim.t);
    }
    function sayDialog( side, dialogText ){
      if( !avd_state.dialogDisplay ){
        showDialog();
      }
      let wrapL='“'
      let wrapR='”'
      if(side=="left"){
        if(avd_state.left.fontSpeech){elements.dialog.style.fontFamily = avd_state.left.fontSpeech;}
        elements.dialog.style.backgroundcolor = "rgba(0,0,0,.6)";
        elements.dialog.style.fontSize = "1.9vw";
        elements.dialog.style.textAlign = "left";
        elements.dialog.style.fontStyle = "normal";
        let anim = animations.avatarRight.gray;
        elements.avatarRight.animate(anim.a, anim.t)
        anim = animations.avatarLeft.degray;
        elements.avatarLeft.animate(anim.a, anim.t)
        anim = animations.textBox.left;
        elements.dialogContainer.animate(anim.a, anim.t);
        anim = animations.textBox.right;
        elements.dialog.animate(anim.a, anim.t);
      }
      if(side=="right"){
        if(avd_state.right.fontSpeech){
          elements.dialog.style.fontFamily = avd_state.right.fontSpeech;
        }
        elements.dialog.style.backgroundcolor = "rgba(0,0,0,.6)";
        elements.dialog.style.fontSize = "1.9vw";
        elements.dialog.style.textAlign = "right";
        elements.dialog.style.fontStyle = "normal";
        let anim = animations.avatarLeft.gray;
        elements.avatarLeft.animate(anim.a, anim.t)
        anim = animations.avatarRight.degray;
        elements.avatarRight.animate(anim.a, anim.t)
        anim = animations.textBox.right;
        elements.dialogContainer.animate(anim.a, anim.t);
        anim = animations.textBox.left;
        elements.dialog.animate(anim.a, anim.t);
      }
      if(side=="narrator"){
        if(avd_state.narrator.fontSpeech){elements.dialog.style.fontFamily = avd_state.narrator.fontSpeech;}
        elements.dialog.style.backgroundcolor = "rgba(0,0,0,.9)";
        elements.dialog.style.fontSize = "1.6vw";
        elements.dialog.style.textAlign = "center";
        elements.dialog.style.fontStyle = "italic";
        let anim = animations.avatarLeft.gray;
        elements.avatarLeft.animate(anim.a, anim.t)
        anim = animations.avatarRight.gray;
        elements.avatarRight.animate(anim.a, anim.t)
        wrapR = "";
        wrapL = "";
        anim = animations.textBox.center;
        elements.dialogContainer.animate(anim.a, anim.t);
        elements.dialog.animate(anim.a, anim.t);
      }
      
      let anim = animations.dialog.show;
      elements.dialog.animate(anim.a, anim.t);
      elements.dialog.innerHTML = `${wrapL}${dialogText}${wrapR}`;
    }
    function exitCharacter( name ){
      if(avd_state.left && name == avd_state.left.alias){
        let anim = animations.avatarLeft.exit;
        elements.avatarLeft.animate(anim.a, anim.t);
        anim = animations.titleLeft.exit;
        elements.titleLeft.animate(anim.a, anim.t);
      } else if(avd_state.right && name == avd_state.right.alias) {
        let anim = animations.avatarRight.exit;
        elements.avatarRight.animate(anim.a, anim.t);
        anim = vd_animations.titleRight.exit;
        elements.titleRight.animate(anim.a, anim.t);
      }       
    };
    function endDialog(){
      if( avd_state.left ){
        let anim = animations.avatarLeft.exit;
        elements.avatarLeft.animate(anim.a, anim.t);
        anim = animations.titleLeft.exit;
        elements.titleLeft.animate(anim.a, anim.t);
      }
      if( avd_state.right ){
        let anim = animations.avatarRight.exit;
        elements.avatarRight.animate(anim.a, anim.t);
        anim = animations.titleRight.exit;
        elements.titleRight.animate(anim.a, anim.t);
      }
      if( avd_state.dialogDisplay ){
        let anim = animations.dialog.exit;
        elements.dialog.animate(anim.a, anim.t);
        anim = animations.textBox.exit;
        elements.dialogContainer.animate(anim.a, anim.t);
      }
      avd_state = tools.initialState();
    }
  }

});