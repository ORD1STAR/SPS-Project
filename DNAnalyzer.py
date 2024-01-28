import random

proteines = {
    "UUU":"Phe", "CUU":"Leu", "GUU":"Val", "AUU":"Ile",
    "UUC":"Phe", "CUC":"Leu", "GUC":"Val", "AUC":"Ile",
    "UUG":"Leu", "CUG":"Leu", "GUG":"Val", "AUG":"Met",
    "UUA":"Leu", "CUA":"Leu", "GUA":"Val", "AUA":"Ile",

    "UCU":"Ser", "CCU":"Pro", "GCU":"Ala", "ACU":"Thr",
    "UCC":"Ser", "CCC":"Pro", "GCC":"Ala", "ACC":"Thr",
    "UCG":"Ser", "CCG":"Pro", "GCG":"Ala", "ACG":"Thr",
    "UCA":"Ser", "CCA":"Pro", "GCA":"Ala", "ACA":"Thr",

    "UGU":"Cys", "CGU":"Arg", "GGU":"Gly", "AGU":"Ser",
    "UGC":"Cys", "CGC":"Arg", "GGC":"Gly", "AGC":"Ser",
    "UGG":"Trp", "CGG":"Arg", "GGG":"Gly", "AGG":"Arg",
    "UGA":"Stop", "CGA":"Arg", "GGA":"Gly", "AGA":"Arg",

    "UAU":"Tyr", "CAU":"His", "GAU":"Asp", "AAU":"Asn",
    "UAC":"Tyr", "CAC":"His", "GAC":"Asp", "AAC":"Asn",
    "UAG":"Stop", "CAG":"Gln", "GAG":"Glu", "AAG":"Lys",
    "UAA":"Stop", "CAA":"Gln", "GAA":"Glu", "AAA":"Lys"
}
nucleotides = set("ATCG")

class DNAnalyzer:
    """
    A class for analyzing DNA sequences.

    Attributes:
        DNA (str): The DNA sequence to analyze (None by default).
        RNA (str): The RNA sequence corresponding to the DNA (generated after transcription) (None by default).
        proteins (list): A list of proteins encoded by the DNA (generated after translation) (None by default).
    """
    # Constructor
    def __init__(self):
        self.DNA = None
        self.RNA = None
        self.proteins = None

    # Getters and setters
    def setDNA(self, DNA): 
        """
        DNA Setter.

        Args:
            DNA: The string containing the DNA sequence.
        """
        self.DNA = DNA
    def setRNA(self, RNA):
        """
        RNA Setter.

        Args:
            RNA: The string containing the RNA sequence.
        """
        self.RNA = RNA
    def setProteins(self, proteins):
        """
        Proteins Setter.

        Args:
            proteins: The proteins Sequences.
        """
        self.proteins = proteins
    def getDNA(self):
        """
        DNA Getter.

        Returns:
            str: The DNA sequence.
        """
        return self.DNA
    def getRNA(self):
        """
        RNA Getter.

        Returns:
            str: The extracted RNA sequence.
        """
        return self.RNA
    def getProteins(self):
        """
        Proteins Getter.

        Returns:
            array: The proteins sequences.
        """
        return self.proteins

    # Methods
    @staticmethod
    def readADN(x): 
        """
        Reads a DNA sequence from a string.

        Args:
            x (str): The string containing the DNA sequence.

        Returns:
            str: The extracted DNA sequence.
        """
        dna = ""
        for line in x.split("\n"):
            if line.startswith(">"):
                continue
            dna += line
        return dna

    @staticmethod
    def generateRandom(n): 
        """
        Generates a random DNA sequence of length n.

        Args:
            n (int): The desired length of the DNA sequence.

        Returns:
            str: The randomly generated DNA sequence.
        """
        return "".join([["A", "T", "C", "G"][random.randint(0,3)] for i in range(n)])

    def check_valid(self): 
        """
        Checks if the DNA sequence is valid (contains only A, T, C, and G).

        Returns:
            bool: True if the DNA sequence is valid, False otherwise.
        """ 
        if self.DNA == None: return False
        return len(set(self.DNA[0].upper()) - set("ATCG")) == 0 and self.DNA != ""

    def toARN(self):
        """
        Translates the DNA sequence to RNA (transcribes).

        Returns:
            str: The transcribed RNA sequence.
        """
        return self.complement().upper().replace("T", "U")

    def complement(self): 
        """
        Returns the complementary DNA sequence.

        Returns:
            str: The complementary DNA sequence.
        """
        if not self.check_valid(): return None
        return self.DNA[0].replace("A", "E").replace("T", "A").replace("E", "T").replace("C", "E").replace("G", "C").replace("E", "G")

    def translate(self):
        """
        Translates the RNA sequence into proteins (translates).

        Returns:
            list: A list of protein sequences encoded by the RNA.
        """
        if self.RNA == None: return None
        proteine = []
        started = False
        n = []
        for i in range(3, len(self.RNA)+1, 3):
            seq = self.RNA[i-3:i]
            if proteines[seq] == "Met":
                started = True
            if proteines[seq] == "Stop" and started:
                proteine.append(n)
                n = []
                started = False
            if started:
                n.append(proteines[seq])
        return proteine

    def n_ADN_resume(self, verbose=False):
        """
        Counts the number of each nucleotide (A, T, C, G) in the DNA sequence.

        Args:
            verbose (bool, optional): If True, prints the counts to the console. Defaults to False.

        Returns:
            dict: A dictionary containing the counts of each nucleotide.
        """
        a = self.n_nucleotide('A')
        t = self.n_nucleotide('T')
        c = self.n_nucleotide('C')
        g = self.n_nucleotide('G')
        if verbose:
            print(f"Le nombre d’Adénine dans la chaine est : {a}")
            print(f"Le nombre de Thymine dans la chaine est : {t}")
            print(f"Le nombre de Cytosine dans la chaine est : {c}")
            print(f"Le nombre de Guanine dans la chaine est : {g}")
        return {"A": a, "T": t, "C": c, "G": g}

    def getPourcentage(self, *bases):
        """
        Calculates the percentage of specified bases in the DNA sequence.

        Args:
            *bases: The bases to calculate the percentage of (e.g., "A", "T", "C", "G").

        Returns:
            float: The percentage of the specified bases in the DNA sequence.
        """
        if not self.check_valid(): return None
        counter = 0
        r = self.n_ADN_resume()

        for base in bases:
            counter += r[base.upper()]
        return round((counter / len(self.DNA[0]))*100, 2)

    def codonFreq(self): 
        """
        Calculates the frequency of each codon in the DNA sequence.

        Returns:
            dict: A dictionary containing the frequency of each codon.
        """
        if not self.check_valid(): return None
        n_codons = len(self.DNA[0])//3
        freq = {}
        for i in range(3, len(self.DNA[0])+1, 3):
            seq = self.DNA[0][i-3:i]
            if seq in freq:
                freq[seq] += 1
            else:
                freq[seq] = 1
        return freq

    def mutation(self):
        """
        Introduces a random mutation into the DNA sequence.

        Returns:
            tuple: A tuple containing the mutated DNA sequence and the position of the mutation.
        """
        if not self.check_valid(): return None
        loc = random.randint(0, len(self.DNA[0])-1)
        chaine = list(self.DNA[0])
        chaine[loc] = random.choice(list(nucleotides-set(chaine[loc])))
        chaine = "".join(chaine)
        return((chaine, loc))

    def trouver_motif(self, motif):
        """
        Finds the positions of a motif within the DNA sequence.

        Args:
            motif (str): The motif to search for.

        Returns:
            list: A list of positions where the motif occurs in the DNA sequence.
        """
        if not self.check_valid(): return None
        positions = []
        i=0
        while i < len(self.DNA[0]):
            position = self.DNA[0].find(motif, i)
            if position != -1:
                positions.append(position+1)
                i = position
            i+=1
        return positions

    def profile_consensus(self, c):
        """
        Creates a profile matrix and consensus sequence for a given motif length.

        Args:
            c (int): The length of the motif.

        Returns:
            tuple: A tuple containing the profile matrix and consensus sequence.
        """
        if not self.check_valid(): return None
        matrix = []
        i = 0
        for i in range(c, len(self.DNA[0]), c):
            matrix.append(list(self.DNA[0][i-c:i]))
        if i != len(self.DNA[0]):
            matrix.append(list(self.DNA[0][i:]))
        matrixI = []
        L = len(matrix)

        if len(matrix[-1]) != c:
            L -= 1

        for i in range(c):
            ligne = []
            for j in range(L):
                ligne.append(matrix[j][i])
            matrixI.append(ligne)

        if L == len(matrix)-1:
            for i, val in enumerate(matrix[-1]):
                matrixI[i].append(val)


        profile = [[], [], [], []]
        for l in range(c):
            profile[0].append(matrixI[l].count("A"))
            profile[1].append(matrixI[l].count("C"))
            profile[2].append(matrixI[l].count("G"))
            profile[3].append(matrixI[l].count("T"))

        consensus = "".join([str(line.index(max(line))) for line in [list(l) for l in zip(*profile)]]).replace("0", "A").replace("1", "C").replace("2", "G").replace("3", "T")

        return((profile, consensus))

    def n_nucleotide(self, nuc):
        """
        Counts the number of occurrences of a specific nucleotide in the DNA sequence.

        Args:
            nuc (str): The nucleotide to count (A, T, C, or G).

        Returns:
            int: The number of occurrences of the specified nucleotide.
        """
        if not self.check_valid(): return None
        return self.DNA[0].count(nuc)
