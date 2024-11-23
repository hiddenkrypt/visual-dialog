export function avd_animations(){
  return {
    avatarLeft: avatarLeft,
    avatarRight: avatarRight,
    titleLeft:titleLeft,
    titleRight:titleRight,
    textBox:textBox,
    dialog:dialog
  };
}
let avatarLeft = {
  show: {
    a: [
      { left:"calc(var(--avd_center) + -61%)", opacity:0, 
        transform:"skew(-60deg)", 
        scale:1, rotate: '0deg', 
        filter: 'blur(0px) grayscale(0%)', 
        zIndex:10 },
      { left:"calc(var(--avd_center) + -39%)", opacity:1, transform:"skew(0deg)" }
    ],
    t: { fill:"forwards", duration: 300, easing:'ease-in' }
  },
  gray: {
    a: [{scale:0.9, rotate: '-6deg', filter: 'blur(1px) grayscale(80%)', zIndex:4 }],
    t: { fill:"forwards", duration: 200 }
  },
  degray:{
    a: [{ scale:1, rotate: '0deg', filter: 'blur(0px) grayscale(0%)', zIndex:10 }],
    t: { fill:"forwards", duration: 200 }
  },
  exit: {
    a: [
      { left:"calc(var(--avd_center) + -39%)", opacity:1, transform:"skew(0deg)" },
      { left:"calc(var(--avd_center) + -61%)", opacity:0, transform:"skew(-60deg)" }
    ],
    t: { fill:"forwards", duration: 300, easing:'ease-out' }
  }
};

let avatarRight = {
  show: {
    a:[
      { left:"calc(var(--avd_center) + 39%)", opacity:0, 
        transform:"skew(60deg)", 
        scale:1, rotate: '0deg', 
        filter: 'blur(0px) grayscale(0%)', 
        zIndex:10 },
      { left:"calc(var(--avd_center) + 9%)", opacity:1, transform:"skew(0deg)" }
    ],
    t: { fill:"forwards", duration: 300, easing:'ease-in' }
  },
  gray: {
    a: [{scale:0.9, rotate: '6deg', filter: 'blur(1px) grayscale(80%)', zIndex:4 }],
    t: { fill:"forwards", duration: 200 }
  },
  degray:{
    a: [{ scale:1, rotate: '0deg', filter: 'blur(0px) grayscale(0%)', zIndex:10 }],
    t: { fill:"forwards", duration: 200 }
  },
  exit: {
    a: [
      { left:"calc(var(--avd_center) + 9%)", opacity:1, transform:"skew(0deg)" },
      { left:"calc(var(--avd_center) + 39%)", opacity:0, transform:"skew(-60deg)" }
    ],
    t: { fill:"forwards", duration: 300, easing:'ease-out' }
  }
};



let titleLeft = {
  show: {
    a: [
      { left:"calc(var(--avd_center) + -20%)", opacity:0, transform:"skew(0deg)" },
      { left:"calc(var(--avd_center) + -30%)", opacity:1, transform:"skew(-65deg)" },
      { left:"calc(var(--avd_center) + -38%)", opacity:1, transform:"skew(10deg)" }
    ],
    t: { fill:"forwards", duration: 300, delay:300, easing:'ease-in' }
  },
  exit: {
    a: [
      { left:"calc(var(--avd_center) + -38%)", opacity:1, transform:"skew(10deg)" },
      { left:"calc(var(--avd_center) + -30%)", opacity:1, transform:"skew(-65deg)" },
      { left:"calc(var(--avd_center) + -20%)", opacity:0, transform:"skew(0deg)" }
    ],
    t: { fill:"forwards", duration: 300, delay:300, easing:'ease-out' }
  }
};
    
    
let titleRight = {
  show: {
    a: [
      { left:"calc(var(--avd_center) + 0%)", opacity:0, transform:"skew(0deg)" },
      { left:"calc(var(--avd_center) + 5%)", opacity:1, transform:"skew(65deg)" },
      { left:"calc(var(--avd_center) + 10%)", opacity:1, transform:"skew(-10deg)" }
    ],
    t: { fill:"forwards", duration: 300, delay:300, easing:'ease-in' }
  },
  exit: {
    a: [
      { left:"calc(var(--avd_center) + 10%)", opacity:1, transform:"skew(-10deg)" },
      { left:"calc(var(--avd_center) + 5%)", opacity:1, transform:"skew(65deg)" },
      { left:"calc(var(--avd_center) + 0%)", opacity:0, transform:"skew(0deg)" }
    ],
    t: { fill:"forwards", duration: 300, delay:300, easing:'ease-out' }
  }
};
    
    
let textBox = {
  show: { 
    a: [
      { height: "5px", width: "5px", top: "33%", left: "calc(var(--avd_center) + -5%)", opacity: 0 },
      { height: "5px", width: "38%", top: "33%", left: "calc(var(--avd_center) + -25%)", opacity: .95 },
      { height: "7em", top: "15%", width: "38%", left: "calc(var(--avd_center) + -25%)", opacity: .95 }
    ],
    t: {fill:"forwards",
      duration: 1500,
      easing:'ease-out'}
  },
  
  left: {
    a:[
      { transform:"skewX(20deg)", rotate: '-2deg' }
    ],
    t: { fill:"forwards", duration: 300, easing:'ease-in' }
  },
  center: {
    a:[
      { transform:"skewX(0deg)", rotate: '0deg' }
    ],
    t: { fill:"forwards", duration: 300, easing:'ease-in' }
  },
  right: {
    a:[
      { transform:"skewX(-20deg)", rotate: '2deg' }
    ],
    t: { fill:"forwards", duration: 300, easing:'ease-in' }
  },
  
  
  exit: { 
    a: [
      { transform:"skew(0deg)", rotate: '0deg', 
        height: "7em", width: "38%", 
        top: "25%", left: "calc(var(--avd_center) + -25%)", 
        opacity: .95 },
      { transform:"skew(0deg)", rotate: '0deg', 
        height: "5px", width: "38%", 
        top: "33%", left: "calc(var(--avd_center) + -25%)", 
        opacity: .95 },
      { transform:"skew(0deg)", rotate: '0deg', 
        height: "5px", width: "5px",
        top: "25%",  left: "calc(var(--avd_center) + -5%)", 
        opacity: 0 }
    ],
    t: {fill:"forwards",
      duration: 500,
      easing:'ease-out'}
  }
};
    
    
let dialog = {
  show: {
    a: [{ opacity: 0 },{ opacity: 1 }],
    t: { fill:"forwards",
      duration: 300,
      easing:'ease-in'}
  },
  exit: {
    a: [{ opacity: 0 }],
    t: { fill:"forwards",
      duration: 200,
      easing:'ease-in'}
  }
};

