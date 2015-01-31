export  function map(fn) {
  return this.then((val) => this.constructor.map(val, fn));
};

