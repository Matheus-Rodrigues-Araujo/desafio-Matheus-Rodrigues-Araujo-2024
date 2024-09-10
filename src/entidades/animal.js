class Animal {
  #especie;
  #dieta;
  #biomas;
  #tamanho;

  constructor(especie = "", biomas = [], dieta = "", tamanho = 0) {
    this.#especie = especie;
    this.#dieta = dieta;
    this.#biomas = biomas;
    this.#tamanho = tamanho;
  }

  get especie() {
    return this.#especie;
  }

  get dieta() {
    return this.#dieta;
  }

  get biomas() {
    return this.#biomas;
  }

  get tamanho() {
    return this.#tamanho;
  }
}

export { Animal };
