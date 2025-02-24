// LOAD FORMATS

const defultFormats = {
  john: {
    color: "#0715cd",
    names: ["John", "June", "EB"],
    chum: "ectoBiologist"
  },
  rose: {
    color: "#b536da",
    names: ["Rose", "TT", "Fefetasprite"],
    chum: "tentacleTherapist"
  },
  dave: {
    color: "#e00707",
    names: ["Dave", "TG"],
    chum: "turntechGodhead"
  },
  jade: {
    color: "#4ac925",
    names: ["Jade", "GG", "Erisolsprite"],
    chum: "gardenGnostic"
  },

  
  jane: {
    color: "#00d5f2",
    names: ["Jane", "GG-", "Nannasprite"],
    chum: "gutsyGumshoe"
  },
  jake: {
    color: "#1f9400",
    names: ["Jake", "GT-", "Jadesprite"],
    chum: "golgothasTerror"
  },
  roxy: {
    color: "#ff6ff2",
    names: ["Roxy", "TG-", "Jaspersprite"],
    chum: "tipsyGnostalgic"
  },
  dirk: {
    color: "#f2a400",
    names: ["Dirk", "TT-", "Davesprite"],
    chum: "timaeusTestified"
  },
  AR: {
    color: "#e00707",
    names: ["HAL", "AR", "TT--", "arquiusprite"],
    chum: "timaeusTestified"
  },

  
  aradia: {
    color: "#a10000",
    names: ["aradia", "AA", "Damara"],
    chum: "apocalypseArisen"
  },
  tavros: {
    color: "#a15000",
    names: ["tavros", "AT", "Rufioh"],
    chum: "adiosToreador"
  },
  sollux: {
    color: "#a1a100",
    names: ["sollux", "TA", "Mituna"],
    chum: "twinArmageddons"
  },
  karkat: {
    color: "#626262",
    names: ["karkat", "CG"],
    chum: "carcinoGeneticist"
  },
  nepeta: {
    color: "#416600",
    names: ["nepeta", "AC", "Meulin"],
    chum: "arsenicCatnip"
  },
  kanaya: {
    color: "#008141",
    names: ["kanaya", "GA", "Porrim"],
    chum: "grimAuxiliatrix"
  },
  terezi: {
    color: "#008282",
    names: ["terezi", "GC", "Latula"],
    chum: "gallowsCalibrator"
  },
  vriska: {
    color: "#005682",
    names: ["vriska", "AG", "Aranea"],
    chum: "arachnidsGrip"
  },
  equius: {
    color: "#000056",
    names: ["equius", "CT", "Horrus"],
    chum: "centaursTesticle"
  },
  gamzee: {
    color: "#2b0057",
    names: ["gamzee", "TC", "Kurloz"],
    chum: "terminallyCapricious"
  },
  eridan: {
    color: "#6a006a",
    names: ["eridan", "CA", "Cronus"],
    chum: "caligulasAquarium"
  },
  feferi: {
    color: "#77003c",
    names: ["feferi", "CC", "Meenah", ")(IC"],
    chum: "cuttlefishCuller"
  },

  calliope: {
    color: "#929292",
    names: ["UU", "calliope"],
    chum: "uranianumbra"
  },
  caliborn: {
    color: "#323232",
    names: ["UU-", "caliborn"],
    chum: "undyingumbrage"
  },

  kankri: {
    color: "#ff0000",
    names: ["kankri", "Squarewave"],
  },
  
  white: {
    color: "#ffffff",
    names: ["Doc", "Scratch"],
  },

  dad: {
    color: "#4b4b4b",
    names: ["Dad"],
  },

  felt: {
    color: "#2ed73a",
    names: ["Caliborn-"],
  },
  limeblood: {
    color: "#678900",
    names: [],
  },

  tavrisprite: {
    color: "#0715cd",
    names: ["Tavrisprite", "GT"],
    chum: "ghostyTrickster"
  }, 

  black: {
    color: "#000000",
    names: ["Hussie"],
  },

  jasprose: {
    dualCol: true,
    names: ["Jasprosesprite^2", "Jasprose^2", "Jasprose", "Jazz"],
    colorClasses: ["roxy", "rose"]
  },
  davepeta: {
    dualCol: true,
    names: ["Davepetasprite^2", "Davepeta^2", "Davepeta"],
    colorClasses: ["jade", "dirk"]
  }
}

let homestuckFormats = JSON.parse(JSON.stringify(defultFormats))
homestuckFormats.jasper = {
  color: "#f141ef",
  names: ["jasper", "jaspersprite"],
}
homestuckFormats.jasprose = {
  dualCol: true,
  names: ["Jasprosesprite^2", "Jasprose^2", "Jasprose", "Jazz"],
  colorClasses: ["jasper", "rose"]
}

let userFormats = localStorage.getItem('userFormats') ? JSON.parse(localStorage.getItem('userFormats')) : defultFormats
let discordFormats = {}

let compatibleKeys = []
for (const [spanClass, format] of Object.entries(defultFormats)) {
  if (!format.dualCol) compatibleKeys.push(spanClass)
}

// Regex
const regHandle = /^[^\s]*?:/
const regChum = /{[^\s]*?}/g
const regCharSpans = /\$[^\s]*/g

const logSyntax = "%LOG%"

const ao3CSS = `#workskin .block {
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  background: #eee;
  border: 1px dashed gray;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 35px;
  padding-right: 35px;
} 
#workskin .pesterlog {
  font-size: 14px;
  font-weight: bold;
  font-family: courier, monospace;
  color: #000000;
}`

const discordReplaces = {
  normal: "[0;29m",
  white: "[0;37m",
  red: "[0;31m",
  yellow: "[0;33m",
  green: "[0;32m",
  cyan: "[0;36m",
  blue: "[0;34m",
  pink: "[0;35m",
  grey: "[0;30m",
}

// Load Styles

const htmlMarkdown = [
  [/(^|[^\\])\*\*([^\s\\]|[^\s\\].*?[^\s\\])\*\*/gm, "$1<b>$2</b>"], // bold
  [/(^|[^\\])\*([^\s\\]|[^\s\\].*?[^\s\\])\*/gm, "$1<i>$2</i>"], // Italics
  [/(^|[^\\])__([^\s\\]|[^\s\\].*?[^\s\\])__/gm, "$1<u>$2</u>"], // underline
  [/(^|[^\\])~~([^\s\\]|[^\s\\].*?[^\s\\])~~/gm, "$1<s>$2</s>"], // strikethrough

  
  [/\\([*_~])/gm, "$1"], // Escape
]

let outputStyles = [
  {
    name: "ao3",
    title: "Archive Of Our Own",
    htmlid: "workskin",

    display: {
      para: [`<p>`, `</p>`],
      log: [`<p class="block"><span class="pesterlog">`, `</span></p>`],
      color: [`<span class="%CLASS%">`, `</span>`],
      colorPlain: [`<span class="%CLASS%-plain">`, `</span>`],
      lineStart: ` `,
      
    },
    copy: {
      para: [`<p>`, `</p>`],
      log: [`<p class="block"><span class="pesterlog">`, `</span></p>`],
      color: [`<span class="%CLASS%">`, `</span>`],
      colorPlain: [`<span class="%CLASS%-plain">`, `</span>`],
      lineStart: ` `,
      
    }
  },
  {
    name: "mspfa",
    title: "MS Paint Fan Adventures",
    htmlid: "slide",

    display: {
      para: [``, `<br>`],
      log: [`<div class="spoiler"><div>`, `</div></div><br>`],
      color: [`<span class="%CLASS%">`, `</span>`],
      
    },
    copy: {
      para: [``, ``],
      log: [`[spoiler]`, `[/spoiler]`],
      color: [`[color=#%COLOR%]`, `[/color]`],
      lineEnd: " ",
      blockSep: ""
    }
  },
  {
    name: "mspfaAlt",
    title: "MS Paint Fan Adventures (Buttonless spoiler)",
    htmlid: "slide",

    display: {
      para: [``, `<br>`],
      log: [`<div class="spoiler"><div>`, `</div></div><br>`],
      color: [`<span class="%CLASS%">`, `</span>`],
      
    },
    copy: {
      para: [``, ``],
      log: [`<div class="spoiler"><div>`, `</div></div>`],
      color: [`[color=#%COLOR%]`, `[/color]`],
      lineEnd: " ",
      blockSep: ""
    }
  },
  {
    name: "discord",
    title: "Discord ANSI",

    display: {
      para: [`<p>`, `</p>`],
      log: [`<p class="block"><span class="pesterlog">`, `</span></p>`],
      color: [`<span class="%CLASSTRANSFORM%">`, `</span>`],
      classTransform: className => discordFormats[className] ? discordFormats[className] : "normal",
      replaces: [
        [/<.+?>/gm, ""]
      ]
    },
    copy: {
      para: [``, ``],
      log: ["\n```ansi", "```"],
      color: ["`", "`"],
      colorLog: [`%CLASSTRANSFORM%`, `[0;29m`],
      lineEnd: "",
      classTransform: className => discordReplaces[discordFormats[className] ? discordFormats[className] : "normal"],
      blockSep: "",
      charLimit: {
        limit: 2000,
        sep: "\n----------------------------------- \n# NEW MESSAGE # \n----------------------------------- \n"
      },
      replaces: [
        [/<.+?>/gm, ""]
      ],
      markdown: []
    }
  },
  {
    name: "tumblr",
    title: "Tumblr",

    display: {
      para: [`<p>`, `</p>`],
      log: [`<p class="npf_chat"><b>`, `</b></p>`],
      color: [`<span style="color: #%COLOR%">`, `</span>`],
      
    },
    copy: {
      para: [`<p>`, `</p>`],
      log: [`<p class="npf_chat"><b>`, `</b></p>`],
      color: [`<span style="color: #%COLOR%">`, `</span>`],
      
    }
  },
  {
    name: "cohost",
    title: "Cohost / Plain HTML",

    display: {
      para: [`<p>`, `</p>`],
      log: [`<div style='background: #eeeeee; padding: 12px 5%; font-family: Courier New, Courier, monospace; font-weight: bold; line-height: 1.2em; border: 1px dashed gray; font-size: 14px;text-align: left;'>`, `</div>`],
      color: [`<span style="font-family: Courier New, Courier, monospace; font-weight: bold; color: #%COLOR%">`, `</span>`],
      colorPlain: [`<span style="color: #%COLOR%">`, `</span>`],
      
    },
    copy: {
      para: [`<p>`, `</p>`],
      log: [`<div style='background: #eeeeee; padding: 12px 5%; font-family: Courier New, Courier, monospace; font-weight: bold; line-height: 1.2em; border: 1px dashed gray; font-size: 14px;text-align: left;'>`, `</div>`],
      color: [`<span style="font-family: Courier New, Courier, monospace; font-weight: bold; color: #%COLOR%">`, `</span>`],
      colorPlain: [`<span style="color: #%COLOR%">`, `</span>`],
      
    }
  },
  {
    name: "basic",
    title: "Basic HTML",

    display: {
      para: [`<p>`, `</p>`],
      log: [`<p class="spoiler">`, `</p>`],
      color: [`<span class="%CLASS%" style="color: #%COLOR%">`, `</span>`],
      lineStart: ` `,
    },
    copy: {
      para: [`<p>`, `</p>`],
      log: [`<p class="spoiler">`, `</p>`],
      color: [`<span class="%CLASS%" style="color: #%COLOR%">`, `</span>`],
      lineStart: ` `,
    },
  },
  {
    name: "renpy",
    title: "RenPy (Long log)",
    htmlid: "slide",

    display: {
      para: [``, `<br>`],
      log: [`<div class="spoiler"><div>`, `</div></div><br>`],
      color: [`<span class="%CLASS%">`, `</span>`],
      
    },
    copy: {
      para: [``, ``],
      log: [`\n\ntext "`, `"\n\n`],
      color: [`{color=#%COLOR%}`, `{/color}`],
      lineEnd: "",
      replaces: [
        [/([^\n])\n/g, "$1\\n"],
        [/\{/g, "{{"],
      ],
      replacesFinal: [
        [/\[/g, "[["],
        [/%/g, "%%"],
        [/"/g, `\\"`],
        [/text \\"\\n/g, `text "`],
        [/ \\n\\"/g, `"`],
        [/\\n(.+)\\n/gm, `$1`],
      ],
      blockSep: ""
    }
  },
  {
    name: "gdocs",
    title: "Google Docs",

    display: {
      para: [`<p>`, `</p>`],
      log: [`<table class="block"><tr><td><span class="pesterlog">`, `</span></td></tr></table>`],
      color: [`<span style="color: #%COLOR%">`, `</span>`],
    },
    copy: {
      para: [`<p>`, `</p>`],
      log: [`<table class="block"><tr><td><span class="pesterlog">`, `</span></td></tr></table>`],
      color: [`<span style="color: #%COLOR%">`, `</span>`],
      lineEnd: "",
    }
  },


  // Custom Display Style
  
  {
    name: "custom",
    title: "Custom Display Style",

    display: {
      para: [`<div>`, `</div>`],
      log: [`<div class="spoiler">`, `</div>`],
      color: [`<span class="%CLASS%" style="color: #%COLOR%">`, `</span>`],
      
    },
    copy: {
      para: [`<div>`, `</div>`],
      log: [`<div class="spoiler">`, `</div>`],
      color: [`<span class="%CLASS%" style="color: #%COLOR%">`, `</span>`],
    }
  },
]

const styleSelect = document.getElementById("workStyles")
outputStyles.forEach((style, i) => {
  const styleOption = document.createElement("option")
  styleOption.value = i
  styleOption.innerText = style.title
  styleSelect.appendChild(styleOption)
})

// Load Auto save

let editCount = 0
let maxEditCount = localStorage.getItem("maxEditCount") ?? 25
let autoSaves = localStorage.getItem("autoSaves") ? JSON.parse(localStorage.getItem("autoSaves")) : []
const maxAutoSaves = 35

// Transcribe Input

let pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

const transcribe = (e) => {
  const inputText = document.getElementById("input").value.trim()

  // Options
  const doAutoLog = document.getElementById("autoLog").checked
  const doHandleUpper = document.getElementById("handleUpper").checked
  const doFullColourChum = document.getElementById("fullColorChum").checked
  const doHandleSpaces = document.getElementById("handleSpaces").checked

  // Split into lines
  const lines = inputText.split("\n")

  // Split lines into paragraphs
  let allParagraphs = []
  let currentParagraph = []

  lines.forEach(line => {
    if (line == "") {
      if (currentParagraph.length > 0) {
        allParagraphs.push(currentParagraph);
        currentParagraph = [];
      } else {
        allParagraphs.push([" "]);
      }
    } else {
      currentParagraph.push(line);
    }
  });

  allParagraphs.push(currentParagraph);

  // Format each line into paragraphs and add to output
  let usedFormats = []
  let output = ""

  let add2usedFormats = (spanClass, format) => {
    if (format.dualCol) {
      if (!usedFormats.includes(format.colorClasses[0])) usedFormats.push(format.colorClasses[0])
      if (!usedFormats.includes(format.colorClasses[1])) usedFormats.push(format.colorClasses[1])
    } else {
      if (!usedFormats.includes(spanClass)) usedFormats.push(spanClass)
    }
  }

  allParagraphs.forEach(p => {
    let paragraphText = ""
    let isParagraphBlock = false

    p.forEach(text => {
      let line = text.trim()
      let doLineBreak = true

      // == Add spans into text $EB, $- ==
      if (regCharSpans.test(line)) {
        const spans = line.match(regCharSpans)

        spans.forEach(key => {
          const chara = key.slice(1)

          for (const [spanClass, format] of Object.entries(userFormats)) {
            format.names.forEach(formatHandle => {
              if (formatHandle.toLowerCase() == chara.toLowerCase()) {
                line = line.replace(key + " ", spanStart(spanClass))

                if (line.includes("$-")) {
                  line = line.replace("$-", "[/SPAN]")
                } else {
                  line = line + "[/SPAN]"
                }

                // Add spanclass to format
                if (!usedFormats.includes(spanClass)) usedFormats.push(spanClass)
              }
              if ("$" + formatHandle.toLowerCase() == chara.toLowerCase()) {
                line = line.replace(key + " ", spanStart(spanClass, "PLAIN"))

                if (line.includes("$-")) {
                  line = line.replace("$-", "[/SPAN]")
                } else {
                  line = line + "[/SPAN]"
                }

                // Add spanclass to format
                add2usedFormats(spanClass + "-plain", format)
              }
            })
          }

        })
      }
      line = line.replace(/\$-/g, "")

      // == If line starts with a handle (EB:), format it ==
      if (regHandle.test(line)) {
        isParagraphBlock = !isParagraphBlock ? doAutoLog : isParagraphBlock

        let foundHandle = false
        const lineHandle = line.match(regHandle)[0].replace(":", "")

        const transformLineHandle = (spanClass, format) => {
          if (lineHandle.includes("-")) line = line.replace(lineHandle, lineHandle.replace(/-+$/g, ""))
          if (doHandleUpper) line = line.replace(lineHandle, lineHandle.toUpperCase())
          if (doHandleSpaces) line = line.replace(lineHandle, lineHandle.replace(/_/g, " "))
          if ("dualCol" in format) line = line.replace(lineHandle + ":", `${lineHandle}:[/SPAN]${spanStart(format.colorClasses[1])}`)

          line = `${spanStart("dualCol" in format ? format.colorClasses[0] : spanClass)}${line}[/SPAN]`
          foundHandle = true

          // Add spanclass to format
          add2usedFormats(spanClass, format)
        }

        // Check for normal names
        for (const [spanClass, format] of Object.entries(userFormats)) {
          format.names.forEach(formatHandle => {
            if (formatHandle.toLowerCase() == lineHandle.toLowerCase() && !foundHandle) transformLineHandle(spanClass, format)
          })
        }

        // If no found try again with current past and future
        for (const [spanClass, format] of Object.entries(userFormats)) {
          format.names.forEach(formatHandle => {
            let handleRegex = genTimeHandle(formatHandle)
            if (lineHandle.match(handleRegex) && !foundHandle) if (lineHandle.match(handleRegex)[0] == lineHandle) {
              transformLineHandle(spanClass, format)
            }
          })
        }

        if (!foundHandle) line = spanStart("black") + line + "[/SPAN]"
      }

      // == Replace all instances of chum handles ({EB} => ectoBiologist [EB]) == 
      const chumHandles = regChum.test(line) ? line.match(regChum) : []

      chumHandles.forEach(chumHandle => {
        const handle = doHandleUpper ? chumHandle.slice(1, -1).toUpperCase() : chumHandle.slice(1, -1)
        let replaced = false

        let transformChumHandle = (spanClass, format, timePrefix) => {
          if (doFullColourChum) {
            line = line.replace(chumHandle, `${spanStart(spanClass)}${timePrefix + format.chum} [${handle.replace(/-/g, "")}][/SPAN]`)
          } else {
            line = line.replace(chumHandle, `${timePrefix + format.chum} ${spanStart(spanClass)}[${handle.replace(/-/g, "")}][/SPAN]`)
          }
          isParagraphBlock = !isParagraphBlock ? doAutoLog : isParagraphBlock
        
          // Add spanclass to format
          add2usedFormats(spanClass, format)
          replaced = true
        }

        for (const [spanClass, format] of Object.entries(userFormats)) {
          format.names.forEach(formatHandle => {
            if (formatHandle.toLowerCase() == handle.toLowerCase() && !replaced) transformChumHandle(spanClass, format, "")
          })
        }

        for (const [spanClass, format] of Object.entries(userFormats)) {
          format.names.forEach(formatHandle => {
            let handleRegex = genTimeHandle(formatHandle)
            if (handle.match(handleRegex) && !replaced) if (handle.match(handleRegex)[0] == handle) {
              let prefix = handle.slice(0, formatHandle.length * -1)
              prefix = prefix.replace(/P/gi, "PAST ").replace(/F/gi, "FUTURE ").replace(/C/gi, "CURRENT ").replace(/L/gi, "LATER ").replace(/\?/gi, "??? ")
              transformChumHandle(spanClass, format, prefix)
            }
          })
        }

      })


      // == Check for manual block syntax ==
      if (line.toUpperCase() == logSyntax)  {
        isParagraphBlock = true
        doLineBreak = false
        line = ""
      }

      paragraphText += "[LINESTART]" + line + (doLineBreak ? " [LINEEND]\n" : "")

    })

    if (isParagraphBlock) {
      output += `[LOG]\n${paragraphText}[/LOG]\n\n`
    } else {
      output += `[PARA]\n${paragraphText}[/PARA]\n\n`
    }

  })

  setSkinStatus(usedFormats)
  convertWork(output)

  // If new text scroll down
  const workArea = document.querySelector("#outputs")
  const inputField = document.querySelector("#input")
  if (inputField.selectionStart == inputField.value.length) { 
    workArea.scrollTop = workArea.scrollHeight
  }

  // Auto Save
  editCount += 1
  if (maxEditCount <= editCount) {
    editCount = 0
    autoSaveWork()
  }

}


const genTimeHandle = handle => new RegExp("[FCPL?]*" + handle.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), "gi")

const spanStart = (className, type) => `[SPAN${type ?? ""} "${className}" ${userFormats[className] ? userFormats[className].color : "#000000"}]`

const setSkinStatus = usedFormats => {
  const skinStatus = document.getElementById("skinStatus")
  const ao3CssCopy = document.getElementById("finalAo3CSS")

  let isCompatible = true
  usedFormats.forEach(e => {
    if (!compatibleKeys.includes(e)) isCompatible = false
  })

  if (isCompatible) {
    skinStatus.innerHTML = "This work is compatible with AO3's homestuck workskin."
    skinStatus.className = "green"
  } else {
    skinStatus.innerHTML = "This work is not compatible with AO3's homestuck workskin. You will have to create a custom workskin using the generated CSS."
    skinStatus.className = "red"
    ao3CssCopy.value = document.getElementById("genAo3Style").innerText
  }
}

const convertWork = output => {
  const selectedStyle = outputStyles[styleSelect.value]
  const workDiv = document.querySelector("#work > div")
  const outputArea = document.querySelector("#mainOutput")

  document.getElementById("styleTitle").innerText = selectedStyle.title

  workDiv.innerHTML = ""
  workDiv.className = selectedStyle.name
  workDiv.id = selectedStyle.htmlid ?? selectedStyle.name

  workDiv.innerHTML = replaceTextWithStyle(output, selectedStyle.display)
  outputArea.value = replaceTextWithStyle(output, selectedStyle.copy)

  // Show hints
  document.querySelectorAll("#hints > div").forEach(hint => {
    hint.style.display = hint.dataset.styleHint == selectedStyle.name ? "block" : "none"
  })

  // Gdoc hard code fuck you
  if (selectedStyle.name == "gdocs") {
    document.getElementById("finalGdocs").innerHTML = outputArea.value.replace(/<br>/g, "")
  }
}

const replaceTextWithStyle = (text, style) => {

  const doMD = document.getElementById("doMD").checked

  let blocks = text.split("\n\n")
  let charCount = 0
  let blockSep = style.blockSep ?? "\n\n"

  blocks.forEach((block, i) => {
    const isLog = block.startsWith("[LOG]")

    // Custom replaces
    if (style.replaces) {
      style.replaces.forEach(replace => {
        block = block.replace(replace[0], replace[1])
      })
    }

    // Markdown
    if (doMD) {
      let markdownReplaces = style.markdown ?? htmlMarkdown
      markdownReplaces.forEach(replace => {
        block = block.replace(replace[0], replace[1])
      })
    }

    // Basic replaces
    block = block.replace(/\[PARA\]/g, style.para[0])
    block = block.replace(/\[\/PARA\]/g, style.para[1])
    block = block.replace(/\[LOG\]/g, style.log[0])
    block = block.replace(/\[\/LOG\]/g, style.log[1])
    block = block.replace(/\[LINESTART\]/g, style.lineStart ?? "")
    block = block.replace(/\[LINEEND\]/g, style.lineEnd ?? "<br>")

    // Spans
    const spanRegex = /\[SPAN(.*?) "(.+?)" #(.+?)\](.*?)\[\/SPAN\]/g
    const spanFunction = (match, type, className, color, text) => {

      const spanType = type == "PLAIN" && style.colorPlain ? style.colorPlain : isLog ? style.colorLog ?? style.color : style.color
      let [spanStart, spanEnd] = spanType

      spanStart = spanStart.replace("%CLASS%", className)
      spanStart = spanStart.replace("%COLOR%", color)

      if (style.colorTransform) spanStart = spanStart.replace("%COLTRANSFORM%", style.colorTransform(color))
      if (style.classTransform) spanStart = spanStart.replace("%CLASSTRANSFORM%", style.classTransform(className))

      return spanStart + text + spanEnd
    }

    for (let i = 0; i < 4; i++) {
      block = block.replace(spanRegex, spanFunction) 
    }

    charCount += block.length + blockSep.length

    if (style.charLimit) {
      if (charCount > style.charLimit.limit) {
        block = style.charLimit.sep + block
        charCount = block.length + blockSep.length
      }
    }

    // Custom replaces
    if (style.replacesFinal) {
      style.replacesFinal.forEach(replace => {
        block = block.replace(replace[0], replace[1])
      })
    }

    blocks[i] = block
  })

  return blocks.join(blockSep).trim()
}

// == Auto save == 

const autoSaveWork = () => {
  const inputText = document.getElementById("input").value
  const d = new Date();
  let timeNow = d.toLocaleString();

  autoSaves.unshift({
    text: inputText,
    time: timeNow
  })
  if (autoSaves.length > maxAutoSaves) {
    autoSaves.pop()
  }

  localStorage.setItem("autoSaves", JSON.stringify(autoSaves))
  loadAutoSaves()
  console.log("Auto saved!")
}

const loadAutoSaves = () => {
  const autoSavesDiv = document.getElementById("autoSaves")
  
  autoSavesDiv.innerHTML = ""

  autoSaves.forEach(e => {
    autoSavesDiv.innerHTML += `
    <div class="autoSave">
      <div>
        ${e.time.split(",").join("<br>")}
      </div>
      <textarea>${e.text}</textarea>
    </div>`
  })
}

const setMaxEdit = (value) => {
  maxEditCount = value
  localStorage.setItem("maxEditCount", value)
}


// == Pop ups == //

const openPopup = div => {
  document.getElementById("popup").style.display = "flex"
  document.getElementById(div).style.display = "block"
}

const closePopup = () => {
  document.querySelectorAll("#popup > div, #popup").forEach(e => {
    e.style.display = "none"
  })
}

document.querySelectorAll("#popup > div").forEach(e => {
  e.onclick = () => { event.stopPropagation(); }
})

closePopup()

// == Edit user formats == //

const formatHUD = document.getElementById("userFormats")

const genFormatEditor = () => {
  // Gen options
  let optionsClasses = ""
  for (const [spanClass, format] of Object.entries(userFormats)) {
    if (!("dualCol" in format)) {
      optionsClasses += `<option value="${spanClass}">${spanClass}</option>`
    }
  }

  formatHUD.innerHTML = ""
  for (const [spanClass, format] of Object.entries(userFormats)) {

    // List names
    let nameFormats = ""
    format.names.forEach(name => {
      nameFormats += `<li><input type="text" value="${name}" onchange="updateName(this)"></li>`
    })
    nameFormats += `<li><input type="text" onchange="addName(this)" placeholder="Add new name"></li>`

    if ("dualCol" in format) {

      // Add edit module
      formatHUD.innerHTML += `<div class="dualformat" data-format="${spanClass}" data-color="${format.color}">
      <div class="collapseHead" onclick="toggleCollapse('${spanClass}')">
        <span style="color: ${userFormats[format.colorClasses[0]].color}">Dualclass: </span>
        <span style="color: ${userFormats[format.colorClasses[1]].color}">${spanClass}</span>
        <button class="formatBin" onclick="deleteFormat('${spanClass}')">🗑️</button>
      </div>
      <div class="collapse closed">
        <div class="formatNames"><div>Names:</div> <ul> ${nameFormats} </ul></div>
        <div>
          Color Classes: 
          <select onchange="genNewUserFormat(); genFormatEditor()" class="colClass">${optionsClasses.replace(`value="${format.colorClasses[0]}"`, `value="${format.colorClasses[0]}" selected`)}</select>
          <select onchange="genNewUserFormat(); genFormatEditor()" class="colClass">${optionsClasses.replace(`value="${format.colorClasses[1]}"`, `value="${format.colorClasses[1]}" selected`)}</select>
        </div>
      </div>
    </div>`

    } else {
  
      // Add edit module
      formatHUD.innerHTML += `<div class="format" data-format="${spanClass}" data-color="${format.color}">
        <div class="collapseHead" style="color: ${format.color}" onclick="toggleCollapse('${spanClass}')">${format.color.toUpperCase()}: ${spanClass} 
          ${spanClass == "black" ? "" : `<button class="formatBin" onclick="deleteFormat('${spanClass}')">🗑️</button>`}
        </div>
        <div class="collapse closed">
          <div class="formatNames"><div>Names:</div> <ul> ${nameFormats} </ul></div>
          <div>ChumHandle: <input type="text" class="chum" value="${format.chum ? format.chum : ""}" style="float: right" onchange="genNewUserFormat()"></div>
        </div>
      </div>`
    }

  }
  genCSSstyle()
}

const toggleCollapse = spanClass => {
  let targetDiv = document.querySelector(`div[data-format="${spanClass}"] .collapse`)
  targetDiv.className = targetDiv.className.includes("opened") ? "collapse closed" : "collapse opened"
}

const updateName = nameInput => {
  if (!nameInput.value) {
    nameInput.parentElement.remove()
  }
  nameInput.value = nameInput.value.replace(/\s/g, "")
  genNewUserFormat()
}

const addName = nameInput => {
  nameInput.setAttribute("onchange", "updateName(this)")
  nameInput.setAttribute("placeholder", "")

  let li = document.createElement("li")
  li.innerHTML = `<input type="text" onchange="addName(this)" placeholder="Add new name">`
  nameInput.parentElement.parentElement.appendChild(li)

  updateName(nameInput)
}

const genNewUserFormat = () => {
  console.log(userFormats)
  const newUserFormat = {}

  // Normal formats
  const formats = Array.prototype.slice.call(document.querySelectorAll(".format"))
  formats.forEach(e => {
    let names = Array.prototype.slice.call(e.querySelectorAll("ul input")).map(input => input.value).filter(s => s.length > 0)
    let chum =  e.querySelector(".chum").value

    newUserFormat[e.dataset.format] = {
      color: e.dataset.color,
      names: names,
      chum: chum
    }
  })

  // Dual formats
  const duals = Array.prototype.slice.call(document.querySelectorAll(".dualformat"))
  duals.forEach(e => {
    let names = Array.prototype.slice.call(e.querySelectorAll("ul input")).map(input => input.value).filter(s => s.length > 0)
    let colorClasses =  Array.prototype.slice.call(e.querySelectorAll(".colClass")).map(input => input.value)

    newUserFormat[e.dataset.format] = {
      dualCol: true,
      names: names,
      colorClasses: colorClasses
    }
  })

  console.log(newUserFormat)
  updateUserFormat(newUserFormat)
  transcribe()
  genCSSstyle()
}

const updateUserFormat = newUserFormat => {
  userFormats = newUserFormat

  localStorage.setItem('userFormats', JSON.stringify(userFormats));

  document.getElementById("userFormatJson").value = JSON.stringify(userFormats)

  genNewDualFormat()
  transcribe()
}

const deleteFormat = spanClass => {
  event.stopPropagation();
  document.querySelector(`div[data-format="${spanClass}"]`).remove()

  let newUserFormat = userFormats
  delete newUserFormat[spanClass]
  updateUserFormat(newUserFormat)
}

const restoreDefaultFormats = Format => {
  updateUserFormat(JSON.parse(JSON.stringify(Format)))
  genFormatEditor()
}

const addNewFormat = () => {
  const className = document.getElementById("newFormatName")
  const color = document.getElementById("newFormatCol")

  if (!className.value) return
  className.value = className.value.replace(" ", "_")

  let newUserFormat = JSON.parse(JSON.stringify(userFormats))
  newUserFormat[className.value] = {
    color: color.value,
    names: [],
  }

  updateUserFormat(newUserFormat)
  genFormatEditor()

  className.value = ""
  color.value = "#000000"
}

const genCSSstyle = () => {
  // Normal CSS
  const genAo3Style = document.getElementById("genAo3Style")
  genAo3Style.innerHTML = ao3CSS
  
  const genGdocsStyle = document.getElementById("genGdocsStyle")
  genGdocsStyle.innerHTML = ""

  const genMspfaStyle = document.getElementById("genMspfaStyle")
  genMspfaStyle.innerHTML = ""

  // Discord
  const discordCols = {
    // normal: "#dcddde",
    // white: "#ffffff",
    red: "#dc322f",
    yellow: "#b58900",
    green: "#859900",
    cyan: "#2aa198",
    blue: "#268bd2",
    pink: "#d33682",
    // grey: "#4f545c",
  }

  // Figure out closets colours
  // https://codepen.io/romainblatrix/pen/YXgBoO?editors=1010
  const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  const getDiffColor = (cola, colb) => {
    a = hexToRgb(cola);
    b = hexToRgb(colb);
    return Math.sqrt(Math.pow((a.r - b.r),2) + Math.pow((a.g - b.g),2) + Math.pow((a.b - b.b),2));
  }

  for (const [spanClass, format] of Object.entries(userFormats)) {
    // CSS
    genAo3Style.innerHTML += `
#workskin .${spanClass} { font-size: 14px; font-weight: bold; font-family: courier, monospace; color: ${format.color}; }
#workskin .${spanClass}-plain { color: ${format.color}; }
    `
    genMspfaStyle.innerHTML += `
    #slide .${spanClass} { color: ${format.color} }
    #slide .${spanClass}-plain { color: ${format.color}; }
        `
    genGdocsStyle.innerHTML += `
#gdocs .${spanClass}, #finalGdocs .${spanClass} { color: ${format.color} }
#gdocs .${spanClass}-plain, #finalGdocs .${spanClass}-plain { color: ${format.color}; }
    `
    
    // Discord    
    if (format.color) {
      let closestCol = [1000, "grey"]
      for (const [colName, hexCol] of Object.entries(discordCols)) {
        const diff = getDiffColor(format.color, hexCol)
        if (closestCol[0] > diff) closestCol = [diff, colName]
      }
      discordFormats[spanClass] = closestCol[1]

      let greyTest = hexToRgb(format.color)
      if (greyTest.r == greyTest.b && greyTest.b == greyTest.g) {
        discordFormats[spanClass] = greyTest.r > 60 ? greyTest.r > 128 ? "white" : "normal" : "grey"
      }
    }
    
  }

  console.log(discordFormats)
}

const importJson = () => {
  try {
    const newUserFormat = JSON.parse(document.getElementById("importJson").value)
    updateUserFormat(newUserFormat)
    genFormatEditor()
  } catch (e) { }
}

const genNewDualFormat = () => {
  let optionsClasses = ""
  for (const [spanClass, format] of Object.entries(userFormats)) {
    if (!("dualCol" in format)) {
      optionsClasses += `<option value="${spanClass}">${spanClass}</option>`
    }
  }

  document.getElementById("dualFormatHandle").innerHTML = optionsClasses
  document.getElementById("dualFormatText").innerHTML = optionsClasses
}

const addNewDualFormat = () => {
  const className = document.getElementById("newDualFormatName")
  const color1 = document.getElementById("dualFormatHandle").value
  const color2 = document.getElementById("dualFormatText").value

  if (!className.value) return

  let newUserFormat = JSON.parse(JSON.stringify(userFormats))
  newUserFormat[className.value] = {
    dualCol: true,
    names: [],
    colorClasses: [color1, color2]
  }

  updateUserFormat(newUserFormat)
  genFormatEditor()

  genNewDualFormat()
  className.value = ""
}

// Custom Styles

const updateCustomStyle = () => {
  const tags = Array.prototype.slice.call(document.querySelectorAll("#customStyle textarea")).map(e => e.value)

  outputStyles[outputStyles.length - 1].copy = {
    para: [tags[0], tags[1]],
    colorPlain: [tags[2], tags[3]],
    log: [tags[4], tags[5]],
    color: [tags[6], tags[7]],
    lineStart: tags[8] ?? "",
    lineEnd: tags[9] ?? "<br>",
  }

  localStorage.setItem("customStyle", JSON.stringify(tags))
  transcribe()
}

document.querySelectorAll("#customStyle textarea").forEach(e => {
  e.onchange = updateCustomStyle
})

const setCustomStyle = (tags) => {
  document.querySelectorAll("#customStyle textarea").forEach((e, i) => {
    e.value = tags[i]
  })
  updateCustomStyle()
}

if (localStorage.getItem("customStyle")) {
  setCustomStyle(JSON.parse(localStorage.getItem("customStyle")))
}

const resetCustomStyle = () => {
  setCustomStyle([
    `<div>`, `</div>`,
    `<span class="%CLASS%" style="color: #%COLOR%">`, `</span>`,
    `<div class="spoiler">`, `</div>`,
    `<span class="%CLASS%" style="color: #%COLOR%">`, `</span>`,
    ``, `<br>`,
  ])
}



// Load Site

loadAutoSaves()
genFormatEditor()
genNewUserFormat()
transcribe()