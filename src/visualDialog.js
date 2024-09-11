// font-family: 'Orbitron';
export let adaVisualDialog = new VisualDialog();


function VisualDialog() {
  const nameStyle = {"fill": "#584884","fontFamily": "Orbitron","fontSize": 54,"strokeThickness": 4}
  const dialogStyle = {"fill": "#ffff","fontFamily": "Arial Black","fontSize": 34,"strokeThickness": 0}
  const dialogueY = 430      //px
  const dialogueX = 1200     //px
  const dialogueSpacing = 60 //px
  const duration= 12000      //ms
  const dialogueDelay= 1500  //ms
  
  this.endDialog = function(){
    await Sequencer.EffectManager.endEffects({ name: "ada_talkbox" })
    await Sequencer.EffectManager.endEffects({ name: "ada_portrait" })
    await Sequencer.EffectManager.endEffects({ name: "ada_nameplate" })
    await Sequencer.EffectManager.endEffects({ name: "ada_text" })
  }
  this.startDialog = function( characterName, characterImage ){
    new Sequence()
      .effect("Ada_IGF/ui/talkbox/bg.png")
        .atLocation({x:300, y:500})
        .moveTowards({x:1050, y:500}, {ease:"easeInBack"}).moveSpeed(600)
        .fadeIn(1000, {ease:"easeInBack"})
        .fadeOut(500)
        .scale(1.5)
        .persist().name("ada_talkbox")
      .effect(characterImage)
        .atLocation({x:400, y:500})
        .scaleIn(2.1, 250)
        .fadeIn(900)
        .fadeOut(500)
        .scale(.25)
        .persist().name("ada_portrait")
      .wait(300)
      .effect()
        .atLocation({x:1000, y:900})
        .moveTowards({x:400, y:900}, { rotate: false }).moveSpeed(1500)
        .text(characterName, nameStyle)
        .fadeIn(500)
        .fadeOut(500)
        .scale(1.5)
        .persist().name("ada_nameplate")
      .wait(1000)
      .play();
  }
  this.sendDialog = function( text ){
    mySequence = new Sequence()
    addTextLine("What do you mean I can't be in", 0, mySequence);
    addTextLine("the vents? I... don't think", 1, mySequence);
    addTextLine("you know who I am.", 2, mySequence);
    mySequence.wait(duration/2.1);
    addTextLine("I *live* in the vents.", 1, mySequence);
    mySequence.play() 
    
    function addTextLine( txt, count, seq ){
      seq.effect()
        .atLocation( { x:dialogueX, y:dialogueY + ( dialogueSpacing * count ) } )
        .text( txt, dialogStyle )
        .duration( 1500 )
        .fadeIn( 200 )
        .fadeOut( 500 )
        .name( "ada_text" )
    }
  }
    
}