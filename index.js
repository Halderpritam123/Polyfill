//Base obj
const name = {
  name: "pritam",
  age: 25
};

function printName(town, state, country) {
  console.log(`${this.name}-${this.age}-${town}-${state}-${country}`);
}
/////////////////////////////////bind polifil////////////////////////////////////
//inbuild bind method call

const printMyName = printName.bind(name, "kolkata", "wb");
printMyName("India");

//bind polifil method
Function.prototype.myBind = function(...args) {
  const fn = this;
  const obj = args[0];
  const parameters = args.slice(1);
  return function(...args2) {
    fn.apply(obj, [...parameters, ...args2]);
  };
};
//Use bind polifil

const printMyName2 = printName.myBind(name, "kolkata", "wb");
printMyName2("India");

//////////////////////////////////call polifil////////////////////////////////////

//inbuild call

printName.call(name, "kolkata", "wb", "Ind");

//call polifil method

Function.prototype.myCall = function(obj, ...args) {
  obj.__tempFn__ = this;
  const result = obj.__tempFn__(...args);
  delete obj.__tempFn__;
  return result;
};

//use call polifil

printName.myCall(name, "kolkata", "wb", "Ind");

//////////////////////////////////apply polifil////////////////////////////////////

//inbuild apply

printName.apply(name, ["kolkata", "wb", "Ind"]);

//apply polifil method

Function.prototype.myBind = function(obj, args) {
  obj.__tempFn__ = this;
  const result = obj.__tempFn__(...args);
  delete obj.__tempFn__;
  return result;
};
//use apply polifil

printName.myBind(name, ["kolkata", "wb", "Ind"]);

const arr = [1, 2, 3, 4];

//////////////////////////////////map polifil////////////////////////////////////

const double = arr.map(item => item * 2);
console.log(double);

//map polifil method

Array.prototype.myMap = function(callback) {
  const result = [];
  const size = this.length;
  for (let i = 0; i < size; i++) {
    result[i] = callback(this[i], i, this);
  }
  return result;
};

const double2 = arr.myMap(item => item * 2);
console.log(double2);

//////////////////////////////////filter polifil////////////////////////////////////

const filter_2 = arr.filter(item => item == 2);
console.log(filter_2);

//filter polifil method
Array.prototype.myFilter = function(callback) {
  const result = [];
  const size = this.length;
  for (let i = 0; i < size; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const filter_22 = arr.myFilter(item => item !== 2);
console.log(filter_22);

//////////////////////////////////reduce polifil////////////////////////////////////

const sum = arr.reduce((acc, item) => acc + item, 0);
console.log(sum);

//reduce polifil method

Array.prototype.myReduce = function(callback, initial) {
  const startIndex = initial == undefined ? 1 : 0;
  let accumulator = initial == undefined ? this[0] : initial;
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

const sum2 = arr.myReduce((acc, item) => acc + item, 0);
console.log(sum2);

//////////////////////////////debounce polifil///////////////////////////
function myDebounce(fn, delay) {
  let fnCall;
  return function(...args) {
    clearTimeout(fnCall);
    fnCall = setTimeout(() => fn.apply(this, args), delay);
  };
}

const mockApiCall = e => {
  console.log(`Api calling with payload:${e.target.value}...`);
};
const debounceField = document.getElementById("__debounce_id");
debounceField.addEventListener("input", myDebounce(mockApiCall, 300));

////////////////////////Throttle polifil///////////////////////////

function myThrottle(fn, limit){
    let lastCall = 0;
    return function(...args){
        if(Date.now() - lastCall >= limit){
            lastCall = Date.now();
            fn.apply(this, args);
        }
    }
}
function logMousePosition(e) {
    console.log("Mouse:", e.clientX, e.clientY, "Time:", Date.now());
}

const throttledMouseMove = myThrottle(logMousePosition, 500);

document.addEventListener("mousemove", throttledMouseMove);

