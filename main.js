// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(number, array) {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      const baseIndex = Math.floor(Math.random() * this.dna.length);
      const base = this.dna[baseIndex];
      // console.log(baseIndex)
      // console.log(base)
      // console.log(this.dna)
      let newBase = returnRandBase();
      while (newBase === base) {
        newBase = returnRandBase();
      }
      this.dna[baseIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        for (let j = 0; j < pAequor.dna.length; j++) {
          if (this.dna[i] === pAequor.dna[j] && i === j) {
            console.log(this.dna[i], pAequor.dna[j]);
            identicalBases += 1;
          }
        }
      }
      console.log(identicalBases);
      let percentageDNACommon = (identicalBases / this.dna.length) * 100;
      console.log(percentageDNACommon);
      percentageDNACommon = percentageDNACommon.toFixed();
      console.log(
        `specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentageDNACommon}% DNA in common`
      );
    },
    willLikelySurvive() {
      let numOfCOrG = 0;
      for (const base of this.dna) {
        if (base === "C" || base === "G") {
          numOfCOrG += 1;
        }
      }
      let percentage = (numOfCOrG / this.dna.length) * 100;
      if (percentage >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
}

// console.log(pAequorFactory(1, mockUpStrand()).mutate())
const specimen1 = pAequorFactory(1, mockUpStrand());
const specimen2 = pAequorFactory(2, mockUpStrand());
// console.log(pAequorFactory(1, mockUpStrand()).compareDNA(pAequorFactory(2, mockUpStrand())))
console.log(specimen1.compareDNA(specimen2));
const pAequor = [];
const pAequorSurvivors = [];
for (let i = 1; i < 100; i++) {
  pAequor.push(pAequorFactory(i, mockUpStrand()));
}
// console.log(pAequor)
let numOfInstances = 0;
for (const p of pAequor) {
  if (p.willLikelySurvive() && numOfInstances < 30) {
    pAequorSurvivors.push(p);
    numOfInstances += 1;
  }
}
console.log(pAequorSurvivors);
console.log(numOfInstances);
