import { DEBUG } from '@glimmer/env';
import {
  consumeKey,
  consumeCollection,
  dirtyKey,
  dirtyCollection,
  createDebugProxy,
} from './util';

const SELF: unique symbol = DEBUG && typeof Symbol === 'function' ? Symbol() : undefined as any;

export class TrackedSet<T = any> extends Set<T> {
  [SELF]: TrackedSet<T>;

  constructor(entries?: Iterable<T>) {
    super(entries);

    if (DEBUG && typeof Proxy === 'function') {
      this[SELF!] = createDebugProxy(this, Set);

      return this[SELF!]
    }
  }

  // **** KEY GETTERS ****
  has(value: T) {
    consumeKey(this, value);

    return super.has(value);
  }

  // **** ALL GETTERS ****
  entries() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.entries();
  }

  keys() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.keys();
  }

  values() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.values();
  }

  forEach(fn: (value1: T, value2: T, map: this) => void) {
    consumeCollection(DEBUG ? this[SELF] : this);

    super.forEach(fn);
  }

  get size() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.size;
  }

  // **** KEY SETTERS ****
  add(value: T) {
    dirtyKey(this, value);
    dirtyCollection(DEBUG ? this[SELF] || this : this);

    return super.add(value);
  }

  delete(value: T) {
    dirtyKey(this, value);
    dirtyCollection(DEBUG ? this[SELF] : this);

    return super.delete(value);
  }

  // **** ALL SETTERS ****
  clear() {
    super.forEach((_v, k) => dirtyKey(this, k));
    dirtyCollection(DEBUG ? this[SELF] : this);

    return super.clear();
  }
}

if (typeof Symbol !== undefined) {
  let originalIterator = TrackedSet.prototype[Symbol.iterator];

  Object.defineProperty(TrackedSet.prototype, Symbol.iterator, {
    get() {
      consumeCollection(DEBUG ? this[SELF] : this);
      return originalIterator;
    }
  });
}

export class TrackedWeakSet<T extends object = object> extends WeakSet<T> {
  constructor(entries?: Iterable<T>) {
    super(entries as undefined);

    if (DEBUG && typeof Proxy === 'function') {
      return createDebugProxy(this, WeakSet);
    }
  }

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
