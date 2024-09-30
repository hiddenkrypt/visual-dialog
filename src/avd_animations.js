var avd_animations = {
  
  
  avatarLeft: {
    show: {
      a: [
        { left:"-20%", opacity:0, 
          transform:"skew(-60deg)", 
          scale:1, rotate: '0deg', 
          filter: 'blur(0px) grayscale(0%)', 
          zIndex:10 },
        { left:"2%", opacity:1, transform:"skew(0deg)" }
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
        { left:"2%", opacity:1, transform:"skew(0deg)" },
        { left:"-20%", opacity:0, transform:"skew(-60deg)" }
      ],
      t: { fill:"forwards", duration: 300, easing:'ease-out' }
    }
  },
  
  
  avatarRight: {
    show: {
      a:[
        { left:"80%", opacity:0, 
          transform:"skew(60deg)", 
          scale:1, rotate: '0deg', 
          filter: 'blur(0px) grayscale(0%)', 
          zIndex:10 },
        { left:"60%", opacity:1, transform:"skew(0deg)" }
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
        { left:"2%", opacity:1, transform:"skew(0deg)" },
        { left:"-20%", opacity:0, transform:"skew(-60deg)" }
      ],
      t: { fill:"forwards", duration: 300, easing:'ease-out' }
    }
  },
  
  
  titleLeft: {
    show: {
      a: [
        { left:"20%", opacity:0, transform:"skew(0deg)" },
        { left:"10%", opacity:1, transform:"skew(-65deg)" },
        { left:"2%", opacity:1, transform:"skew(10deg)" }
      ],
      t: { fill:"forwards", duration: 300, delay:300, easing:'ease-in' }
    },
    exit: {
      a: [
        { left:"2%", opacity:1, transform:"skew(10deg)" },
        { left:"10%", opacity:1, transform:"skew(-65deg)" },
        { left:"20%", opacity:0, transform:"skew(0deg)" }
      ],
      t: { fill:"forwards", duration: 300, delay:300, easing:'ease-out' }
    }
  },
  
  
  titleRight: {
    show: {
      a: [
        { left:"50%", opacity:0, transform:"skew(0deg)" },
        { left:"55%", opacity:1, transform:"skew(65deg)" },
        { left:"60%", opacity:1, transform:"skew(-10deg)" }
      ],
      t: { fill:"forwards", duration: 300, delay:300, easing:'ease-in' }
    },
    exit: {
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
        { height: "5px", width: "5px", top: "33%", left: "35%", opacity: 0 },
        { height: "5px", width: "38%", top: "33%", left: "15%", opacity: .95 },
        { height: "7em", top: "15%", width: "38%", left: "15%", opacity: .95 }
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
          top: "25%", left: "15%", 
          opacity: .95 },
        { transform:"skew(0deg)", rotate: '0deg', 
          height: "5px", width: "38%", 
          top: "33%", left: "15%", 
          opacity: .95 },
        { transform:"skew(0deg)", rotate: '0deg', 
          height: "5px", width: "5px",
          top: "25%",  left: "35%", 
          opacity: 0 }
      ],
      t: {fill:"forwards",
        duration: 500,
        easing:'ease-out'}
    }
  },
  
  
  dialog:{
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
  }
}