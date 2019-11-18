// TASK 1 CLOSURE
console.log("------HERE BEGINS TASK 1-----");

let countInvokations = (function() {
  let cntr = 0;
  return function() {
    cntr += 1;
    return cntr;
  };
})();

console.log(countInvokations());
console.log(countInvokations());
console.log(countInvokations());

// TASK 2 CLASSES
console.log("------HERE BEGINS TASK 2-----");

class UserList {
  constructor([...users]) {
    this._users = users;
    this.lastId = this.users.length;
  }

  get users() {
    return this._users;
  }

  set users([...users]) {
    this._users = users;
    return this;
  }

  displayNicely({ id, firstName, lastName, age }) {
    return `User ${firstName} ${lastName} with id: '${id}' is ${age} old`;
  }

  showNames = () => {
    let names = "Person list:";
    this._users.map(person => (names += ` ${person.firstName};`));
    console.log(names);
    return this;
  };

  showById = id => {
    if (this._users.findIndex(el => el.id === id) !== -1) {
      this._users.map(person => {
        person.id === id ? console.log(this.displayNicely(person)) : null;
      });
    } else {
      console.log(`Unable to find the user with id: ${id}`);
    }
    return this;
  };

  add({ firstName, lastName = "not mentioned", age = "not mentioned" }) {
    if (firstName === undefined) {
      console.log(
        "It is required to mention the firstName. Can't add this user"
      );
    } else {
      let newPerson = {
        id: this.lastId + 1,
        firstName,
        lastName,
        age
      };
      this.lastId++;
      this._users.push(newPerson);
      console.log(`Hi everyone, i am ${firstName}`);
    }
    return this;
  }

  removeById(id) {
    if (this._users.findIndex(el => el.id === id) !== -1) {
      let newArr = [...this._users.slice(0, id - 1), ...this._users.slice(id)];
      console.log(`bye bye ${this._users[id - 1].firstName}`);
      this._users = newArr;
      this._users.map(item => (item.id > id ? item.id-- : null));
      this.lastId = this._users.length;
    } else {
      console.log(`Unable to find the user with id: ${id}`);
    }
    return this;
  }

  logUsersCould() {
    console.log(`The amount of users : ${this._users.length}`);
    return this;
  }
}

let myList = new UserList([
  {
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    age: 30
  },
  {
    id: 2,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: 27
  },
  {
    id: 3,
    firstName: "Jorah",
    lastName: "Mormont",
    age: 45
  }
]);

myList
  .showNames()
  .showById(2)
  .showById(7)
  .add({ firstName: "Tirion", lastName: "Lanister", age: 39 })
  .add({ lastName: "Aeron", age: 50 })
  .add({ firstName: "Hodor" })
  .showNames()
  .removeById(3)
  .removeById(3)
  .logUsersCould()
  .add({ firstName: "Sansa", lastName: "Stark", age: 28 });
console.log(myList.users);
