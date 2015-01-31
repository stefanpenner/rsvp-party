export default function tap(method) {
  return this.then((val) => {
    method(val);
    return val;
  });
};
