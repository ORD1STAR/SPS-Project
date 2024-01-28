# Before Starting:
Install the following libraries
- eel
- screeninfo
```py
pip install eel
pip install screeninfo
```
# Help for the [DNAnalyzer](DNAnalyzer.py) Object Class
```
Help on class DNAnalyzer in module DNAnalyzer:

class DNAnalyzer(builtins.object)
 |  A class for analyzing DNA sequences.
 |
 |  Attributes:
 |      DNA (str): The DNA sequence to analyze (None by default).
 |      RNA (str): The RNA sequence corresponding to the DNA (generated after transcription) (None by default).
 |      proteins (list): A list of proteins encoded by the DNA (generated after translation) (None by default).
 |
 |  Methods defined here:
 |
 |  __init__(self)
 |      Initialize self.  See help(type(self)) for accurate signature.
 |
 |  check_valid(self)
 |      Checks if the DNA sequence is valid (contains only A, T, C, and G).
 |
 |      Returns:
 |          bool: True if the DNA sequence is valid, False otherwise.
 |
 |  codonFreq(self)
 |      Calculates the frequency of each codon in the DNA sequence.
 |
 |      Returns:
 |          dict: A dictionary containing the frequency of each codon.
 |
 |  complement(self)
 |      Returns the complementary DNA sequence.
 |
 |      Returns:
 |          str: The complementary DNA sequence.
 |
 |  generateRandom(self, n)
 |      Generates a random DNA sequence of length n.
 |
 |      Args:
 |          n (int): The desired length of the DNA sequence.
 |
 |      Returns:
 |          str: The randomly generated DNA sequence.
 |
 |  getDNA(self)
 |      DNA Getter.
 |
 |      Returns:
 |          str: The DNA sequence.
 |
 |  getPourcentage(self, *bases)
 |      Calculates the percentage of specified bases in the DNA sequence.
 |
 |      Args:
 |          *bases: The bases to calculate the percentage of (e.g., "A", "T", "C", "G"). |
 |      Returns:
 |          float: The percentage of the specified bases in the DNA sequence.
 |
 |  getProteins(self)
 |      Proteins Getter.
 |
 |      Returns:
 |          array: The proteins sequences.
 |
 |  getRNA(self)
 |      RNA Getter.
 |
 |      Returns:
 |          str: The extracted RNA sequence.
 |
 |  mutation(self)
 |      Introduces a random mutation into the DNA sequence.
 |
 |      Returns:
 |          tuple: A tuple containing the mutated DNA sequence and the position of the mutation.
 |
 |  n_ADN_resume(self, verbose=False)
 |      Counts the number of each nucleotide (A, T, C, G) in the DNA sequence.
 |
 |      Args:
 |          verbose (bool, optional): If True, prints the counts to the console. Default
s to False.
 |
 |      Returns:
 |          dict: A dictionary containing the counts of each nucleotide.
 |
 |  n_nucleotide(self, nuc)
 |      Counts the number of occurrences of a specific nucleotide in the DNA sequence. 
 |
 |      Args:
 |          nuc (str): The nucleotide to count (A, T, C, or G).
 |
 |      Returns:
 |          int: The number of occurrences of the specified nucleotide.
 |
 |  profile_consensus(self, c)
 |      Creates a profile matrix and consensus sequence for a given motif length.      
 |
 |      Args:
 |          c (int): The length of the motif.
 |
 |      Returns:
 |          tuple: A tuple containing the profile matrix and consensus sequence.       
 |
 |  readADN(self, x)
 |      Reads a DNA sequence from a string.
 |
 |      Args:
 |          x (str): The string containing the DNA sequence.
 |
 |      Returns:
 |          str: The extracted DNA sequence.
 |
 |  setDNA(self, DNA)
 |      DNA Setter.
 |
 |      Args:
 |          DNA: The string containing the DNA sequence.
 |
 |  setProteins(self, proteins)
 |      Proteins Setter.
 |
 |      Args:
 |          proteins: The proteins Sequences.
 |
 |  setRNA(self, RNA)
 |      RNA Setter.
 |
 |      Args:
 |          RNA: The string containing the RNA sequence.
 |
 |  toARN(self)
 |      Translates the DNA sequence to RNA (transcribes).
 |
 |      Returns:
 |          str: The transcribed RNA sequence.
 |
 |  translate(self)
 |      Translates the RNA sequence into proteins (translates).
 |
 |      Returns:
 |          list: A list of protein sequences encoded by the RNA.
 |
 |  trouver_motif(self, motif)
 |
 |  __dict__
 |      dictionary for instance variables (if defined)
 |
 |  __weakref__
 |      list of weak references to the object (if defined)
```
