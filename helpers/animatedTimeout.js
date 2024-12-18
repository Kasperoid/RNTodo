import {makeMutable} from 'react-native-reanimated';

const PENDING_TIMEOUTS = makeMutable({});
const TIMEOUT_ID = makeMutable(0);

function removeFromPendingTimeouts(id) {
  'worklet';
  PENDING_TIMEOUTS.modify(pendingTimeouts => {
    'worklet';
    delete pendingTimeouts[id];
    return pendingTimeouts;
  });
}

export function setAnimatedTimeout(callback, delay) {
  'worklet';
  let startTimestamp;

  const currentId = TIMEOUT_ID.value;
  PENDING_TIMEOUTS.value[currentId] = true;
  TIMEOUT_ID.value += 1;

  const step = newTimestamp => {
    if (!PENDING_TIMEOUTS.value[currentId]) {
      return;
    }
    if (startTimestamp === undefined) {
      startTimestamp = newTimestamp;
    }
    if (newTimestamp >= startTimestamp + delay) {
      removeFromPendingTimeouts(currentId);
      callback();
      return;
    }
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);

  return currentId;
}

export function clearAnimatedTimeout(handle) {
  'worklet';
  removeFromPendingTimeouts(handle);
}
