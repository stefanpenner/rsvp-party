export default function invoke(method, ...args) {

  return this.then((val) => {
    return val[method](...args);
  }, undefined, 'invoke: ' + method);
};
