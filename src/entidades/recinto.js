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

  calcularEspacoOcupado() {
    let espOcupadoAnimais = 0;

    for (let i in this.animais) {
      espOcupadoAnimais += this.animais[i].tamanho;
    }

    return this.tamanhoTotal - espOcupadoAnimais;
  }

  existemEspeciesDiferentes() {
    const especies = this.animais.map((a) => a.especie);
    const especiesUnicas = new Set(especies);
    return especiesUnicas.size > 1; // Retorna true se houver mais de uma espécie
  }

  analisarViabilidade(animal, quantidade) {
    if (
      this.animais.length > 0 &&
      animal.dieta === "carnívoro" &&
      !this.filtrarEspecies(animal)
    ) {
      return false;
    }

    if (
      this.animais.length === 0 &&
      animal.especie === "MACACO" &&
      quantidade === 1
    ) {
      return false;
    }

    if (
      animal.especie === "HIPOPOTAMO" &&
      !this.verificarBiomasIguais(animal.biomas)
    ) {
      return false;
    }

    if (
      animal.especie === "CROCODILO" &&
      !this.verificarBiomasIguais(animal.biomas)
    ) {
      return false;
    }
    if (quantidade >= this.tamanhoTotal) return false;

    return true;
  }
}

export default Recinto;
