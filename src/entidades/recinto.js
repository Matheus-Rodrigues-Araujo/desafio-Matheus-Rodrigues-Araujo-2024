class Recinto {
  constructor(id, biomas = [], tamanhoTotal, animais = []) {
    this.id = id;
    this.biomas = biomas;
    this.tamanhoTotal = tamanhoTotal;
    this.animais = animais;
  }

  avaliarEspaco(animal, quantidade) {
    const tamanhoRecinto = this.tamanhoTotal;
    // caso tenha mais de um animal e não achou nenhum animal da mesma espécie,
    // considera-se 1 espaço extra ocupado
    if (this.animais.length > 0 && !this.filtrarEspecies(animal)) {
      tamanhoRecinto -= 1;
    }
    const espacoOcupado = animal.tamanho * quantidade;
    const espacoDisponivel = tamanhoRecinto - espacoOcupado;
    return espacoDisponivel;
  }

  verificarBiomasIguais(animalBiomas) {
    const setAnimalBiomas = new Set(animalBiomas);
    const setBiomasRecinto = new Set(this.biomas);

    if (setAnimalBiomas.size !== setBiomasRecinto) return false;

    for (const bioma of setBiomasRecinto) {
      if (!setAnimalBiomas.has(bioma)) return false;
    }

    return true;
  }

  filtrarEspecies(animal) {
    return this.animais.some((a) => a.especie === animal.especie);
  }

  analisarViabilidade(animal, quantidade) {
    if (
      this.animais.length > 0 &&
      animal.dieta === "carnívoro" &&
      !this.filtrarEspecies(animal)
    ) {
      return { erro: "Não há recinto viável" };
    }

    if (this.animais.length === 0 && animal.especie === "MACACO") {
      return { erro: "Não há recinto viável" };
    }

    if (
      animal.especie === "HIPOPOTAMO" &&
      !this.verificarBiomasIguais(animal.biomas)
    ) {
      return { erro: "Não há recinto viável" };
    }
  }
}

export default Recinto;
