function VisualDialog() {
  console.log(avd_animations);
  let avdState = {
    characterLeft: false,
    characterRight: false,
    textbox: false
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
  this.showCharacter = function( characterName, characterImage, side ){
    console.log(`showCharacter() ${characterName}, ${side}, ${characterImage}`);
    let anim = avd_animations[side+"Avatar"].appear;
    let avatar;
    let title;
    if(side=="left"){
      avatar = avd_elements.avatarLeft;
      title = avd_elements.titleLeft;
    } else {
      avatar = avd_elements.avatarRight;
      title = avd_elements.titleRight;
    }
    title.innerHTML = characterName;
    avatar.src = `${characterImage}`;
    avatar.animate(anim.a, anim.t) 
    anim = avd_animations[side+"Title"].appear;
    title.animate(anim.a, anim.t) 
    
  }
  this.showDialog = function( dialogText ){
    let anim = avd_animations.textBox.appear;
    avd_elements.dialogContainer.animate(anim.a, anim.t);
    anim = avd_animations.dialog.appear;
    avd_elements.dialog.animate(anim.a, anim.t);
    avd_elements.dialog.innerHTML = dialogText;
  }
  this.playLine = function( character, txt){
  
  
  }
  this.exitCharacter = function( side ){
    if(side=="left"){
      //apply css animation class to hide left
    } else {
      //apply css animation class to hide right
    }    
  }
}
