class Recinto {
  constructor(id, biomas = [], tamanhoTotal, animais = []) {
    this.id = id;
    this.biomas = biomas;
    this.tamanhoTotal = tamanhoTotal;
    this.animais = animais;
  }

  verificarBiomasIguais(animalBiomas) {
    const setAnimalBiomas = new Set(animalBiomas);
    const setBiomasRecinto = new Set(this.biomas);

    if (setAnimalBiomas.size !== setBiomasRecinto.size) return false;

    for (const bioma of setBiomasRecinto) {
      if (!setAnimalBiomas.has(bioma)) return false;
    }

    return true;
  }

  filtrarEspecies(animal) {
    return this.animais.some((a) => a.especie === animal.especie);
  }

  calcularEspacoLivre(animal = null, quantidade = 0) {
    let espOcupadoAnimais = 0;
    let espLivre = 0;
    let espDisponivel = 0;

    for (let i in this.animais) {
      espOcupadoAnimais += this.animais[i].tamanho;
    }
    // teste 3 -> espeOcupadoAnimais => 2
    // disponivel = tamanhoTotal - espOcupadoAnimais => 7 - 2 = 5
    // livre = 5 - animal.tamanho * quantidade
    // livre = 5 - (2 * 1) => 3

    const especiesAtuais = new Set(
      this.animais.map((animal) => animal.especie)
    );
    especiesAtuais.add(animal.especie);

    espDisponivel = this.tamanhoTotal - espOcupadoAnimais;
    espLivre = espDisponivel - animal.tamanho * quantidade;

    if (especiesAtuais.size > 1) {
      espLivre -= 1;
    }

    return espLivre;
  }

  existemEspeciesDiferentes(animal, quan) {
    const especies = this.animais.map((a) => a.especie);
    const especiesUnicas = new Set(especies);
    return especiesUnicas.size > 1;
  }

  analisarViabilidade(animal, quantidade) {

    const biomaCompatível = this.biomas.some(bioma => animal.biomas.includes(bioma));
    if (!biomaCompatível) {
        return false;
    }

    if (this.animais.length > 0 && animal.dieta === "carnívoro" && !this.filtrarEspecies(animal)) {
      return false;
    }

    if (animal.dieta !== "carnívoro" && this.animais.some(a => a.dieta === "carnívoro")) {
      return false;
  }

    if (this.animais.length === 0 && animal.especie === "MACACO" && quantidade === 1) {
      return false;
    }

    if (animal.especie === "HIPOPOTAMO" && !this.verificarBiomasIguais(animal.biomas)) {
      return false;
    }

    if (animal.especie === "CROCODILO" && !this.verificarBiomasIguais(animal.biomas)) {
      return false;
    }

    if (quantidade >= this.tamanhoTotal) return false;

    return true;
  }
}

export default Recinto;
