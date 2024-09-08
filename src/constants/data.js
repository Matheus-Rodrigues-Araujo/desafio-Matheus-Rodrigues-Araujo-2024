import Animal from "../entidades/animal"

export const ANIMAIS_FIXOS = {
  LEAO: new Animal("LEAO", ["savana"], "carnívoro", 3),
  LEOPARDO: new Animal("LEOPARDO", ["savana"], "carnívoro", 2),
  GAZELA: new Animal("GAZELA", ["savana"], "herbívoro", 2),
  CROCODILO: new Animal("CROCODILO", ["rio"], "carnívoro", 3),
  MACACO: new Animal("MACACO", ["savana", "floresta"], "herbívoro", 1),
  HIPOPOTAMO: new Animal("HIPOPOTAMO", ["savana", "rio"], "herbívoro", 4),
};

