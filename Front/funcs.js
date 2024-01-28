var dnaInput;
var clearer;

const notif = document.createElement('div');
notif.classList.add('notif');

const DNDpopup = document.createElement('div');
DNDpopup.classList.add('popupDND');
DNDpopup.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 16 16" fill="none">
<path d="M8.09845 7.17186C8.08676 7.15692 8.07182 7.14484 8.05477 7.13653C8.03771 7.12822 8.01899 7.1239 8.00002 7.1239C7.98104 7.1239 7.96232 7.12822 7.94527 7.13653C7.92821 7.14484 7.91327 7.15692 7.90158 7.17186L6.15158 9.38592C6.13715 9.40435 6.1282 9.42646 6.12575 9.44973C6.1233 9.473 6.12744 9.49649 6.13771 9.51752C6.14798 9.53854 6.16395 9.55626 6.18382 9.56863C6.20368 9.581 6.22662 9.58754 6.25002 9.58749H7.4047V13.375C7.4047 13.4437 7.46095 13.5 7.5297 13.5H8.4672C8.53595 13.5 8.5922 13.4437 8.5922 13.375V9.58905H9.75002C9.8547 9.58905 9.91251 9.46874 9.84845 9.38749L8.09845 7.17186Z" fill="black"/>
<path d="M12.6781 5.72969C11.9625 3.84219 10.1391 2.5 8.00313 2.5C5.86719 2.5 4.04375 3.84063 3.32812 5.72813C1.98906 6.07969 1 7.3 1 8.75C1 10.4766 2.39844 11.875 4.12344 11.875H4.75C4.81875 11.875 4.875 11.8188 4.875 11.75V10.8125C4.875 10.7437 4.81875 10.6875 4.75 10.6875H4.12344C3.59687 10.6875 3.10156 10.4781 2.73281 10.0984C2.36562 9.72031 2.17031 9.21094 2.1875 8.68281C2.20156 8.27031 2.34219 7.88281 2.59687 7.55625C2.85781 7.22344 3.22344 6.98125 3.62969 6.87344L4.22188 6.71875L4.43906 6.14687C4.57344 5.79062 4.76094 5.45781 4.99687 5.15625C5.2298 4.85736 5.50571 4.59461 5.81563 4.37656C6.45781 3.925 7.21406 3.68594 8.00313 3.68594C8.79219 3.68594 9.54844 3.925 10.1906 4.37656C10.5016 4.59531 10.7766 4.85781 11.0094 5.15625C11.2453 5.45781 11.4328 5.79219 11.5672 6.14687L11.7828 6.71719L12.3734 6.87344C13.2203 7.10156 13.8125 7.87187 13.8125 8.75C13.8125 9.26719 13.6109 9.75469 13.2453 10.1203C13.066 10.3007 12.8527 10.4437 12.6178 10.541C12.3828 10.6384 12.1309 10.6882 11.8766 10.6875H11.25C11.1812 10.6875 11.125 10.7437 11.125 10.8125V11.75C11.125 11.8188 11.1812 11.875 11.25 11.875H11.8766C13.6016 11.875 15 10.4766 15 8.75C15 7.30156 14.0141 6.08281 12.6781 5.72969Z" fill="black"/>
</svg><p style="font-size: 1.3em;font-weight:bold;">Drop your file here</p>`
DNDpopup.addEventListener('dragover', dragOverHandler);
DNDpopup.addEventListener('drop', dropHandler);

const popup = document.createElement('div');
popup.classList.add('popup');
popup.style.width = "auto"
popup.style.maxHeight = "70%"
popup.style.maxWidth = "60%"
const popup_bg = document.createElement('div');
popup_bg.addEventListener('click', () => {
  closePopup();
  popup.style.width = "auto"
  popup.style.maxHeight = "70%"
});
popup_bg.classList.add('popup-bg');
document.addEventListener('contextmenu', event => event.preventDefault());

function setDNA(dna, resetC=true, DL=false, i=-1) { 
  if(dna.length > 0){
    if(resetC == true){
      document.querySelector('.dna .content').style.color = "black";
    }
    document.querySelector('.rna .content').innerHTML = "<p><b>RNA not generated</b></p>"
    setRNA(undefined)
    
    dna = dna.split('<br>')
    eel.setDNA(dna)()
    var html = "<table><tr>"
    var dna1 = dna[0].toUpperCase();
    for(l in dna1){
      if(i != -1 && l==i){
        html += "<td style='color: red;font-weight: bold;'>"+dna1[l]+"</td>"
      }else{
        html += "<td>"+dna1[l]+"</td>"
      }
    }
    html += "</tr>"

    if(DL == true){
      html += "<tr>"
      var dna2 = dna[1].toUpperCase();
      for(l in dna2){
        if(i != -1 && l==i){
          html += "<td style='color: red;font-weight: bold;'>"+dna2[l]+"</td>"
        }else{
          html += "<td>"+dna2[l]+"</td>"
        }
      }
    }
    html += "</tr></table>"
    document.querySelector('.dna .content').innerHTML = html;
  }
}

function setRNA(rna) {
  eel.setRNA(rna)()
  if(rna != undefined){
    document.querySelector('.rna .content').innerHTML = "";
    var html = "<table><tr>"
    var rna = rna.toUpperCase();
    for(l in rna){
      html += "<td>"+rna[l]+"</td>"
    }
    html += "</tr>"
    html += "</tr></table>"
    document.querySelector('.rna .content').innerHTML = html;

    pos = document.querySelector('.dna .content').scrollLeft;
    tot = document.querySelector('.dna .content').scrollWidth - document.querySelector('.dna .content').clientWidth;
    totR = document.querySelector('.rna .content').scrollWidth - document.querySelector('.rna .content').clientWidth;
    document.querySelector('.rna .content').scrollLeft = totR * (pos/tot);
  }else{
    document.querySelector('.rna .content').innerHTML = "<p><b>RNA not generated</b></p>"
  }
}

// Function to open the popup to enter the number of nucleotides in the random generated DNA sequence
function openDNAinput() {
    dnaInput = document.createElement('input');
    dnaInput.onchange = function() {
        var file = dnaInput.files[0];
        if(file != undefined && file.name.toUpperCase().endsWith(".FASTA"))  
        var reader = new FileReader();
        reader.onload = function() {
            eel.readADN(reader.result)().then(dna => {
                setDNA(dna);
            });
        };
        reader.readAsText(file);
    };
    dnaInput.type = 'file';
    dnaInput.click();
}

// Function to open the popup and generate a random DNA sequence then set it
function openGeneratePopup(){
  const html = `
      <input type="number" placeholder="Length of DNA Sequence">
      <div class="endButtons">
      <button class="confirm">Confirm</button>
      <button class="close">Close</button>
      </div>
  `
  // open the popup
  openPopup(html)

  // Add event listeners to the CONFIRM buttons
  popup.querySelector('.confirm').addEventListener('click', () => {
    const enteredValue = parseInt(popup.querySelector('input').value);

    if(popup.querySelector('input').value != ""){ 
      // promt the generate function in python
      eel.generateRandom(enteredValue)().then(dna => {
        setDNA(dna);
        Notify("DNA sequence generated successfully")
      });
      closePopup();
      popup.querySelector('input').value = ""
    
    }
  });

  // Add event listeners to the CLOSE buttons
  popup.querySelector('.close').addEventListener('click', () => {
    closePopup();
    popup.querySelector('input').value = ""
  });

}

// Function to check if DNA seq is valid
function CheckValid(v=true){
  getDNA().then(dna => {
    if(dna == undefined){
      openPopup('<p style="color: red"><b><u>Please generate a DNA sequence</u></b><button class="close">Ok</button></p>');
      // Add event listeners to the CLOSE buttons
      popup.querySelector('.close').addEventListener('click', () => {
        closePopup();
      });
      return false
    }
    eel.check_valid()().then(res => {
      if(res == true){
        if(v == true){
          openPopup('<p style="color: green"><b>The DNA sequence is valid</b><button class="close">Ok</button></p>');
          // Add event listeners to the CLOSE buttons
          popup.querySelector('.close').addEventListener('click', () => {
            closePopup();
          });
          document.querySelector('.dna .content').style.color = "green";
        }
      }
      else{
        if(v == true){
          openPopup('<p style="color: red"><b>The DNA sequence is not valid</b></p><button class="close">Ok</button>');
          // Add event listeners to the CLOSE buttons
          popup.querySelector('.close').addEventListener('click', () => {
            closePopup();
          });
          document.querySelector('.dna .content').style.color = "red";
        } 
      } 
      return res
    });
    
  })
}

// Generate the complement of the DNA sequence
function GenerateComplement(i=-1){
  getDNA().then(dna => {

    if(dna != undefined && dna.length > 1){
      openPopup('<p style="color: red"><b><u>Complement DNA is already generated</u></b><button class="close">Ok</button></p>');
      // Add event listeners to the CLOSE buttons
      popup.querySelector('.close').addEventListener('click', () => {
        closePopup();
      });
      return false
    }
  
    if(dna != undefined){
      eel.complement()().then(res => {
        setDNA(dna[0] + "<br>" + res, resetC=false, DL=true, i=i);
        Notify("DNA Complement Created successfully")
      });
    }
    else{ 
      Notify("Please generate a DNA sequence")
    }
  })

}

// Generate the RNA sequence
function GenRNA(){
  getDNA().then(dna => {

    if(dna != undefined){
      eel.toARN()().then(res => {
        setRNA(res);
        Notify("RNA sequence generated successfully")
      })
    }
    else{
      Notify("Please generate a DNA sequence")
    }
  })
}

// Generate the proteins sequences
function toProt(){
  getRNA().then(rna => {

    if(rna != undefined){
      eel.translate()().then(res => {
        html = `
        <div class="prots">
        `
        eel.setProteins(res)()
        for(prots in res){
          html += "<div class='ligne-prot'> <p style='width: 70px'>Prot n°"+(parseInt(prots)+1) +"</p>"
          for(prot of res[prots]){
            html += `<p class="protein">`+prot+`</p>`
  
          }
          html += "</div>"
        }
  
        html += `
        <div class="scroller"></div>
          </div>
        <div class="buts">
          <button class="confirm" onclick="saveProt()">Download Proteins Sequence</button>
          <button class="close">Close</button>
        </div>`
  
        // open the popup
        openPopup(html)
        popup.style.maxWidth = "35%"
        popup.style.maxHeight = "70%"
  
        // Add event listeners to the CLOSE buttons
        popup.querySelector('.close').addEventListener('click', () => {
          closePopup();
          popup.style.width = "auto"
          popup.style.maxHeight = "70%"
          popup.style.overflowY = "auto"
        });
      })
    
    }
    if(rna==undefined){
      openPopup('<p style="color: red"><b><u>RNA not generated</u></b><button class="close">Ok</button></p>');
      // Add event listeners to the CLOSE buttons
      popup.querySelector('.close').addEventListener('click', () => {
        closePopup();
      });
    }
  })
}

// Calculate the frequency of each base
function bsFrq(){
  getDNA().then(dna => {

    if(dna != undefined){
      eel.n_ADN_resume()().then(res => {
        
        html = `
        <table class="bs-frq" align="center">
          <tr>
            <th>Nucleotide</th>
            <th>Frequency</th>
          </tr>
          <tr>
            <td>A</td>
            <td>`+res.A+`</td>
          </tr>
          <tr>
            <td>T</td>
            <td>`+res.T+`</td>
          </tr>
          <tr>
            <td>C</td>
            <td>`+res.C+`</td>
          </tr>
          <tr>
            <td>G</td>
            <td>`+res.G+`</td>
          </tr>
        </table>
        <div class="endButtons">
        <button class="confirm" onclick="saveFrq()">Download Bases Frequencies</button>
        <button class="close">Close</button>
        </div>
        `
  
        // open the popup
        openPopup(html)
  
        // Add event listeners to the CLOSE buttons
        popup.querySelector('.close').addEventListener('click', () => {
          closePopup();
        });
  
      })
    }
    else{
      Notify("Please generate a DNA sequence")
    }
  })
}

// Calculate the frequency of GC bases
function GCfreq(){
  getDNA().then(dna => {

    if(dna != undefined){
      eel.getPourcentage()().then(res => {
        
        html = `
        <table class="bs-frq" align="center">
          <tr>
            <th>Nucleotides</th>
            <th>Frequency</th>
          </tr>
          <tr>
            <td>GC</td>
            <td>`+res+`%</td>
          </tr>
        </table>
        <div class="endButtons">
        <button class="confirm" onclick="saveGCFrq()">Download GC Frequency</button>
        <button class="close">Close</button>
        </div>
        `
  
        // open the popup
        openPopup(html)
  
        // Add event listeners to the CLOSE buttons
        popup.querySelector('.close').addEventListener('click', () => {
          closePopup();
        });
  
      })
  
    }else{
      Notify("Please generate a DNA sequence")
    }
  })
}

function codonFreq(){
  getDNA().then(dna => {
    if(dna != undefined){
      eel.codonFreq()().then(res => {
        
        html = `
        <table class="bs-frq" align="center">
          <tr>
            <th>Codon</th>
            <th>Frequency</th>
          </tr>
          `
            
          for(codon in res){
            html += `
            <tr>
              <td>`+codon+`</td>
              <td>`+res[codon]+`</td>
            </tr>
            `
          }
          
        html += `
        </table>
        <div class="endButtons">
        <button class="confirm" onclick="saveCodonFrq()">Download GC Frequency</button>
        <button class="close">Close</button>
        </div>
        `

        // open the popup
        openPopup(html)
        popup.style.maxHeight = "70%"
        // Add event listeners to the CLOSE buttons
        popup.querySelector('.close').addEventListener('click', () => {
          closePopup();
        });

      })

    }else{
      Notify("Please generate a DNA sequence")
    }
  })
}

function mut(){
  getDNA().then(dna => {

    if(dna != undefined){
      eel.mutation()().then(res => {
        if(dna.length > 1 ? true : false){ 
          double = dna[1]
          nuc = res[0][res[1]] == "A" ? "T" : res[0][res[1]] == "T" ? "A" : res[0][res[1]] == "C" ? "G" : "C"
          double = double.substring(0, res[1]) + nuc + double.substring(res[1] + 1);
          setDNA(res[0] + "<br>" + double, resetC=true, DL=true, i=res[1]);
        }else{ 
          setDNA(res[0], resetC=true, DL=false, i=res[1]);
        }
        Notify("Mutation Done successfully at position " + (res[1]+1))
        Q = res[1] / dna[0].length
        totD = document.querySelector('.dna .content').scrollWidth - document.querySelector('.dna .content').clientWidth;
        document.querySelector('.dna .content').scrollLeft = totD * Q;
      })
  
    }else{
      Notify("Please generate a DNA sequence")
    }
  })

}

function researchPopup(){
  eel.getDNA()().then(dna => {
    if(dna != undefined){

      const html = `
          <input type="text" placeholder="motif">
          <div class="endButtons">
          <button class="confirm">Confirm</button>
          <button class="close">Close</button>
          </div>
      `
      
      openPopup(html)
    
      // Add event listeners to the CONFIRM buttons
      popup.querySelector('.confirm').addEventListener('click', () => {
        const enteredValue = popup.querySelector('input').value.toUpperCase();
    
        if(popup.querySelector('input').value != ""){
          // promt the generate function in python
          getDNA().then(dna => {
    
            eel.trouver_motif(enteredValue)().then(pos => {
              researchResults(enteredValue, pos);
            });
            closePopup();
            popup.querySelector('input').value = ""
          })
        
        }
      });
      
      // Add event listeners to the CLOSE buttons
      popup.querySelector('.close').addEventListener('click', () => {
        closePopup();
        popup.querySelector('input').value = ""
      });
    }else{
      Notify("Please generate a DNA sequence")
    }
  })
}
function researchResults(motif, pos){
  var html = `
      <b>Results for "` + motif + `": </b>
      <p class="results">`
  let posS = ""
  for(var p of pos){ 
    posS += p + ", "
  }
  posS = posS.slice(0, posS.lastIndexOf(","));
  html += posS
  html += `</p>
  <div class="endButtons">
  <button class="confirm">Save Positions</button>
  <button class="close">Close</button>
  </div>`


  openPopup(html)

    // Add event listeners to the CONFIRM buttons
  popup.querySelector('.confirm').addEventListener('click', () => {
    saveMotif(motif, posS);
  });
  
  // Add event listeners to the CLOSE buttons
  popup.querySelector('.close').addEventListener('click', () => {
    closePopup();
    popup.querySelector('input').value = ""
  });
}

function consensusPopup(){
  getDNA().then(dna => {
    if(dna != undefined){
      len = dna[0].length
      recommended = Math.round(Math.sqrt(len))
      const html = `
          <p>Length of DNA sequence: `+len+`</p>
          <p>Recommended number of columns: <b><u>`+recommended+`</u></b></p>
          <p><i>Minimum 4 columns</i></p>
          <input type="number" min="4" placeholder="number of columns">
          <div class="endButtons">
          <button class="confirm">Confirm</button>
          <button class="close">Close</button>
          </div>
      `
      
      openPopup(html)
    
      // Add event listeners to the CONFIRM buttons
      popup.querySelector('.confirm').addEventListener('click', () => {
        const enteredValue = parseInt(popup.querySelector('input').value);
    
        if(popup.querySelector('input').value != ""){
          // promt the generate function in python
          eel.profile_consensus(enteredValue)().then(res => {
            consensusResults(enteredValue, res);
          });
          closePopup();
        
        }
      });
      
      // Add event listeners to the CLOSE buttons
      popup.querySelector('.close').addEventListener('click', () => {
        closePopup();
      });
    }else{
      Notify("Please generate a DNA sequence")
    }
  })
}

function consensusResults(c, res){
  html = `
  <h2>Profile Matrix</h2>
  <table>
  `
  // create the table of c columns and 4 rows
  profile = res[0]
  var toSave = [">Profile Matrix"]
  nuc = ["A", "C", "G", "T"]
  for(var i=0; i<4; i++){
    html += "<tr><td>"+nuc[i]+"</td>"
    cmd = nuc[i] + ":  "
    for(var j=0; j<c; j++){
      html += "<td>"+profile[i][j]+"</td>"
      cmd += profile[i][j] + "\t"
    }
    toSave.push(cmd)
    html += "</tr>"
  }
  html += `
  </table> 
  <div class="scroller">
  </div>
  <div class="endButtons">
  <button class="confirm">Show Consensus</button>
  <button class="save">Save Profile Matrix</button>
  <button class="close">Ok</button>
  </div>
  `
  openPopup(html)


  // Add event listeners to the CONFIRM buttons
  popup.querySelector('.confirm').addEventListener('click', () => {

    consensusResults2(res[1]);
    
  });

  // Add event listeners to the SAVE buttons
  popup.querySelector('.save').addEventListener('click', () => {

    eel.saveFile(toSave, "Profile_Matrix.txt")()
    Notify("Profile Matrix saved successfully")
    
  });
  
  // Add event listeners to the CLOSE buttons
  popup.querySelector('.close').addEventListener('click', () => {
    closePopup();
  });

}

function consensusResults2(consensus){
  html = `
  <p><b>Consensus: </b>`+consensus+`</p>
  <div class="endButtons">
  <button class="save">Save Consensus</button>
  <button class="close">Ok</button>
  </div>
  `
  openPopup(html)

  // Add event listeners to the SAVE buttons
  popup.querySelector('.save').addEventListener('click', () => {
      eel.saveFile([">Consensus", consensus], "Consensus.txt")()
      Notify("Consensus saved successfully")
  });
  // Add event listeners to the CLOSE buttons
  popup.querySelector('.close').addEventListener('click', () => {
    closePopup();
  });
}


// Function to open a popup
function openPopup(html){
  popup.innerHTML = html;
  document.body.appendChild(popup_bg);
  document.body.appendChild(popup);
}
// Function to close the popup
function closePopup() {
  document.body.removeChild(popup_bg);
  document.body.removeChild(popup);
}
async function getDNA(){
  return eel.getDNA()()
}
async function getRNA(){
  return eel.getRNA()()
} 
// Function to save the DNA sequence in a file
function saveDNA() {
  getDNA().then(dna => {
    if(dna == undefined){
      openPopup('<p style="color: red"><b><u>Please generate a DNA sequence</u></b><button class="close">Ok</button></p>');
      // Add event listeners to the CLOSE buttons
      popup.querySelector('.close').addEventListener('click', () => {
        closePopup();
      });
      return false
    }
    eel.saveFile(dna, "DNA.txt")()
    Notify("DNA sequence saved successfully")
  })
}

// Function to save the RNA sequence in a file
function saveRNA() {
  getRNA().then(rna => {
    if(rna == undefined){
      openPopup('<p style="color: red"><b><u>Please generate a RNA sequence</u></b><button class="close">Ok</button></p>');
      // Add event listeners to the CLOSE buttons
      popup.querySelector('.close').addEventListener('click', () => {
        closePopup();
      });
      return false
    }
    eel.saveFile([rna], "RNA.txt")()
    Notify("RNA sequence saved successfully")
  })
}

function saveProt(){
  var result = []
  eel.getProteins()().then(res => {

    for(prots in res){
      l = ""
      for(prot of res[prots]){
        l += prot + "-"
      }
      l = l.slice(0, l.lastIndexOf("-")) + l.slice(l.lastIndexOf("-") + 1);
      result.push(l)
    }
    eel.saveFile(result, "Proteins.txt")()
    Notify("Proteins sequences saved successfully")
  })
}
function saveFrq(){
  getDNA().then(dna => {
    eel.n_ADN_resume(dna[0])().then(res => {
      eel.saveFile(["A: " + res.A, "T: "+ res.T, "C: "+res.C, "G: "+res.G], "Bases_Frequencies.txt")()
    })
    Notify("Bases frequencies saved successfully")
  })
}
function saveGCFrq(){
  getDNA().then(dna => {
    eel.getPourcentage()().then(res => {
      eel.saveFile(["GC: " + res+"%"], "GC_Frequency.txt")()
    })
    Notify("GC frequency saved successfully")
  })
}
function saveCodonFrq(){
  getDNA().then(dna => {
    eel.codonFreq()().then(res => {
  
      result = [];
      for(codon in res){
        result.push(codon + ": " + res[codon])
      }
  
      eel.saveFile(result, "Codons_Frequencies.txt")()
      Notify("Codons frequencies saved successfully")
    })
  })
}
function saveMotif(motif, pos){
  content = [">Motif: " + motif, pos]
  eel.saveFile(content, "motifResearch.txt")
  Notify("Motif Positions saved successfully")
}


document.querySelector('.dna .content').addEventListener('scroll', () => {
  pos = document.querySelector('.dna .content').scrollLeft;
  tot = document.querySelector('.dna .content').scrollWidth - document.querySelector('.dna .content').clientWidth;

  if(getRNA() != undefined){
    totR = document.querySelector('.rna .content').scrollWidth - document.querySelector('.rna .content').clientWidth;
    document.querySelector('.rna .content').scrollLeft = totR * (pos/tot);
  }
});
document.querySelector('.rna .content').addEventListener('scroll', () => {
  pos = document.querySelector('.rna .content').scrollLeft;
  tot = document.querySelector('.rna .content').scrollWidth - document.querySelector('.rna .content').clientWidth;

  totD = document.querySelector('.dna .content').scrollWidth - document.querySelector('.dna .content').clientWidth;
  document.querySelector('.dna .content').scrollLeft = totD * (pos/tot);
  
});

document.querySelector("*").addEventListener('dragover', dragOverHandler);
document.querySelector("*").addEventListener('drop', dropHandler);

function dragOverHandler(ev){
  document.body.appendChild(popup_bg);
  document.body.appendChild(DNDpopup);
  ev.preventDefault();
}
function dropHandler(ev){
  document.body.removeChild(popup_bg);
  document.body.removeChild(DNDpopup);
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        if(file.name.toUpperCase().endsWith(".FASTA")){
          var reader = new FileReader();
          reader.onload = function() {
              eel.readADN(reader.result)().then(dna => {
                  setDNA(dna);
                  Notify("DNA sequence loaded successfully")
              });
          };
          reader.readAsText(file);
        }
        else{
          Notify("Please drop a .fasta file")
        }
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }

}

notif.addEventListener('click', () => {
  ClearNotif()
})

function Notify(text){
  if(document.body.contains(notif) == true){
    clearTimeout(clearer);
    document.body.removeChild(notif);
  }
  notif.innerHTML = text;
  document.body.appendChild(notif);
  clearer = setTimeout(() => {
    ClearNotif()
  }, 5000);
}

function ClearNotif(){
  if(document.body.contains(notif) == false) return
  notif.style.opacity = "0";
  setTimeout(() => {
    if(document.body.contains(notif) == false) return
    document.body.removeChild(notif);
    notif.style.opacity = "100";
  }, 500);
}
