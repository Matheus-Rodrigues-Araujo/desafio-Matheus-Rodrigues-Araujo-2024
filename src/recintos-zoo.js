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
    const animal = Object.values(a).find(
      (animal) => animal.especie === animalNome
    );
    if (!quantidade || quantidade <= 0)
      return { erro: "Quantidade inválida", recintosViaveis: false };
    if (!animal) return { erro: "Animal inválido", recintosViaveis: false };
    const { tamanho } = animal;

    const recintosViaveis = [];
    this.recintos
      .map((recinto) => {
        if (recinto.analisarViabilidade(animal, quantidade)) {
          const espacoLivre =
            recinto.calcularEspacoOcupado() - tamanho * quantidade;

          recintosViaveis.push({
            id: recinto.id,
            espacoLivre: espacoLivre,
            espacoTotal: recinto.tamanhoTotal,
          });
        }
        return null;
      })
      .filter(Boolean);

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável", recintosViaveis: false };
    }

    const recintosFormatados = recintosViaveis
      .sort((a, b) => a.id - b.id)
      .map(
        ({ id, espacoLivre, espacoTotal }) =>
          `Recinto ${id} (espaço livre: ${espacoLivre} total: ${espacoTotal})`
      );

    return { recintosViaveis: recintosFormatados };
  }
}

export { RecintosZoo as RecintosZoo };
