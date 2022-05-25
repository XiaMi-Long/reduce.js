const throttleVal = function throttle(callback, obj, event) {
  if (!obj.startLoop) {
    obj.reset = () => {
      obj.loopCount = 0;
      obj.compareCount = 0;
      obj.startLoop = false;
    };
  }

  obj.loopCount++;

  if (obj.loopCount === obj.forceOut) {
    callback({ type: "forceOut" }, event);
    obj.reset();
    return;
  }

  if (!obj.startLoop) {
    const loop = () => {
      obj.compareCount = obj.loopCount;

      setTimeout(() => {
        if (obj.loopCount > obj.compareCount) {
          loop();
          return;
        }

        callback({ type: "stop" }, event);
        obj.reset();
      }, obj.outTime);
    };

    loop();
  }
  obj.startLoop = true;
};
module.exports = throttleVal;
