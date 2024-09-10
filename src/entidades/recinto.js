class Recinto {
  #id;
  #biomas;
  #tamanhoTotal;
  #animais;

  constructor(id = 0, biomas = [], tamanhoTotal = 0, animais = []) {
    this.#id = id;
    this.#biomas = biomas;
    this.#tamanhoTotal = tamanhoTotal;
    this.#animais = animais;
  }

  get id() {
    return this.#id;
  }

  get biomas() {
    return this.#biomas;
  }

  get tamanhoTotal() {
    return this.#tamanhoTotal;
  }

  get animais() {
    return this.#animais;
  }

  verificarBiomasIguais(animalBiomas) {
    const setAnimalBiomas = new Set(animalBiomas);
    const setBiomasRecinto = new Set(this.#biomas);

    if (setAnimalBiomas.size !== setBiomasRecinto.size) return false;

    for (const bioma of setBiomasRecinto) {
      if (!setAnimalBiomas.has(bioma)) return false;
    }

    return true;
  }

  filtrarEspecies(animal) {
    return this.#animais.some((a) => a.especie === animal.especie);
  }

  calcularEspacoLivre(especie = "", tamanho = 0, quantidade = 0) {
    let espOcupadoAnimais = 0;
    let espLivre = 0;
    let espDisponivel = 0;

    for (let i in this.#animais) {
      espOcupadoAnimais += this.#animais[i].tamanho;
    }

    const especiesAtuais = new Set(
      this.#animais.map((animal) => animal.especie)
    );

    especiesAtuais.add(especie);

    espDisponivel = this.#tamanhoTotal - espOcupadoAnimais;
    espLivre = espDisponivel - tamanho * quantidade;

    if (especiesAtuais.size > 1) espLivre -= 1;

    return espLivre;
  }

  analisarViabilidade(animal, quantidade) {
    const biomaCompatível = this.#biomas.some((bioma) =>
      animal.biomas.includes(bioma)
    );
    if (!biomaCompatível) return false;

    if (
      animal.dieta === "carnívoro" &&
      this.#animais.length > 0 &&
      !this.filtrarEspecies(animal)
    ) {
      return false;
    }

    if (
      animal.dieta !== "carnívoro" &&
      this.#animais.some((a) => a.dieta === "carnívoro")
    ) {
      return false;
    }

    if (
      this.#animais.length === 0 &&
      animal.especie === "MACACO" &&
      quantidade === 1
    ) {
      return false;
    }

    if (
      (animal.especie === "HIPOPOTAMO" || animal.especie === "CROCODILO") &&
      !this.#biomas.some((bioma) => animal.biomas.includes(bioma))
    ) {
      return false;
    }

    if (quantidade >= this.#tamanhoTotal) return false;

    return true;
  }
}

export { Recinto as Recinto };
