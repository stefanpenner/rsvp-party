export default function sequence(tasks) {
  var length = tasks.length;
  var current = this.resolve();
  var results = new Array(length);

  for (var i = 0; i < length; ++i) {
    current = results[i] = current.then(tasks[i]);
  }

  return this.all(results);
};
