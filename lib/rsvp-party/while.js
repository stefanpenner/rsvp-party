import Promise from './promise';

//Run a promise returning callable body while a
//promise returning callable condition is true.
//Returns a promise.
export default function promiseWhile(condition, body) {
  return new Promise((resolve, reject) => {
    function loop() {
      Promise.resolve(condition()).then((result) => {
        // When the result of calling `condition` is no longer true, we are done.
        if (!result){
          resolve();
        } else {
          // When it completes loop again otherwise, if it fails, reject
          Promise.resolve(body()).then(loop).catch(reject);
        }
      });
    }

    // Start running the loop
    loop();
  });
};
