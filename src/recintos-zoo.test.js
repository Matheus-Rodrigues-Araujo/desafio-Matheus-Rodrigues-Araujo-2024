import { Recinto } from "./entidades/recinto.js";
import { RecintosZoo } from "./recintos-zoo.js";
import { ANIMAIS } from "./constantes/data.js";

describe("Recintos do Zoologico", () => {
  test("Deve criar um Recinto com as propriedades adequadas", () => {
    const recinto = new Recinto(3, ["savana", "rio"], 7, [ANIMAIS.GAZELA]);
    expect(recinto.id).toBe(3);
    expect(recinto.biomas).toEqual(["savana", "rio"]);
    expect(recinto.tamanhoTotal).toBe(7);
    expect(recinto.animais).toEqual([ANIMAIS.GAZELA]);
  });

  test("Deve calcular o Espaço Livre adequadamente", () => {
    const recinto = new Recinto(3, ["savana", "rio"], 7, [ANIMAIS.GAZELA]);
    const { especie, tamanho } = ANIMAIS.MACACO;
    const quantidade = 2;
    expect(recinto.calcularEspacoLivre(especie, tamanho, quantidade)).toBe(2);
  });

  test("Deve retornar um erro com quantidade errada", () => {
    const zoologico = new RecintosZoo();
    expect(zoologico.analisaRecintos("MACACO", -32).erro).toBe(
      "Quantidade inválida"
    );
    expect(zoologico.analisaRecintos("MACACO", 0).erro).toBe(
      "Quantidade inválida"
    );
  });

  test("Deve rejeitar animal inválido", () => {
    const resultado = new RecintosZoo().analisaRecintos("UNICORNIO", 1);
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve verificar se há mais de uma espécie", () => {
    const recinto = new Recinto(3, ["savana", "rio"], 7, [ANIMAIS.GAZELA]);
    expect(recinto.filtrarEspecies(ANIMAIS.GAZELA)).toBe(true);
    expect(recinto.filtrarEspecies(ANIMAIS.LEAO)).toBe(false);
    expect(recinto.filtrarEspecies(ANIMAIS.MACACO)).toBe(false);
    expect(recinto.filtrarEspecies(ANIMAIS.LEOPARDO)).toBe(false);
    expect(recinto.filtrarEspecies(ANIMAIS.CROCODILO)).toBe(false);
    expect(recinto.filtrarEspecies(ANIMAIS.HIPOPOTAMO)).toBe(false);
  });

  test("Deve rejeitar quantidade inválida", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 0);
    expect(resultado.erro).toBe("Quantidade inválida");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Não deve encontrar recintos para 10 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 10);
    expect(resultado.erro).toBe("Não há recinto viável");
    expect(resultado.recintosViaveis).toBeFalsy();
  });

  test("Deve encontrar recinto para 1 crocodilo", () => {
    const resultado = new RecintosZoo().analisaRecintos("CROCODILO", 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 4 (espaço livre: 5 total: 8)"
    );
    expect(resultado.recintosViaveis.length).toBe(1);
  });

  test("Deve encontrar recintos para 2 macacos", () => {
    const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe(
      "Recinto 1 (espaço livre: 5 total: 10)"
    );
    expect(resultado.recintosViaveis[1]).toBe(
      "Recinto 2 (espaço livre: 3 total: 5)"
    );
    expect(resultado.recintosViaveis[2]).toBe(
      "Recinto 3 (espaço livre: 2 total: 7)"
    );
    expect(resultado.recintosViaveis.length).toBe(3);
  });
});
