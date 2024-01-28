import eel, screeninfo, os
from DNAnalyzer import *

eel.init(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Front')) 

# Python Treatments are done in this class:
dnaTools = DNAnalyzer()

# Expose these functions to Javascript
@eel.expose                         
def readADN(x): 
    dnaTools.setDNA(dnaTools.readADN(x))
    return dnaTools.readADN(x)

@eel.expose                         
def generateRandom(n): 
    dna = dnaTools.generateRandom(n)
    dnaTools.setDNA(dna)
    return dna

@eel.expose
def check_valid():
    return dnaTools.check_valid()

@eel.expose
def toARN():
    dnaTools.setRNA(dnaTools.toARN())
    return dnaTools.toARN()

@eel.expose
def complement():
    return dnaTools.complement()

@eel.expose
def translate():
    return dnaTools.translate()

@eel.expose
def n_ADN_resume(verbose=False):
    return dnaTools.n_ADN_resume()

@eel.expose
def getPourcentage():
    return dnaTools.getPourcentage("G", "C")

@eel.expose
def codonFreq():
    return dnaTools.codonFreq()

@eel.expose
def mutation():
    return dnaTools.mutation()

@eel.expose
def trouver_motif(motif):
    return dnaTools.trouver_motif(motif)

@eel.expose
def profile_consensus(c):
    return dnaTools.profile_consensus(c)

@eel.expose
def setDNA(chaine):
    dnaTools.setDNA(chaine)

@eel.expose
def setRNA(chaine):
    dnaTools.setRNA(chaine)

@eel.expose
def setProteins(prot):
    dnaTools.setProteins(prot)

@eel.expose
def getDNA():
    return dnaTools.getDNA()

@eel.expose
def getRNA():
    return dnaTools.getRNA()

@eel.expose
def getProteins():
    return dnaTools.getProteins()



@eel.expose                         
def saveFile(content, filename):
    content = "\n".join(content)
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'OUTPUTS', filename), 'w') as file:
        file.write(content)


if eel.chrome.find_path():
    eel.start("index.html", size=(screeninfo.get_monitors()[0].width, screeninfo.get_monitors()[0].height), browser='chrome')
else:
    eel.start("index.html", size=(screeninfo.get_monitors()[0].width, screeninfo.get_monitors()[0].height), mode='default')