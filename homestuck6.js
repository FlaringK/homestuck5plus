const defultFormats = {
  john: {
    color: "#0715cd",
    names: ["John", "June", "EB", "Tavrisprite"],
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
    names: ["Jake", "GT", "Jadesprite"],
    chum: "golgothasTerror"
  },
  roxy: {
    color: "#f141ef",
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
    names: ["AR", "TT--", "arquiusprite"],
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
    names: ["nepeta", "AC", "Muelin"],
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
    names: ["feferi", "CC", "Meenah"],
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
    names: ["Doc"],
  },

  dad: {
    color: "#4b4b4b",
    names: ["Dad"],
  },

  black: {
    color: "#000000",
    names: [],
  },
  felt: {
    color: "#2ed73a",
    names: ["Caliborn-"],
  },
  limeblood: {
    color: "#678900",
    names: [],
  },

  jasprose: {
    dualCol: true,
    names: ["Jasprosesprite^2", "Jazz"],
    colorClasses: ["roxy", "rose"]
  },
  davepeta: {
    dualCol: true,
    names: ["Davepetasprite^2", "Davepeta"],
    colorClasses: ["jade", "dirk"]
  }
}

let userFormats = localStorage.getItem('userFormats') ? JSON.parse(localStorage.getItem('userFormats')) : defultFormats
let compatibleKeys = Object.keys(defultFormats)

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
}`

// Transcribe Input
const transcribe = () => {
  const outputDiv = document.getElementById("workskin")
  const inputText = document.getElementById("input").value.trim()

  // Options
  const doAutoLog = document.getElementById("autoLog").checked
  const doHandleUpper = document.getElementById("handleUpper").checked

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
      }    
    } else {
      currentParagraph.push(line);
    }
  });

  allParagraphs.push(currentParagraph);

  // Format each line into paragraphs and add to output
  let usedFormats = []
  let output = ""

  allParagraphs.forEach(p => {
    let paragraphText = ""
    let isParagraphBlock = false

    p.forEach(text => {
      let line = text.trim()
      let doLineBreak = true

      // == Add spans into text ==
      if (regCharSpans.test(line)) {
        const spans = line.match(regCharSpans)

        spans.forEach(key => {
          const chara = key.slice(1)
          console.log(chara)

          for (const [spanClass, format] of Object.entries(userFormats)) {
            format.names.forEach(formatHandle => {
              if (formatHandle.toLowerCase() == chara.toLowerCase()) {
                line = line.replace(key + " ", `<span class="${spanClass}">`) + "</span>"
              }
            })
          }

        })
      }
      line = line.replace(/\$-/g, "</span>")

      // == If line starts with a handle (EB:), format it ==
      if (regHandle.test(line)) {
        isParagraphBlock = !isParagraphBlock ? doAutoLog : isParagraphBlock

        let foundHandle = false
        const lineHandle = line.match(regHandle)[0].replace(":", "")

        for (const [spanClass, format] of Object.entries(userFormats)) {
          format.names.forEach(formatHandle => {
            if (formatHandle.toLowerCase() == lineHandle.toLowerCase()) {

              // Remove "-" from handle
              if (lineHandle.includes("-")) line = line.replace(lineHandle, lineHandle.replace(/-/g, ""))
              // Capitalise Handles if doHandleUpper
              if (doHandleUpper) line = line.replace(lineHandle, lineHandle.toUpperCase())

              // If Dual colour surround handle with colour
              if ("dualCol" in format) {
                line = line.replace(lineHandle + ":", `<span class="${format.colorClasses[0]}">${lineHandle}:</span>`)
              }

              line = `<span class="${"dualCol" in format ? format.colorClasses[1] : spanClass}">${line}</span>`
              foundHandle = true

              // Add spanclass to format
              if (!usedFormats.includes(spanClass)) usedFormats.push(spanClass)

            }
          })
        }

        if (!foundHandle) line = `<span class="black">${line}</span>`
      }

      // == Replace all instances of chum handles ({EB} => ectoBiologist [EB]) == 
      if (regChum.test(line)) {
        const chumHandles = line.match(regChum)

        chumHandles.forEach(chumHandle => {
          const handle = doHandleUpper ? chumHandle.slice(1, -1).toUpperCase() : chumHandle.slice(1, -1)

          for (const [spanClass, format] of Object.entries(userFormats)) {
            // If the format doesn't have a chumhandle, skip it
            if (!("chum" in format)) continue

            format.names.forEach(formatHandle => {
              if (formatHandle.toLowerCase() == handle.toLowerCase()) {
  
                line = line.replace(chumHandle, `<span class="${spanClass}">${format.chum} [${handle.replace(/-/g, "")}]</span>`)
                isParagraphBlock = !isParagraphBlock ? doAutoLog : isParagraphBlock
                
                // Add spanclass to format
                if (!usedFormats.includes(spanClass)) usedFormats.push(spanClass)

              }
            })

          }
        })

      }

      // == Check for manual block syntax ==
      if (line == logSyntax)  {
        isParagraphBlock = true
        doLineBreak = false
        line = ""
      }

      paragraphText += line + (doLineBreak ? "<br/>" : "")

    })

    if (isParagraphBlock) {
      output += `<p class="block"><span class="pesterlog">${paragraphText}</span></p>\n`
    } else {
      output += `<p>${paragraphText}</p>\n`
    }

  })
  
  outputDiv.innerHTML = output

  document.getElementById("finalHtml").innerText = outputDiv.innerHTML
  document.getElementById("finalCSS").innerText = document.getElementById("genStyle").innerHTML

  setSkinStatus(usedFormats)

}

const setSkinStatus = usedFormats => {
  const skinStatus = document.getElementById("skinStatus")

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
  }
}

transcribe()

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
      </div>
      <div class="collapse closed">
        <div class="formatNames"><div>Names:</div> <ul> ${nameFormats} </ul></div>
        <div>Color Classes: <input type="text" class="colClass" value="${format.colorClasses[0]}"> <input type="text" class="colClass" value="${format.colorClasses[1]}"></div>
      </div>
    </div>`

    } else {
  
      // Add edit module
      formatHUD.innerHTML += `<div class="format" data-format="${spanClass}" data-color="${format.color}">
        <div class="collapseHead" style="color: ${format.color}" onclick="toggleCollapse('${spanClass}')">${format.color.toUpperCase()}: ${spanClass} <button class="formatBin" onclick="deleteFormat('${spanClass}')">🗑️</button> </div>
        <div class="collapse closed">
          <div class="formatNames"><div>Names:</div> <ul> ${nameFormats} </ul></div>
          <div>ChumHandle: <input type="text" class="chum" value="${format.chum ? format.chum : ""}" style="float: right" onchange="genNewUserFormat()"></div>
        </div>
      </div>`
    }

  }
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

  transcribe()
}

const deleteFormat = spanClass => {
  event.stopPropagation();
  document.querySelector(`div[data-format="${spanClass}"]`).remove()

  let newUserFormat = userFormats
  delete newUserFormat[spanClass]
  updateUserFormat(newUserFormat)
}

const restoreDefaultFormats = () => {
  updateUserFormat(JSON.parse(JSON.stringify(defultFormats)))
  genFormatEditor()
}

const addNewFormat = () => {
  const className = document.getElementById("newFormatName")
  const color = document.getElementById("newFormatCol")

  if (!className.value) return

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
  const genStyle = document.getElementById("genStyle")
  genStyle.innerHTML = ao3CSS
  for (const [spanClass, format] of Object.entries(userFormats)) {
    genStyle.innerHTML += `
    #workskin .${spanClass} { font-size: 14px; font-weight: bold; font-family: courier, monospace; color: ${format.color}; }
    `
  }
}

const importJson = () => {
  try {
    const newUserFormat = JSON.parse(document.getElementById("importJson").value)
    updateUserFormat(newUserFormat)
    genFormatEditor()
  } catch (e) { }
}

genFormatEditor()
genNewUserFormat()