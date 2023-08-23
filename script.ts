console.log('This is an exmaple how to create nested classes')

const data = {
  parentId: '1',
  child: {
    childId: '2',
  }
}

class Child {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }
}

class Parent {
  id: string;
  child: Child;
  constructor(data: { parentId: string, child: { childId: string } }) {
    this.child = new Child(data.child.childId);
    this.id = data.parentId
  }

  getId() {
    return this.id;
  }
}

const newParent = new Parent(data);

console.log(newParent.getId());
console.log(newParent.child.getId());
