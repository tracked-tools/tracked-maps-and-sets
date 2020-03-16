import {
  consumeKey,
  consumeCollection,
  dirtyKey,
  dirtyCollection
} from './util';

export class TrackedMap<K = any, V = any> extends Map<K, V> {
  // **** KEY GETTERS ****
  get(key: K) {
    consumeKey(this, key);

    return super.get(key);
  }

  has(key: K) {
    consumeKey(this, key);

    return super.has(key);
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

  forEach(fn: (value: V, key: K, map: this) => void) {
    consumeCollection(this);

    super.forEach(fn);
  }

  get size() {
    consumeCollection(this);

    return super.size;
  }

  // **** KEY SETTERS ****
  set(key: K, value: V) {
    dirtyKey(this, key);
    dirtyCollection(this);

    return super.set(key, value);
  }

  delete(key: K) {
    dirtyKey(this, key);
    dirtyCollection(this);

    return super.delete(key);
  }

  // **** ALL SETTERS ****
  clear() {
    super.forEach((_v, k) => dirtyKey(this, k));
    dirtyCollection(this);

    return super.clear();
  }
}

if (typeof Symbol !== undefined) {
  let originalIterator = TrackedMap.prototype[Symbol.iterator];

  Object.defineProperty(TrackedMap.prototype, Symbol.iterator, {
    get() {
      consumeCollection(this);
      return originalIterator;
    }
  });
}

export class TrackedWeakMap<K extends object = object, V = any> extends WeakMap<
  K,
  V
> {
  get(key: K) {
    consumeKey(this, key);

    return super.get(key);
  }

  has(key: K) {
    consumeKey(this, key);

    return super.has(key);
  }

  set(key: K, value: V) {
    dirtyKey(this, key);

    return super.set(key, value);
  }

  delete(key: K) {
    dirtyKey(this, key);

    return super.delete(key);
  }
}
