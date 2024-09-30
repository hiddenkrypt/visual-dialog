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
  startLeft.addEventListener("click", ()=>{adaVisualDialog.enterCharacter("Kraken", "./adaIGF/dialog/kraken.png", "left")});
  startRight.addEventListener("click", ()=>{adaVisualDialog.enterCharacter("Kat", "./adaIGF/dialog/kat.png",  "right")});
  endLeft.addEventListener("click", ()=>{adaVisualDialog.exitCharacter("left")});
  endRight.addEventListener("click", ()=>{adaVisualDialog.exitCharacter("right")});

  scriptPlay.addEventListener("click", ()=>{adaVisualDialog.loadScript(scriptText.value)});
  step.addEventListener("click", ()=>{adaVisualDialog.step()});
  stepBack.addEventListener("click", ()=>{adaVisualDialog.unstep()});
  
  // scriptText.value = `#fileroot: ./adaIGF/dialog/
// #enter: Kraken,left,kraken.png

// Kraken:Hey Kat!

// #enter: Kat Tastro Phe,right, kat.png, Kat

// Kat: Oh, hey.
// Kat:Have you seen Calamity? 
// * Calamity Havok stalks up from behind *
// Kraken: Noooo...
// *Calamity pounces on Kat from behind, wrapping her in a hug and dragging her to the ground*
// *Kraken gives Cal a thumbs up, their mission accomplished*

// #exit: Kraken
// #enter: Calamity Havok,left,calamity.png
// #alias: Calamity Havok, Cal
// Cal: Hey~`;
  scriptText.value = `#fileroot: ./adaIGF/dialog/
#enter: Jerry, right, jerry.png
#enter: Rita, left, rita-holo.png
*When you enter the room, you notice you and Jerry aren’t its only occupants – sort of. The vidscreen displays the flickering image of a severe woman in a crisp white suit. As you arrive, she narrows her eyes. Jerry adjusts his collar nervously.*
Jerry: So, uh, in case you don’t know, this is Rita, station director on the Icebreaker Borealis. My counterpart!

*When she speaks, it’s in a cool, level tone.*

Rita: Good morning. 
Rita: I’ve heard a lot about you from Jerry and from system gossip.
Rita: Word is we have you to thank for Andros Capella exiting the stage. Good work! I’m glad Hell’s Gate is finally cleaning up its messes.

*Jerry looks upset by this statement, but Rita cuts him off before he can speak.*

Rita: Let’s get down to business.
Rita: Jerry says that since you sent the Hell Hounds packing, salvage and mining crews have been able to get to work properly for the first time in months.
Rita: Well, you’re in luck. The Icebreaker is undertaking some major expansion projects this quarter, and I’m willing to offer guaranteed, above-market prices for anything you’re selling; raw materials, construction equipment, salvage, whatever. 
Rita: I’ll even comp you and your freighter crews for a few nights on the town. I have one condition.

*Jerry takes a deep breath.*
Jerry: You always do, Rita.
*Rita shoots a withering glare at Jerry, before continuing.*
Rita: I want to subcontract your team. I have a sensitive job that needs competent operators. You’re competent, and better, you’re not working for anyone on the Board. 
Rita: Bring your mechs.`
  adaVisualDialog.init();
}
