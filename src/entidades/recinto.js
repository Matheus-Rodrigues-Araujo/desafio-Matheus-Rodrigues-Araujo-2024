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

  analisarViabilidade(animal, quantidade) {
    if (
      this.animais.length > 0 &&
      animal.dieta === "carnívoro" &&
      !this.filtrarEspecies(animal)
    ) {
      return false;
    }

    if (this.animais.length === 0 && animal.especie === "MACACO") {
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
