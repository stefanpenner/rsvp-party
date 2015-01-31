import Promise from './promise';

export default function(tasks) {
  var length = tasks.length;
  var current = Promise.resolve();
  var results = new Array(length);

  for (var i = 0; i < length; ++i) {
    current = results[i] = current.then(tasks[i]);
  }

  return Promise.all(results);
};
