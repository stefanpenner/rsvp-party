export default function filter(fn) {
  return this.then((val) => this.constructor.filter(val, fn));
};
