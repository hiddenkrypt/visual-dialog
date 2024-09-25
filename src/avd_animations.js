var avd_animations = {
  leftAvatar: {
    appear: {
      a: [
        {left:"-20%", opacity:0, transform:"skew(-60deg)"},
        {left:"2%", opacity:1, transform:"skew(0deg)"}
      ],
      t: {fill:"both", duration: 300, easing:'ease-in'}
    },
    gray: {
      a: [{scale:1, rotate: '0deg'},{scale:0.9, rotate: '-8deg'}],
      t: {fill:"both", duration: 600, easing:'ease-in'}
    }
  },
  rightAvatar: {
    appear: {
      a:[
        {left:"80%", opacity:0, transform:"skew(60deg)"},
        {left:"60%", opacity:1, transform:"skew(0deg)"}
      ],
      t: {fill:"both", duration: 300, easing:'ease-in'}
    },
    gray: {
      a: [{scale:1, rotate: '0deg'},{scale:0.9, rotate: '-8deg'}],
      t: {fill:"both", duration: 800, easing:'ease-in'}
    }
  },
  leftTitle: {
    appear: {
      a: [
        {left:"20%", opacity:0, transform:"skew(0deg)"},
        {left:"10%", opacity:1, transform:"skew(-65deg)" },
        {left:"2%", opacity:1, transform:"skew(10deg)" }
      ],
      t: {fill:"forwards", duration: 300, delay:300, easing:'ease-in'}
    }
  },
  rightTitle: {
    appear: {
      a: [
        {left:"50%", opacity:0, transform:"skew(0deg)"},
        {left:"55%", opacity:1, transform:"skew(65deg)" },
        {left:"60%", opacity:1, transform:"skew(-10deg)" }
      ],
      t: {fill:"forwards", duration: 300, delay:300, easing:'ease-in'}
    }
  },
  textBox: {
    appear: { a: [
      {
        height: "5px",
        width:  "5px",
        top:    "33%",
        left:   "35%",
        opacity: 1
      },
      {
        height: "5px",
        width:  "38%",
        top:    "33%",
        left:   "15%",
        opacity: 1
      },
      {
        height: "7em",
        top:    "15%",
        width:  "38%",
        left:   "15%",
        opacity: 1
      }],
      t: {
        fill:"forwards",
        duration: 1500,
        delay:750,
        easing:'ease-out'
      }
    }
  },
  dialog:{
    appear: {
      a: [
        {
          opacity: 1
        }
      ],
      t: {
        fill:"forwards",
        duration: 100,
        delay:1350,
        easing:'ease-in'
      }
    }
  }
}