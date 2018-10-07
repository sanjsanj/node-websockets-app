const { Users } = require("./users");

describe("Users", () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: "Sue",
        room: "Sue's room"
      },
      {
        id: 2,
        name: "Bill",
        room: "Bill's room"
      },
      {
        id: 3,
        name: "Bob",
        room: "Bill's room"
      }
    ];
  });

  it("should add new user", () => {
    const users = new Users();
    const user = {
      id: 1,
      name: "Sue",
      room: "Sue's room"
    };

    expect(users.addUser(user.id, user.name, user.room)).toEqual(user);

    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    const user = users.users[0];

    expect(users.users.length).toEqual(3);
    expect(users.removeUser(user.id)).toEqual(user);
    expect(users.users.length).toEqual(2);
  });

  it("should not remove a user", () => {
    const user = {
      id: 99
    };

    expect(users.users.length).toEqual(3);
    expect(users.removeUser(user.id)).toEqual(undefined);
    expect(users.users.length).toEqual(3);
  });

  it("should get a user", () => {
    const user = users.users[0];

    expect(users.getUser(user.id)).toEqual(user);
  });

  it("should not get a user", () => {
    expect(users.getUser(99)).toEqual(undefined);
  });

  it("should return names for Bill's room", () => {
    const userList = users.getUserList("Bill's room");

    expect(userList).toEqual(["Bill", "Bob"]);
  });
});
