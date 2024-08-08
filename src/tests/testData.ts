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

export { user1, user2 };
