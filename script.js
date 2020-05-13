/**
 *  trying out a couple of patterns from https://medium.com/javascript-in-plain-english/4-useful-javascript-design-patterns-you-should-know-b4e1404e3929
 */

// Strategy pattern:
const list = ['a', 'b'];
const strategies = {
  checkRole: function (val) {
    return val === 'registered';
  },
  checkGrade: function (val) {
    return val > 1;
  },
  checkJob: function (val) {
    return list.includes(val);
  },
  checkType: function (val) {
    return val === 'active';
  },
};

class Validator {
  constructor() {
    this.cache = [];
    this.validationResult = true;
    this.add = (val, method) => {
      this.cache.push(() => {
        return strategies[method](val);
      });
    };
    this.check = () => {
      this.cache.forEach((element) => {
        const validatorCheck = element;
        const data = validatorCheck();
        if (!data) this.validationResult = false;
      });
      return this.validationResult;
    };
  }
}

const testData = {
  role: 'registered',
  grade: 3,
  job: 'a',
  type: 'active',
};

const compose = () => {
  const validator = new Validator();
  validator.add(testData.role, 'checkRole');
  validator.add(testData.grade, 'checkGrade');
  validator.add(testData.type, 'checkType');
  validator.add(testData.job, 'checkJob');

  const result = validator.check();
  return result;
};

const validationResult = compose();
console.log('validation result: ', validationResult);

// PubSub pattern
// eventEmitter and stuff
class EventEmitter {
  constructor() {
    this.events = {};
    this.on = (eventName, callback) => {
      this.events[eventName]
        ? this.events[eventName].push(callback)
        : (this.events[eventName] = [callback]);
    };
    this.trigger = (eventName, ...arg) => {
      if (this.events[eventName]) {
        this.events[eventName].forEach((listener) => {
          listener(...arg);
        });
      }
    };
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('success', () => {
  console.log('success event happened!');
});

eventEmitter.trigger('success');

// Decorator pattern
class Write {
  constructor() {
    this.writeTurkish = () => {
      console.log('kebab kebab');
    };
  }
}

class Decorator {
  constructor(old) {
    this.oldWrite = old.writeTurkish;
    this.writeEnglish = () => {
      console.log('oh i would like a cup of tea');
    };
    this.newWrite = () => {
      this.oldWrite();
      this.writeEnglish();
    };
  }
}

const newSkill = {
  writeEnglish() {
    return console.log('oh i would like a cup of tea');
  },
};

const smartGuy = new Write();
const decorator = new Decorator(smartGuy);
decorator.newWrite();

// mixin pattern:
Object.assign(Write.prototype, newSkill);
const sameGuy = new Write();
sameGuy.writeTurkish();
sameGuy.writeEnglish();

// another example
// https://alligator.io/js/using-js-mixins/
let swim = {
  setSwimProperties(speed, direction) {
    this.speed = speed;
    this.direction = direction;
  },

  getSwimProperties() {
    console.log(`swimming ${this.speed} towards ${this.direction}`);
  },
};

class Reptile {
  constructor(name) {
    this.name = name;
  }
}

let alligator = new Reptile('alligator');
Object.assign(Reptile.prototype, swim);
alligator.setSwimProperties('5 m/s', 'upstream');
alligator.getSwimProperties();

/**
 * Chain of Responsibility Pattern
 */
// this goes for trrrrond
class Chain {
  constructor(fn) {
    this.fn = fn;
    this.setNext = () => {};
    this.run = () => {};
  }
}

const applyDevice = () => {};
const selectAddress = () => {};
const selectChecker = () => {};
const chainApplyDevice = new Chain(applyDevice);
const chainSelectAddress = new Chain(selectAddress);
const chainSelectChecker = new Chain(selectChecker);

chainApplyDevice.setNext(chainSelectAddress);
chainApplyDevice.run();

// yields error tho, wtf..
