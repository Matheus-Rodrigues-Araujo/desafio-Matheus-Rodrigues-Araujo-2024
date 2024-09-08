import Recinto from "../src/entidades/recinto";
import { ANIMAIS_FIXOS as a } from "./constants/data";

class RecintosZoo {
  constructor() {
    this.recintos = [
      new Recinto(1, ["savana"], 10, [a.MACACO, a.MACACO, a.MACACO]),
      new Recinto(2, ["floresta"], 5, []),
      new Recinto(3, ["savana", "rio"], 7, [a.GAZELA]),
      new Recinto(4, ["rio"], 8, []),
      new Recinto(5, ["savana"], 9, [a.LEAO]),
    ];
  }

  analisaRecintos(animalNome, quantidade) {
    const animalRecinto = this.recintos[animalNome];
    if (!quantidade) return { erro: "Quantidade inválida" };
    if (!animalRecinto) return { erro: "Não há recinto viável" };
  }
}

export { RecintosZoo as RecintosZoo };
