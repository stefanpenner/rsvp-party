export default function returns(value) {
  return this.then(() => value);
};
