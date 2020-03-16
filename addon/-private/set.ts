import {
  consumeKey,
  consumeCollection,
  dirtyKey,
  dirtyCollection
} from './util';

export class TrackedSet<T = any> extends Set<T> {
  // **** KEY GETTERS ****
  has(value: T) {
    consumeKey(this, value);

    return super.has(value);
  }

  // **** ALL GETTERS ****
  entries() {
    consumeCollection(this);

    return super.entries();
  }

  keys() {
    consumeCollection(this);

    return super.keys();
  }

  values() {
    consumeCollection(this);

    return super.values();
  }

  forEach(fn: (value1: T, value2: T, map: this) => void) {
    consumeCollection(this);

    super.forEach(fn);
  }

  get size() {
    consumeCollection(this);

    return super.size;
  }

  // **** KEY SETTERS ****
  add(value: T) {
    dirtyKey(this, value);
    dirtyCollection(this);

    return super.add(value);
  }

  delete(value: T) {
    dirtyKey(this, value);
    dirtyCollection(this);

    return super.delete(value);
  }

  // **** ALL SETTERS ****
  clear() {
    super.forEach((_v, k) => dirtyKey(this, k));
    dirtyCollection(this);

    return super.clear();
  }
}

if (typeof Symbol !== undefined) {
  let originalIterator = TrackedSet.prototype[Symbol.iterator];

  Object.defineProperty(TrackedSet.prototype, Symbol.iterator, {
    get() {
      consumeCollection(this);
      return originalIterator;
    }
  });
}

export class TrackedWeakSet<T extends object = object> extends WeakSet<T> {
  has(value: T) {
    consumeKey(this, value);

    return super.has(value);
  }

  add(value: T) {
    dirtyKey(this, value);

    return super.add(value);
  }

  delete(value: T) {
    dirtyKey(this, value);

    return super.delete(value);
  }
}
