//testrig.js

window.onload = testInit;
  var adaVisualDialog
function testInit(){
  
  adaVisualDialog = new VisualDialog();
  let say = document.getElementById("say");
  let startLeft = document.getElementById("startLeft");
  let exitLeft = document.getElementById("endLeft");
  let startRight = document.getElementById("startRight");
  let exitRight = document.getElementById("endRight");
  let testText = document.getElementById("testText");
  let scriptPlay = document.getElementById("scriptPlay");
  let step = document.getElementById("step");
  let stepBack = document.getElementById("stepBack");

  say.addEventListener("click", ()=>{adaVisualDialog.showDialog(testText.value)});
  startLeft.addEventListener("click", ()=>{adaVisualDialog.showCharacter("Kraken", "./adaIGF/dialog/kraken.png", "left")});
  startRight.addEventListener("click", ()=>{adaVisualDialog.showCharacter("Kat", "./adaIGF/dialog/kat.png",  "right")});
  endLeft.addEventListener("click", ()=>{adaVisualDialog.exitCharacter("left")});
  endRight.addEventListener("click", ()=>{adaVisualDialog.exitCharacter("right")});

  scriptPlay.addEventListener("click", ()=>{adaVisualDialog.loadScript(scriptText.value)});
  step.addEventListener("click", ()=>{adaVisualDialog.step()});
  stepBack.addEventListener("click", ()=>{adaVisualDialog.unstep()});
  
  scriptText.value = `#fileroot: ./ada_IGF/dialog/
#enter: Kraken,left,kraken.png

Kraken:Hey Kat!

#enter: Kat Tastro Phe,right, kat.png, Kat

Kat: Oh, hey.
Kat:Have you seen Calamity? 
* Calamity Havok stalks up from behind *
Kraken: Noooo...
*Calamity pounces on Kat from behind, wrapping her in a hug and dragging her to the ground*
*Kraken gives Cal a thumbs up, their mission accomplished*

#exit: Kraken
#enter: Calamity Havok,left,calamity.png
#alias Calamity Havok, Cal
Cal: Hey~`;
  
  adaVisualDialog.init();
}
