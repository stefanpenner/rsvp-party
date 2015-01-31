export default function guard(test) {
  var guarded = this.finally(() => {
    if (!test()) {
      guarded._subscribers.length = 0;
    }
  });

  return guarded;
};
