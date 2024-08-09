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

export { battle1, battle2, newBattleForPostTest };
