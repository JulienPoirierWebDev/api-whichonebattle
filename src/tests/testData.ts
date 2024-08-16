type User = {
  _id?: string;
  name: string;
  email: string;
  password: string;
};

let user1: User = {
  name: "Julien POIRIER",
  email: "test@email.com",
  password: "123456",
};
const user2: User = {
  name: "Julien POIRIER",
  email: "test2@email.com",
  password: "123456",
};

const user3: User = {
  name: "Julien POIRIER",
  email: "test3@email.com",
  password: "123456",
};

export { user1, user2, user3 };

type BattleType = {
  _id?: string;
  question: string;
  texte: string;
  propositions: Array<{ name: string }>;
  user_id?: string;
  created_at?: Date;
};

let battle1: BattleType = {
  question: "Fraise ou Chocolat ?",
  texte: "Pour un parfum, vous êtes plutôt ...",
  propositions: [
    {
      name: "Fraise",
    },
    {
      name: "Chocolat",
    },
  ],
};

let battle2: BattleType = {
  question: "Chien ou Chat ?",
  texte: "Pour un animal de compagnie, vous êtes plutôt ...",
  propositions: [
    {
      name: "Chien",
    },
    {
      name: "Chat",
    },
  ],
};

let battle3: BattleType = {
  question: "Automne ou Printemps ?",
  texte: "Pour une saison, vous êtes plutôt ...",
  propositions: [
    {
      name: "Automne",
    },
    {
      name: "Printemps",
    },
  ],
};

// créer les battles avec les propositions suivantes :
const battle4: BattleType = {
  question: "Mer ou Montagne ?",
  texte: "Pour des vacances, vous êtes plutôt ...",
  propositions: [
    {
      name: "Mer",
    },
    {
      name: "Montagne",
    },
  ],
};

const battle5: BattleType = {
  question: "Mac ou PC ?",
  texte: "Pour un ordinateur, vous êtes plutôt ...",
  propositions: [
    {
      name: "Mac",
    },
    {
      name: "PC",
    },
  ],
};

const battle6: BattleType = {
  question: "Ski ou Snowboard ?",
  texte: "Pour la glisse, vous êtes plutôt ...",
  propositions: [
    {
      name: "Ski",
    },
    {
      name: "Snowboard",
    },
  ],
};

const battle7: BattleType = {
  question: "Vélo ou Moto ?",
  texte: "Pour se déplacer, vous êtes plutôt ...",
  propositions: [
    {
      name: "Vélo",
    },
    {
      name: "Moto",
    },
  ],
};

const battle8: BattleType = {
  question: "Camping ou Hôtel ?",
  texte: "Pour dormir, vous êtes plutôt ...",
  propositions: [
    {
      name: "Camping",
    },
    {
      name: "Hôtel",
    },
  ],
};

const battle9: BattleType = {
  question: "Voyage ou Lecture ?",
  texte: "Pour se détendre, vous êtes plutôt ...",
  propositions: [
    {
      name: "Voyage",
    },
    {
      name: "Lecture",
    },
  ],
};

const battle10: BattleType = {
  question: "Cinéma ou Théâtre ?",
  texte: "Pour sortir, vous êtes plutôt ...",
  propositions: [
    {
      name: "Cinéma",
    },
    {
      name: "Théâtre",
    },
  ],
};

const battle11: BattleType = {
  question: "Ville ou Campagne ?",
  texte: "Pour vivre, vous êtes plutôt ...",
  propositions: [
    {
      name: "Ville",
    },
    {
      name: "Campagne",
    },
  ],
};

const battle12: BattleType = {
  question: "Soleil ou Pluie ?",
  texte: "Pour un temps, vous êtes plutôt ...",
  propositions: [
    {
      name: "Soleil",
    },
    {
      name: "Pluie",
    },
  ],
};

const battle13: BattleType = {
  question: "Jour ou Nuit ?",
  texte: "Pour un moment, vous êtes plutôt ...",
  propositions: [
    {
      name: "Jour",
    },
    {
      name: "Nuit",
    },
  ],
};

const battle14: BattleType = {
  question: "Salé ou Sucré ?",
  texte: "Pour un goût, vous êtes plutôt ...",
  propositions: [
    {
      name: "Salé",
    },
    {
      name: "Sucré",
    },
  ],
};

const battle15: BattleType = {
  question: "Sport ou Lecture ?",
  texte: "Pour se détendre, vous êtes plutôt ...",
  propositions: [
    {
      name: "Sport",
    },
    {
      name: "Lecture",
    },
  ],
};

const battle16: BattleType = {
  question: "Bière ou Vin ?",
  texte: "Pour boire, vous êtes plutôt ...",
  propositions: [
    {
      name: "Bière",
    },
    {
      name: "Vin",
    },
  ],
};

const battle17: BattleType = {
  question: "Mer ou Océan ?",
  texte: "Pour se baigner, vous êtes plutôt ...",
  propositions: [
    {
      name: "Mer",
    },
    {
      name: "Océan",
    },
  ],
};

const battle18: BattleType = {
  question: "Café ou Thé ?",
  texte: "Pour boire, vous êtes plutôt ...",
  propositions: [
    {
      name: "Café",
    },
    {
      name: "Thé",
    },
  ],
};

const battle19: BattleType = {
  question: "Pâtes ou Riz ?",
  texte: "Pour manger, vous êtes plutôt ...",
  propositions: [
    {
      name: "Pâtes",
    },
    {
      name: "Riz",
    },
  ],
};

const battle20: BattleType = {
  question: "Fleurs ou Plantes ?",
  texte: "Pour décorer, vous êtes plutôt ...",
  propositions: [
    {
      name: "Fleurs",
    },
    {
      name: "Plantes",
    },
  ],
};

let newBattleForPostTest: BattleType = {
  question: "Chaud ou Froid ?",
  texte: "Pour un climat, vous êtes plutôt ...",
  propositions: [
    {
      name: "Chaud",
    },
    {
      name: "Froid",
    },
  ],
};

export {
  battle1,
  battle2,
  newBattleForPostTest,
  battle3,
  battle4,
  battle5,
  battle6,
  battle7,
  battle8,
  battle9,
  battle10,
  battle11,
  battle12,
  battle13,
  battle14,
  battle15,
  battle16,
  battle17,
  battle18,
  battle19,
  battle20,
};
