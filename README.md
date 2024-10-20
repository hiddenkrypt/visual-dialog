
# What is this? 
Visual Dialog is a module that allows you to use Visual Novel style dialog animations in foundry. The main feature is a fully open API allowing users to automate and trigger the display. 

# Features
 * Reads lines and stage cues from a script!
 * Animated entrance and exit, stylized text showing who's talking

# Installation
* Download the latest release
* Unzip
* Drop into your /data/modules directory
* **Restart your foundry instance**. You should see the module in the foundry config add-ons list. In your foundry world, it should show up in the modules menu.
* Activate Visual DIalog in the modules menu of your world

# Use
Visual Dialog adds a singlet object to foundry that exposes ~~three~~ two functions. 
 
## Macro API
**loadScript**: give Visual Dialog a script, and it will open the dialog window, ready to start stepping through.
**step**: Once a script is loaded, this function progresses Visual Dialog through it. Some script lines like enter and exit will automatically step to the next dialog.

## Script formatting
The scripting language for Visual Dialog is based on stage play scripts and meant to be fairly easy for non-programmers to understand. There are some special commands that help, but aren't necessary. Where possible the script is very forgiving of whitespace; empty lines, leading or trailing spaces, so users can have some freedom to format lines in a way that makes sense to them. 

A script is made up of Lines. 

Lines that start with an octothorpe or hash (#) are taken as commands. Commands usually take one or more arguments. all arguments are separated by commas.  

    **#filepath <str>** 
the <str> will be prefixed to any images in later portions of the script. 

    **#enter <name>, <side>, <img>, <alias>
A new character is added to the dialog on the given <side> (options are "left" or "right"). The <name> will be displayed under thier picture, which will be an image found at the path <img>, or <fileroot><img> if the #fileroot command was used previously. <alias> is an optional parameter that gives a different name from <name> by which a character can be referred for later, see #alias below

    **#exit <name>**
The named character will leave the stage, disappearing. 

    **#alias <name>, <str>
the named character will now be able to be referenced as <str> in addition to their <name>. Very useful for characters with long display names. For instance, the character Dr.Ignatius Floofles would be a lot to type for every line of dialog. Aliasing lets you save time in subsequent lines:
    #enter Dr.Ignatius Floofles, left, floof.png
    #alias Dr.Ignatius Floofles, iggy
    iggy: looks like I need to cut our conversation short
    iggy: I'm late for my next client
    #exit iggy
    
Lines that are wrapped in asterisks are taken as narration
    * <str> *
<str> will be displayed as text said by none of the actors on screen. 

Lines that start with a character than has entered the stage are taken as dialog. 
    <name>: <str>
<name> can match to the characters name defined during their #enter command, or it can match their alias

###Example
Create two macros, one named "greeting" to start a dialog, and one named "step" to step through the active dialog.

In macro "greeting", make sure it's set to script mode and put the following code: 
    avd_VisualDialog.loadScript(`
      #enter: Kraken, left, systems/lancer/assets/retrograde-minis/Retrograde-Minis-SSC-DUSK WING.png
      Kraken: Hey Kat!
      #enter: Kat, right, systems/lancer/assets/retrograde-minis/Retrograde-Minis-IPS-N-LANCASTER.png
      Kat: Oh, hey.
      Kat: Have you seen Calamity? 
      Kraken: Nope!
    `);

In the macro "step" also in script mode, put this line:
    avd_VisualDialog.step()



Execute the greeting macro, then execute the step macro a few times to see it in action!

## To-Do
### bugs
 * the dialog engine does not clean up nicely when it's finished. Need to reset the state of the engine at that point. 
### features 
 * add API to end the dialog immediately
 * consider a step-back API option
 * add foundry UI buttons for each API point
 * add settings menu, option to turn off animations
 * add #animate pragma (name pending) to trigger silly animations on characters
 * add optional timing parameters to actions. Speed of animation, and delay before animation.override defaults.
 * add support for unlimited on screen characters
 * add support for positioning the entire dialog. Maybe scaling too. 
 * per-character name font selection? speaking font selection? think about it

# Maintenance & Changelog
Any bugs should be [reported here](https://github.com/hiddenkrypt/visual-dialog/issues) on github.

**V0.01:** *development begins* 
- first steps on development of a new module :3
**V0.02:** *refinement, MVP* 
- serviceable, if not entirely barebones. Can load a basic script and walk through a conversation with two actors present at a time. Usable for straightforward conversations.