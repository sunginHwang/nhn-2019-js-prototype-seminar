// todo start
let todo = {
    title: 'ppap',
    complete: false,
    getTitle: function () {
        return this.title;
    },
    setComplete: function (complete) {
        this.complete = complete;
    },
}

function printTodo() {
    console.log(this.complete ? `[완료] ${this.title}` : `[미완료] ${this.title}`);
}

printTodo.call(todo);


Object.defineProperty(todo, 'state', {
    get() {
        return this.complete ? '완료' : '미완료';
    }
});


console.log(todo);
// todo end

// obj start
let obj = {};

//configurable
Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: 'foo'
});

//writable
Object.defineProperty(obj, 'age', {
    configurable: true,
    writable: false,
    enumerable: true,
    value: '30'
});

//writable
Object.defineProperty(obj, 'id', {
    configurable: true,
    writable: true,
    enumerable: false,
    value: '20'
});

for (ob in obj) {
    console.log(ob);
}
// obj end

//obj2 start
let obj2 = {};
let ageNum = 0;

Object.defineProperty(obj2, 'age', {
    set(value) {
        ageNum = value;
    },
    get() {
        return ageNum + '살';
    }
})

//obj2 end

// call start
let person = {
    name: 'Steve Jobs'
}

function printPersonName() {
    console.log(this.name);
}


function myBind(func, context) {
    return function () {
        func.call(context);
    };
}

let printPersonNameBinded = myBind(printPersonName, person);

printPersonNameBinded();
//call end

//객체 생성 패턴 start

const createTodo = (title) => {
    let createTodoObj = {};
    createTodoObj.title = title;
    createTodoObj.getTitle = function () {
        return this.title;
    }
    createTodoObj.setComplete = function (complete) {
        this.complete = complete;
    }

    return createTodoObj;
}

const createTodo1 = createTodo('출근하기');
const createTodo2 = createTodo('퇴근하기');

console.log(createTodo1.getTitle() === '출근하기');
console.log(createTodo2.getTitle() === '퇴근하기');
//객체 생성 패턴 end

// 생성자 start
function Todo(title) {
    this.title = title;
    this.complete = false;
}

Todo.prototype.getTitle = function () {
    return this.title;
}
Todo.prototype.setComplete = function (complete) {
    this.complete = complete;
}

const todoMakeConstructor = new Todo('12');
console.log(todoMakeConstructor.constructor === Todo);
console.log(todoMakeConstructor instanceof Todo);
console.log(todoMakeConstructor.getTitle());
todoMakeConstructor.setComplete(false);
console.log(todoMakeConstructor);
// 생성자 end

// Prototypal start
let parent = {
    pMethod: () => {}
};

let child = {
    __proto__: parent,
    cMethod: () => {}
};

let gChild = {
    __proto__: child,
    gMethod: () => {}
};
//Prototypal end

//Object.create() start
let parent2 = {
    pMethod: () => {}
};

let child2 = Object.create(parent2);
child2.cMethod = () => {};

let gChild2 = Object.create(child2);
gChild2.gMethod = () => {};
//Object.create() end


//생성자 기반 프로토타입 체인 상속 start
function cParent(name) {
    this.name = name;
}

cParent.prototype.pMethod = function () {};


function cChild(name) {
    cParent.call(this,name);
}

cChild.prototype = Object.create(cParent.prototype);
cChild.prototype.constructor = cChild;
cChild.prototype.cMethod = function() {};



function cGChild(name) {
    cChild.call(this,name);
}

cGChild.prototype = Object.create(cChild.prototype);
cGChild.prototype.constructor = cGChild;
cGChild.prototype.gCMethod = function() {};

let p2 = new cGChild(`sungin`);

console.log(p2);
//생성자 기반 프로토타입 체인 상속 end


// 생성자 상속 TODO  start
function Todo2(title) {
    this.title = title;
    this.complete = false;
}

Todo2.prototype.getTitle = function () {
    return this.title;
}
Todo2.prototype.setComplete = function (complete) {
    this.complete = complete;
}

Todo2.prototype.getDisplayText = function () {
    return this.complete ? `[완료] ${this.title}` : `[미완료] ${this.title}`;
}
Todo2.prototype.print = function () {
    console.log(this.getDisplayText());
}

function OfficeTodo(title) {
    Todo2.call(this,title);
}

OfficeTodo.prototype = Object.create(Todo2.prototype);
OfficeTodo.prototype.constructor = OfficeTodo;
OfficeTodo.prototype.getDisplayText = function () {
    return `OfficeTodo- ${Todo2.prototype.getDisplayText.call(this)}`;
}

function HomeTodo(title) {
    Todo2.call(this,title);
}

HomeTodo.prototype = Object.create(Todo2.prototype);
HomeTodo.prototype.constructor = HomeTodo;
HomeTodo.prototype.getDisplayText = function () {
    return `HomeTodo- ${Todo2.prototype.getDisplayText.call(this)}`;
}

const home = new HomeTodo('home');
const office = new OfficeTodo('office');
console.log(home.print());
console.log(office.print());
// 생성자 상속 TOdo end
