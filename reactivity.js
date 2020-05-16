// basically observer pattern, mixed with pub-sub

class EventBus {
  constructor() {
    this.subscribers = [];
  }
  depend(target) {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

const eventBus = new EventBus();

let price = 5;
let quantity = 2;
let total = 0;
let data = { price: 5, quantity: 2 };

let internalVal = data.price;

Object.keys(data).forEach((key) => {
  let internalVal = data[key];
  // const dep = new EventBus();
  Object.defineProperty(data, key, {
    get() {
      console.log(`getting ${key}: ${internalVal}`);
      // dep.depend();
      return internalVal;
    },
    set(newVal) {
      console.log(`setting ${key}`);
      internalVal = newVal;
      eventBus.notify();
    },
  });
});

const calculateTotal = () => {
  total = data.price * data.quantity;
};

function Watcher(func) {
  eventBus.depend(func);
}

Watcher(calculateTotal);

console.log('total: ', total);
calculateTotal();
console.log('total: ', total);

data.price = 10;
console.log('total: ', total);
