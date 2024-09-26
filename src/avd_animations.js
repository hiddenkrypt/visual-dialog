var avd_animations = {
  
  
  leftAvatar: {
    show: {
      a: [
        { left:"-20%", opacity:0, transform:"skew(-60deg)" },
        { left:"2%", opacity:1, transform:"skew(0deg)" }
      ],
      t: { fill:"forwards", duration: 300, easing:'ease-in' }
    },
    gray: {
      a: [{scale:0.9, rotate: '-4deg', filter: 'blur(1px) grayscale(80%)' }],
      t: { fill:"forwards", duration: 600 }
    },
    hide: {
      a: [
        { left:"2%", opacity:1, transform:"skew(0deg)" },
        { left:"-20%", opacity:0, transform:"skew(-60deg)" }
      ],
      t: { fill:"forwards", duration: 300, easing:'ease-out' }
    }
  },
  
  
  rightAvatar: {
    show: {
      a:[
        { left:"80%", opacity:0, transform:"skew(60deg)" },
        { left:"60%", opacity:1, transform:"skew(0deg)" }
      ],
      t: { fill:"forwards", duration: 300, easing:'ease-in' }
    },
    gray: {
      a: [{ scale:0.9, rotate: '4deg', filter: 'blur(1px) grayscale(80%)' }],
      t: { fill:"forwards", duration: 600 }
    },
    hide: {
      a: [
        { left:"2%", opacity:1, transform:"skew(0deg)" },
        { left:"-20%", opacity:0, transform:"skew(-60deg)" }
      ],
      t: { fill:"forwards", duration: 300, easing:'ease-out' }
    }
  },
  
  
  leftTitle: {
    show: {
      a: [
        { left:"20%", opacity:0, transform:"skew(0deg)" },
        { left:"10%", opacity:1, transform:"skew(-65deg)" },
        { left:"2%", opacity:1, transform:"skew(10deg)" }
      ],
      t: { fill:"forwards", duration: 300, delay:300, easing:'ease-in' }
    },
    hide: {
      a: [
        { left:"2%", opacity:1, transform:"skew(10deg)" },
        { left:"10%", opacity:1, transform:"skew(-65deg)" },
        { left:"20%", opacity:0, transform:"skew(0deg)" }
      ],
      t: { fill:"forwards", duration: 300, delay:300, easing:'ease-out' }
    }
  },
  
  
  rightTitle: {
    show: {
      a: [
        { left:"50%", opacity:0, transform:"skew(0deg)" },
        { left:"55%", opacity:1, transform:"skew(65deg)" },
        { left:"60%", opacity:1, transform:"skew(-10deg)" }
      ],
      t: { fill:"forwards", duration: 300, delay:300, easing:'ease-in' }
    },
    hide: {
      a: [
        { left:"60%", opacity:1, transform:"skew(-10deg)" },
        { left:"55%", opacity:1, transform:"skew(65deg)" },
        { left:"50%", opacity:0, transform:"skew(0deg)" }
      ],
      t: { fill:"forwards", duration: 300, delay:300, easing:'ease-out' }
    }
  },
  
  
  textBox: {
    show: { 
      a: [
        { height: "5px", width: "5px", top: "33%", left: "35%", opacity: 1 },
        { height: "5px", width: "38%", top: "33%", left: "15%", opacity: 1 },
        { height: "7em", top: "15%", width: "38%", left: "15%", opacity: 1 }
      ],
      t: {fill:"forwards",
        duration: 1500,
        easing:'ease-out'}
    },
    hide: { 
      a: [
        { height: "7em", width: "38%", top: "15%", left: "15%", opacity: 1 },
        { height: "7em", width: "5px", top: "33%", left: "35%", opacity: 1 },
        { height: "5px", width: "5px", top: "33%", left: "35%", opacity: 0 }
      ],
      t: {fill:"forwards",
        duration: 500,
        easing:'ease-in'}
    }
  },
  
  
  dialog:{
    show: {
      a: [{ opacity: 1 }],
      t: { fill:"forwards",
        duration: 100,
        easing:'ease-in'}
    },
    hide: {
      a: [{ opacity: 0 }],
      t: { fill:"forwards",
        duration: 100,
        easing:'ease-in'}
    }
  }
}